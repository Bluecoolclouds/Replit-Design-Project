import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Cloud,
  Code2,
  Copy,
  DollarSign,
  ExternalLink,
  Gauge,
  KeyRound,
  Layers3,
  LifeBuoy,
  MoreHorizontal,
  Network,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

const css = `
  @keyframes rise { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
  @keyframes pulse { 0%,100% { opacity: .45 } 50% { opacity: 1 } }
  .hub * { box-sizing:border-box }
  .hub { --ink:#dbe9f2; --muted:#8097aa; --line:rgba(159,197,222,.12); --panel:rgba(13,29,46,.82); --panel2:rgba(17,39,60,.75); --cyan:#5de1db; --blue:#80a9ff; --amber:#f3c56d; color:var(--ink); font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui; }
  .hub button { font:inherit; cursor:pointer }
  .hub .mono { font-family:'Space Mono', monospace }
  .hub .glass { background:linear-gradient(145deg,rgba(19,43,65,.88),rgba(10,24,39,.86)); border:1px solid var(--line); box-shadow: 0 18px 50px rgba(1,12,24,.18), inset 0 1px rgba(221,246,255,.04); }
  .hub .navitem { color:#88a0b5; transition:all .2s ease; }
  .hub .navitem:hover,.hub .navitem.active { background:rgba(94,225,219,.09); color:#d9ffff; border-color:rgba(93,225,219,.18) }
  .hub .fade { animation:rise .45s ease both }
  .hub .delay1{animation-delay:.06s}.hub .delay2{animation-delay:.12s}.hub .delay3{animation-delay:.18s}
  .hub .bar { transition:height .5s ease; }
  .hub .chip { transition:all .2s ease; }.hub .chip:hover { border-color:rgba(93,225,219,.42); background:rgba(93,225,219,.1) }
`;

const providers = [
  { name: "OpenAI", initials: "OAI", color: "#84aefc", models: "GPT-4o · o3-mini", status: "99.99%", latency: "412 ms" },
  { name: "Anthropic", initials: "A", color: "#d6a477", models: "Claude 3.5 Sonnet · Haiku", status: "99.98%", latency: "528 ms" },
  { name: "Google AI", initials: "G", color: "#72d7c8", models: "Gemini 1.5 Pro · Flash", status: "99.97%", latency: "366 ms" },
  { name: "Mistral", initials: "M", color: "#d8ae63", models: "Large · Nemo", status: "99.95%", latency: "289 ms" },
];

const bars = [38, 44, 47, 42, 58, 55, 61, 53, 70, 66, 74, 63, 81, 77, 69, 84, 78, 91, 83, 88, 75, 87, 93, 89];

