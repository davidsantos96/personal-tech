-- ============================================================
-- Personal Tech — Migration 004: Add exercise images
-- ============================================================
-- Populates gif_url for all seeded exercises using images from
-- free-exercise-db (public domain, Unlicense).
-- Source: https://github.com/yuhonas/free-exercise-db
-- ============================================================

DO $$
DECLARE
    img_base TEXT := 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';
BEGIN
    -- Peito
    UPDATE exercises SET gif_url = img_base || 'Barbell_Bench_Press_-_Medium_Grip/0.jpg' WHERE name = 'Supino Reto com Barra' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Incline_Dumbbell_Press/0.jpg'             WHERE name = 'Supino Inclinado com Halteres' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Dumbbell_Flyes/0.jpg'                     WHERE name = 'Crucifixo com Halteres' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Incline_Dumbbell_Flyes/0.jpg'             WHERE name = 'Crucifixo Inclinado' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Cable_Crossover/0.jpg'                    WHERE name = 'Crossover' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Pushups/0.jpg'                            WHERE name = 'Flexão de Braços' AND gif_url IS NULL;

    -- Costas
    UPDATE exercises SET gif_url = img_base || 'Wide-Grip_Lat_Pulldown/0.jpg'             WHERE name = 'Puxada Alta Frontal' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Bent_Over_Barbell_Row/0.jpg'              WHERE name = 'Remada Curvada' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'One-Arm_Dumbbell_Row/0.jpg'               WHERE name = 'Remada Unilateral' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'V-Bar_Pulldown/0.jpg'                     WHERE name = 'Pulldown' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Pullups/0.jpg'                            WHERE name = 'Barra Fixa' AND gif_url IS NULL;

    -- Pernas
    UPDATE exercises SET gif_url = img_base || 'Barbell_Full_Squat/0.jpg'                 WHERE name = 'Agachamento Livre' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Leg_Press/0.jpg'                          WHERE name = 'Leg Press 45°' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Leg_Extensions/0.jpg'                     WHERE name = 'Cadeira Extensora' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Seated_Leg_Curl/0.jpg'                    WHERE name = 'Cadeira Flexora' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Stiff-Legged_Barbell_Deadlift/0.jpg'      WHERE name = 'Stiff' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Standing_Calf_Raises/0.jpg'               WHERE name = 'Panturrilha em Pé' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Dumbbell_Lunges/0.jpg'                    WHERE name = 'Agachamento Búlgaro' AND gif_url IS NULL;

    -- Ombros
    UPDATE exercises SET gif_url = img_base || 'Standing_Military_Press/0.jpg'            WHERE name = 'Desenvolvimento com Barra' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Standing_Dumbbell_Press/0.jpg'            WHERE name = 'Desenvolvimento com Halteres' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Side_Lateral_Raise/0.jpg'                 WHERE name = 'Elevação Lateral' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Front_Dumbbell_Raise/0.jpg'               WHERE name = 'Elevação Frontal' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Face_Pull/0.jpg'                          WHERE name = 'Face Pull' AND gif_url IS NULL;

    -- Braços
    UPDATE exercises SET gif_url = img_base || 'Barbell_Curl/0.jpg'                       WHERE name = 'Rosca Direta' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Dumbbell_Alternate_Bicep_Curl/0.jpg'      WHERE name = 'Rosca Alternada' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Hammer_Curls/0.jpg'                       WHERE name = 'Rosca Martelo' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Triceps_Pushdown_-_Rope_Attachment/0.jpg' WHERE name = 'Tríceps Corda' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Lying_Triceps_Press/0.jpg'                WHERE name = 'Tríceps Testa' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Triceps_Pushdown/0.jpg'                   WHERE name = 'Extensão de Tríceps' AND gif_url IS NULL;

    -- Core
    UPDATE exercises SET gif_url = img_base || 'Plank/0.jpg'                              WHERE name = 'Prancha' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Crunches/0.jpg'                           WHERE name = 'Abdominal Crunch' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Flat_Bench_Lying_Leg_Raise/0.jpg'         WHERE name = 'Abdominal Infra' AND gif_url IS NULL;
    UPDATE exercises SET gif_url = img_base || 'Russian_Twist/0.jpg'                      WHERE name = 'Russian Twist' AND gif_url IS NULL;

    -- Cardio
    UPDATE exercises SET gif_url = img_base || 'Rope_Jumping/0.jpg'                       WHERE name = 'Pular Corda' AND gif_url IS NULL;
END $$;
