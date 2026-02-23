import { useState } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0e0e0e; --s1: #141414; --s2: #1a1a1a; --s3: #222;
      --border: #272727; --border2: #2e2e2e;
      --orange: #ff6b00; --orange2: #ff8800; --orange3: #ff3300;
      --odim: rgba(255,107,0,0.1); --oglow: rgba(255,107,0,0.25);
      --text: #f0f0f0; --muted: #555; --muted2: #888;
      --green: #22c55e; --gdim: rgba(34,197,94,0.1);
      --red: #ef4444; --rdim: rgba(239,68,68,0.1);
    }
    body {
      font-family: 'DM Sans', sans-serif;
      background: #080808;
      min-height: 100vh;
      display: flex; align-items: flex-start; justify-content: center;
      padding: 32px 16px 80px;
    }
    .phone {
      width: min(390px, 100%);
      background: var(--bg);
      border-radius: 40px;
      overflow: hidden;
      box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 0 1px #1e1e1e;
      display: flex; flex-direction: column;
    }
    .pane {
      height: 700px;
      overflow-y: auto; overflow-x: hidden;
      scroll-behavior: smooth; padding-bottom: 16px;
    }
    .pane::-webkit-scrollbar { width: 2px; }
    .pane::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }

    /* topbar */
    .topbar {
      background: var(--s1); border-bottom: 1px solid var(--border);
      padding: 14px 18px;
      display: flex; align-items: center; gap: 12px;
    }
    .back-btn {
      width: 30px; height: 30px; border-radius: 9px;
      background: var(--s2); border: 1px solid var(--border2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; font-size: 14px; color: var(--muted2); flex-shrink: 0;
    }
    .topbar-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:800; color:var(--text); flex:1; }
    .topbar-action {
      padding: 7px 14px; border-radius: 99px;
      border: 1.5px solid var(--border2); background: var(--s2);
      font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
      color: var(--orange); cursor: pointer; transition: all 0.2s; white-space:nowrap;
    }
    .topbar-action:hover { border-color:var(--orange); background:var(--odim); }
    .topbar-action.saved { color:var(--green); border-color:var(--green); background:var(--gdim); }

    /* hero */
    .hero {
      background: var(--s1); padding: 20px 20px 0;
      border-bottom: 1px solid var(--border);
      position: relative; overflow: hidden;
    }
    .hero::before {
      content:''; position:absolute; inset:0;
      background: radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.11) 0%, transparent 65%);
      pointer-events:none;
    }
    .hero::after {
      content:''; position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(255,107,0,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,107,0,0.025) 1px, transparent 1px);
      background-size: 28px 28px; pointer-events:none;
    }
    .hero-inner { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:12px; }
    .avatar-ring {
      width:80px; height:80px; border-radius:50%;
      background: linear-gradient(135deg, var(--orange), var(--orange3));
      padding:3px; cursor:pointer;
      box-shadow: 0 6px 24px var(--oglow); transition: box-shadow 0.3s;
    }
    .avatar-ring:hover { box-shadow: 0 10px 36px var(--oglow); }
    .avatar-inner {
      width:100%; height:100%; border-radius:50%;
      background:#2a2a2a; border:3px solid var(--bg);
      display:flex; align-items:center; justify-content:center;
      font-size:32px; position:relative; overflow:hidden;
    }
    .avatar-cam {
      position:absolute; inset:0; border-radius:50%;
      background:rgba(0,0,0,0.6);
      display:flex; align-items:center; justify-content:center;
      opacity:0; transition:opacity 0.2s; font-size:18px;
    }
    .avatar-ring:hover .avatar-cam { opacity:1; }
    .hero-name { font-family:'Syne',sans-serif; font-size:19px; font-weight:800; color:var(--text); }
    .hero-sub  { font-size:12px; color:var(--muted2); margin-top:-6px; }
    .cref-badge {
      display:flex; align-items:center; gap:6px;
      padding:5px 12px; border-radius:99px;
      background:var(--odim); border:1.5px solid rgba(255,107,0,0.25);
      font-family:'Syne',sans-serif; font-size:11px; font-weight:700; color:var(--orange);
    }
    .stats-strip {
      display:grid; grid-template-columns:1fr 1fr 1fr;
      margin: 16px 0 0; border-radius:14px 14px 0 0;
      background:var(--s2); border:1.5px solid var(--border); border-bottom:none;
    }
    .stat-cell { padding:12px 8px; text-align:center; border-right:1px solid var(--border); }
    .stat-cell:last-child { border-right:none; }
    .stat-val  { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:var(--text); }
    .stat-lbl  { font-size:9px; color:var(--muted); margin-top:2px; }

    /* topics menu */
    .topics { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .topic-card {
      display:flex; align-items:center; justify-content:space-between;
      padding:14px 16px; background:var(--s2);
      border-radius:14px; border:1.5px solid var(--border2);
      cursor:pointer; transition:all 0.2s;
    }
    .topic-card:hover { border-color:rgba(255,107,0,0.35); background:#1e1508; }
    .topic-card.danger:hover { border-color:rgba(239,68,68,0.35); background:var(--rdim); }
    .topic-left { display:flex; align-items:center; gap:12px; }
    .topic-icon {
      width:38px; height:38px; border-radius:12px;
      background:var(--odim); border:1px solid rgba(255,107,0,0.2);
      display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;
    }
    .topic-icon.green { background:rgba(34,197,94,0.08); border-color:rgba(34,197,94,0.2); }
    .topic-icon.red   { background:var(--rdim); border-color:rgba(239,68,68,0.2); }
    .topic-text strong { display:block; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:var(--text); }
    .topic-text span   { font-size:11px; color:var(--muted2); }
    .topic-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    .topic-badge {
      padding:3px 9px; border-radius:99px;
      font-family:'Syne',sans-serif; font-size:10px; font-weight:700;
      background:var(--gdim); color:var(--green); border:1px solid rgba(34,197,94,0.2);
    }
    .topic-badge.warn { background:var(--rdim); color:var(--red); border-color:rgba(239,68,68,0.2); }

    /* sec body */
    .sec-body { padding:18px; display:flex; flex-direction:column; gap:12px; animation: fadeUp 0.3s ease both; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

    /* fields */
    .field { display:flex; flex-direction:column; gap:5px; }
    .field label { font-size:11px; font-weight:500; color:var(--muted2); padding-left:2px; }
    .field input, .field select, .field textarea {
      background:var(--s2); border:1.5px solid var(--border2);
      border-radius:11px; padding:11px 14px;
      color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px;
      outline:none; width:100%; transition:border-color 0.2s, box-shadow 0.2s;
      -webkit-appearance:none;
    }
    .field input:focus, .field select:focus, .field textarea:focus {
      border-color:var(--orange); box-shadow:0 0 0 3px var(--odim);
    }
    .field textarea { resize:none; height:72px; }
    .field select option { background:#1e1e1e; }
    .row2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }

    /* chips */
    .chips { display:flex; flex-wrap:wrap; gap:7px; }
    .chip {
      padding:6px 13px; border-radius:99px; border:1.5px solid var(--border2);
      background:var(--s2); color:var(--muted2); font-size:12px; font-weight:500;
      cursor:pointer; transition:all 0.18s;
    }
    .chip.active { border-color:var(--orange); background:var(--odim); color:var(--orange); }

    /* days */
    .days-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:5px; }
    .day-btn {
      padding:9px 2px; border-radius:10px; border:1.5px solid var(--border2);
      background:var(--s2); color:var(--muted); font-size:11px; font-weight:700;
      cursor:pointer; text-align:center; transition:all 0.18s; font-family:'Syne',sans-serif;
    }
    .day-btn.active { border-color:var(--orange); background:var(--odim); color:var(--orange); }

    /* time */
    .time-row { display:flex; align-items:center; gap:10px; }
    .time-sep  { font-size:12px; color:var(--muted); flex-shrink:0; }
    .time-input {
      flex:1; background:var(--s2); border:1.5px solid var(--border2);
      border-radius:10px; padding:10px 12px; color:var(--text);
      font-family:'Syne',sans-serif; font-size:14px; font-weight:700;
      outline:none; transition:border-color 0.2s; text-align:center; -webkit-appearance:none;
    }
    .time-input:focus { border-color:var(--orange); }

    /* toggle */
    .toggle-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:12px 14px; background:var(--s2); border-radius:12px;
      border:1.5px solid var(--border2); cursor:pointer; transition:border-color 0.2s;
    }
    .toggle-row:hover { border-color:var(--border); }
    .toggle-left  { display:flex; align-items:center; gap:10px; }
    .toggle-text strong { display:block; font-size:13px; font-weight:600; color:var(--text); }
    .toggle-text span   { font-size:11px; color:var(--muted2); }
    .sw { width:42px; height:24px; border-radius:99px; transition:background 0.25s; flex-shrink:0; position:relative; }
    .sw.on  { background:var(--orange); }
    .sw.off { background:var(--border2); }
    .sw-thumb {
      position:absolute; top:3px; width:18px; height:18px;
      border-radius:50%; background:#fff;
      box-shadow:0 1px 4px rgba(0,0,0,0.35);
      transition:left 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }
    .sw.on  .sw-thumb { left:21px; }
    .sw.off .sw-thumb { left:3px;  }

    /* fat */
    .fat-card { background:var(--s2); border:1.5px solid var(--border2); border-radius:14px; padding:16px; }
    .fat-val  { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:var(--text); margin:4px 0 12px; }
    .fat-badge-up { padding:4px 10px; border-radius:99px; font-family:'Syne',sans-serif; font-size:10px; font-weight:700; background:var(--gdim); color:var(--green); border:1px solid rgba(34,197,94,0.25); }
    .mini-chart { display:flex; align-items:flex-end; gap:5px; height:40px; margin-top:12px; }
    .mbar { flex:1; border-radius:4px 4px 0 0; min-height:4px; }
    .fat-row {
      display:flex; align-items:center; justify-content:space-between;
      padding:11px 14px; background:var(--s2); border-radius:11px;
      border:1.5px solid var(--border2);
    }
    .fat-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-right:10px; }

    /* menu items */
    .menu-item {
      display:flex; align-items:center; justify-content:space-between;
      padding:14px; background:var(--s2); border-radius:12px;
      border:1.5px solid var(--border2); cursor:pointer; transition:all 0.18s;
    }
    .menu-item:hover { border-color:var(--border); }
    .menu-item.red:hover { border-color:rgba(239,68,68,0.4); background:var(--rdim); }
    .menu-left { display:flex; align-items:center; gap:12px; }
    .menu-icon {
      width:34px; height:34px; border-radius:10px;
      background:var(--s3); border:1px solid var(--border2);
      display:flex; align-items:center; justify-content:center; font-size:16px;
    }
    .menu-icon.orange { background:var(--odim); border-color:rgba(255,107,0,0.2); }
    .menu-icon.red    { background:var(--rdim); border-color:rgba(239,68,68,0.15); }
    .menu-text strong { display:block; font-size:13px; font-weight:600; color:var(--text); }
    .menu-text span   { font-size:11px; color:var(--muted2); }

    /* plan */
    .plan-card {
      background:linear-gradient(135deg,#1a0800,#220e00);
      border:1.5px solid rgba(255,107,0,0.2); border-radius:14px;
      padding:16px; display:flex; align-items:center; justify-content:space-between;
    }
    .plan-info strong { display:block; font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:var(--text); }
    .plan-info span   { font-size:11px; color:var(--muted2); }
    .plan-btn {
      padding:8px 16px; border-radius:99px; background:var(--orange);
      border:none; color:#fff; font-family:'Syne',sans-serif; font-size:11px;
      font-weight:700; cursor:pointer; box-shadow:0 4px 14px var(--oglow); transition:all 0.18s;
    }
    .plan-btn:hover { transform:translateY(-1px); }

    /* slabel */
    .slabel { font-family:'Syne',sans-serif; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }

    /* kpi grid */
    .kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .kpi-card { background:var(--s2); border:1.5px solid var(--border2); border-radius:12px; padding:12px 14px; }
    .kpi-lbl  { font-size:10px; color:var(--muted2); }
    .kpi-val  { font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:var(--orange); margin:4px 0 2px; }
    .kpi-sub  { font-size:10px; color:var(--muted); }

    /* bottom nav */
    .bottom-nav {
      height:68px; background:var(--s1); border-top:1px solid var(--border);
      display:flex; align-items:center; justify-content:space-around; padding:0 8px;
    }
    .nav-item { display:flex; flex-direction:column; align-items:center; gap:4px; color:var(--muted); font-size:10px; cursor:pointer; flex:1; font-family:'Syne',sans-serif; font-weight:600; }
    .nav-item.active { color:var(--orange); }
    .nav-icon { font-size:20px; }
    .fab { width:52px; height:52px; border-radius:50%; background:linear-gradient(135deg,var(--orange2),var(--orange3)); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:24px; color:#fff; box-shadow:0 6px 24px var(--oglow); }
  `}</style>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const ESPECIALIDADES = ["Musculação","Pilates","Funcional","HIIT","Mobilidade","Cardio","Emagrecimento","Reabilitação","Idosos","Esportivo"];
const DIAS  = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
const BARS  = [38,52,44,68,58,72,61];
const NOTIF = [
  {emoji:"⚠️",label:"Plano vencendo",       sub:"3 dias antes do vencimento",   key:"planoVencendo"},
  {emoji:"📋",label:"Série de treino",       sub:"Quando vence amanhã",          key:"serieVencendo"},
  {emoji:"📅",label:"Reagendamentos",        sub:"Quando aluno solicita",         key:"reagendamento"},
  {emoji:"💤",label:"Aluno inativo",         sub:"Após 30 dias sem treinar",      key:"alunoInativo"},
  {emoji:"📊",label:"Resumo diário",         sub:"Todo dia às 20h",              key:"resumoDiario"},
  {emoji:"💰",label:"Pagamento confirmado",  sub:"Quando recebido",              key:"pagamento"},
  {emoji:"🎂",label:"Aniversário de aluno",  sub:"No dia do aniversário",        key:"aniversario"},
  {emoji:"🔔",label:"Lembrete de sessão",    sub:"30 min antes do atendimento",  key:"lembrete"},
];

// ─── Shared: Switch ───────────────────────────────────────────────────────────
function Sw({ on, onClick }) {
  return (
    <div className={`sw ${on?"on":"off"}`} onClick={e=>{e.stopPropagation();onClick();}}>
      <div className="sw-thumb"/>
    </div>
  );
}

// ─── Shared: Save hook ────────────────────────────────────────────────────────
function useSave() {
  const [state, setState] = useState("idle");
  const save = () => {
    setState("saving");
    setTimeout(()=>{setState("saved");setTimeout(()=>setState("idle"),1800);},900);
  };
  return { save, label: state==="saving"?"Salvando…":state==="saved"?"✓ Salvo!":"Salvar", cls: state==="saved"?"saved":"" };
}

// ─── TELA MENU ────────────────────────────────────────────────────────────────
function TelaMenu({ onNav }) {
  return (
    <div className="pane">
      <div className="hero">
        <div className="hero-inner">
          <div className="avatar-ring">
            <div className="avatar-inner">💪<div className="avatar-cam">📷</div></div>
          </div>
          <div style={{textAlign:"center"}}>
            <div className="hero-name">Coach Silva</div>
            <div className="hero-sub">Personal Trainer · São Paulo, SP</div>
          </div>
          <div className="cref-badge"><span>✅</span><span>CREF 012345-G/SP</span></div>
          <div className="stats-strip">
            <div className="stat-cell"><div className="stat-val">04</div><div className="stat-lbl">Alunos ativos</div></div>
            <div className="stat-cell"><div className="stat-val">128</div><div className="stat-lbl">Treinos criados</div></div>
            <div className="stat-cell"><div className="stat-val">32</div><div className="stat-lbl">Avaliações</div></div>
          </div>
        </div>
      </div>

      <div className="topics">
        {[
          {id:"dados",    icon:"👤",  cls:"",      title:"Dados Profissionais",   sub:"Nome, CREF, bio, especialidades"},
          {id:"horarios", icon:"🗓️", cls:"",      title:"Horários & Atendimento",sub:"Dias, turnos, valor da sessão"},
          {id:"fat",      icon:"💰",  cls:"green", title:"Faturamento",           sub:"Receita mensal e indicadores",   badge:"R$ 9.800", badgeCls:""},
          {id:"notif",    icon:"🔔",  cls:"",      title:"Notificações",          sub:"O que e quando ser avisado",     badge:"2 desativ.", badgeCls:"warn"},
          {id:"conta",    icon:"🔐",  cls:"",      title:"Conta & Segurança",     sub:"Senha, 2FA, plano, LGPD"},
        ].map(t=>(
          <div key={t.id} className="topic-card" onClick={()=>onNav(t.id)}>
            <div className="topic-left">
              <div className={`topic-icon ${t.cls}`}>{t.icon}</div>
              <div className="topic-text"><strong>{t.title}</strong><span>{t.sub}</span></div>
            </div>
            <div className="topic-right">
              {t.badge && <div className={`topic-badge ${t.badgeCls||""}`}>{t.badge}</div>}
              <span style={{fontSize:18,color:"var(--muted)"}}>›</span>
            </div>
          </div>
        ))}

        <div className="topic-card danger" onClick={()=>{}} style={{borderColor:"rgba(239,68,68,0.2)",background:"rgba(239,68,68,0.04)"}}>
          <div className="topic-left">
            <div className="topic-icon red">🚪</div>
            <div className="topic-text">
              <strong style={{color:"var(--red)"}}>Sair da conta</strong>
              <span>Encerrar sessão atual</span>
            </div>
          </div>
          <span style={{fontSize:18,color:"var(--red)"}}>›</span>
        </div>

        <div style={{textAlign:"center",fontSize:11,color:"var(--muted)",paddingTop:2}}>
          Personal Tech v1.0.0 · <span style={{color:"var(--orange)"}}>Termos</span> · <span style={{color:"var(--orange)"}}>Privacidade</span>
        </div>
      </div>
    </div>
  );
}

// ─── TELA DADOS ───────────────────────────────────────────────────────────────
function TelaDados({ onBack }) {
  const [nome,  setNome]  = useState("Coach Silva");
  const [cref,  setCref]  = useState("012345-G/SP");
  const [tel,   setTel]   = useState("(11) 99999-0000");
  const [email, setEmail] = useState("coach@personaltech.app");
  const [bio,   setBio]   = useState("Personal trainer há 8 anos, especializado em hipertrofia e reabilitação funcional.");
  const [esp,   setEsp]   = useState(["Musculação","Funcional","Reabilitação"]);
  const { save, label, cls } = useSave();
  const toggle = e => setEsp(p=>p.includes(e)?p.filter(x=>x!==e):[...p,e]);

  return (
    <>
      <div className="topbar">
        <div className="back-btn" onClick={onBack}>←</div>
        <span className="topbar-title">Dados Profissionais</span>
        <button className={`topbar-action ${cls}`} onClick={save}>{label}</button>
      </div>
      <div className="pane">
        <div className="sec-body">
          <div style={{display:"flex",justifyContent:"center",padding:"4px 0 8px"}}>
            <div className="avatar-ring" style={{width:72,height:72}}>
              <div className="avatar-inner" style={{fontSize:28}}>💪<div className="avatar-cam">📷</div></div>
            </div>
          </div>
          <div className="row2">
            <div className="field"><label>Nome completo</label><input value={nome} onChange={e=>setNome(e.target.value)}/></div>
            <div className="field"><label>CREF</label><input value={cref} onChange={e=>setCref(e.target.value)}/></div>
          </div>
          <div className="row2">
            <div className="field"><label>E-mail</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
            <div className="field"><label>WhatsApp</label><input value={tel} onChange={e=>setTel(e.target.value)}/></div>
          </div>
          <div className="field">
            <label>Cidade / Estado</label>
            <select><option>São Paulo, SP</option><option>Rio de Janeiro, RJ</option><option>Outra</option></select>
          </div>
          <div className="field"><label>Bio profissional</label><textarea value={bio} onChange={e=>setBio(e.target.value)}/></div>
          <div className="field">
            <label>Especialidades</label>
            <div className="chips" style={{marginTop:4}}>
              {ESPECIALIDADES.map(e=>(
                <div key={e} className={`chip ${esp.includes(e)?"active":""}`} onClick={()=>toggle(e)}>{e}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TELA HORÁRIOS ────────────────────────────────────────────────────────────
function TelaHorarios({ onBack }) {
  const [dias,    setDias]    = useState(["Seg","Ter","Qua","Qui","Sex"]);
  const [inicio,  setInicio]  = useState("07:00");
  const [fim,     setFim]     = useState("19:00");
  const [duracao, setDuracao] = useState("60");
  const [maxAl,   setMaxAl]   = useState("12");
  const [valor,   setValor]   = useState("150");
  const [local,   setLocal]   = useState(["Presencial"]);
  const [interv,  setInterv]  = useState("Sem intervalo");
  const { save, label, cls }  = useSave();

  const toggleDia   = d => setDias(p=>p.includes(d)?p.filter(x=>x!==d):[...p,d]);
  const toggleLocal = l => setLocal(p=>p.includes(l)?p.filter(x=>x!==l):[...p,l]);

  return (
    <>
      <div className="topbar">
        <div className="back-btn" onClick={onBack}>←</div>
        <span className="topbar-title">Horários & Atendimento</span>
        <button className={`topbar-action ${cls}`} onClick={save}>{label}</button>
      </div>
      <div className="pane">
        <div className="sec-body">
          <div className="field">
            <label>Dias disponíveis</label>
            <div className="days-grid">
              {DIAS.map(d=>(
                <div key={d} className={`day-btn ${dias.includes(d)?"active":""}`} onClick={()=>toggleDia(d)}>{d}</div>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Horário de funcionamento</label>
            <div className="time-row">
              <input className="time-input" type="time" value={inicio} onChange={e=>setInicio(e.target.value)}/>
              <span className="time-sep">até</span>
              <input className="time-input" type="time" value={fim} onChange={e=>setFim(e.target.value)}/>
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label>Duração padrão</label>
              <select value={duracao} onChange={e=>setDuracao(e.target.value)}>
                {["30","45","60","75","90","120"].map(v=><option key={v}>{v} min</option>)}
              </select>
            </div>
            <div className="field">
              <label>Máx. alunos/dia</label>
              <select value={maxAl} onChange={e=>setMaxAl(e.target.value)}>
                {["4","6","8","10","12","15","20"].map(v=><option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Modalidade</label>
            <div className="chips">
              {["Presencial","Online","Híbrido"].map(l=>(
                <div key={l} className={`chip ${local.includes(l)?"active":""}`} onClick={()=>toggleLocal(l)}>{l}</div>
              ))}
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label>Valor por sessão (R$)</label>
              <input type="number" value={valor} onChange={e=>setValor(e.target.value)}/>
            </div>
            <div className="field">
              <label>Intervalo entre sessões</label>
              <select value={interv} onChange={e=>setInterv(e.target.value)}>
                {["Sem intervalo","10 min","15 min","30 min"].map(v=><option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          {/* Preview */}
          <div style={{background:"var(--s2)",border:"1.5px solid var(--border2)",borderRadius:12,padding:"13px 14px"}}>
            <div className="slabel" style={{marginBottom:8}}>Resumo</div>
            <div style={{fontSize:13,color:"var(--text)",lineHeight:1.8}}>
              <span style={{color:"var(--orange)",fontWeight:700}}>{dias.join(", ")||"Nenhum dia"}</span><br/>
              {inicio} às {fim} · {duracao} min · {interv.toLowerCase()}<br/>
              Até <span style={{color:"var(--orange)",fontWeight:700}}>{maxAl} alunos</span>/dia · R$ {valor}/sessão
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TELA FATURAMENTO ─────────────────────────────────────────────────────────
function TelaFaturamento({ onBack }) {
  const [mesIdx, setMesIdx] = useState(1);
  const meses = ["Janeiro 2026","Fevereiro 2026","Março 2026"];
  return (
    <>
      <div className="topbar">
        <div className="back-btn" onClick={onBack}>←</div>
        <span className="topbar-title">Faturamento</span>
        <button className="topbar-action">Exportar</button>
      </div>
      <div className="pane">
        <div className="sec-body">
          {/* Seletor de mês */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--s2)",border:"1.5px solid var(--border2)",borderRadius:11,padding:"10px 14px"}}>
            <span style={{fontSize:18,color:"var(--muted)",cursor:"pointer",padding:"0 4px"}} onClick={()=>setMesIdx(i=>Math.max(0,i-1))}>‹</span>
            <span style={{fontFamily:"Syne,sans-serif",fontSize:13,fontWeight:700,color:"var(--text)"}}>{meses[mesIdx]}</span>
            <span style={{fontSize:18,color:"var(--muted)",cursor:"pointer",padding:"0 4px"}} onClick={()=>setMesIdx(i=>Math.min(meses.length-1,i+1))}>›</span>
          </div>

          <div className="fat-card">
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:11,color:"var(--muted2)"}}>Receita total</div>
                <div className="fat-val">R$ 9.800,00</div>
              </div>
              <div className="fat-badge-up">↑ 18% vs jan</div>
            </div>
            <div className="mini-chart">
              {BARS.map((h,i)=>(
                <div key={i} className="mbar" style={{height:`${h/72*100}%`,background:i===6?"var(--orange)":"var(--s3)"}}/>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
              {DIAS.map((d,i)=>(
                <span key={d} style={{flex:1,textAlign:"center",fontSize:9,color:i===6?"var(--orange)":"var(--muted)",fontFamily:"Syne,sans-serif",fontWeight:700}}>{d}</span>
              ))}
            </div>
          </div>

          <div className="slabel">Detalhamento</div>
          {[
            {dot:"#22c55e",label:"Mensalidades ativas", val:"R$ 7.200,00"},
            {dot:"#ff6b00",label:"Sessões avulsas",     val:"R$ 1.800,00"},
            {dot:"#3b82f6",label:"Planos a receber",    val:"R$ 800,00"},
            {dot:"#ef4444",label:"Inadimplência",       val:"R$ 300,00"},
          ].map(r=>(
            <div key={r.label} className="fat-row">
              <div style={{display:"flex",alignItems:"center"}}>
                <div className="fat-dot" style={{background:r.dot}}/>
                <span style={{fontSize:13,color:"var(--text)"}}>{r.label}</span>
              </div>
              <span style={{fontFamily:"Syne,sans-serif",fontSize:13,fontWeight:700,color:"var(--text)"}}>{r.val}</span>
            </div>
          ))}

          <div className="slabel">Indicadores</div>
          <div className="kpi-grid">
            {[
              {label:"Ticket médio",  val:"R$ 2.450", sub:"por aluno/mês"},
              {label:"Taxa ocupação", val:"87%",       sub:"da agenda"},
              {label:"Churn mensal",  val:"0%",        sub:"cancelamentos"},
              {label:"Alunos ativos", val:"4",          sub:"pagantes"},
            ].map(k=>(
              <div key={k.label} className="kpi-card">
                <div className="kpi-lbl">{k.label}</div>
                <div className="kpi-val">{k.val}</div>
                <div className="kpi-sub">{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TELA NOTIFICAÇÕES ────────────────────────────────────────────────────────
function TelaNotificacoes({ onBack }) {
  const [notifs, setNotifs] = useState({
    planoVencendo:true, serieVencendo:true, reagendamento:true,
    alunoInativo:true, resumoDiario:false, pagamento:true,
    aniversario:false, lembrete:true,
  });
  const { save, label, cls } = useSave();
  const toggle = k => setNotifs(p=>({...p,[k]:!p[k]}));
  const ativas = Object.values(notifs).filter(Boolean).length;

  return (
    <>
      <div className="topbar">
        <div className="back-btn" onClick={onBack}>←</div>
        <span className="topbar-title">Notificações</span>
        <button className={`topbar-action ${cls}`} onClick={save}>{label}</button>
      </div>
      <div className="pane">
        <div className="sec-body">
          <div className="field">
            <label>Canal preferido</label>
            <select><option>Push + E-mail</option><option>Somente Push</option><option>Somente E-mail</option></select>
          </div>
          <div className="slabel">Tipos de notificação</div>
          {NOTIF.map(n=>(
            <div key={n.key} className="toggle-row" onClick={()=>toggle(n.key)}>
              <div className="toggle-left">
                <span style={{fontSize:16}}>{n.emoji}</span>
                <div className="toggle-text">
                  <strong>{n.label}</strong>
                  <span>{n.sub}</span>
                </div>
              </div>
              <Sw on={notifs[n.key]} onClick={()=>toggle(n.key)}/>
            </div>
          ))}
          <div style={{background:"var(--s2)",border:"1.5px solid var(--border2)",borderRadius:12,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"var(--muted2)"}}>Notificações ativas</span>
            <span style={{fontFamily:"Syne,sans-serif",fontSize:16,fontWeight:800,color:"var(--orange)"}}>{ativas}/{NOTIF.length}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TELA CONTA ───────────────────────────────────────────────────────────────
function TelaConta({ onBack }) {
  return (
    <>
      <div className="topbar">
        <div className="back-btn" onClick={onBack}>←</div>
        <span className="topbar-title">Conta & Segurança</span>
      </div>
      <div className="pane">
        <div className="sec-body">
          <div className="slabel">Plano atual</div>
          <div className="plan-card">
            <div className="plan-info">
              <strong>⭐ Plano Pro</strong>
              <span>Renova em 15 Mar 2026 · R$ 49,90/mês</span>
            </div>
            <button className="plan-btn">Gerenciar</button>
          </div>

          <div className="slabel">Segurança</div>
          {[
            {icon:"🔑",cls:"orange",label:"Alterar senha",           sub:"Última alteração há 3 meses"},
            {icon:"📧",cls:"",      label:"Alterar e-mail",          sub:"coach@personaltech.app"},
            {icon:"📱",cls:"",      label:"Autenticação em 2 fatores",sub:"⚠ Desativada — recomendamos ativar"},
          ].map(i=>(
            <div key={i.label} className="menu-item">
              <div className="menu-left">
                <div className={`menu-icon ${i.cls}`}>{i.icon}</div>
                <div className="menu-text"><strong>{i.label}</strong><span>{i.sub}</span></div>
              </div>
              <span style={{fontSize:18,color:"var(--muted)"}}>›</span>
            </div>
          ))}

          <div className="slabel">Meus dados</div>
          {[
            {icon:"📤",label:"Exportar meus dados",sub:"LGPD — formato JSON ou CSV"},
            {icon:"🗑️",label:"Excluir conta",      sub:"Ação irreversível"},
          ].map(i=>(
            <div key={i.label} className="menu-item">
              <div className="menu-left">
                <div className="menu-icon">{i.icon}</div>
                <div className="menu-text"><strong>{i.label}</strong><span>{i.sub}</span></div>
              </div>
              <span style={{fontSize:18,color:"var(--muted)"}}>›</span>
            </div>
          ))}

          <div className="menu-item red" style={{marginTop:4}}>
            <div className="menu-left">
              <div className="menu-icon red">🚪</div>
              <div className="menu-text">
                <strong style={{color:"var(--red)"}}>Sair da conta</strong>
                <span>Você precisará fazer login novamente</span>
              </div>
            </div>
            <span style={{fontSize:18,color:"var(--red)"}}>›</span>
          </div>
          <div style={{textAlign:"center",fontSize:11,color:"var(--muted)",paddingTop:4}}>
            Personal Tech v1.0.0 · <span style={{color:"var(--orange)"}}>Termos</span> · <span style={{color:"var(--orange)"}}>Privacidade</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function PerfilPersonal() {
  const [tela, setTela] = useState("menu");

  const TELAS = {
    menu:     <TelaMenu         onNav={setTela}/>,
    dados:    <TelaDados        onBack={()=>setTela("menu")}/>,
    horarios: <TelaHorarios     onBack={()=>setTela("menu")}/>,
    fat:      <TelaFaturamento  onBack={()=>setTela("menu")}/>,
    notif:    <TelaNotificacoes onBack={()=>setTela("menu")}/>,
    conta:    <TelaConta        onBack={()=>setTela("menu")}/>,
  };

  return (
    <>
      <G/>
      <div className="phone">
        {tela === "menu" && (
          <div className="topbar" style={{justifyContent:"space-between"}}>
            <span className="topbar-title">Perfil</span>
            <span style={{fontSize:11,color:"var(--muted)"}}>Coach Silva</span>
          </div>
        )}
        {TELAS[tela]}
        <div className="bottom-nav">
          <div className="nav-item"><span className="nav-icon">⊞</span>Início</div>
          <div className="nav-item"><span className="nav-icon">👥</span>Alunos</div>
          <button className="fab">+</button>
          <div className="nav-item"><span className="nav-icon">📅</span>Agenda</div>
          <div className="nav-item active"><span className="nav-icon" style={{color:"var(--orange)"}}>👤</span>Perfil</div>
        </div>
      </div>
    </>
  );
}