export function Dashboard() {
  const [active, setActive] = useState("Обзор");
  const [range, setRange] = useState("24 часа");
  const [copied, setCopied] = useState(false);
  const [routeOpen, setRouteOpen] = useState(true);
  const [apiKey, setApiKey] = useState("sk_live_••••••••••••8f2a");
  const nav = [
    { icon: Gauge, label: "Обзор" },
    { icon: Network, label: "Маршрутизация", count: "4" },
    { icon: Layers3, label: "Модели" },
    { icon: BarChart3, label: "Аналитика" },
    { icon: DollarSign, label: "Расходы" },
  ];
  const total = useMemo(() => (range === "7 дней" ? "1.84M" : range === "30 дней" ? "8.72M" : "284.6K"), [range]);
  const copy = () => { setCopied(true); navigator.clipboard?.writeText(apiKey); setTimeout(() => setCopied(false), 1400); };

  return (
    <div className="hub min-h-screen overflow-hidden" style={{ background: "radial-gradient(circle at 76% -10%, #173f5b 0, #0a2033 34%, #071522 73%)" }}>
      <style>{css}</style>
      <div className="flex min-h-screen">
        <aside className="w-[245px] shrink-0 border-r border-[rgba(159,197,222,.11)] bg-[#071725]/80 px-3 py-5">
          <div className="flex items-center gap-3 px-3 mb-9">
            <div className="relative grid h-9 w-9 place-items-center rounded-[11px] bg-[#a7f0e8] text-[#092230] shadow-[0_0_26px_rgba(93,225,219,.25)]">
              <Cloud size={21} strokeWidth={2.5}/>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#f3c56d] ring-2 ring-[#071725]"/>
            </div>
            <div><div className="text-[14px] font-bold tracking-[-.02em]">stratus<span className="text-[#6ae4db]">/</span>hub</div><div className="text-[10px] text-[#718ba0] mt-0.5">CLOUD CONTROL PLANE</div></div>
          </div>
          <div className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#58738a]">Рабочее пространство</div>
          <button className="mx-1 mb-5 flex w-[calc(100%-8px)] items-center justify-between rounded-xl border border-[rgba(159,197,222,.14)] bg-[#102b42] px-3 py-2.5 text-left">
            <span className="flex items-center gap-2.5 text-[12px]"><span className="grid h-6 w-6 place-items-center rounded-md bg-[#1b4860] text-[10px] font-bold">NL</span> Northstar Labs</span><ChevronDown size={14} className="text-[#7290a4]"/>
          </button>
          <nav className="space-y-1">
            {nav.map(({icon:Icon,label,count}) => <button key={label} onClick={() => setActive(label)} className={`navitem flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-2.5 text-[12px] ${active===label?"active":""}`}><span className="flex items-center gap-3"><Icon size={16}/>{label}</span>{count&&<span className="rounded-full bg-[#23475d] px-1.5 py-0.5 text-[10px] text-[#9bb8c9]">{count}</span>}</button>)}
          </nav>
          <div className="my-7 border-t border-[rgba(159,197,222,.1)]"/>
          <div className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[.16em] text-[#58738a]">Инструменты</div>
          {[{icon:KeyRound,label:"API-ключи"},{icon:Code2,label:"Логи запросов"},{icon:Settings2,label:"Настройки"}].map(({icon:Icon,label})=><button onClick={()=>setActive(label)} key={label} className={`navitem flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-[12px] ${active===label?"active":""}`}><Icon size={16}/>{label}</button>)}
          <div className="mt-auto pt-32 px-2">
            <div className="rounded-xl border border-[#28536a] bg-gradient-to-br from-[#12374e] to-[#0b2235] p-3.5">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#ccf8f1]"><Sparkles size={14} className="text-[#71e5d7]"/> Pro план</div>
              <p className="text-[10px] leading-relaxed text-[#8ba9ba]">Лимит запросов обновится через 12 дней.</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#1d4358]"><div className="h-full w-[64%] rounded-full bg-[#61d9d0]"/></div>
              <div className="mt-2 flex justify-between text-[9px] text-[#7192a5]"><span>1.84M / 2.8M</span><span>65%</span></div>
            </div>
            <div className="mt-4 flex items-center gap-2 px-2 text-[11px] text-[#7893a5]"><CircleHelp size={14}/> Центр помощи <ExternalLink size={11} className="ml-auto"/></div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-8 py-6">
          <header className="flex items-start justify-between">
            <div><div className="mb-2 flex items-center gap-2 text-[10px] text-[#7491a4]"><span>Northstar Labs</span><ChevronRight size={12}/><span className="text-[#b0c5d1]">{active}</span></div><h1 className="text-[26px] font-semibold tracking-[-.04em] text-[#e5f2f4]">Доброе утро, Алексей <span className="text-[#70e4d9]">·</span></h1><p className="mt-1 text-[12px] text-[#7894a8]">Вот состояние вашего AI-шлюза на сегодня.</p></div>
            <div className="flex items-center gap-2"><button className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)] bg-[#102b40] text-[#88a4b5] hover:text-[#d9ffff]"><Bell size={16}/></button><div className="ml-2 h-7 w-px bg-[var(--line)]"/><div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#cb9a6c] text-[11px] font-bold text-[#162130]">АК</div><ChevronDown size={14} className="text-[#7591a4]"/></div>
          </header>
          <section className="mt-7 grid grid-cols-4 gap-4">
            {[
              {label:"Запросы",value:total,delta:"+12.4%",icon:Activity,color:"#5de1db",up:true},
              {label:"Средняя задержка",value:"486 ms",delta:"−8.7%",icon:Zap,color:"#80a9ff",up:true},
              {label:"Успешность",value:"99.94%",delta:"+0.08%",icon:ShieldCheck,color:"#8ed6aa",up:true},
              {label:"Расходы сегодня",value:"$18.42",delta:"+6.1%",icon:DollarSign,color:"#f3c56d",up:false},
            ].map(({label,value,delta,icon:Icon,color,up},i)=><div className={`glass fade delay${i+1} rounded-xl p-4`} key={label}><div className="mb-3 flex items-center justify-between"><span className="text-[11px] text-[#7d98aa]">{label}</span><span className="grid h-7 w-7 place-items-center rounded-lg" style={{color,background:`${color}16`}}><Icon size={14}/></span></div><div className="text-[23px] font-semibold tracking-[-.04em] text-[#e7f4f5]">{value}</div><div className="mt-2 flex items-center gap-1 text-[10px]" style={{color:up?"#70d8c4":"#e6a783"}}>{up?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>} {delta}<span className="ml-1 text-[#607d91]">vs. вчера</span></div></div>)}
          </section>
          <section className="mt-4 grid grid-cols-[1.65fr_1fr] gap-4">
            <div className="glass rounded-xl p-5">
              <div className="flex items-start justify-between"><div><h2 className="text-[13px] font-semibold text-[#d8ebee]">Активность запросов</h2><p className="mt-1 text-[10px] text-[#718c9e]">Все маршруты · последние 24 часа</p></div><div className="flex gap-1 rounded-lg bg-[#0d2538] p-1">{["24 часа","7 дней","30 дней"].map(x=><button key={x} onClick={()=>setRange(x)} className={`rounded-md px-2 py-1 text-[10px] transition ${range===x?"bg-[#224962] text-[#cbf7f0]":"text-[#7190a3] hover:text-[#b8d2de]"}`}>{x}</button>)}</div></div>
              <div className="mt-6 flex h-[138px] items-end gap-[7px] border-b border-l border-[rgba(159,197,222,.1)] px-2 pb-0 pt-3">{bars.map((n,i)=><div key={i} className="bar group relative flex-1 rounded-t-[3px] bg-gradient-to-t from-[#328c9a] to-[#69ddd2] opacity-[.82] hover:opacity-100" style={{height:`${n}%`}}><span className="pointer-events-none absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-[#092232] px-1.5 py-1 text-[9px] text-[#d8f8f1] group-hover:block">{(n*2.8).toFixed(1)}k</span></div>)}</div>
              <div className="mt-3 flex justify-between text-[9px] text-[#607e91]"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>Сейчас</span></div>
            </div>
            <div className="glass rounded-xl p-5"><div className="flex items-start justify-between"><div><h2 className="text-[13px] font-semibold text-[#d8ebee]">Распределение расходов</h2><p className="mt-1 text-[10px] text-[#718c9e]">Текущий расчётный период</p></div><button className="text-[#7998aa] hover:text-[#cff7f0]"><MoreHorizontal size={17}/></button></div><div className="mt-5 flex items-center gap-6"><div className="relative h-[105px] w-[105px] shrink-0 rounded-full" style={{background:"conic-gradient(#65ddd3 0 47%, #80a9ff 47% 73%, #d4a56c 73% 88%, #567086 88% 100%)"}}><div className="absolute inset-[13px] grid place-items-center rounded-full bg-[#10283d]"><div className="text-center"><div className="text-[17px] font-semibold">$412.80</div><div className="text-[8px] text-[#7591a3]">итого</div></div></div></div><div className="space-y-3 text-[10px]">{[["GPT-4o","#65ddd3","47%","$194.02"],["Claude 3.5","#80a9ff","26%","$107.33"],["Gemini Pro","#d4a56c","15%","$61.92"],["Остальные","#567086","12%","$49.55"]].map(([x,c,p,v])=><div key={x} className="grid grid-cols-[8px_70px_30px] items-center gap-2"><i className="h-2 w-2 rounded-full" style={{background:c}}/><span className="text-[#91aaba]">{x}</span><span className="text-right text-[#d4e4e9]">{p}</span></div>)}</div></div></div>
          </section>
          <section className="mt-4 grid grid-cols-[1.35fr_1fr] gap-4">
            <div className="glass rounded-xl p-5"><div className="flex items-center justify-between"><div><h2 className="text-[13px] font-semibold text-[#d8ebee]">Провайдеры и модели</h2><p className="mt-1 text-[10px] text-[#718c9e]">Состояние подключений в реальном времени</p></div><button className="chip flex items-center gap-1.5 rounded-lg border border-[rgba(93,225,219,.2)] px-2.5 py-1.5 text-[10px] text-[#7de0d7]"><Plus size={13}/> Подключить</button></div><div className="mt-4 space-y-1">{providers.map(p=><div key={p.name} className="group flex items-center rounded-lg px-2 py-2.5 transition hover:bg-[#15364b]"><div className="grid h-8 w-8 place-items-center rounded-lg text-[10px] font-bold" style={{background:`${p.color}22`,color:p.color}}>{p.initials}</div><div className="ml-3 min-w-[115px]"><div className="text-[11px] font-medium text-[#d3e6eb]">{p.name}</div><div className="mt-0.5 text-[9px] text-[#6f8b9e]">{p.models}</div></div><div className="ml-auto flex items-center gap-9 text-[10px]"><span className="flex items-center gap-1.5 text-[#79d5c0]"><i className="h-1.5 w-1.5 rounded-full bg-[#74d9b9]"/>Работает</span><span className="w-14 text-right text-[#a4bac5]">{p.status}</span><span className="w-14 text-right mono text-[9px] text-[#849eae]">{p.latency}</span><button className="text-[#5f8093] opacity-0 transition group-hover:opacity-100"><MoreHorizontal size={15}/></button></div></div>)}</div></div>
            <div className="glass rounded-xl p-5"><div className="flex items-center justify-between"><div><h2 className="text-[13px] font-semibold text-[#d8ebee]">Быстрое подключение</h2><p className="mt-1 text-[10px] text-[#718c9e]">Начните отправлять запросы за минуту</p></div><Terminal size={17} className="text-[#62d9d0]"/></div><div className="mt-4 rounded-lg border border-[rgba(159,197,222,.12)] bg-[#091d2e] p-3"><div className="mb-2 flex items-center justify-between"><span className="text-[9px] uppercase tracking-[.13em] text-[#67869a]">Ваш API-ключ</span><button onClick={copy} className="flex items-center gap-1 text-[9px] text-[#74d9cf] hover:text-[#b8fff4]">{copied?"Скопировано":"Копировать"}<Copy size={12}/></button></div><div className="flex items-center gap-2"><input aria-label="API ключ" value={apiKey} onChange={e=>setApiKey(e.target.value)} className="min-w-0 flex-1 bg-transparent mono text-[10px] text-[#bcd3dc] outline-none"/><button onClick={()=>setApiKey("sk_live_••••••••••••8f2a")} className="text-[#617f91] hover:text-[#b5d0db]"><Search size={13}/></button></div></div><div className="mt-3 flex gap-2"><button onClick={()=>setRouteOpen(!routeOpen)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#a4eee6] py-2 text-[10px] font-bold text-[#092532] transition hover:bg-[#c5fff8]"><Code2 size={13}/> Открыть Quickstart</button><button className="grid w-9 place-items-center rounded-lg border border-[var(--line)] text-[#7e9bad] hover:bg-[#16374b]"><BookOpen size={14}/></button></div>{routeOpen&&<div className="mt-4 flex items-center gap-2 rounded-lg bg-[#102d40] px-3 py-2 text-[9px] text-[#8daab9]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6bdfc8]"/><span>Маршрут по умолчанию:</span><b className="text-[#c3e8eb]">auto / balanced</b><ChevronRight size={12} className="ml-auto"/></div>}</div>
          </section>
          <footer className="mt-5 flex items-center justify-between px-1 text-[9px] text-[#557388]"><span>Последнее обновление: только что</span><span className="flex items-center gap-3"><span className="flex items-center gap-1.5 text-[#70cbb7]"><i className="h-1.5 w-1.5 rounded-full bg-[#70cbb7]"/> Все системы работают</span><span className="flex items-center gap-1"><LifeBuoy size={11}/> Статус системы</span></span></footer>
        </main>
      </div>
    </div>
  );
}