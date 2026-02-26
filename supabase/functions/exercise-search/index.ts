// supabase/functions/exercise-search/index.ts
// ─────────────────────────────────────────────
// Supabase Edge Function (Deno) — ExerciseDB Integration
//
// Searches the local `exercises` table first (cache).
// If fewer results than desired, fetches from ExerciseDB API v1,
// caches new exercises in the database, and returns merged results.
//
// Usage:
//   POST /functions/v1/exercise-search
//   Body: { "query": "supino", "bodyPart": "chest", "limit": 20 }
// ─────────────────────────────────────────────

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const EXERCISEDB_BASE = "https://exercisedb.p.rapidapi.com";
const EXERCISEDB_API_KEY = Deno.env.get("EXERCISEDB_API_KEY") ?? "";

// ── ExerciseDB body part mapping (pt → en) ───────────────────
const bodyPartMap: Record<string, string> = {
  peito: "chest",
  costas: "back",
  pernas: "upper legs",
  ombros: "shoulders",
  braços: "upper arms",
  core: "waist",
  cardio: "cardio",
};

// ── Category mapping (en → pt) ──────────────────────────────
const categoryMap: Record<string, string> = {
  chest: "Peito",
  back: "Costas",
  "upper legs": "Pernas",
  "lower legs": "Pernas",
  shoulders: "Ombros",
  "upper arms": "Braços",
  "lower arms": "Braços",
  waist: "Core",
  cardio: "Cardio",
  neck: "Ombros",
};

interface ExerciseDBItem {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl?: string;          // ExerciseDB removed this field; may be absent
  instructions?: string[];
}

// ── Free Exercise DB image fallback ──────────────────────────
// Builds image URL from exercise name for the free-exercise-db repo.
// Converts e.g. "barbell bench press" → "Barbell_Bench_Press/0.jpg"
const FREE_EXERCISE_IMG = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

function buildImageUrl(name: string): string {
  const slug = name
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("_");
  return `${FREE_EXERCISE_IMG}/${slug}/0.jpg`;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { query, bodyPart, limit = 20 } = await req.json();

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // ── Step 1: Search local database first ──────────────────
    let dbQuery = supabase
      .from("exercises")
      .select("*")
      .limit(limit);

    if (query) {
      dbQuery = dbQuery.ilike("name", `%${query}%`);
    }
    if (bodyPart) {
      const mappedCategory = categoryMap[bodyPart] ?? bodyPart;
      dbQuery = dbQuery.eq("category", mappedCategory);
    }

    const { data: localResults, error: dbError } = await dbQuery;

    if (dbError) {
      throw new Error(`DB error: ${dbError.message}`);
    }

    // If we have enough local results, return them
    if (localResults && localResults.length >= limit) {
      return new Response(JSON.stringify({ exercises: localResults, source: "cache" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Step 2: Fetch from ExerciseDB API if key is available ─
    if (!EXERCISEDB_API_KEY) {
      return new Response(
        JSON.stringify({
          exercises: localResults ?? [],
          source: "cache_only",
          message: "ExerciseDB API key not configured. Returning local results only.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const headers = {
      "X-RapidAPI-Key": EXERCISEDB_API_KEY,
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    };

    let apiUrl = `${EXERCISEDB_BASE}/exercises?limit=${limit}&offset=0`;

    if (query) {
      apiUrl = `${EXERCISEDB_BASE}/exercises/name/${encodeURIComponent(query)}?limit=${limit}`;
    } else if (bodyPart) {
      const mappedPart = bodyPartMap[bodyPart.toLowerCase()] ?? bodyPart;
      apiUrl = `${EXERCISEDB_BASE}/exercises/bodyPart/${encodeURIComponent(mappedPart)}?limit=${limit}`;
    }

    const apiResponse = await fetch(apiUrl, { headers });

    if (!apiResponse.ok) {
      // API failed — return local results only
      return new Response(
        JSON.stringify({
          exercises: localResults ?? [],
          source: "cache_fallback",
          apiError: `ExerciseDB returned ${apiResponse.status}`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiExercises: ExerciseDBItem[] = await apiResponse.json();

    // ── Step 3: Cache new exercises in database ──────────────
    const existingIds = new Set(
      (localResults ?? []).map((e: { external_id: string }) => e.external_id).filter(Boolean)
    );

    const newExercises = apiExercises
      .filter((e) => !existingIds.has(e.id))
      .map((e) => ({
        name: e.name.charAt(0).toUpperCase() + e.name.slice(1),
        muscle_group: e.target,
        category: categoryMap[e.bodyPart] ?? "Full Body",
        equipment: e.equipment,
        gif_url: e.gifUrl || buildImageUrl(e.name),
        instructions: Array.isArray(e.instructions) ? e.instructions.join("\n") : null,
        external_id: e.id,
        is_custom: false,
      }));

    if (newExercises.length > 0) {
      const { error: insertError } = await supabase
        .from("exercises")
        .upsert(newExercises, { onConflict: "external_id", ignoreDuplicates: true });

      if (insertError) {
        console.error("Failed to cache exercises:", insertError.message);
      }
    }

    // ── Step 4: Re-fetch merged results ──────────────────────
    let mergedQuery = supabase.from("exercises").select("*").limit(limit);
    if (query) mergedQuery = mergedQuery.ilike("name", `%${query}%`);
    if (bodyPart) {
      const mappedCategory = categoryMap[bodyPart] ?? bodyPart;
      mergedQuery = mergedQuery.eq("category", mappedCategory);
    }

    const { data: mergedResults } = await mergedQuery;

    return new Response(
      JSON.stringify({
        exercises: mergedResults ?? [],
        source: "merged",
        cached: newExercises.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
