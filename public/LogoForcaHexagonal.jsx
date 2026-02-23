import { useState } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: #080808;
      min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center;
      padding: 48px 16px 80px;
      gap: 0;
    }
    .page-title { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #444; margin-bottom: 6px; }
    .page-sub { font-size: 13px; color: #555; margin-bottom: 52px; }

    /* ── Hero showcase ── */
    .hero {
      width: 100%; max-width: 860px;
      background: radial-gradient(ellipse at 40% 30%, #1c0e00 0%, #0d0d0d 65%);
      border: 1.5px solid #1e1e1e;
      border-radius: 28px;
      padding: 60px 40px;
      display: flex; flex-direction: column;
      align-items: center; gap: 40px;
      margin-bottom: 24px;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background: repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,107,0,0.03) 40px),
                  repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,107,0,0.03) 40px);
      pointer-events: none;
    }
    .hero-sizes {
      display: flex; align-items: center; justify-content: center;
      gap: 40px; flex-wrap: wrap;
    }
    .size-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .size-label { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; color: #333; }
    .hero-hz { display: flex; flex-direction: column; align-items: center; gap: 8px; }

    /* ── Section ── */
    .section { width: 100%; max-width: 860px; margin-bottom: 24px; }
    .section-title { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #333; margin-bottom: 14px; }

    /* ── Variant cards ── */
    .variants { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
    .variant-card { border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; gap: 20px; }
    .variant-card.dark { background: #0d0d0d; border: 1.5px solid #1e1e1e; }
    .variant-card.light { background: #f0f0f0; border: 1.5px solid #e0e0e0; }
    .variant-card.orange { background: linear-gradient(135deg, #ff6b00, #ff4400); }
    .variant-card.dark-orange { background: #1a0800; border: 1.5px solid #2a1200; }
    .variant-label { font-family: 'Syne', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; }
    .variant-label.d { color: #333; }
    .variant-label.l { color: #bbb; }
    .variant-label.o { color: rgba(255,255,255,0.4); }
    .variant-label.do { color: rgba(255,107,0,0.4); }

    /* ── Usage grid ── */
    .usage-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
    .usage-card { border-radius: 16px; border: 1.5px solid #1e1e1e; background: #111; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .usage-card-label { font-size: 11px; color: #555; font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: 0.1em; }

    /* ── App icon mockup ── */
    .app-icon-wrap { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .app-icon-frame { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .app-icon-label { font-size: 11px; color: #444; font-family: 'Syne', sans-serif; font-weight: 600; }
    .iphone-icon { border-radius: 22.5%; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6); }
    .android-icon { border-radius: 50%; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.6); }

    /* ── Color palette ── */
    .palette { display: flex; gap: 10px; flex-wrap: wrap; }
    .swatch { border-radius: 12px; padding: 14px 18px; flex: 1; min-width: 100px; }
    .swatch-hex { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; margin-top: 6px; }
    .swatch-name { font-size: 10px; margin-top: 2px; opacity: 0.7; }

    /* ── Export buttons ── */
    .export-row { display: flex; gap: 10px; flex-wrap: wrap; }
    .export-btn { padding: 10px 20px; border-radius: 10px; border: 1.5px solid #2a2a2a; background: #111; color: #888; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; cursor: pointer; letter-spacing: 0.08em; transition: all 0.18s; }
    .export-btn:hover { border-color: #ff6b00; color: #ff6b00; background: rgba(255,107,0,0.06); }
    .export-btn.primary { background: #ff6b00; border-color: #ff6b00; color: #fff; box-shadow: 0 4px 16px rgba(255,107,0,0.3); }
    .export-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,0,0.4); }

    /* ── Tab bar ── */
    .tabs { display: flex; background: #111; border: 1.5px solid #1e1e1e; border-radius: 14px; padding: 4px; gap: 4px; margin-bottom: 16px; }
    .tab { flex: 1; padding: 8px; border-radius: 10px; border: none; background: transparent; color: #555; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.2s; letter-spacing: 0.06em; }
    .tab.active { background: #ff6b00; color: #fff; box-shadow: 0 2px 12px rgba(255,107,0,0.35); }

    /* ── Toast ── */
    .toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(80px); background: #1e1e1e; border: 1.5px solid #ff6b00; color: #f0f0f0; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; padding: 10px 20px; border-radius: 99px; white-space: nowrap; z-index: 999; transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1); box-shadow: 0 8px 28px rgba(0,0,0,0.4); }
    .toast.show { transform: translateX(-50%) translateY(0); }
  `}</style>
);

// ── Defs compartilhadas ───────────────────────────────────────────────────────
const Defs = ({ id = "main" }) => (
  <defs>
    <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ff8800"/>
      <stop offset="100%" stopColor="#ff3300"/>
    </linearGradient>
    <linearGradient id={`grad-fill-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ff8800" stopOpacity="0.12"/>
      <stop offset="100%" stopColor="#ff3300" stopOpacity="0.04"/>
    </linearGradient>
    <filter id={`glow-${id}`}>
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id={`glow-lg-${id}`}>
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
);

// ── Símbolo hexagonal — o núcleo do logo ─────────────────────────────────────
// cx/cy = centro, r = raio hexágono, id = defs prefix
function HexIcon({ cx = 60, cy = 60, r = 56, id = "main", bgFill = "#111", strokeOpacity = 0.3 }) {
  // Pontos do hexágono flat-top
  const hex = (rx, ry = rx) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + rx * Math.cos(a)},${cy + ry * Math.sin(a)}`;
    }).join(" ");

  const W = cx * 2;
  const barY = cy + r * 0.18;
  const barH = r * 0.08;
  const barW = r * 0.78;
  const barX = cx - barW / 2;

  // Pesos
  const wW = r * 0.18, wH = r * 0.46, wR = r * 0.08;
  const innerW = r * 0.09, innerH = r * 0.56;
  const leftX = cx - barW / 2 - wW;
  const rightX = cx + barW / 2;
  const weightsY = cy - wH / 2 - barH / 2 + r * 0.04;

  return (
    <>
      {/* Hexágono externo */}
      <polygon points={hex(r)} fill={bgFill}/>
      <polygon points={hex(r)} fill={`url(#grad-fill-${id})`}/>
      {/* Borda */}
      <polygon points={hex(r)} fill="none"
        stroke={`url(#grad-${id})`} strokeWidth={r * 0.04} strokeOpacity={strokeOpacity}/>
      {/* Hexágono interno sutil */}
      <polygon points={hex(r * 0.78)} fill="none"
        stroke={`url(#grad-${id})`} strokeWidth={r * 0.02} strokeOpacity="0.08"/>

      {/* Barra */}
      <rect x={barX} y={barY - barH / 2} width={barW} height={barH}
        rx={barH / 2} fill={`url(#grad-${id})`} filter={`url(#glow-${id})`}/>

      {/* Peso esquerdo — bloco externo */}
      <rect x={leftX} y={weightsY} width={wW} height={wH}
        rx={wR} fill={`url(#grad-${id})`} opacity="0.85"/>
      {/* Peso esquerdo — plaquinha interna */}
      <rect x={leftX + wW * 0.25} y={weightsY - innerH * 0.04} width={innerW} height={innerH}
        rx={wR * 0.7} fill={`url(#grad-${id})`}/>

      {/* Peso direito — bloco externo */}
      <rect x={rightX} y={weightsY} width={wW} height={wH}
        rx={wR} fill={`url(#grad-${id})`} opacity="0.85"/>
      {/* Peso direito — plaquinha interna */}
      <rect x={rightX + wW * 0.66} y={weightsY - innerH * 0.04} width={innerW} height={innerH}
        rx={wR * 0.7} fill={`url(#grad-${id})`}/>
    </>
  );
}

// ── Ícone quadrado (para app icon) ───────────────────────────────────────────
function SquareIcon({ size = 120, radius = 26, bg = "#111", id = "sq" }) {
  const half = size / 2;
  const hexR = size * 0.44;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Defs id={id}/>
      <rect width={size} height={size} rx={radius} fill={bg}/>
      <rect width={size} height={size} rx={radius} fill={`url(#grad-fill-${id})`}/>
      <HexIcon cx={half} cy={half} r={hexR} id={id} bgFill="none" strokeOpacity={0.35}/>
    </svg>
  );
}

// ── Logo standalone circular ──────────────────────────────────────────────────
function CircleIcon({ size = 120, id = "ci" }) {
  const half = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Defs id={id}/>
      <HexIcon cx={half} cy={half} r={half * 0.94} id={id} bgFill="#111" strokeOpacity={0.32}/>
    </svg>
  );
}

// ── Logo horizontal ───────────────────────────────────────────────────────────
function HzLogo({ iconSize = 52, textColor = "#f0f0f0", subColor = "#ff6b00", id = "hz", bg = "transparent" }) {
  const half = iconSize / 2;
  const totalW = iconSize + 16 + 160;
  const totalH = iconSize + 8;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} fill="none">
      <Defs id={id}/>
      {bg !== "transparent" && <rect width={totalW} height={totalH} rx="12" fill={bg}/>}
      <g transform={`translate(0, 4)`}>
        <HexIcon cx={half} cy={half} r={half * 0.94} id={id} bgFill={bg === "transparent" ? "#111" : "rgba(0,0,0,0.15)"} strokeOpacity={0.3}/>
      </g>
      {/* Separador */}
      <rect x={iconSize + 14} y={12} width={1.5} height={iconSize - 16} rx={0.75} fill={bg === "transparent" ? "#222" : "rgba(255,255,255,0.15)"}/>
      {/* Nome */}
      <text x={iconSize + 26} y={28} fontFamily="'Syne', sans-serif" fontSize={18} fontWeight={800} fill={textColor}>Personal</text>
      <text x={iconSize + 26} y={50} fontFamily="'Syne', sans-serif" fontSize={18} fontWeight={800} fill={subColor}>Tech</text>
    </svg>
  );
}

// ── Logo compacto (só PT) ─────────────────────────────────────────────────────
function CompactLogo({ size = 52, id = "cpt", showText = true, textColor = "#f0f0f0" }) {
  const half = size / 2;
  const W = showText ? size + 52 : size;
  return (
    <svg width={W} height={size + 8} viewBox={`0 0 ${W} ${size + 8}`} fill="none">
      <Defs id={id}/>
      <g transform="translate(0, 4)">
        <HexIcon cx={half} cy={half} r={half * 0.94} id={id} bgFill="#111" strokeOpacity={0.3}/>
      </g>
      {showText && (
        <text x={size + 10} y={(size + 8) / 2 + 6}
          fontFamily="'Syne', sans-serif" fontSize={22} fontWeight={800}
          fill={textColor} letterSpacing={-0.5}>PT</text>
      )}
    </svg>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LogoForcaHexagonal() {
  const [tab, setTab] = useState("variantes");
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <>
      <GlobalStyles />
      <p className="page-title">Personal Tech — Logo</p>
      <p className="page-sub">Opção 2 · Força Hexagonal</p>

      {/* ── Hero ── */}
      <div className="hero">
        {/* Tamanhos do ícone */}
        <div className="hero-sizes">
          {[160, 96, 64, 40, 24].map(s => (
            <div className="size-item" key={s}>
              <CircleIcon size={s} id={`hero-${s}`} />
              <div className="size-label">{s}px</div>
            </div>
          ))}
        </div>

        {/* Horizontal principal */}
        <div className="hero-hz">
          <HzLogo iconSize={56} id="hero-hz" />
          <div style={{ fontSize: 10, color: "#2a2a2a", fontFamily: "Syne, sans-serif", fontWeight: 700, letterSpacing: "0.15em", marginTop: 4 }}>VERSÃO HORIZONTAL</div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="section">
        <div className="tabs">
          {["variantes","aplicações","paleta"].map(t => (
            <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Variantes ── */}
        {tab === "variantes" && (
          <>
            <div className="section-title">Variantes de cor</div>
            <div className="variants">

              {/* Dark */}
              <div className="variant-card dark">
                <div className="variant-label d">DARK · Principal</div>
                <HzLogo iconSize={48} textColor="#f0f0f0" subColor="#ff6b00" id="v-dark"/>
                <CircleIcon size={56} id="v-dark-ico"/>
              </div>

              {/* Light */}
              <div className="variant-card light">
                <div className="variant-label l">LIGHT · Fundo claro</div>
                <svg width="220" height="60" viewBox="0 0 220 60" fill="none">
                  <Defs id="v-light"/>
                  <g transform="translate(0, 4)">
                    <HexIcon cx={26} cy={26} r={24.5} id="v-light" bgFill="#e8e8e8" strokeOpacity={0.35}/>
                  </g>
                  <rect x={66} y={12} width={1.5} height={36} rx={0.75} fill="#ccc"/>
                  <text x={76} y={28} fontFamily="'Syne', sans-serif" fontSize={18} fontWeight={800} fill="#111">Personal</text>
                  <text x={76} y={49} fontFamily="'Syne', sans-serif" fontSize={18} fontWeight={800} fill="#ff5500">Tech</text>
                </svg>
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <Defs id="v-light-ico"/>
                  <HexIcon cx={28} cy={28} r={26.5} id="v-light-ico" bgFill="#e8e8e8" strokeOpacity={0.35}/>
                </svg>
              </div>

              {/* Brand orange */}
              <div className="variant-card orange">
                <div className="variant-label o">BRAND · Laranja sólido</div>
                <svg width="220" height="60" viewBox="0 0 220 60" fill="none">
                  <defs>
                    <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                      <stop offset="100%" stopColor="rgba(255,255,255,0.7)"/>
                    </linearGradient>
                    <linearGradient id="wgf" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
                      <stop offset="100%" stopColor="rgba(255,255,255,0.05)"/>
                    </linearGradient>
                    <filter id="wglow"><feGaussianBlur stdDeviation="2"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  </defs>
                  <g transform="translate(0, 4)">
                    <polygon points="26,2.5 47.5,14.5 47.5,38.5 26,50.5 4.5,38.5 4.5,14.5" fill="rgba(0,0,0,0.15)"/>
                    <polygon points="26,2.5 47.5,14.5 47.5,38.5 26,50.5 4.5,38.5 4.5,14.5" fill="url(#wgf)"/>
                    <polygon points="26,2.5 47.5,14.5 47.5,38.5 26,50.5 4.5,38.5 4.5,14.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <rect x={7} y={27} width={38} height={4} rx={2} fill="url(#wg)" filter="url(#wglow)"/>
                    <rect x={2.5} y={19} width={9} height={23} rx={2} fill="url(#wg)" opacity="0.85"/>
                    <rect x={5} y={17} width={5} height={27} rx={1.5} fill="url(#wg)"/>
                    <rect x={40.5} y={19} width={9} height={23} rx={2} fill="url(#wg)" opacity="0.85"/>
                    <rect x={42} y={17} width={5} height={27} rx={1.5} fill="url(#wg)"/>
                  </g>
                  <rect x={64} y={12} width={1.5} height={36} rx={0.75} fill="rgba(255,255,255,0.2)"/>
                  <text x={74} y={28} fontFamily="'Syne', sans-serif" fontSize={18} fontWeight={800} fill="rgba(255,255,255,0.9)">Personal</text>
                  <text x={74} y={49} fontFamily="'Syne', sans-serif" fontSize={18} fontWeight={800} fill="#fff">Tech</text>
                </svg>
              </div>

              {/* Dark orange bg */}
              <div className="variant-card dark-orange">
                <div className="variant-label do">DARK ORANGE · Fundo quente</div>
                <HzLogo iconSize={48} textColor="#f0f0f0" subColor="#ff8800" id="v-do" bg="transparent"/>
                <CircleIcon size={56} id="v-do-ico"/>
              </div>

            </div>
          </>
        )}

        {/* ── Aplicações ── */}
        {tab === "aplicações" && (
          <>
            <div className="section-title">Ícone de app</div>
            <div className="app-icon-wrap">
              {[
                { label: "iOS", cls: "iphone-icon", size: 120, radius: 26, bg: "#111" },
                { label: "iOS grande", cls: "iphone-icon", size: 180, radius: 38, bg: "#111" },
                { label: "Android", cls: "android-icon", size: 108, radius: 54, bg: "#111" },
              ].map(({ label, cls, size, radius, bg }) => (
                <div className="app-icon-frame" key={label}>
                  <div className={cls}>
                    <SquareIcon size={size} radius={radius} bg={bg} id={`app-${label}`}/>
                  </div>
                  <div className="app-icon-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="section-title" style={{ marginTop: 32 }}>Usos contextuais</div>
            <div className="usage-grid">

              {/* Navbar */}
              <div className="usage-card">
                <div className="usage-card-label">NAVBAR</div>
                <div style={{ background: "#161616", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
                  <CircleIcon size={28} id="nav-ico"/>
                  <span style={{ fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 800, color: "#f0f0f0" }}>
                    Personal<span style={{ color: "#ff6b00" }}>Tech</span>
                  </span>
                </div>
              </div>

              {/* Avatar / badge */}
              <div className="usage-card">
                <div className="usage-card-label">AVATAR</div>
                <SquareIcon size={64} radius={16} bg="#111" id="av-ico"/>
              </div>

              {/* Splash */}
              <div className="usage-card" style={{ background: "radial-gradient(ellipse at 50% 30%, #1c0e00, #0a0a0a)" }}>
                <div className="usage-card-label">SPLASH</div>
                <CircleIcon size={60} id="sp-ico"/>
                <span style={{ fontFamily: "Syne, sans-serif", fontSize: 11, fontWeight: 700, color: "#ff6b00", letterSpacing: "0.15em" }}>PERSONAL TECH</span>
              </div>

              {/* Badge pequeno */}
              <div className="usage-card">
                <div className="usage-card-label">FAVICON / 16px</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <CircleIcon size={16} id="fav16"/>
                  <CircleIcon size={32} id="fav32"/>
                  <CircleIcon size={48} id="fav48"/>
                </div>
              </div>

            </div>

            {/* Versão compacta */}
            <div className="section-title" style={{ marginTop: 28 }}>Versões compactas</div>
            <div style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: "24px", display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
              <CompactLogo size={48} id="cp1" showText={true} textColor="#f0f0f0"/>
              <CompactLogo size={36} id="cp2" showText={true} textColor="#f0f0f0"/>
              <CompactLogo size={28} id="cp3" showText={false}/>
              <CompactLogo size={20} id="cp4" showText={false}/>
            </div>
          </>
        )}

        {/* ── Paleta ── */}
        {tab === "paleta" && (
          <>
            <div className="section-title">Paleta de cores</div>
            <div className="palette">
              {[
                { hex: "#FF6B00", name: "Brand Orange", text: "#fff" },
                { hex: "#FF8800", name: "Warm Orange", text: "#fff" },
                { hex: "#FF3300", name: "Deep Fire",   text: "#fff" },
                { hex: "#111111", name: "Dark Base",   text: "#666" },
                { hex: "#1E1E1E", name: "Surface",     text: "#555" },
              ].map(c => (
                <div key={c.hex} className="swatch" style={{ background: c.hex }}>
                  <div className="swatch-hex" style={{ color: c.text, fontFamily: "Syne, sans-serif" }}>{c.hex}</div>
                  <div className="swatch-name" style={{ color: c.text }}>{c.name}</div>
                </div>
              ))}
            </div>

            <div className="section-title" style={{ marginTop: 28 }}>Tipografia do logo</div>
            <div style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { text: "Personal Tech", size: 32, weight: 800 },
                { text: "Personal Tech", size: 22, weight: 800 },
                { text: "PERSONAL TECH", size: 12, weight: 700, spacing: "0.2em" },
              ].map((t, i) => (
                <div key={i} style={{ fontFamily: "Syne, sans-serif", fontSize: t.size, fontWeight: t.weight, color: "#f0f0f0", letterSpacing: t.spacing || "normal", lineHeight: 1.1 }}>
                  {t.text.split(" ").map((w, j) => (
                    <span key={j} style={{ color: j === 1 ? "#ff6b00" : "#f0f0f0" }}>{w}{j === 0 ? " " : ""}</span>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: 4, fontSize: 11, color: "#444", fontFamily: "DM Sans, sans-serif" }}>
                Fonte: <span style={{ color: "#ff6b00", fontWeight: 700 }}>Syne Bold 800</span> — Google Fonts (open source)
              </div>
            </div>

            <div className="section-title" style={{ marginTop: 28 }}>Conceito & Semântica</div>
            <div style={{ background: "#111", border: "1.5px solid #1e1e1e", borderRadius: 16, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["🔶 Hexágono", "Forma mais eficiente da natureza (colmeia). Remete a estrutura, robustez e precisão."],
                ["🏋️ Haltere", "Símbolo universal de treinamento físico. Reconhecível em qualquer tamanho."],
                ["🔥 Gradiente quente", "Do laranja ao vermelho — energia, fogo, intensidade, movimento."],
                ["⬡ Borda dupla", "Hexágono interno sutil que cria profundidade e sofisticação sem poluir."],
              ].map(([t, d]) => (
                <div key={t} style={{ display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 13, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#ff6b00", whiteSpace: "nowrap" }}>{t}</div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Export ── */}
      <div className="section">
        <div className="section-title">Exportar</div>
        <div className="export-row">
          <button className="export-btn primary" onClick={showToast}>⬇ Copiar SVG</button>
          <button className="export-btn" onClick={showToast}>PNG 512×512</button>
          <button className="export-btn" onClick={showToast}>PNG 1024×1024</button>
          <button className="export-btn" onClick={showToast}>Favicon .ico</button>
        </div>
      </div>

      <div className={`toast ${toast ? "show" : ""}`}>
        ✓ Pronto! Integre o SVG diretamente no seu projeto React
      </div>
    </>
  );
}
