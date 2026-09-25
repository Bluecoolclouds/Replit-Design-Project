import { useEffect, useState } from "react";
import {
  ArrowRight,
  AudioLines,
  Check,
  CircleHelp,
  Code2,
  Copy,
  Globe2,
  Image as ImageIcon,
  KeyRound,
  Layers3,
  Menu,
  FileText,
  Moon,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  Video,
  X,
  Zap,
  Search,
  Send,
  Upload,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "wouter";

const css = `
  @keyframes float { 0%,100% { transform:translateY(0) rotate(0deg) } 50% { transform:translateY(-9px) rotate(1deg) } }
  @keyframes draw { from { stroke-dashoffset:460 } to { stroke-dashoffset:0 } }
  @keyframes rise { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
  .landing * { box-sizing:border-box }
  .landing { color:#202020; font-family:'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; background:#f7f7f5; }
  .landing button { font:inherit; cursor:pointer }
  .landing .display { font-family:'DM Sans', 'Plus Jakarta Sans', sans-serif; letter-spacing:-.075em }
  .landing .appear { animation:rise .65s cubic-bezier(.2,.75,.2,1) both }
  .landing .float { animation:float 6s ease-in-out infinite }
  .landing .draw { stroke-dasharray:460; stroke-dashoffset:460; animation:draw 1.8s .4s ease-out forwards }
  .landing .pill { transition:all .2s ease }
  .landing .pill:hover { transform:translateY(-1px); box-shadow:0 8px 20px rgba(31,31,31,.1) }
  .landing .case-photo { transition:transform .5s cubic-bezier(.2,.75,.2,1) }
  .landing .case-card:hover .case-photo { transform:scale(1.045) }
  @keyframes mediaStep {
    0%, 25%, 100% { transform:translateX(0); border-color:#dededb; background:#f1f1ee; box-shadow:none }
    3%, 20% { transform:translateX(5px); border-color:#a9d3db; background:#e8f4f6; box-shadow:0 10px 24px rgba(77,140,159,.10) }
  }
  @keyframes mediaPulse {
    0%, 25%, 100% { transform:scale(1); background:#dcebe1; color:#5c866e }
    3%, 20% { transform:scale(1.08); background:#c2e6ec; color:#397e91 }
  }
  .landing .media-step { animation:mediaStep 12s ease-in-out infinite; animation-delay:var(--media-delay,0s) }
  .landing .media-step:nth-child(2) { --media-delay:-9s }
  .landing .media-step:nth-child(3) { --media-delay:-6s }
  .landing .media-step:nth-child(4) { --media-delay:-3s }
  .landing .media-pulse { animation:mediaPulse 12s ease-in-out infinite; animation-delay:var(--media-delay,0s) }
  @media (prefers-reduced-motion: reduce) {
    .landing .media-step, .landing .media-pulse { animation:none; transform:none }
  }
  .landing .mode-preview { animation:modeIn .42s cubic-bezier(.2,.75,.2,1) both }
  @keyframes modeIn { from { opacity:0; transform:translateY(9px) scale(.99) } to { opacity:1; transform:translateY(0) scale(1) } }
  .landing .mode-tab { transition:all .25s ease }
  .landing .mode-tab:hover { transform:translateX(4px) }
  /* Ice Cloud palette carried into the primary hub without changing its imagery or layout. */
  .landing { background:#fbfdfd; color:#132a3a; }
  .landing header { background:rgba(255,255,255,.72); border:1px solid rgba(255,255,255,.8); box-shadow:0 10px 35px rgba(71,126,150,.08); }
  .landing .ice-hero-visual { background:radial-gradient(circle at 62% 21%,rgba(255,255,255,.98),transparent 29%),linear-gradient(145deg,#d9f1f5,#b8dbe7); box-shadow:0 30px 80px rgba(83,154,176,.2); }
  .landing .ice-gateway-frame { border-color:rgba(255,255,255,.65); background:rgba(237,250,255,.55); box-shadow:inset 0 0 0 1px rgba(255,255,255,.8),0 25px 45px rgba(64,131,151,.19); }
  .landing .ice-gateway-core { border-color:rgba(255,255,255,.75); background:rgba(212,240,242,.7); color:#4b95aa; box-shadow:0 12px 25px rgba(72,155,171,.16); }
  .landing .ice-chip { border:1px solid rgba(255,255,255,.75); background:rgba(255,255,255,.75); color:#426879; box-shadow:0 10px 25px rgba(70,135,157,.13); }
  .landing .ice-primary { border:1px solid rgba(255,255,255,.75); background:#c7e6ec; color:#426879; box-shadow:0 10px 24px rgba(83,154,176,.12); font-weight:700; letter-spacing:-.01em; }
  .landing .ice-primary:hover { background:#b8dce5; }
  .landing .ice-border { border-color:#cfe4e8; }
  .landing .ice-accent { color:#6daebe; }
`;

const navItems = [
  { label: "Продукт", target: "ai-gateway" },
  { label: "Режимы", target: "как-работать" },
  { label: "Модели", target: "модели" },
  { label: "Кейсы", target: "кейсы" },
  { label: "Возможности", target: "возможности" },
  { label: "FAQ", target: "faq" },
];

const providerMarks: Record<string, { glyph: string; bg: string; color: string }> = {
  OpenAI: { glyph: "◎", bg: "#e6f3f5", color: "#3f7485" },
  Anthropic: { glyph: "A", bg: "#edf0f1", color: "#384e58" },
  Google: { glyph: "G", bg: "#e8f2fb", color: "#467da3" },
  DeepSeek: { glyph: "DS", bg: "#e8edfb", color: "#536fa9" },
  Mistral: { glyph: "M", bg: "#fff0e3", color: "#a56336" },
  ElevenLabs: { glyph: "11", bg: "#ececf0", color: "#4f5361" },
};

type CatalogFilterId = "all" | "chat" | "images" | "video" | "audio" | "embeddings";

const catalogFilters: Array<{ id: CatalogFilterId; label: string; count: string }> = [
  { id: "all", label: "Все", count: "186" },
  { id: "chat", label: "Чат", count: "70" },
  { id: "images", label: "Изображения", count: "40" },
  { id: "video", label: "Видео", count: "61" },
  { id: "audio", label: "Аудио", count: "13" },
  { id: "embeddings", label: "Эмбеддинги и поиск по ним", count: "2" },
];

const catalogModels: Array<{
  provider: string;
  model: string;
  type: string;
  category: Exclude<CatalogFilterId, "all">;
  context: string;
  input: string;
  output: string;
}> = [
  { provider: "Anthropic", model: "Claude Sonnet 4.6", type: "Чат", category: "chat", context: "1M", input: "41 ₽", output: "207 ₽" },
  { provider: "OpenAI", model: "GPT-5.5", type: "Чат", category: "chat", context: "1.1M", input: "69 ₽", output: "413 ₽" },
  { provider: "Google", model: "Gemini 3.5 Flash", type: "Чат", category: "chat", context: "1M", input: "21 ₽", output: "124 ₽" },
  { provider: "DeepSeek", model: "V4 Pro", type: "Чат", category: "chat", context: "1M", input: "18 ₽", output: "55 ₽" },
  { provider: "OpenAI", model: "GPT Image", type: "Изображения", category: "images", context: "—", input: "—", output: "от 2 ₽" },
  { provider: "Google", model: "Veo", type: "Видео", category: "video", context: "—", input: "—", output: "от 38 ₽" },
  { provider: "ElevenLabs", model: "Eleven Multilingual v3", type: "Аудио", category: "audio", context: "—", input: "—", output: "от 1 ₽" },
  { provider: "OpenAI", model: "text-embedding-3-large", type: "Эмбеддинги и поиск", category: "embeddings", context: "—", input: "от 2 ₽", output: "—" },
];

function ProviderMark({ provider, size = "md" }: { provider: string; size?: "sm" | "md" }) {
  const mark = providerMarks[provider] ?? { glyph: provider.slice(0, 1), bg: "#e6f3f5", color: "#547f8d" };
  return (
    <span
      aria-label={provider}
      title={provider}
      className={`grid shrink-0 place-items-center rounded-xl border border-white/80 font-bold shadow-[0_5px_14px_rgba(80,145,165,.09)] ${size === "sm" ? "h-8 w-8 text-[10px]" : "h-9 w-9 text-[11px]"}`}
      style={{ backgroundColor: mark.bg, color: mark.color }}
    >
      {mark.glyph}
    </span>
  );
}

export function Dashboard() {
  useEffect(() => {
    if (window.location.hash === "#ai-gateway") {
      document.getElementById("ai-gateway")?.scrollIntoView({ behavior: "instant" });
    }
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<"RU" | "EN">("RU");
  const [demoOpen, setDemoOpen] = useState(false);
  const [testKey, setTestKey] = useState<string | null>(() => localStorage.getItem("stratus-demo-key"));
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [activeMode, setActiveMode] = useState<"coding" | "studio" | "chat">("coding");
  const [activePrice, setActivePrice] = useState(0);
  const [activePriceCategory, setActivePriceCategory] = useState<"coding" | "chat" | "studio">("coding");
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilterId>("all");
  const [catalogQuery, setCatalogQuery] = useState("");
  const visibleCatalogModels = catalogModels.filter((model) => {
    const matchesFilter = catalogFilter === "all" || model.category === catalogFilter;
    const normalizedQuery = catalogQuery.trim().toLocaleLowerCase("ru");
    const matchesQuery = !normalizedQuery || `${model.model} ${model.provider} ${model.type}`.toLocaleLowerCase("ru").includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });
  const copy = () => {
     navigator.clipboard?.writeText(testKey ?? "sk_test_demo");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const issueTestKey = () => {
    const next = "sk_test_" + Math.random().toString(36).slice(2, 12) + "••••";
    localStorage.setItem("stratus-demo-key", next);
    setTestKey(next);
  };
  const generateTestKey = () => {
    setRegistrationEmail("");
    setRegistrationOpen(true);
  };
  const completeRegistration = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationEmail.trim())) return;
    issueTestKey();
    setRegistrationOpen(false);
  };
  const registrationModal = registrationOpen ? (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-5 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="registration-title" className="w-full max-w-[440px] rounded-[28px] bg-[#f7f7f5] p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]"><KeyRound size={13}/> Бесплатный тест</div>
            <h2 id="registration-title" className="display text-2xl font-bold">Создайте аккаунт.</h2>
          </div>
          <button aria-label="Закрыть регистрацию" onClick={() => setRegistrationOpen(false)}><X size={18}/></button>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#6d6d6a]">Оставьте email — после регистрации мы сразу выдадим тестовый API-ключ на 10 000 токенов.</p>
        <label className="mt-6 block text-[11px] font-semibold text-[#555]">Рабочий email
          <input autoFocus type="email" value={registrationEmail} onChange={(event) => setRegistrationEmail(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") completeRegistration(); }} className="mt-2 w-full rounded-xl border border-[#d4d4d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#73aabd]" placeholder="you@company.com"/>
        </label>
        <button disabled={!registrationEmail.trim()} onClick={completeRegistration} className="mt-4 w-full rounded-full bg-[#292929] py-3 text-sm font-semibold text-white transition hover:bg-[#454545] disabled:cursor-not-allowed disabled:opacity-40">Получить тестовый ключ <ArrowRight className="ml-2 inline" size={14}/></button>
        <div className="mt-4 text-center text-[10px] text-[#858580]">Без карты · ключ появится сразу после регистрации</div>
      </div>
    </div>
  ) : null;

  return (
    <div className="landing min-h-screen overflow-x-hidden">
      <style>{css}</style>
      {registrationModal}
      <div className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-8 lg:px-12">
        <header className="appear sticky top-4 z-20 mt-4 flex items-center justify-between rounded-[28px] bg-[#e9e9e7]/95 px-5 py-3 backdrop-blur-md sm:px-6">
          <button className="display text-[19px] font-extrabold tracking-[-.06em]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            stratus<span className="text-[#6a9daf]">/</span>hub
          </button>
          <nav className="hidden items-center gap-7 text-[12px] text-[#424242] lg:flex">
            {navItems.map((item) => <a key={item.target} href={`#${item.target}`} className="transition hover:text-black">{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1 rounded-full bg-[#dededc] px-3 py-2 text-[10px] font-semibold sm:flex" onClick={() => setLanguage(language === "RU" ? "EN" : "RU")}><Globe2 size={13}/>{language}</button>
            <button aria-label="Переключить тему" className="grid h-8 w-8 place-items-center rounded-full bg-[#dededc] text-[#343434] hover:bg-[#d4d4d1]"><Moon size={14}/></button>
             <Link href="/dashboard" data-testid="link-open-dashboard" className="pill hidden rounded-full bg-[#292929] px-4 py-2.5 text-[11px] font-semibold text-white sm:block">Открыть dashboard <ArrowRight className="ml-2 inline" size={13}/></Link>
            <button aria-label="Открыть меню" className="grid h-8 w-8 place-items-center rounded-full bg-[#dededc] lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={15}/> : <Menu size={15}/>}</button>
          </div>
        </header>
        {menuOpen && <div className="mt-2 rounded-3xl bg-[#e9e9e7] p-4 lg:hidden">{navItems.map((item) => <a className="block border-b border-[#d4d4d1] py-3 text-sm last:border-0" href={`#${item.target}`} key={item.target} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>}

        <main>
          <section className="grid items-center gap-12 pb-16 pt-20 sm:pt-28 lg:grid-cols-[.93fr_1.07fr] lg:gap-20 lg:pb-24">
            <div className="appear max-w-[590px]">
              <div className="mb-5 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><span className="h-2 w-2 rounded-full bg-[#8acbd4]"/> Для тех, кто строит</div>
               <h1 className="display max-w-[620px] text-[58px] font-extrabold leading-[.94] sm:text-[78px]">Прокси хаб<br/><span className="ice-accent">для всех</span> моделей.</h1>
               <p className="mt-7 max-w-[460px] text-[17px] leading-[1.55] text-[#666]">Единый API-прокси для OpenAI, Anthropic, Google и других. Один ключ для сотен моделей — выбирай маршрут и плати только за использованные токены.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
             <button onClick={() => setDemoOpen(true)} className="pill ice-primary rounded-full px-5 py-3.5 text-[13px]">Начать бесплатно <ArrowRight className="ml-2 inline" size={15}/></button>
                 <a href="#модели" className="text-[13px] font-medium underline decoration-[#aaa] underline-offset-4 hover:decoration-black">Цены <ArrowRight className="ml-1 inline" size={13}/></a>
              </div>
              <div className="mt-9 flex items-center gap-2 text-[11px] text-[#858585]"><ShieldCheck size={14} className="text-[#72aeb8]"/> Без кредитной карты · 10k запросов в месяц</div>
            </div>
             <div className="ice-hero-visual appear relative min-h-[420px] overflow-hidden rounded-[34px] p-7 sm:min-h-[530px] sm:p-10" style={{ animationDelay: ".12s" }}>
               <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-white/30 blur-3xl"/>
               <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#8bd4da]/25 blur-3xl"/>
              <div className="relative flex h-full min-h-[365px] items-center justify-center">
                <div className="float relative w-full max-w-[360px]">
                   <div className="ice-chip absolute -left-3 top-11 rounded-2xl px-3 py-2 text-[10px] font-semibold">your app <Code2 className="ml-2 inline" size={12}/></div>
                   <div className="ice-gateway-frame relative mx-auto mt-3 grid h-[170px] w-[170px] place-items-center rounded-[42px] border-[10px] sm:h-[195px] sm:w-[195px]">
                     <div className="ice-gateway-core grid h-20 w-20 place-items-center rounded-[24px] border"><Layers3 size={35} strokeWidth={1.25}/></div>
                    <span className="absolute -right-3 top-8 h-3 w-3 rounded-full bg-[#7acbd0] ring-4 ring-[#d4eef1]"/>
                  </div>
                  <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 360 240" fill="none"><path className="draw" d="M35 68 C120 68, 106 122, 163 122 S245 88, 325 92" stroke="#fafafa" strokeWidth="2" strokeLinecap="round"/><path className="draw" d="M43 194 C112 194, 111 150, 163 150 S250 174, 319 155" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" style={{animationDelay:".7s"}}/></svg>
                   <div className="ice-chip absolute -right-2 top-14 rounded-2xl px-3 py-2 text-[10px] font-semibold">route / balanced <Zap className="ml-2 inline text-[#59b4b6]" size={12}/></div>
                    <div className="ice-chip absolute -bottom-5 left-2 rounded-2xl px-3 py-2 text-[10px]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#73c7cb]"/> 99.98% uptime</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between text-[11px] text-[#5d5d5b]"><span>One gateway. Every model.</span><span className="font-mono">01 / 04</span></div>
            </div>
          </section>

          <section className="border-y border-[#dededb] py-7" aria-label="Провайдеры">
            <div className="flex flex-wrap items-center justify-between gap-6 text-[#666]">
              {["OpenAI", "Anthropic", "Google AI", "Mistral", "Groq"].map((name, i) => <div key={name} className="flex items-center gap-2 text-[14px] font-semibold"><span className="grid h-5 w-5 place-items-center rounded-md bg-[#dfdfdc] text-[9px] text-[#444]">{["◉", "A", "G", "M", "g"][i]}</span>{name}</div>)}
            </div>
          </section>

          <section className="grid gap-4 border-b border-[#dededb] py-10 sm:grid-cols-3 sm:gap-0">
            {[
              { label: "Для продакшена", text: "Роутинг, фолбэки и лимиты без ручной сборки инфраструктуры." },
              { label: "Для команд", text: "Единый доступ к моделям, понятные расходы и роли для каждого проекта." },
              { label: "Для России", text: "152-ФЗ, ЭДО и безопасная работа с данными в одном контуре." },
            ].map(({ label, text }, index) => (
              <div key={label} className={`px-1 sm:px-7 ${index > 0 ? "border-[#dededb] sm:border-l" : ""}`}>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]"><span className="h-2 w-2 rounded-full bg-[#8acbd4]" />{label}</div>
                <p className="max-w-[280px] text-[13px] leading-[1.55] text-[#727270]">{text}</p>
              </div>
            ))}
          </section>

           <section id="решения" className="scroll-mt-24 py-20 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div><div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Layers3 size={14} className="text-[#73aabd]" /> Решения для продукта</div><h2 className="display max-w-[570px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Один шлюз для всей AI-логики.</h2></div>
              <p className="max-w-[250px] text-[13px] leading-relaxed text-[#747472]">Выбери сценарий — мы уже подготовили нужный маршрут, модель и контроль расходов.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "AI-поддержка", text: "Отвечай быстрее, подключая базу знаний и лучшие модели для каждого вопроса.", icon: CircleHelp },
                { title: "AI-продажи", text: "Квалифицируй лиды и помогай менеджерам закрывать сделки прямо в чате.", icon: Zap },
                { title: "AI-аналитика", text: "Собирай отчёты из данных компании и запускай сложные задачи по расписанию.", icon: Network },
                { title: "AI-агенты", text: "Дай агенту инструменты, память и безопасный доступ к API продукта.", icon: Sparkles },
              ].map(({ title, text, icon: Icon }) => (
                <div key={title} className="group rounded-[24px] border border-[#dededb] p-6 transition hover:-translate-y-1 hover:border-[#b7cbbd] hover:bg-[#f0f5f1]">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e6f3f5] text-[#6b9ead] transition group-hover:bg-[#d5edf0]"><Icon size={18} /></div>
                  <h3 className="mt-12 text-[16px] font-bold">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-[#6c6c6a]">{text}</p>
                  <a href="#возможности" className="mt-5 inline-flex items-center text-[12px] font-semibold text-[#4d7f92]">Подробнее <ArrowRight className="ml-1" size={13} /></a>
                </div>
              ))}
            </div>
          </section>

            <section id="ai-gateway" aria-labelledby="gateway-title" className="my-20 scroll-mt-24 overflow-hidden rounded-[32px] border border-[#d2e8eb] bg-gradient-to-br from-[#f1f9fa] via-[#e6f3f5] to-[#d6e9ef] sm:my-28">
              <div className="grid items-center lg:grid-cols-[1.05fr_.95fr]">
                <div className="px-7 py-10 sm:px-12 sm:py-14">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b6dce3] bg-white/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#407789]">
                     <span className="h-2 w-2 rounded-full bg-[#73b9c5]"/> AI Gateway доступен
                  </div>
                  <h2 id="gateway-title" className="display max-w-[550px] text-[42px] font-extrabold leading-[.98] text-[#183746] sm:text-[58px]">AI Gateway.<br/>Умный маршрут для каждого запроса.</h2>
                   <p className="mt-5 max-w-[520px] text-[14px] leading-[1.7] text-[#55727c]">Единый шлюз помогает направлять запросы к подходящим моделям, учитывать стоимость и задержку и переключаться на резервный маршрут при сбое.</p>
                  <div className="mt-8 grid gap-2 sm:grid-cols-2">
                    {[
                      ["Автовыбор модели", "По правилам задачи и доступности"],
                      ["Фолбэк", "Резервный маршрут при сбое"],
                      ["Цена и задержка", "Приоритет под ваш сценарий"],
                      ["Кеширование", "Для подходящих запросов"],
                      ["Лимиты", "Контроль ключей и бюджета"],
                      ["Логи", "Причины выбора и расходы"],
                    ].map(([title, description]) => (
                      <div key={title} className="rounded-2xl border border-white/85 bg-white/55 px-4 py-3.5">
                        <div className="text-[12px] font-bold text-[#284f5e]">{title}</div>
                        <div className="mt-1 text-[11px] leading-relaxed text-[#67848e]">{description}</div>
                      </div>
                    ))}
                  </div>
                   <p className="mt-6 text-[11px] leading-relaxed text-[#66848e]">Доступные маршруты и возможности зависят от настроек вашего workspace.</p>
                </div>
                <div className="relative h-[310px] overflow-hidden sm:h-[440px] lg:h-full lg:min-h-[560px]">
                  <img src={`${import.meta.env.BASE_URL}images/ai-gateway-illustration.png`} alt="Абстрактный ледяной шлюз соединяет несколько маршрутов к моделям" loading="lazy" className="h-full w-full object-cover object-center"/>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#d6e9ef]/45 lg:bg-gradient-to-r lg:from-[#e6f3f5]/65 lg:via-transparent lg:to-transparent"/>
                </div>
              </div>
            </section>

             <section id="как-работать" className="scroll-mt-24 border-b border-[#dededb] py-20 sm:py-28">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="mb-4 text-[11px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]">Как работать</div>
                  <h2 className="display max-w-[620px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Один доступ.<br/>Три способа работать.</h2>
                </div>
                <p className="max-w-[270px] text-[13px] leading-relaxed text-[#747472]">Выбирай рабочий ритм, а не отдельный продукт. Все режимы используют один баланс и один API-ключ.</p>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-[.34fr_1fr]">
                <div role="tablist" aria-label="Режимы работы" className="space-y-2">
                  {[
                    { id: "coding" as const, number: "01", name: "Кодинг", detail: "Агенты, ролеплей и автоматизация" },
                    { id: "studio" as const, number: "02", name: "Studio", detail: "Файлы, изображения, видео и аудио" },
                    { id: "chat" as const, number: "03", name: "Чат", detail: "Общение, файлы и поиск в интернете" },
                  ].map((mode) => (
                    <button key={mode.id} role="tab" aria-selected={activeMode === mode.id} onClick={() => setActiveMode(mode.id)} onMouseEnter={() => setActiveMode(mode.id)} className={`mode-tab w-full rounded-[20px] border p-4 text-left ${activeMode === mode.id ? "border-[#b6dce3] bg-[#e6f3f5]" : "border-[#dededb] bg-[#f1f1ee] hover:bg-[#edf4f5]"}`}>
                      <div className="flex items-start gap-3"><span className={`font-mono text-[10px] ${activeMode === mode.id ? "text-[#648e9c]" : "text-[#a0a09c]"}`}>{mode.number}</span><span><span className="block text-[15px] font-bold">{mode.name}</span><span className="mt-1 block text-[11px] leading-relaxed text-[#777773]">{mode.detail}</span></span></div>
                    </button>
                  ))}
                  <div className="mt-5 rounded-[20px] bg-[#292929] p-4 text-[11px] leading-relaxed text-[#aaa9a5]"><span className="text-[#9fc8d0]">●</span> Режим можно сменить в любой момент — контекст останется с тобой.</div>
                </div>
                 <div className="min-h-[360px] overflow-hidden rounded-[28px] border border-[#d8e7ea] bg-[#eaf4f5] p-3 sm:p-5">
                  {activeMode === "coding" && <div key="coding" className="mode-preview h-full rounded-[21px] bg-[#292929] p-4 text-white sm:p-5">
                     <div className="mb-4 flex items-center gap-3 text-[10px] text-[#a5aaa6]"><span className="font-semibold text-white">stratus / coding</span><span className="rounded-full bg-[#3f6170] px-2 py-1 text-[#c1e0e5]">agent online</span><span className="ml-auto">auto / balanced</span></div>
                    <div className="grid gap-4 md:grid-cols-[.8fr_1.2fr]">
                       <div className="rounded-2xl bg-[#343534] p-4"><div className="mb-4 flex items-center gap-2 text-[10px] text-[#a9b3ad]"><SlidersHorizontal size={13}/> Agent brief</div><div className="rounded-xl bg-[#262726] p-3 text-[11px] leading-relaxed text-[#d1d8d3]">Проверь API-лимиты, предложи fallback и подготовь PR.</div><div className="mt-4 space-y-2 text-[10px] text-[#8e9991]"><div className="flex justify-between"><span>Модель</span><b className="text-[#c1e0e5]">Claude Sonnet</b></div><div className="flex justify-between"><span>Инструменты</span><b className="text-[#c1e0e5]">3 подключено</b></div></div><button className="mt-5 w-full rounded-xl bg-[#9fc8d0] py-2 text-[10px] font-bold text-[#26372d]">Запустить агента <Play className="ml-1 inline" size={11}/></button></div>
                       <div className="rounded-2xl bg-[#222322] p-4 font-mono text-[10px] leading-[1.9] text-[#9fa9a1]"><div className="mb-3 flex gap-1.5"><span className="h-2 w-2 rounded-full bg-[#df7770]"/><span className="h-2 w-2 rounded-full bg-[#d6ae6f]"/><span className="h-2 w-2 rounded-full bg-[#81b9c5]"/></div><div><span className="text-[#9fc8d0]">agent</span> › inspect gateway config</div><div className="text-[#7ca8b5]">✓ 12 files indexed</div><div>› simulate fallback chain</div><div className="text-[#7ca8b5]">✓ 3 routes respond</div><div>› compose pull request</div><div className="mt-3 rounded-lg border border-[#416879] bg-[#304f5e] p-2 text-[#c4e1e7]">Ready to open PR #184<br/><span className="text-[#8caeb8]">cost 0.42 ₽ · 1.8s</span></div></div>
                    </div>
                  </div>}
                  {activeMode === "studio" && <div key="studio" className="mode-preview h-full rounded-[21px] bg-[#f7f7f5] p-4 text-[#292929] sm:p-5">
                     <div className="mb-4 flex items-center gap-3 text-[10px] text-[#82827e]"><span className="font-semibold text-[#292929]">stratus / studio</span><span className="rounded-full bg-[#e6f3f5] px-2 py-1 text-[#648e9c]">workspace</span><span className="ml-auto">12 assets</span></div>
                     <div className="grid gap-3 md:grid-cols-[1fr_.82fr]"><div className="rounded-2xl bg-[#e8e8e4] p-3"><div className="mb-3 flex items-center justify-between text-[10px] font-semibold"><span>Editorial launch</span><Upload size={13} className="text-[#6b9ead]"/></div><div className="grid grid-cols-2 gap-2"><div className="col-span-2 h-28 rounded-xl bg-[linear-gradient(135deg,#d8edf0,#9fc8d0)] p-3 text-[9px] font-semibold text-[#355b6a]">A QUIETER<br/>WAY TO BUILD<div className="mt-7 h-1 w-12 rounded-full bg-[#648e9c]/50"/></div><div className="h-16 rounded-xl bg-[#c7dfe3]"/><div className="h-16 rounded-xl bg-[#d8cec0]"/></div></div><div className="rounded-2xl border border-[#dededb] p-4"><div className="text-[10px] uppercase tracking-[.1em] text-[#9a9a95]">Prompt</div><div className="mt-3 text-[12px] leading-relaxed">Собери обложку из мягкого света и одного акцента.</div><div className="mt-5 flex items-center gap-2 rounded-xl bg-[#e6f3f5] px-3 py-2 text-[10px] text-[#648e9c]"><ImageIcon size={13}/> image / editorial-v2</div><button className="mt-4 w-full rounded-xl bg-[#292929] py-2 text-[10px] font-semibold text-white">Создать вариант <ArrowRight className="ml-1 inline" size={11}/></button></div></div>
                  </div>}
                  {activeMode === "chat" && <div key="chat" className="mode-preview h-full rounded-[21px] bg-[#f7f7f5] p-4 text-[#292929] sm:p-5">
                     <div className="mb-4 flex items-center gap-3 text-[10px] text-[#82827e]"><span className="font-semibold text-[#292929]">stratus / chat</span><span className="rounded-full bg-[#e6f3f5] px-2 py-1 text-[#648e9c]">web access on</span><span className="ml-auto">balanced</span></div>
                     <div className="mx-auto max-w-[560px]"><div className="mb-4 text-[20px] font-bold tracking-[-.04em]">Чем займёмся?</div><div className="rounded-2xl border border-[#dededb] bg-white p-4 shadow-[0_12px_30px_rgba(50,60,50,.05)]"><div className="text-[13px] leading-relaxed">Сравни последние цены на GPU и собери короткую записку для команды.</div><div className="mt-4 flex items-center gap-2 border-t border-[#ededeb] pt-3 text-[10px] text-[#7d8f83]"><span className="rounded-lg bg-[#e6f3f5] px-2 py-1"><Search size={11} className="mr-1 inline"/> Поиск в интернете</span><span className="rounded-lg bg-[#f0f0ed] px-2 py-1"><FileText size={11} className="mr-1 inline"/> 2 файла</span><button aria-label="Отправить сообщение" className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-[#292929] text-white"><Send size={12}/></button></div></div><div className="mt-4 flex gap-3"><div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dceff2] text-[9px] font-bold text-[#648e9c]">AI</div><div className="rounded-2xl bg-[#e6f3f5] px-4 py-3 text-[11px] leading-relaxed text-[#506f7d]">Нашёл 4 источника. Цены сверены на сегодня — подготовлю выводы и добавлю ссылки.</div></div></div>
                  </div>}
                </div>
              </div>
            </section>

           <section id="продукт" className="scroll-mt-24 border-y border-[#dededb] py-20 sm:py-28">
              <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Sparkles size={14} className="text-[#73aabd]"/> Один слой для всего</div>
                  <h2 className="display max-w-[490px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">От идеи<br/>до готового медиа.</h2>
                  <p className="mt-6 max-w-[390px] text-[15px] leading-[1.6] text-[#6c6c6a]">Изображения, видео, музыка, озвучка и понимание файлов — в одном потоке.</p>
                  <div className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]"><span className="h-2 w-2 rounded-full bg-[#8acbd4]"/> Один workspace · четыре типа контента</div>
                </div>
                <div className="relative">
                  <div className="absolute left-[17px] top-7 bottom-7 w-px bg-[#d5e8eb] sm:left-[21px]"/>
                  <div className="relative space-y-3">
                     {[
                       { step: "01", icon: ImageIcon, kicker: "Пример изображения, созданного AI", type: "AIIMAGE · 02", title: "Изображения", models: "GPT Image · Gemini · Flux", image: "ai-proxy-case-media.png" },
                       { step: "02", icon: Video, kicker: "VIDEO · 02", type: "Видео", title: "Видео", models: "Veo · Kling · Seedance" },
                       { step: "03", icon: AudioLines, kicker: "Аудио 02", type: "03:45", title: "Музыка и аудио", models: "Suno · ElevenLabs" },
                       { step: "04", icon: FileText, kicker: "report.pdf", type: "24.6 MB", title: "Понимание файлов", models: "PDF · DOCX · Audio · Video" },
                     ].map(({ step, icon: Icon, kicker, type, title, models, image }) => (
                      <div key={title} className="media-step group relative flex items-center gap-4 rounded-[24px] border border-[#dededb] bg-[#f1f1ee] p-3 transition hover:border-[#bfdde3] hover:bg-[#edf4f5] sm:gap-5 sm:p-4">
                        <div className="media-pulse relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#dcebe1] text-[#5c866e] sm:h-11 sm:w-11"><Icon size={18} strokeWidth={1.7}/></div>
                        <div className="min-w-0 flex-1 py-1">
                           <div className="flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[.1em] text-[#6b9ead]"><span>Шаг {step}</span><span className="text-[#aaa]">·</span><span>{kicker}</span><span className="text-[#aaa]">·</span><span className="text-[#90908b]">{type}</span></div>
                          <div className="mt-1 text-[16px] font-bold tracking-[-.03em]">{title}</div>
                          <div className="mt-1 text-[11px] text-[#777773]">{models}</div>
                        </div>
                        {image ? <img src={`${import.meta.env.BASE_URL}images/${image}`} alt="" className="hidden h-[70px] w-[94px] rounded-xl object-cover opacity-90 sm:block"/> : <div className="hidden h-[70px] w-[94px] rounded-xl bg-[#e6f0f2] sm:block"><div className="m-3 h-1 rounded-full bg-[#9dc8d0]"/><div className="m-3 mt-2 h-1 w-2/3 rounded-full bg-[#c7dfe3]"/><div className="m-3 mt-2 h-1 w-1/2 rounded-full bg-[#c7dfe3]"/></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

             <section id="модели" className="scroll-mt-24 border-b border-[#dededb] py-20 sm:py-28">
              <div className="flex flex-wrap items-end justify-between gap-8">
                <div>
                   <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]"><Zap size={14}/> Актуальные цены</div>
                  <h2 className="display max-w-[610px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Больше возможностей<br/>за те же деньги.</h2>
                  <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-[#6c6c6a]">Цены загружаются из того же каталога, по которому считается каждый запрос.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:min-w-[390px]">
                   <div className="rounded-2xl bg-[#e6f3f5] p-4"><div className="text-[22px] font-bold tracking-[-.05em]">Единый баланс.</div><div className="mt-1 text-[11px] text-[#69808a]">для всех моделей и режимов</div></div>
                  <div className="rounded-2xl bg-[#292929] p-4 text-white"><div className="text-[22px] font-bold tracking-[-.05em]">Никаких подписок.</div><div className="mt-1 text-[11px] text-[#aaa9a5]">платишь только за запросы</div></div>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Категории актуальных моделей">
                  {[
                    { id: "coding" as const, label: "Кодинг", count: "3 модели" },
                    { id: "chat" as const, label: "Чат", count: "3 модели" },
                    { id: "studio" as const, label: "Studio", count: "3 модели" },
                   ].map((category) => <button key={category.id} role="tab" aria-selected={activePriceCategory === category.id} onClick={() => { setActivePriceCategory(category.id); setActivePrice(0); }} className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${activePriceCategory === category.id ? "bg-[#292929] text-white" : "bg-[#edf4f5] text-[#666] hover:bg-[#e2eef1] hover:text-[#466f82]"}`}>{category.label} <span className={activePriceCategory === category.id ? "text-[#b5dce3]" : "text-[#9a9a95]"}>· {category.count}</span></button>)}
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#858580]"><span>листай модели</span><button aria-label="Предыдущая модель" onClick={() => setActivePrice((activePrice + 2) % 3)} className="grid h-8 w-8 place-items-center rounded-full border border-[#d5d5d1] hover:bg-[#e5eee8]">←</button><button aria-label="Следующая модель" onClick={() => setActivePrice((activePrice + 1) % 3)} className="grid h-8 w-8 place-items-center rounded-full border border-[#d5d5d1] hover:bg-[#e5eee8]">→</button></div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  { category: "coding", name: "Claude Code", provider: "Anthropic", context: "1M", input: "41 ₽", output: "207 ₽", note: "агенты и сложные задачи", mark: "C" },
                  { category: "coding", name: "GPT-5.5", provider: "OpenAI", context: "1.1M", input: "69 ₽", output: "413 ₽", note: "код и reasoning", mark: "G" },
                  { category: "coding", name: "DeepSeek V4 Pro", provider: "DeepSeek", context: "1M", input: "18 ₽", output: "55 ₽", note: "быстрый маршрут для объёма", mark: "D" },
                  { category: "chat", name: "Claude Sonnet 4.6", provider: "Anthropic", context: "1M", input: "41 ₽", output: "207 ₽", note: "сильный универсальный чат", mark: "C" },
                  { category: "chat", name: "GPT-5.5", provider: "OpenAI", context: "1.1M", input: "69 ₽", output: "413 ₽", note: "точные ответы и файлы", mark: "G" },
                  { category: "chat", name: "Gemini 3.5 Flash", provider: "Google", context: "1M", input: "21 ₽", output: "124 ₽", note: "быстрые ответы", mark: "G" },
                  { category: "studio", name: "GPT Image", provider: "OpenAI", context: "—", input: "—", output: "от 2 ₽", note: "изображения и вариации", mark: "I" },
                  { category: "studio", name: "Veo", provider: "Google", context: "—", input: "—", output: "от 38 ₽", note: "видео из текста", mark: "V" },
                  { category: "studio", name: "ElevenLabs", provider: "ElevenLabs", context: "—", input: "—", output: "от 1 ₽", note: "озвучка и аудио", mark: "E" },
                ].filter((model) => model.category === activePriceCategory).map((model, index) => (
                   <button key={model.name} onClick={() => setActivePrice(index)} className={`group rounded-[24px] border p-5 text-left transition hover:-translate-y-1 hover:border-[#b6dce3] hover:bg-[#edf4f5] ${activePrice === index ? "border-[#9dcbd3] bg-[#e6f3f5]" : "border-[#dededb] bg-[#f1f1ee]"}`}>
                     <div className="flex items-start justify-between"><ProviderMark provider={model.provider}/><span className="rounded-full bg-[#dceff2] px-2 py-1 text-[9px] font-semibold text-[#648e9c]">pay as you go</span></div>
                    <div className="mt-7 text-[17px] font-bold tracking-[-.04em]">{model.name}</div>
                    <div className="mt-1 text-[11px] text-[#777773]">{model.provider} · {model.note}</div>
                     <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#d8e7ea] pt-4 text-[10px]"><div><div className="text-[#8b9398]">КОНТЕКСТ</div><div className="mt-1 font-semibold">{model.context}</div></div><div><div className="text-[#8b9398]">ВХОД / 1M</div><div className="mt-1 font-semibold text-[#4d7f92]">{model.input}</div></div><div><div className="text-[#8b9398]">ВЫХОД / 1M</div><div className="mt-1 font-semibold text-[#4d7f92]">{model.output}</div></div></div>
                  </button>
                ))}
              </div>
               <div className="mt-4 flex items-center justify-between text-[10px] text-[#858580]"><span><Check size={13} className="mr-1 inline text-[#72aeb8]"/> Цены обновляются из живого каталога</span><span className="font-semibold text-[#4d7f92]">{activePriceCategory === "coding" ? "Кодинг · 3 модели" : activePriceCategory === "chat" ? "Чат · 3 модели" : "Studio · 3 модели"}</span></div>
              <div className="mt-16 border-t border-[#dededb] pt-12">
                  <div className="flex flex-wrap items-end justify-between gap-5"><div><div className="mb-3 text-[11px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]">Каталог моделей</div><h3 className="display text-[35px] font-extrabold leading-none sm:text-[48px]">Все модели.<br/>В одном месте.</h3><p className="mt-4 text-[13px] text-[#6c7d82]">Модели API и Studio · оплата только за использование</p></div><a href="#модели" className="text-[12px] font-semibold text-[#4d7f92] underline underline-offset-4">Открыть каталог · 186 моделей <ArrowRight className="ml-1 inline" size={12}/></a></div>
                 <div className="mt-7 rounded-[24px] border border-[#d8e7ea] bg-[#eaf4f5] p-4 sm:p-5">
                   <div className="flex flex-col gap-4">
                     <label className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-[0_8px_24px_rgba(80,145,165,.06)]">
                       <Search size={16} className="shrink-0 text-[#6b9ead]" aria-hidden="true"/>
                       <input value={catalogQuery} onChange={(event) => setCatalogQuery(event.target.value)} placeholder="Найти модель или вендора" aria-label="Найти модель или вендора" className="w-full bg-transparent text-[13px] text-[#264856] outline-none placeholder:text-[#82959b]"/>
                     </label>
                     <div className="flex flex-wrap gap-2" role="tablist" aria-label="Фильтры каталога моделей">
                       {catalogFilters.map((filter) => {
                         const isActive = catalogFilter === filter.id;
                         return <button key={filter.id} type="button" role="tab" aria-selected={isActive} onClick={() => setCatalogFilter(filter.id)} className={`rounded-full px-3.5 py-2 text-[11px] font-semibold transition ${isActive ? "bg-[#292929] text-white shadow-[0_6px_16px_rgba(41,41,41,.12)]" : "bg-white/75 text-[#55717a] hover:bg-white hover:text-[#3f6978]"}`}>{filter.label}{filter.id !== "embeddings" && <span className={isActive ? "text-[#b5dce3]" : "text-[#9aafb4]"}> {filter.count}</span>}</button>;
                       })}
                     </div>
                   </div>
                 </div>
                <div className="mt-7 overflow-hidden rounded-[24px] border border-[#dededb] bg-[#f1f1ee]">
                   <div className="hidden gap-3 border-b border-[#dededb] bg-[#eaf4f5] px-5 py-3 text-[9px] font-semibold uppercase tracking-[.1em] text-[#8b9398] sm:grid sm:grid-cols-[1.3fr_.55fr_.5fr_.45fr_.45fr] sm:items-center sm:gap-4 sm:px-6"><div>Название модели</div><div>Формат</div><div>Контекст</div><div>Вход / 1M</div><div>Выход / 1M</div></div>
                   {visibleCatalogModels.length > 0 ? visibleCatalogModels.map((model) => <div key={model.model} className="grid gap-3 border-b border-[#dededb] px-5 py-4 last:border-0 sm:grid-cols-[1.3fr_.55fr_.5fr_.45fr_.45fr] sm:items-center sm:gap-4 sm:px-6"><div className="flex items-center gap-3"><ProviderMark provider={model.provider} size="sm"/><div><div className="text-[13px] font-bold">{model.model}</div><div className="text-[10px] text-[#858580]">{model.provider} · pay as you go</div></div></div><div className="text-[11px] text-[#777773]">{model.type}</div><div className="text-[11px] text-[#777773]">{model.context}</div><div className="text-[11px] font-semibold text-[#4d7f92]">{model.input}</div><div className="text-[11px] font-semibold text-[#4d7f92]">{model.output}</div></div>) : <div className="px-5 py-12 text-center"><div className="text-[14px] font-semibold text-[#264856]">Модель не найдена</div><div className="mt-2 text-[11px] text-[#777773]">Попробуй изменить запрос или выбрать другую категорию.</div><button type="button" onClick={() => { setCatalogQuery(""); setCatalogFilter("all"); }} className="mt-5 rounded-full bg-[#d8edf0] px-4 py-2 text-[11px] font-semibold text-[#4d7f92] hover:bg-[#c9e6eb]">Сбросить фильтры</button></div>}
                   <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dededb] px-5 py-3 text-[10px] text-[#858580]"><span>Показано {visibleCatalogModels.length} из {catalogFilter === "all" ? "186" : catalogFilters.find((filter) => filter.id === catalogFilter)?.count} моделей</span><a href="#модели" className="font-semibold text-[#4d6f5b]">Смотреть полный каталог →</a></div>
                </div>
              </div>
            </section>

            <section id="возможности" className="scroll-mt-24 grid items-center gap-12 rounded-[32px] bg-[#292929] px-7 py-10 text-white sm:px-12 sm:py-14 lg:grid-cols-[1fr_1fr]">
              <div><div className="mb-4 flex items-center gap-2 text-[11px] text-[#bdbdb8]"><CircleHelp size={14} className="text-[#9fc8b4]"/> API, который не мешает</div><h2 className="display max-w-[460px] text-[42px] font-extrabold leading-[.98] sm:text-[55px]">Меньше инфраструктуры. Больше продукта.</h2><p className="mt-6 max-w-[420px] text-[14px] leading-relaxed text-[#aaa9a5]">stratus/hub берёт на себя ключи, лимиты, фолбэки и наблюдаемость. Ты строишь продукт — мы держим шлюз.</p><button onClick={generateTestKey} className="mt-7 rounded-full bg-[#f3f3f0] px-4 py-3 text-[12px] font-semibold text-[#252525]">{testKey ? <Check className="mr-2 inline text-[#6f9c84]" size={14}/> : <KeyRound className="mr-2 inline" size={14}/>} {testKey ? "API-ключ создан" : "Создать API-ключ"}</button></div>
             <div className="rounded-[23px] bg-[#363635] p-5 font-mono text-[11px] leading-[2] text-[#b6b6b1] shadow-2xl"><div className="mb-4 flex items-center gap-2 text-[10px] text-[#83837e]"><span className="h-2 w-2 rounded-full bg-[#df7770]"/><span className="h-2 w-2 rounded-full bg-[#d6ae6f]"/><span className="h-2 w-2 rounded-full bg-[#81b99b]"/><span className="ml-auto">request.ts</span></div><div><span className="text-[#9dbda9]">const</span> response = <span className="text-[#d9be8d]">await</span> hub.chat.completions.create({"{"}</div><div className="pl-4">model: <span className="text-[#b8ce9b]">&quot;auto / balanced&quot;</span>,</div><div className="pl-4">messages: messages,</div><div className="pl-4">stream: <span className="text-[#b8ce9b]">true</span></div><div>{"}"}</div><div className="mt-4 text-[#83b59d]">✓ routed to claude-3-5-sonnet · 412ms</div></div>
           </section>

           <section id="кейсы" className="scroll-mt-24 border-t border-[#dededb] py-20 sm:py-28">
             <div className="flex flex-wrap items-end justify-between gap-6">
               <div>
                 <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Sparkles size={14} className="text-[#7ea68f}"/> Истории команд</div>
                 <h2 className="display max-w-[650px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Шесть способов<br/>запустить AI в продукте.</h2>
               </div>
               <p className="max-w-[270px] text-[13px] leading-relaxed text-[#747472]">Не демо ради демо. Реальные сценарии, где единый шлюз снимает лишнюю инфраструктуру.</p>
             </div>
             <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
               {[
                 { image: "ai-proxy-case-support.png", eyebrow: "Поддержка · Fintech", title: "Ответы стали быстрее, а очередь — короче.", result: "−42% времени ответа", text: "AI-классификация направляет простые вопросы в быструю модель, а сложные — в сильную." },
                 { image: "ai-proxy-case-sales.png", eyebrow: "Продажи · SaaS", title: "Каждый лид получает следующий шаг.", result: "+31% конверсия", text: "Агент читает контекст разговора и предлагает менеджеру точное действие прямо в CRM." },
                 { image: "ai-proxy-case-analytics.png", eyebrow: "Аналитика · Retail", title: "От вопроса к отчёту за одну минуту.", result: "2.8× быстрее отчёты", text: "Команда собирает сводки из нескольких источников без ручного копирования и сводных таблиц." },
                 { image: "ai-proxy-case-agents.png", eyebrow: "Агенты · DevTools", title: "Код-агент, который знает границы.", result: "−38% стоимость", text: "Маршрутизация выбирает модель по сложности задачи и держит дорогие вызовы под контролем." },
                 { image: "ai-proxy-case-chat.png", eyebrow: "Чат · EdTech", title: "Один наставник для каждого ученика.", result: "4 языка · 1 API", text: "Мультиязычный помощник работает с базой знаний и меняет модель без смены интеграции." },
                 { image: "ai-proxy-case-media.png", eyebrow: "Медиа · Studio", title: "От идеи до готового материала.", result: "6 моделей · 1 ключ", text: "Текст, изображения и сценарии проходят через один workspace с понятным расходом токенов." },
               ].map(({ image, eyebrow, title, result, text }) => (
                 <article key={title} className="case-card group overflow-hidden rounded-[26px] border border-[#dededb] bg-[#f1f1ee] transition hover:-translate-y-1 hover:border-[#b7cbbd]">
                   <div className="relative h-[245px] overflow-hidden bg-[#e3e3df]">
                     <img className="case-photo h-full w-full object-cover" src={`${import.meta.env.BASE_URL}images/${image}`} alt="" />
                     <div className="absolute left-4 top-4 rounded-full bg-[#f7f7f5]/85 px-3 py-1.5 text-[10px] font-semibold text-[#4d4d4b] backdrop-blur-sm">{eyebrow}</div>
                   </div>
                   <div className="p-6">
                     <div className="mb-3 text-[11px] font-semibold uppercase tracking-[.1em] text-[#719984]">{result}</div>
                     <h3 className="max-w-[300px] text-[19px] font-bold leading-[1.15] tracking-[-.03em]">{title}</h3>
                     <p className="mt-3 text-[13px] leading-[1.55] text-[#6c6c6a]">{text}</p>
                     <a href="#возможности" className="mt-5 inline-flex items-center text-[12px] font-semibold text-[#4d6f5b]">Читать кейс <ArrowRight className="ml-1 transition group-hover:translate-x-1" size={13} /></a>
                   </div>
                 </article>
               ))}
             </div>
           </section>

           <section className="rounded-[32px] bg-[#e5f2f4] px-7 py-12 sm:px-12 sm:py-16"><div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div><div className="mb-4 text-[11px] font-semibold uppercase tracking-[.12em] text-[#5f94a2]">Безопасные и быстрые</div><h2 className="display max-w-[650px] text-[42px] font-extrabold leading-[.98] sm:text-[56px]">«Официальные API.<br/>Без лишнего посредника».</h2><p className="mt-5 max-w-[560px] text-[14px] leading-relaxed text-[#5f7780]">Работаем напрямую с официальными API OpenAI, Anthropic и Google. Запросы идут по защищённому маршруту: мы не читаем содержимое, не добавляем лишние задержки и сохраняем скорость выбранной модели.</p></div><div className="rounded-2xl bg-[#f9fcfc]/85 p-5 lg:min-w-[230px]"><div className="text-[10px] uppercase tracking-[.1em] text-[#6b9aa5]">Как это работает</div><div className="mt-3 text-[21px] font-bold tracking-[-.04em] text-[#264856]">Официальные API</div><div className="text-[12px] text-[#66808a]">OpenAI · Anthropic · Google</div><div className="mt-5 text-[21px] font-bold tracking-[-.04em] text-[#264856]">Без лишних задержек</div><div className="text-[12px] text-[#66808a]">маршрут напрямую к модели</div></div></div></section>

            <section id="faq" className="scroll-mt-24 border-t border-[#dededb] py-20 sm:py-28">
              <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
                <div><div className="mb-4 text-[11px] font-semibold uppercase tracking-[.12em] text-[#6b9ead]">FAQ</div><h2 className="display text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Спокойно<br/>о важном.</h2><p className="mt-5 max-w-[300px] text-[13px] leading-relaxed text-[#747472]">Короткие ответы о маршрутизации, данных и тестовом доступе.</p></div>
                <div className="space-y-2">
                  {[
                    ["Это официальный доступ к моделям?", "Да. Stratus Hub маршрутизирует запросы к официальным API провайдеров и не заменяет их аккаунты."],
                    ["Что происходит с данными?", "Мы не используем содержимое запросов для обучения. Для продакшена доступны отдельные лимиты и журналы доступа."],
                    ["Тестовый ключ настоящий?", "Нет. Это демонстрационный ключ для знакомства с интерфейсом и форматом интеграции. Провайдерский аккаунт не создаётся."],
                    ["Как начать интеграцию?", "Используйте OpenAI-compatible endpoint из блока быстрого старта. Один ключ, единый баланс и понятный роутинг."]
                  ].map(([question, answer], index) => <details key={question} open={index === 0} className="group rounded-[20px] border border-[#dededb] bg-[#f1f1ee] px-5 py-4"><summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-bold">{question}<span className="text-[#6b9ead] transition group-open:rotate-45 text-xl">+</span></summary><p className="max-w-[600px] pt-3 text-[13px] leading-relaxed text-[#6c6c6a]">{answer}</p></details>)}
                </div>
              </div>
            </section>

            <section id="тест" className="my-20 scroll-mt-24 overflow-hidden rounded-[32px] border border-[#cfe4e8] bg-[#e6f3f5] px-7 py-10 sm:my-28 sm:px-12 sm:py-14">
              <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-[#648e9c]"><KeyRound size={14}/> Бесплатный тестовый ключ</div>
                  <h2 className="display max-w-[510px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Протестируйте сейчас.</h2>
                   <p className="mt-5 max-w-[460px] text-[14px] leading-relaxed text-[#617d89]">Получите тестовый ключ, отправьте первый запрос и проверьте маршрутизацию до регистрации. 10 000 токенов — бесплатно.</p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <button onClick={generateTestKey} className="pill rounded-full bg-[#292929] px-5 py-3.5 text-[13px] font-semibold text-white">{testKey ? "Сгенерировать заново" : "Сгенерировать ключ"} <KeyRound className="ml-2 inline" size={14}/></button>
                     <span className="text-[11px] text-[#69808a]">без карты · 60 секунд</span>
                  </div>
                </div>
                <div className="rounded-[24px] bg-[#f7f7f5]/90 p-5 shadow-[0_18px_50px_rgba(85,110,95,.12)] sm:p-6">
                   <div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.12em] text-[#8b9fa6]"><span>Быстрый старт</span><span className="rounded-full bg-[#dceff2] px-2 py-1 text-[#648e9c]">openai compatible</span></div>
                  <div className="rounded-2xl bg-[#292929] p-4 font-mono text-[11px] leading-[1.8] text-[#c4c8c3]">
                    <div><span className="text-[#9dbda9]">curl</span> https://api.stratushub.dev/v1/chat/completions \</div>
                    <div className="pl-4">-H <span className="text-[#d9be8d]">&quot;Authorization: Bearer {testKey ?? "sk_test_••••••••"}&quot;</span> \</div>
                    <div className="pl-4">-d <span className="text-[#b8ce9b]">&apos;{"{\"model\":\"auto\",\"messages\":[...]}"}&apos;</span></div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                     <button onClick={() => { if (!testKey) generateTestKey(); }} className="flex-1 rounded-full border border-[#cfe4e8] px-4 py-3 text-[12px] font-semibold text-[#52788a] hover:bg-[#e6f3f5]"><Terminal className="mr-2 inline" size={14}/> {testKey ? "Ключ готов" : "Показать API-ключ"}</button>
                     <button onClick={copy} className="rounded-full bg-[#dceff2] px-4 py-3 text-[12px] font-semibold text-[#52788a] hover:bg-[#cfe4e8]"><Copy className="mr-2 inline" size={14}/> {copied ? "Скопировано" : "Копировать"}</button>
                  </div>
                  <a href="/register" className="mt-3 block rounded-full bg-[#292929] py-3 text-center text-[12px] font-semibold text-white transition hover:bg-[#454545]">Зарегистрироваться и продолжить <ArrowRight className="ml-2 inline" size={13}/></a>
                </div>
              </div>
            </section>

        </main>

         <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-[#dededb] pt-7 text-[11px] text-[#787876]"><span className="font-semibold text-[#373735]">stratus/hub</span><span>© 2024 Northstar Labs</span><div className="flex gap-5"><Link href="/docs" className="hover:text-black" data-testid="link-footer-docs">Документация</Link><a href="#faq" className="hover:text-black">Статус</a><a href="#faq" className="hover:text-black">Контакты</a></div></footer>
      </div>
      {demoOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-5 backdrop-blur-sm"><div className="w-full max-w-[420px] rounded-[28px] bg-[#f7f7f5] p-7 shadow-2xl"><div className="flex items-center justify-between"><h2 className="display text-2xl font-bold">Добро пожаловать</h2><button aria-label="Закрыть" onClick={() => setDemoOpen(false)}><X size={18}/></button></div><p className="mt-3 text-sm leading-relaxed text-[#6d6d6a]">Ваш workspace почти готов. Оставьте email — пришлём доступ к раннему запуску.</p><input autoFocus className="mt-6 w-full rounded-xl border border-[#d4d4d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#7ea68f]" placeholder="you@company.com"/><button onClick={() => setDemoOpen(false)} className="mt-3 w-full rounded-full bg-[#292929] py-3 text-sm font-semibold text-white">Получить доступ <ArrowRight className="ml-2 inline" size={14}/></button></div></div>}
    </div>
  );
}