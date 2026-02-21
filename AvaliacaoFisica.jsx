import { useState, useEffect } from "react";

// ─── Shared styles ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0e0e0e; --surface: #161616; --surface2: #1e1e1e; --surface3: #242424;
      --border: #2a2a2a; --orange: #ff6b00; --orange-dim: rgba(255,107,0,0.1);
      --orange-glow: rgba(255,107,0,0.28); --text: #f0f0f0; --muted: #555; --muted2: #888;
      --green: #22c55e; --green-dim: rgba(34,197,94,0.1);
      --red: #ef4444; --red-dim: rgba(239,68,68,0.1);
      --blue: #3b82f6; --blue-dim: rgba(59,130,246,0.1);
    }
    body {
      font-family: 'DM Sans', sans-serif; background: #080808;
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: flex-start;
      padding: 24px 16px 60px; gap: 24px;
    }
    .page-label { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
    .phone { width: min(400px, 100%); background: var(--bg); border-radius: 32px; overflow: hidden; box-shadow: 0 28px 72px rgba(0,0,0,0.75), inset 0 0 0 1px #1e1e1e; }
    /* header */
    .pheader { background: var(--surface); border-bottom: 1px solid var(--border); padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .pheader-left { display: flex; align-items: center; gap: 10px; }
    .back { width: 30px; height: 30px; border-radius: 9px; background: var(--surface2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; color: var(--muted2); }
    .pheader-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--text); }
    .pheader-sub { font-size: 11px; color: var(--muted); }
    /* tabs */
    .tab-bar { display: flex; background: var(--surface); border-bottom: 1px solid var(--border); padding: 12px 16px; gap: 8px; overflow-x: auto; }
    .tab-bar::-webkit-scrollbar { display: none; }
    .tab-pill { flex-shrink: 0; padding: 8px 14px; border-radius: 99px; border: 1.5px solid var(--border); background: transparent; color: var(--muted2); font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.18s; white-space: nowrap; }
    .tab-pill.active { background: var(--orange); border-color: var(--orange); color: #fff; box-shadow: 0 3px 12px var(--orange-glow); }
    /* body */
    .pbody { padding: 18px; display: flex; flex-direction: column; gap: 14px; animation: fadeUp 0.3s ease both; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    /* section */
    .section-head { display: flex; align-items: center; gap: 8px; }
    .section-icon { width: 30px; height: 30px; border-radius: 9px; background: var(--orange-dim); border: 1px solid rgba(255,107,0,0.2); display: flex; align-items: center; justify-content: center; font-size: 14px; }
    .section-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--text); }
    .section-sub { font-size: 11px; color: var(--muted2); font-style: italic; }
    /* slabel */
    .slabel { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
    /* field */
    .field { display: flex; flex-direction: column; gap: 5px; }
    .field label { font-size: 11px; font-weight: 500; color: var(--muted2); padding-left: 2px; }
    .field input, .field select, .field textarea {
      background: var(--surface2); border: 1.5px solid var(--border); border-radius: 11px;
      padding: 11px 13px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px;
      outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; -webkit-appearance: none;
    }
    .field input:focus, .field select:focus { border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-dim); }
    .field select option { background: #1e1e1e; }
    .field textarea { resize: none; height: 68px; }
    /* row */
    .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
    /* divider */
    .div { height: 1px; background: var(--border); }
    /* measure row */
    .mrow { display: flex; align-items: center; justify-content: space-between; padding: 10px 13px; background: var(--surface2); border-radius: 11px; border: 1.5px solid var(--border); gap: 10px; transition: border-color 0.2s; }
    .mrow:focus-within { border-color: rgba(255,107,0,0.4); }
    .mrow-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
    .mrow-point { width: 28px; height: 28px; border-radius: 8px; background: var(--orange-dim); border: 1px solid rgba(255,107,0,0.2); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
    .mrow-name { font-size: 13px; color: var(--text); font-weight: 500; }
    .mrow-hint { font-size: 10px; color: var(--muted); line-height: 1.3; margin-top: 1px; }
    .mrow-right { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }
    .mrow-input { width: 64px; background: var(--surface3); border: 1.5px solid var(--border); border-radius: 8px; padding: 7px 8px; color: var(--text); font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; text-align: right; outline: none; transition: border-color 0.2s; -webkit-appearance: none; }
    .mrow-input:focus { border-color: var(--orange); }
    .mrow-unit { font-size: 11px; color: var(--muted); min-width: 20px; }
    /* result card */
    .result-card { background: var(--surface2); border: 1.5px solid var(--border); border-radius: 14px; padding: 14px; }
    .result-card-title { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
    .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .result-item { background: var(--surface); border-radius: 10px; padding: 10px 12px; }
    .result-item-label { font-size: 10px; color: var(--muted2); margin-bottom: 3px; }
    .result-item-val { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text); line-height: 1; }
    .result-item-val.orange { color: var(--orange); }
    .result-item-val.green { color: var(--green); }
    .result-item-val.red { color: var(--red); }
    .result-item-sub { font-size: 10px; color: var(--muted); margin-top: 2px; }
    /* fat bar */
    .fat-bar-wrap { margin-top: 10px; }
    .fat-bar-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--muted); margin-bottom: 5px; font-family: 'Syne', sans-serif; }
    .fat-bar { height: 8px; border-radius: 99px; background: linear-gradient(90deg, var(--green) 0%, #86efac 18%, var(--orange) 40%, #f97316 60%, var(--red) 80%); position: relative; overflow: hidden; }
    .fat-marker { position: absolute; top: -3px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--orange); box-shadow: 0 2px 6px rgba(0,0,0,0.4); transition: left 0.4s ease; }
    /* info tip */
    .tip { display: flex; gap: 8px; padding: 10px 12px; background: var(--blue-dim); border: 1.5px solid rgba(59,130,246,0.2); border-radius: 10px; }
    .tip-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
    .tip-text { font-size: 11px; color: var(--muted2); line-height: 1.5; }
    .tip-text strong { color: var(--text); font-size: 11px; display: block; margin-bottom: 1px; }
    /* photo upload */
    .photo-zone { border: 2px dashed var(--border); border-radius: 12px; padding: 18px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s; text-align: center; }
    .photo-zone:hover { border-color: var(--orange); background: var(--orange-dim); }
    .photo-zone p { font-size: 12px; color: var(--muted2); }
    .photo-zone strong { font-size: 12px; color: var(--orange); }
    /* btn */
    .btn { width: 100%; padding: 14px; border-radius: 11px; border: none; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em; transition: all 0.18s; }
    .btn-primary { background: var(--orange); color: #fff; box-shadow: 0 6px 20px var(--orange-glow); }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 10px 28px var(--orange-glow); }
    .btn-ghost { background: var(--surface2); color: var(--muted2); }
    .btn-row { display: flex; gap: 10px; }
    /* protocol badge */
    .proto-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 99px; background: var(--orange-dim); border: 1px solid rgba(255,107,0,0.25); font-size: 11px; font-weight: 700; color: var(--orange); font-family: 'Syne', sans-serif; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }
  `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const TABS = ["Geral", "Dobras", "Circunf.", "Resultado"];

// Pollock 7 dobras
const DOBRAS_MASC = [
  { key: "peitoral",    label: "Peitoral",      emoji: "🫁", hint: "Diagonal, entre axila e mamilo" },
  { key: "axilar",     label: "Axilar média",   emoji: "📍", hint: "Horizontal, linha axilar média" },
  { key: "triceps",    label: "Tríceps",        emoji: "💪", hint: "Vertical, face posterior do braço" },
  { key: "subescap",   label: "Subescapular",   emoji: "🔹", hint: "Oblíqua, 1–2 cm abaixo da escápula" },
  { key: "suprailiac", label: "Supra-ilíaca",   emoji: "📌", hint: "Oblíqua, acima da crista ilíaca" },
  { key: "abdominal",  label: "Abdominal",      emoji: "🎯", hint: "Vertical, 2 cm à direita do umbigo" },
  { key: "coxa",       label: "Coxa",           emoji: "🦵", hint: "Vertical, face anterior, 1/3 médio" },
];

const DOBRAS_FEM = [
  { key: "triceps",    label: "Tríceps",        emoji: "💪", hint: "Vertical, face posterior do braço" },
  { key: "suprailiac", label: "Supra-ilíaca",   emoji: "📌", hint: "Oblíqua, acima da crista ilíaca" },
  { key: "abdominal",  label: "Abdominal",      emoji: "🎯", hint: "Vertical, 2 cm à direita do umbigo" },
  { key: "coxa",       label: "Coxa",           emoji: "🦵", hint: "Vertical, face anterior, 1/3 médio" },
  { key: "peitoral",   label: "Peitoral",       emoji: "🫁", hint: "Diagonal, 1/3 entre axila e mamilo" },
  { key: "axilar",     label: "Axilar média",   emoji: "📍", hint: "Horizontal, linha axilar média" },
  { key: "subescap",   label: "Subescapular",   emoji: "🔹", hint: "Oblíqua, 1–2 cm abaixo da escápula" },
];

const CIRCUNFERENCIAS = [
  { key: "cintura",   label: "Cintura",       emoji: "⬜", unit: "cm", hint: "Menor circunferência abdominal" },
  { key: "quadril",   label: "Quadril",       emoji: "🔵", unit: "cm", hint: "Maior protuberância glútea" },
  { key: "torax",     label: "Tórax",         emoji: "🫀", unit: "cm", hint: "Na altura dos mamilos" },
  { key: "bicepsD",   label: "Bíceps D.",     emoji: "💪", unit: "cm", hint: "Máxima contração, braço direito" },
  { key: "coxaD",     label: "Coxa D.",       emoji: "🦵", unit: "cm", hint: "1/3 superior, coxa direita" },
  { key: "panturrilha", label: "Panturrilha", emoji: "🦶", unit: "cm", hint: "Maior circunferência da perna" },
  { key: "braco",     label: "Braço relaxado",emoji: "🙌", unit: "cm", hint: "Ponto médio, braço relaxado" },
];

// ── Pollock 7 dobras: Jackson & Pollock (1978/1980) ─────────────────────────
// Densidade corporal → Siri (1956) para % gordura
function calcPollock7(soma7, idade, sexo) {
  if (!soma7 || !idade) return null;
  let dc;
  if (sexo === "M") {
    dc = 1.112 - (0.00043499 * soma7) + (0.00000055 * soma7 * soma7) - (0.00028826 * idade);
  } else {
    dc = 1.097 - (0.00046971 * soma7) + (0.00000056 * soma7 * soma7) - (0.00012828 * idade);
  }
  const pctGordura = ((4.95 / dc) - 4.50) * 100;
  return Math.max(0, Math.min(60, pctGordura)).toFixed(1);
}

// IMC
function calcIMC(peso, altura) {
  if (!peso || !altura) return null;
  const imc = peso / ((altura / 100) ** 2);
  return imc.toFixed(1);
}

function imcClass(imc) {
  if (!imc) return { label: "—", color: "var(--muted2)" };
  const v = parseFloat(imc);
  if (v < 18.5) return { label: "Abaixo do peso", color: "var(--blue)" };
  if (v < 25)   return { label: "Peso normal", color: "var(--green)" };
  if (v < 30)   return { label: "Sobrepeso", color: "var(--yellow, #f59e0b)" };
  return { label: "Obesidade", color: "var(--red)" };
}

// % gordura classificação (homens)
function fatClass(pct, sexo) {
  const v = parseFloat(pct);
  if (sexo === "M") {
    if (v < 6)  return { label: "Essencial", color: "var(--blue)" };
    if (v < 14) return { label: "Atleta", color: "var(--green)" };
    if (v < 18) return { label: "Boa forma", color: "var(--green)" };
    if (v < 25) return { label: "Aceitável", color: "var(--orange)" };
    return { label: "Obesidade", color: "var(--red)" };
  } else {
    if (v < 14) return { label: "Essencial", color: "var(--blue)" };
    if (v < 21) return { label: "Atleta", color: "var(--green)" };
    if (v < 25) return { label: "Boa forma", color: "var(--green)" };
    if (v < 32) return { label: "Aceitável", color: "var(--orange)" };
    return { label: "Obesidade", color: "var(--red)" };
  }
}

// RCQ (Razão Cintura-Quadril)
function calcRCQ(cintura, quadril) {
  if (!cintura || !quadril) return null;
  return (cintura / quadril).toFixed(2);
}

// ─── MedidaRow ────────────────────────────────────────────────────────────────
function MedidaRow({ emoji, label, hint, unit = "mm", value, onChange }) {
  return (
    <div className="mrow">
      <div className="mrow-left">
        <div className="mrow-point">{emoji}</div>
        <div>
          <div className="mrow-name">{label}</div>
          <div className="mrow-hint">{hint}</div>
        </div>
      </div>
      <div className="mrow-right">
        <input
          className="mrow-input"
          type="number"
          inputMode="decimal"
          placeholder="—"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <span className="mrow-unit">{unit}</span>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AvaliacaoFisica() {
  const [tab, setTab] = useState(0);
  const [sexo, setSexo] = useState("M");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [pa, setPa] = useState("");
  const [fc, setFc] = useState("");
  const [obs, setObs] = useState("");

  const dobrasList = sexo === "M" ? DOBRAS_MASC : DOBRAS_FEM;
  const [dobras, setDobras] = useState({});
  const [circunf, setCircunf] = useState({});

  const setDobra = (k, v) => setDobras(p => ({ ...p, [k]: v }));
  const setCirc  = (k, v) => setCircunf(p => ({ ...p, [k]: v }));

  // Cálculos automáticos
  const soma7 = dobrasList.reduce((acc, d) => acc + (parseFloat(dobras[d.key]) || 0), 0);
  const pctGordura = calcPollock7(soma7 || null, parseInt(idade) || null, sexo);
  const imc = calcIMC(parseFloat(peso), parseFloat(altura));
  const rcq = calcRCQ(parseFloat(circunf.cintura), parseFloat(circunf.quadril));
  const massaGorda = pctGordura && peso ? ((parseFloat(pctGordura) / 100) * parseFloat(peso)).toFixed(1) : null;
  const massaMagra = massaGorda && peso ? (parseFloat(peso) - parseFloat(massaGorda)).toFixed(1) : null;
  const imcInfo = imcClass(imc);
  const fatInfo = pctGordura ? fatClass(pctGordura, sexo) : null;

  const fatBarPos = pctGordura ? Math.min(95, Math.max(2, (parseFloat(pctGordura) / 40) * 100)) : 0;
  const dobrasFilled = dobrasList.filter(d => dobras[d.key]).length;

  return (
    <>
      <GlobalStyles />
      <p className="page-label">Personal Tech — Avaliação Física</p>

      <div className="phone">
        {/* Header */}
        <div className="pheader">
          <div className="pheader-left">
            <div className="back">←</div>
            <div>
              <div className="pheader-title">Avaliação Física</div>
              <div className="pheader-sub">Carlos Silva • 18 Fev 2026</div>
            </div>
          </div>
          <span className="proto-badge">📐 Pollock 7</span>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {TABS.map((t, i) => (
            <button key={t} className={`tab-pill ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>
              {i === 1 ? `Dobras ${dobrasFilled > 0 ? `(${dobrasFilled}/7)` : ""}` : t}
            </button>
          ))}
        </div>

        {/* ── Tab 0: Medidas Gerais ─────────────────────────────────────── */}
        {tab === 0 && (
          <div className="pbody" key="geral">
            <div className="section-head">
              <div className="section-icon">📏</div>
              <div>
                <div className="section-title">Medidas Gerais</div>
                <div className="section-sub">Dados antropométricos básicos</div>
              </div>
            </div>

            {/* Sexo */}
            <div>
              <div className="slabel" style={{ marginBottom: 8 }}>Sexo biológico</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[["M","👨 Masculino"],["F","👩 Feminino"]].map(([v, l]) => (
                  <div key={v}
                    onClick={() => { setSexo(v); setDobras({}); }}
                    style={{ flex: 1, padding: "11px", borderRadius: 11, border: `1.5px solid ${sexo === v ? "var(--orange)" : "var(--border)"}`, background: sexo === v ? "var(--orange-dim)" : "var(--surface2)", color: sexo === v ? "var(--orange)" : "var(--muted2)", fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700, textAlign: "center", cursor: "pointer", transition: "all 0.18s" }}>
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <div className="row2">
              <div className="field"><label>Idade</label><input type="number" placeholder="Ex: 28" value={idade} onChange={e => setIdade(e.target.value)} /></div>
              <div className="field">
                <label>Data da avaliação</label>
                <input type="date" defaultValue="2026-02-18" />
              </div>
            </div>

            <div className="row2">
              <div className="field"><label>Peso (kg)</label><input type="number" inputMode="decimal" placeholder="Ex: 75.5" value={peso} onChange={e => setPeso(e.target.value)} /></div>
              <div className="field"><label>Altura (cm)</label><input type="number" inputMode="decimal" placeholder="Ex: 178" value={altura} onChange={e => setAltura(e.target.value)} /></div>
            </div>

            {/* IMC em tempo real */}
            {imc && (
              <div style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 11, padding: "11px 13px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted2)" }}>IMC calculado</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: imcInfo.color }}>{imc}</div>
                </div>
                <div style={{ padding: "6px 12px", borderRadius: 99, background: `${imcInfo.color}20`, border: `1px solid ${imcInfo.color}40`, color: imcInfo.color, fontSize: 12, fontWeight: 700, fontFamily: "Syne, sans-serif" }}>
                  {imcInfo.label}
                </div>
              </div>
            )}

            <div className="div" />

            <div className="slabel">Pressão arterial & frequência cardíaca</div>
            <div className="row2">
              <div className="field"><label>PA (mmHg)</label><input placeholder="Ex: 120/80" value={pa} onChange={e => setPa(e.target.value)} /></div>
              <div className="field"><label>FC repouso (bpm)</label><input type="number" placeholder="Ex: 72" value={fc} onChange={e => setFc(e.target.value)} /></div>
            </div>

            <div className="div" />

            {/* Fotos posturais */}
            <div className="slabel">Fotos posturais (opcional)</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {["Frontal","Lateral","Posterior"].map(v => (
                <div key={v} className="photo-zone">
                  <span style={{ fontSize: 22 }}>📷</span>
                  <p style={{ fontSize: 11 }}><strong>{v}</strong></p>
                </div>
              ))}
            </div>

            <div className="field">
              <label>Observações gerais</label>
              <textarea placeholder="Postura, tônus, aspectos visuais observados..." value={obs} onChange={e => setObs(e.target.value)} />
            </div>

            <button className="btn btn-primary" onClick={() => setTab(1)}>
              Próximo: Dobras Cutâneas →
            </button>
          </div>
        )}

        {/* ── Tab 1: Dobras Cutâneas ─────────────────────────────────────── */}
        {tab === 1 && (
          <div className="pbody" key="dobras">
            <div className="section-head">
              <div className="section-icon">📐</div>
              <div>
                <div className="section-title">Dobras Cutâneas</div>
                <div className="section-sub">Protocolo Jackson & Pollock 7 dobras</div>
              </div>
            </div>

            <div className="tip">
              <div className="tip-icon">📋</div>
              <div className="tip-text">
                <strong>Como fazer corretamente</strong>
                Sempre pelo lado direito do corpo. Pinçar com polegar e indicador, 1 cm acima do ponto. Medir 2 seg após soltar o adipômetro. Realizar 3 medidas e usar a média.
              </div>
            </div>

            {dobrasList.map(d => (
              <MedidaRow key={d.key} emoji={d.emoji} label={d.label} hint={d.hint} unit="mm"
                value={dobras[d.key] || ""} onChange={v => setDobra(d.key, v)} />
            ))}

            {/* Soma em tempo real */}
            <div style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 11, padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--muted2)" }}>Soma das 7 dobras</span>
              <span style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, color: soma7 > 0 ? "var(--orange)" : "var(--muted)" }}>
                {soma7 > 0 ? `${soma7.toFixed(0)} mm` : "—"}
              </span>
            </div>

            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => setTab(0)}>← Voltar</button>
              <button className="btn btn-primary" onClick={() => setTab(2)}>Circunferências →</button>
            </div>
          </div>
        )}

        {/* ── Tab 2: Circunferências ─────────────────────────────────────── */}
        {tab === 2 && (
          <div className="pbody" key="circ">
            <div className="section-head">
              <div className="section-icon">📏</div>
              <div>
                <div className="section-title">Circunferências</div>
                <div className="section-sub">Perímetros corporais (cm)</div>
              </div>
            </div>

            {CIRCUNFERENCIAS.map(c => (
              <MedidaRow key={c.key} emoji={c.emoji} label={c.label} hint={c.hint} unit="cm"
                value={circunf[c.key] || ""} onChange={v => setCirc(c.key, v)} />
            ))}

            {/* RCQ em tempo real */}
            {rcq && (
              <div style={{ background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 11, padding: "11px 13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted2)" }}>RCQ (Razão Cintura-Quadril)</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, color: parseFloat(rcq) > (sexo === "M" ? 0.95 : 0.86) ? "var(--red)" : "var(--green)" }}>{rcq}</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--muted2)", textAlign: "right" }}>
                  Ref: {sexo === "M" ? "≤ 0.95" : "≤ 0.86"}
                  <br /><span style={{ color: parseFloat(rcq) > (sexo === "M" ? 0.95 : 0.86) ? "var(--red)" : "var(--green)", fontWeight: 700 }}>
                    {parseFloat(rcq) > (sexo === "M" ? 0.95 : 0.86) ? "Risco elevado" : "Normal"}
                  </span>
                </div>
              </div>
            )}

            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => setTab(1)}>← Voltar</button>
              <button className="btn btn-primary" onClick={() => setTab(3)}>Ver Resultado →</button>
            </div>
          </div>
        )}

        {/* ── Tab 3: Resultado ──────────────────────────────────────────── */}
        {tab === 3 && (
          <div className="pbody" key="result">
            <div className="section-head">
              <div className="section-icon">📊</div>
              <div>
                <div className="section-title">Resultado da Avaliação</div>
                <div className="section-sub">Composição corporal calculada</div>
              </div>
            </div>

            {/* Composição corporal */}
            <div className="result-card">
              <div className="result-card-title">Composição Corporal</div>
              <div className="result-grid">
                <div className="result-item">
                  <div className="result-item-label">Peso total</div>
                  <div className="result-item-val">{peso || "—"}</div>
                  <div className="result-item-sub">kg</div>
                </div>
                <div className="result-item">
                  <div className="result-item-label">% Gordura</div>
                  <div className={`result-item-val ${pctGordura ? (fatInfo?.color === "var(--green)" ? "green" : fatInfo?.color === "var(--red)" ? "red" : "orange") : ""}`}>
                    {pctGordura ? `${pctGordura}%` : "—"}
                  </div>
                  <div className="result-item-sub">{fatInfo?.label || "preencha dobras"}</div>
                </div>
                <div className="result-item">
                  <div className="result-item-label">Massa magra</div>
                  <div className="result-item-val green">{massaMagra ? `${massaMagra}` : "—"}</div>
                  <div className="result-item-sub">kg</div>
                </div>
                <div className="result-item">
                  <div className="result-item-label">Massa gorda</div>
                  <div className="result-item-val orange">{massaGorda ? `${massaGorda}` : "—"}</div>
                  <div className="result-item-sub">kg</div>
                </div>
              </div>

              {/* Barra de gordura corporal */}
              {pctGordura && (
                <div className="fat-bar-wrap">
                  <div className="fat-bar-labels">
                    <span>Essencial</span><span>Atleta</span><span>Boa forma</span><span>Obesidade</span>
                  </div>
                  <div className="fat-bar">
                    <div className="fat-marker" style={{ left: `calc(${fatBarPos}% - 7px)` }} />
                  </div>
                  <div style={{ textAlign: "center", marginTop: 8, fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 700, color: fatInfo?.color }}>
                    {pctGordura}% — {fatInfo?.label}
                  </div>
                </div>
              )}
            </div>

            {/* IMC */}
            <div className="result-card">
              <div className="result-card-title">IMC & Pressão</div>
              <div className="result-grid">
                <div className="result-item">
                  <div className="result-item-label">IMC</div>
                  <div className="result-item-val" style={{ color: imc ? imcInfo.color : "var(--muted)" }}>{imc || "—"}</div>
                  <div className="result-item-sub">{imc ? imcInfo.label : "preencha peso/altura"}</div>
                </div>
                <div className="result-item">
                  <div className="result-item-label">RCQ</div>
                  <div className="result-item-val" style={{ color: rcq ? (parseFloat(rcq) > (sexo === "M" ? 0.95 : 0.86) ? "var(--red)" : "var(--green)") : "var(--muted)" }}>{rcq || "—"}</div>
                  <div className="result-item-sub">Risco cardiovascular</div>
                </div>
                <div className="result-item">
                  <div className="result-item-label">Pressão arterial</div>
                  <div className="result-item-val" style={{ fontSize: 15, paddingTop: 3 }}>{pa || "—"}</div>
                  <div className="result-item-sub">mmHg</div>
                </div>
                <div className="result-item">
                  <div className="result-item-label">FC repouso</div>
                  <div className="result-item-val" style={{ fontSize: 15, paddingTop: 3 }}>{fc || "—"}</div>
                  <div className="result-item-sub">bpm</div>
                </div>
              </div>
            </div>

            {/* Protocolo */}
            <div className="tip">
              <div className="tip-icon">🔬</div>
              <div className="tip-text">
                <strong>Metodologia utilizada</strong>
                % Gordura: Jackson & Pollock 7 dobras (1978/1980) + equação de Siri (1956). IMC: Quetelet. RCQ: WHO (1997). Soma de dobras: {soma7 > 0 ? `${soma7.toFixed(0)} mm` : "não calculado"}.
              </div>
            </div>

            <div className="field">
              <label>Parecer do avaliador</label>
              <textarea placeholder="Observações sobre a avaliação, recomendações, metas sugeridas..." />
            </div>

            <button className="btn btn-primary">💾 Salvar Avaliação</button>
          </div>
        )}
      </div>
    </>
  );
}
