import { useState } from "react";
import {
  ArrowRight,
  AudioLines,
  Check,
  ChevronDown,
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
  @keyframes mediaStep { 0%, 13% { opacity:.48; transform:translateX(0) } 18%, 72% { opacity:1; transform:translateX(7px) } 83%, 100% { opacity:.48; transform:translateX(0) } }
  @keyframes mediaPulse { 0%, 100% { transform:scale(.96); opacity:.65 } 42%, 68% { transform:scale(1); opacity:1 } }
  .landing .media-step { animation:mediaStep 10s ease-in-out infinite }
  .landing .media-step:nth-child(2) { animation-delay:2.4s }
  .landing .media-step:nth-child(3) { animation-delay:4.8s }
  .landing .media-step:nth-child(4) { animation-delay:7.2s }
  .landing .media-pulse { animation:mediaPulse 10s ease-in-out infinite }
  .landing .mode-preview { animation:modeIn .42s cubic-bezier(.2,.75,.2,1) both }
  @keyframes modeIn { from { opacity:0; transform:translateY(9px) scale(.99) } to { opacity:1; transform:translateY(0) scale(1) } }
  .landing .mode-tab { transition:all .25s ease }
  .landing .mode-tab:hover { transform:translateX(4px) }
`;

const navItems = ["Продукт", "Модели", "Кейсы", "Возможности", "Тарифы", "FAQ"];

export function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<"RU" | "EN">("RU");
  const [demoOpen, setDemoOpen] = useState(false);
  const [testKey, setTestKey] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"coding" | "studio" | "chat">("coding");
  const [activePrice, setActivePrice] = useState(0);
  const copy = () => {
    navigator.clipboard?.writeText("sk_live_••••••••8f2a");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  const generateTestKey = () => {
    setTestKey("sk_test_" + Math.random().toString(36).slice(2, 10) + "••••");
  };

  return (
    <div className="landing min-h-screen overflow-x-hidden">
      <style>{css}</style>
      <div className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-8 lg:px-12">
        <header className="appear sticky top-4 z-20 mt-4 flex items-center justify-between rounded-[28px] bg-[#e9e9e7]/95 px-5 py-3 backdrop-blur-md sm:px-6">
          <button className="display text-[19px] font-extrabold tracking-[-.06em]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            stratus<span className="text-[#6a8f7f]">/</span>hub
          </button>
          <nav className="hidden items-center gap-7 text-[12px] text-[#424242] md:flex">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-black">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1 rounded-full bg-[#dededc] px-3 py-2 text-[10px] font-semibold sm:flex" onClick={() => setLanguage(language === "RU" ? "EN" : "RU")}><Globe2 size={13}/>{language}</button>
            <button aria-label="Переключить тему" className="grid h-8 w-8 place-items-center rounded-full bg-[#dededc] text-[#343434] hover:bg-[#d4d4d1]"><Moon size={14}/></button>
            <button onClick={() => setDemoOpen(true)} className="pill hidden rounded-full bg-[#292929] px-4 py-2.5 text-[11px] font-semibold text-white sm:block">Открыть dashboard <ArrowRight className="ml-2 inline" size={13}/></button>
            <button aria-label="Открыть меню" className="grid h-8 w-8 place-items-center rounded-full bg-[#dededc] md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={15}/> : <Menu size={15}/>}</button>
          </div>
        </header>
        {menuOpen && <div className="mt-2 rounded-3xl bg-[#e9e9e7] p-4 md:hidden">{navItems.map((item) => <a className="block border-b border-[#d4d4d1] py-3 text-sm last:border-0" href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}</div>}

        <main>
          <section className="grid items-center gap-12 pb-16 pt-20 sm:pt-28 lg:grid-cols-[.93fr_1.07fr] lg:gap-20 lg:pb-24">
            <div className="appear max-w-[590px]">
              <div className="mb-5 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><span className="h-2 w-2 rounded-full bg-[#83b39e]"/> Для тех, кто строит</div>
              <h1 className="display max-w-[620px] text-[58px] font-extrabold leading-[.94] sm:text-[78px]">Твой код.<br/>Твои модели.</h1>
               <p className="mt-7 max-w-[460px] text-[17px] leading-[1.55] text-[#666]">Единый API-прокси для OpenAI, Anthropic, Google и других. Один ключ для сотен моделей — выбирай маршрут и плати только за использованные токены.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button onClick={() => setDemoOpen(true)} className="pill rounded-full bg-[#292929] px-5 py-3.5 text-[13px] font-semibold text-white">Начать бесплатно <ArrowRight className="ml-2 inline" size={15}/></button>
                <a href="#тарифы" className="text-[13px] font-medium underline decoration-[#aaa] underline-offset-4 hover:decoration-black">Тарифы <ArrowRight className="ml-1 inline" size={13}/></a>
              </div>
              <div className="mt-9 flex items-center gap-2 text-[11px] text-[#858585]"><ShieldCheck size={14} className="text-[#76a28f]"/> Без кредитной карты · 10k запросов в месяц</div>
            </div>
            <div className="appear relative min-h-[420px] overflow-hidden rounded-[34px] bg-[#d9d9d7] p-7 sm:min-h-[530px] sm:p-10" style={{ animationDelay: ".12s" }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_28%,rgba(255,255,255,.95),transparent_25%),linear-gradient(145deg,#d5d5d2,#adadab)]"/>
              <div className="relative flex h-full min-h-[365px] items-center justify-center">
                <div className="float relative w-full max-w-[360px]">
                  <div className="absolute -left-3 top-11 rounded-2xl bg-[#252525] px-3 py-2 text-[10px] font-medium text-white shadow-xl">your app <Code2 className="ml-2 inline" size={12}/></div>
                  <div className="relative mx-auto mt-3 grid h-[170px] w-[170px] place-items-center rounded-[42px] border-[10px] border-[#b5b5b2] bg-[#292929] shadow-[0_28px_50px_rgba(35,35,35,.25)] sm:h-[195px] sm:w-[195px]">
                    <div className="grid h-20 w-20 place-items-center rounded-[24px] border border-[#555] bg-[#343434] text-[#fff]"><Layers3 size={35} strokeWidth={1.25}/></div>
                    <span className="absolute -right-3 top-8 h-3 w-3 rounded-full bg-[#88bca5] ring-4 ring-[#d9d9d7]"/>
                  </div>
                  <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 360 240" fill="none"><path className="draw" d="M35 68 C120 68, 106 122, 163 122 S245 88, 325 92" stroke="#fafafa" strokeWidth="2" strokeLinecap="round"/><path className="draw" d="M43 194 C112 194, 111 150, 163 150 S250 174, 319 155" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" style={{animationDelay:".7s"}}/></svg>
                  <div className="absolute -right-2 top-14 rounded-2xl bg-[#f7f7f5] px-3 py-2 text-[10px] font-semibold shadow-xl">route / balanced <Zap className="ml-2 inline text-[#7ea68f]" size={12}/></div>
                  <div className="absolute -bottom-5 left-2 rounded-2xl bg-[#f7f7f5] px-3 py-2 text-[10px] shadow-xl"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#82b39d]"/> 99.98% uptime</div>
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

          <section id="модели" className="border-b border-[#dededb] py-20 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Network size={14} className="text-[#7ea68f]" /> Живой каталог</div>
                <h2 className="display max-w-[590px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Каждая модель.<br/>Один баланс.</h2>
              </div>
              <div className="max-w-[280px] text-[13px] leading-relaxed text-[#747472]">Без подписки и минимального платежа. Сравнивай модели по цене, контексту и скорости в одном месте.</div>
            </div>
            <div className="mt-9 flex flex-wrap gap-2">
              {["Все 186", "Текст 70", "Изображения 40", "Видео 61", "Аудио 13"].map((filter, index) => (
                <button key={filter} className={`rounded-full px-4 py-2 text-[11px] font-semibold transition ${index === 0 ? "bg-[#292929] text-white" : "bg-[#ededeb] text-[#666] hover:bg-[#e2eee7] hover:text-[#42614f]"}`}>{filter}</button>
              ))}
            </div>
            <div className="mt-5 overflow-hidden rounded-[24px] border border-[#dededb] bg-[#f1f1ee]">
              <div className="hidden grid-cols-[1.3fr_.65fr_.65fr_.5fr] gap-4 border-b border-[#dededb] px-6 py-4 text-[10px] font-semibold uppercase tracking-[.1em] text-[#8a8a86] sm:grid">
                <span>Модель</span><span>Контекст</span><span>Вход / 1M</span><span>Выход / 1M</span>
              </div>
              {[
                { provider: "Anthropic", model: "Claude Sonnet 4.6", context: "1M", input: "41 ₽", output: "207 ₽", mark: "C" },
                { provider: "OpenAI", model: "GPT-5.5", context: "1.1M", input: "69 ₽", output: "413 ₽", mark: "G" },
                { provider: "Google", model: "Gemini 3.5 Flash", context: "1M", input: "21 ₽", output: "124 ₽", mark: "G" },
                { provider: "DeepSeek", model: "V4 Pro", context: "1M", input: "18 ₽", output: "55 ₽", mark: "D" },
              ].map(({ provider, model, context, input, output, mark }) => (
                <div key={model} className="grid gap-3 border-b border-[#dededb] px-5 py-4 last:border-0 sm:grid-cols-[1.3fr_.65fr_.65fr_.5fr] sm:items-center sm:gap-4 sm:px-6">
                  <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#e2eee7] text-[11px] font-bold text-[#5d846d]">{mark}</span><div><div className="text-[13px] font-bold">{model}</div><div className="text-[10px] text-[#858580]">{provider} · pay as you go</div></div></div>
                  <div className="text-[12px] text-[#70706c]"><span className="mr-2 text-[10px] text-[#9a9a95] sm:hidden">Контекст</span>{context}</div>
                  <div className="text-[12px] font-semibold text-[#4d6f5b]"><span className="mr-2 text-[10px] font-normal text-[#9a9a95] sm:hidden">Вход</span>{input}</div>
                  <div className="text-[12px] font-semibold text-[#4d6f5b]"><span className="mr-2 text-[10px] font-normal text-[#9a9a95] sm:hidden">Выход</span>{output}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#777]"><span><Check size={13} className="mr-1 inline text-[#76a28f]" /> Цены обновляются из живого каталога</span><a href="#тарифы" className="font-semibold text-[#4d6f5b] underline underline-offset-4">Смотреть все модели <ArrowRight className="ml-1 inline" size={12}/></a></div>
          </section>

          <section className="grid gap-4 border-b border-[#dededb] py-10 sm:grid-cols-3 sm:gap-0">
            {[
              { label: "Для продакшена", text: "Роутинг, фолбэки и лимиты без ручной сборки инфраструктуры." },
              { label: "Для команд", text: "Единый доступ к моделям, понятные расходы и роли для каждого проекта." },
              { label: "Для России", text: "152-ФЗ, ЭДО и безопасная работа с данными в одном контуре." },
            ].map(({ label, text }, index) => (
              <div key={label} className={`px-1 sm:px-7 ${index > 0 ? "border-[#dededb] sm:border-l" : ""}`}>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-[#719984]"><span className="h-2 w-2 rounded-full bg-[#83b39e]" />{label}</div>
                <p className="max-w-[280px] text-[13px] leading-[1.55] text-[#727270]">{text}</p>
              </div>
            ))}
          </section>

          <section id="решения" className="py-20 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div><div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Layers3 size={14} className="text-[#7ea68f]" /> Решения для продукта</div><h2 className="display max-w-[570px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Один шлюз для всей AI-логики.</h2></div>
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
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e5eee8] text-[#719984] transition group-hover:bg-[#d7e9dc]"><Icon size={18} /></div>
                  <h3 className="mt-12 text-[16px] font-bold">{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-[#6c6c6a]">{text}</p>
                  <a href="#возможности" className="mt-5 inline-flex items-center text-[12px] font-semibold text-[#4d6f5b]">Подробнее <ArrowRight className="ml-1" size={13} /></a>
                </div>
              ))}
            </div>
          </section>

           <section id="продукт" className="border-y border-[#dededb] py-20 sm:py-28">
             <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
               <div>
                 <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Sparkles size={14} className="text-[#7ea68f}"/> Один слой для всего</div>
                 <h2 className="display max-w-[490px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">От идеи<br/>до готового медиа.</h2>
                 <p className="mt-6 max-w-[390px] text-[15px] leading-[1.6] text-[#6c6c6a]">Изображения, видео, музыка, озвучка и понимание файлов — в одном потоке.</p>
                 <div className="mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.12em] text-[#719984]"><span className="h-2 w-2 rounded-full bg-[#83b39e]"/> Один workspace · четыре типа контента</div>
               </div>
               <div className="relative">
                 <div className="absolute left-[17px] top-7 bottom-7 w-px bg-[#d7e5dc] sm:left-[21px]"/>
                 <div className="relative space-y-3">
                   {[
                     { icon: ImageIcon, kicker: "Пример изображения, созданного AI", type: "AIIMAGE · 02", title: "Изображения", models: "GPT Image · Gemini · Flux", image: "ai-proxy-case-media.png" },
                     { icon: Video, kicker: "VIDEO · 02", type: "Видео", title: "Видео", models: "Veo · Kling · Seedance" },
                     { icon: AudioLines, kicker: "Аудио 02", type: "03:45", title: "Музыка и аудио", models: "Suno · ElevenLabs" },
                     { icon: FileText, kicker: "report.pdf", type: "24.6 MB", title: "Понимание файлов", models: "PDF · DOCX · Audio · Video" },
                   ].map(({ icon: Icon, kicker, type, title, models, image }) => (
                     <div key={title} className="media-step group relative flex items-center gap-4 rounded-[24px] border border-[#dededb] bg-[#f1f1ee] p-3 transition hover:border-[#b7cbbd] hover:bg-[#edf4ef] sm:gap-5 sm:p-4">
                       <div className="media-pulse relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#dcebe1] text-[#5c866e] sm:h-11 sm:w-11"><Icon size={18} strokeWidth={1.7}/></div>
                       <div className="min-w-0 flex-1 py-1">
                         <div className="flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-[.1em] text-[#719984]"><span>{kicker}</span><span className="text-[#aaa]">·</span><span className="text-[#90908b]">{type}</span></div>
                         <div className="mt-1 text-[16px] font-bold tracking-[-.03em]">{title}</div>
                         <div className="mt-1 text-[11px] text-[#777773]">{models}</div>
                       </div>
                       {image ? <img src={`/__mockup/images/${image}`} alt="" className="hidden h-[70px] w-[94px] rounded-xl object-cover opacity-90 sm:block"/> : <div className="hidden h-[70px] w-[94px] rounded-xl bg-[#e1e7e2] sm:block"><div className="m-3 h-1 rounded-full bg-[#9fc2ae]"/><div className="m-3 mt-2 h-1 w-2/3 rounded-full bg-[#c0d6c7]"/><div className="m-3 mt-2 h-1 w-1/2 rounded-full bg-[#c0d6c7]"/></div>}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </section>

            <section id="как-работать" className="border-b border-[#dededb] py-20 sm:py-28">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="mb-4 text-[11px] font-semibold uppercase tracking-[.12em] text-[#719984]">Как работать</div>
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
                    <button key={mode.id} role="tab" aria-selected={activeMode === mode.id} onClick={() => setActiveMode(mode.id)} onMouseEnter={() => setActiveMode(mode.id)} className={`mode-tab w-full rounded-[20px] border p-4 text-left ${activeMode === mode.id ? "border-[#a9c6b4] bg-[#e5eee8]" : "border-[#dededb] bg-[#f1f1ee] hover:bg-[#edf4ef]"}`}>
                      <div className="flex items-start gap-3"><span className={`font-mono text-[10px] ${activeMode === mode.id ? "text-[#5e816c]" : "text-[#a0a09c]"}`}>{mode.number}</span><span><span className="block text-[15px] font-bold">{mode.name}</span><span className="mt-1 block text-[11px] leading-relaxed text-[#777773]">{mode.detail}</span></span></div>
                    </button>
                  ))}
                  <div className="mt-5 rounded-[20px] bg-[#292929] p-4 text-[11px] leading-relaxed text-[#aaa9a5]"><span className="text-[#9fc8b4]">●</span> Режим можно сменить в любой момент — контекст останется с тобой.</div>
                </div>
                <div className="min-h-[360px] overflow-hidden rounded-[28px] border border-[#d8ded9] bg-[#e7eee9] p-3 sm:p-5">
                  {activeMode === "coding" && <div key="coding" className="mode-preview h-full rounded-[21px] bg-[#292929] p-4 text-white sm:p-5">
                    <div className="mb-4 flex items-center gap-3 text-[10px] text-[#a5aaa6]"><span className="font-semibold text-white">stratus / coding</span><span className="rounded-full bg-[#3b5146] px-2 py-1 text-[#bfe2cc]">agent online</span><span className="ml-auto">auto / balanced</span></div>
                    <div className="grid gap-4 md:grid-cols-[.8fr_1.2fr]">
                      <div className="rounded-2xl bg-[#343534] p-4"><div className="mb-4 flex items-center gap-2 text-[10px] text-[#a9b3ad]"><SlidersHorizontal size={13}/> Agent brief</div><div className="rounded-xl bg-[#262726] p-3 text-[11px] leading-relaxed text-[#d1d8d3]">Проверь API-лимиты, предложи fallback и подготовь PR.</div><div className="mt-4 space-y-2 text-[10px] text-[#8e9991]"><div className="flex justify-between"><span>Модель</span><b className="text-[#c1dccb]">Claude Sonnet</b></div><div className="flex justify-between"><span>Инструменты</span><b className="text-[#c1dccb]">3 подключено</b></div></div><button className="mt-5 w-full rounded-xl bg-[#9fc8b4] py-2 text-[10px] font-bold text-[#26372d]">Запустить агента <Play className="ml-1 inline" size={11}/></button></div>
                      <div className="rounded-2xl bg-[#222322] p-4 font-mono text-[10px] leading-[1.9] text-[#9fa9a1]"><div className="mb-3 flex gap-1.5"><span className="h-2 w-2 rounded-full bg-[#df7770]"/><span className="h-2 w-2 rounded-full bg-[#d6ae6f]"/><span className="h-2 w-2 rounded-full bg-[#81b99b]"/></div><div><span className="text-[#9fc8b4]">agent</span> › inspect gateway config</div><div className="text-[#7ca08a]">✓ 12 files indexed</div><div>› simulate fallback chain</div><div className="text-[#7ca08a]">✓ 3 routes respond</div><div>› compose pull request</div><div className="mt-3 rounded-lg border border-[#405347] bg-[#2d3a31] p-2 text-[#c4dfce]">Ready to open PR #184<br/><span className="text-[#8ca695]">cost 0.42 ₽ · 1.8s</span></div></div>
                    </div>
                  </div>}
                  {activeMode === "studio" && <div key="studio" className="mode-preview h-full rounded-[21px] bg-[#f7f7f5] p-4 text-[#292929] sm:p-5">
                    <div className="mb-4 flex items-center gap-3 text-[10px] text-[#82827e]"><span className="font-semibold text-[#292929]">stratus / studio</span><span className="rounded-full bg-[#e4eee7] px-2 py-1 text-[#5e816c]">workspace</span><span className="ml-auto">12 assets</span></div>
                    <div className="grid gap-3 md:grid-cols-[1fr_.82fr]"><div className="rounded-2xl bg-[#e8e8e4] p-3"><div className="mb-3 flex items-center justify-between text-[10px] font-semibold"><span>Editorial launch</span><Upload size={13} className="text-[#719984]"/></div><div className="grid grid-cols-2 gap-2"><div className="col-span-2 h-28 rounded-xl bg-[linear-gradient(135deg,#d2dfd7,#91ad9d)] p-3 text-[9px] font-semibold text-[#314a3c]">A QUIETER<br/>WAY TO BUILD<div className="mt-7 h-1 w-12 rounded-full bg-[#5e816c]/50"/></div><div className="h-16 rounded-xl bg-[#c4d5ce]"/><div className="h-16 rounded-xl bg-[#d8cec0]"/></div></div><div className="rounded-2xl border border-[#dededb] p-4"><div className="text-[10px] uppercase tracking-[.1em] text-[#9a9a95]">Prompt</div><div className="mt-3 text-[12px] leading-relaxed">Собери обложку из мягкого света и одного акцента.</div><div className="mt-5 flex items-center gap-2 rounded-xl bg-[#e5eee8] px-3 py-2 text-[10px] text-[#5e816c]"><ImageIcon size={13}/> image / editorial-v2</div><button className="mt-4 w-full rounded-xl bg-[#292929] py-2 text-[10px] font-semibold text-white">Создать вариант <ArrowRight className="ml-1 inline" size={11}/></button></div></div>
                  </div>}
                  {activeMode === "chat" && <div key="chat" className="mode-preview h-full rounded-[21px] bg-[#f7f7f5] p-4 text-[#292929] sm:p-5">
                    <div className="mb-4 flex items-center gap-3 text-[10px] text-[#82827e]"><span className="font-semibold text-[#292929]">stratus / chat</span><span className="rounded-full bg-[#e4eee7] px-2 py-1 text-[#5e816c]">web access on</span><span className="ml-auto">balanced</span></div>
                    <div className="mx-auto max-w-[560px]"><div className="mb-4 text-[20px] font-bold tracking-[-.04em]">Чем займёмся?</div><div className="rounded-2xl border border-[#dededb] bg-white p-4 shadow-[0_12px_30px_rgba(50,60,50,.05)]"><div className="text-[13px] leading-relaxed">Сравни последние цены на GPU и собери короткую записку для команды.</div><div className="mt-4 flex items-center gap-2 border-t border-[#ededeb] pt-3 text-[10px] text-[#7d8f83]"><span className="rounded-lg bg-[#e5eee8] px-2 py-1"><Search size={11} className="mr-1 inline"/> Поиск в интернете</span><span className="rounded-lg bg-[#f0f0ed] px-2 py-1"><FileText size={11} className="mr-1 inline"/> 2 файла</span><button aria-label="Отправить сообщение" className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-[#292929] text-white"><Send size={12}/></button></div></div><div className="mt-4 flex gap-3"><div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dcebe1] text-[9px] font-bold text-[#5e816c]">AI</div><div className="rounded-2xl bg-[#e5eee8] px-4 py-3 text-[11px] leading-relaxed text-[#50685a]">Нашёл 4 источника. Цены сверены на сегодня — подготовлю выводы и добавлю ссылки.</div></div></div>
                  </div>}
                </div>
              </div>
            </section>

            <section id="актуальные-цены" className="border-b border-[#dededb] py-20 sm:py-28">
              <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                <div><div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-[#719984]"><Zap size={14}/> Актуальные цены</div><h2 className="display max-w-[500px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Больше возможностей<br/>за те же деньги.</h2><p className="mt-6 max-w-[390px] text-[14px] leading-relaxed text-[#6c6c6a]">Цены загружаются из того же каталога, по которому считается каждый запрос.</p><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-[#e5eee8] p-4"><div className="text-[22px] font-bold tracking-[-.05em]">Единый баланс.</div><div className="mt-1 text-[11px] text-[#698072]">для всех моделей и режимов</div></div><div className="rounded-2xl bg-[#292929] p-4 text-white"><div className="text-[22px] font-bold tracking-[-.05em]">Никаких подписок.</div><div className="mt-1 text-[11px] text-[#aaa9a5]">платишь только за запросы</div></div></div></div>
                <div className="overflow-hidden rounded-[26px] border border-[#dededb] bg-[#f1f1ee]"><div className="flex items-center justify-between border-b border-[#dededb] px-5 py-4"><div className="text-[12px] font-semibold">Фокус каталога</div><div className="flex gap-1.5">{[0,1,2].map((index) => <button key={index} aria-label={`Показать модель ${index + 1}`} onClick={() => setActivePrice(index)} className={`h-2 w-2 rounded-full ${activePrice === index ? "bg-[#5e816c]" : "bg-[#cbd4cd]"}`}/>)}</div></div><div className="grid gap-5 p-5 sm:grid-cols-[1fr_.68fr] sm:items-center"><div><div className="mb-2 text-[10px] uppercase tracking-[.1em] text-[#719984]">live model catalog · pay as you go</div><h3 className="text-[24px] font-bold tracking-[-.05em]">{[
                  { name: "Claude Sonnet 4.6", provider: "Anthropic", input: "41 ₽", output: "207 ₽", note: "Сильный выбор для сложных агентов" },
                  { name: "Gemini 3.5 Flash", provider: "Google", input: "21 ₽", output: "124 ₽", note: "Быстрые ответы и большой контекст" },
                  { name: "DeepSeek V4 Pro", provider: "DeepSeek", input: "18 ₽", output: "55 ₽", note: "Рациональный маршрут для объёма" },
                ][activePrice].name}</h3><p className="mt-2 text-[12px] text-[#777773]">{[
                  { provider: "Anthropic", note: "Сильный выбор для сложных агентов" },
                  { provider: "Google", note: "Быстрые ответы и большой контекст" },
                  { provider: "DeepSeek", note: "Рациональный маршрут для объёма" },
                ][activePrice].provider} · {[
                  "Сильный выбор для сложных агентов", "Быстрые ответы и большой контекст", "Рациональный маршрут для объёма"
                ][activePrice]}</p><div className="mt-5 flex gap-3"><div className="rounded-xl bg-[#e5eee8] px-3 py-2"><div className="text-[9px] text-[#789384]">ВХОД / 1M ТОКЕНОВ</div><div className="mt-1 text-[16px] font-bold text-[#4d6f5b]">{[{input:"41 ₽",output:"207 ₽"},{input:"21 ₽",output:"124 ₽"},{input:"18 ₽",output:"55 ₽"}][activePrice].input}</div></div><div className="rounded-xl bg-[#e5eee8] px-3 py-2"><div className="text-[9px] text-[#789384]">ВЫХОД / 1M ТОКЕНОВ</div><div className="mt-1 text-[16px] font-bold text-[#4d6f5b]">{[{input:"41 ₽",output:"207 ₽"},{input:"21 ₽",output:"124 ₽"},{input:"18 ₽",output:"55 ₽"}][activePrice].output}</div></div></div></div><div className="rounded-2xl bg-[#292929] p-5 text-white"><div className="font-mono text-[10px] text-[#9fc8b4]">request estimate</div><div className="mt-5 text-[34px] font-bold tracking-[-.07em]">0.08 ₽</div><div className="mt-1 text-[11px] text-[#aaa9a5]">примерный ответ · 1.2k токенов</div><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#4b514d]"><div className="h-full w-[38%] rounded-full bg-[#9fc8b4]"/></div><div className="mt-2 flex justify-between text-[9px] text-[#8f9892]"><span>запрос</span><span>по факту</span></div></div></div><div className="border-t border-[#dededb] px-5 py-3 text-[10px] text-[#858580]"><Check size={13} className="mr-1 inline text-[#76a28f]"/> Цены в рублях, за 1 миллион токенов · обновлено сегодня</div></div>
              </div>
            </section>

           <section id="кейсы" className="border-t border-[#dededb] py-20 sm:py-28">
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
                     <img className="case-photo h-full w-full object-cover" src={`/__mockup/images/${image}`} alt="" />
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

          <section id="возможности" className="grid items-center gap-12 rounded-[32px] bg-[#292929] px-7 py-10 text-white sm:px-12 sm:py-14 lg:grid-cols-[1fr_1fr]">
            <div><div className="mb-4 flex items-center gap-2 text-[11px] text-[#bdbdb8]"><CircleHelp size={14} className="text-[#9fc8b4]"/> API, который не мешает</div><h2 className="display max-w-[460px] text-[42px] font-extrabold leading-[.98] sm:text-[55px]">Меньше инфраструктуры. Больше продукта.</h2><p className="mt-6 max-w-[420px] text-[14px] leading-relaxed text-[#aaa9a5]">stratus/hub берёт на себя ключи, лимиты, фолбэки и наблюдаемость. Ты строишь продукт — мы держим шлюз.</p><button onClick={copy} className="mt-7 rounded-full bg-[#f3f3f0] px-4 py-3 text-[12px] font-semibold text-[#252525]">{copied ? <Check className="mr-2 inline text-[#6f9c84]" size={14}/> : <Copy className="mr-2 inline" size={14}/>} {copied ? "Скопировано" : "Скопировать API-ключ"}</button></div>
            <div className="rounded-[23px] bg-[#363635] p-5 font-mono text-[11px] leading-[2] text-[#b6b6b1] shadow-2xl"><div className="mb-4 flex items-center gap-2 text-[10px] text-[#83837e]"><span className="h-2 w-2 rounded-full bg-[#df7770]"/><span className="h-2 w-2 rounded-full bg-[#d6ae6f]"/><span className="h-2 w-2 rounded-full bg-[#81b99b]"/><span className="ml-auto">request.ts</span></div><div><span className="text-[#9dbda9]">const</span> response = <span className="text-[#d9be8d]">await</span> hub.chat.completions.create({"{"}</div><div className="pl-4">model: <span className="text-[#b8ce9b]">&quot;auto / balanced&quot;</span>,</div><div className="pl-4">messages: messages,</div><div className="pl-4">stream: <span className="text-[#b8ce9b]">true</span></div><div>{"}"}</div><div className="mt-4 text-[#83b59d]">✓ routed to claude-3-5-sonnet · 412ms</div></div>
          </section>

           <section id="тест" className="my-20 overflow-hidden rounded-[32px] border border-[#cfe0d5] bg-[#e5eee8] px-7 py-10 sm:my-28 sm:px-12 sm:py-14">
             <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
               <div>
                 <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-[#5e816c]"><KeyRound size={14}/> Бесплатный тестовый ключ</div>
                 <h2 className="display max-w-[510px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">Протестируйте сейчас.</h2>
                 <p className="mt-5 max-w-[460px] text-[14px] leading-relaxed text-[#617268]">Получите тестовый ключ, отправьте первый запрос и проверьте маршрутизацию до регистрации. 10 000 токенов — бесплатно.</p>
                 <div className="mt-7 flex flex-wrap items-center gap-4">
                   <button onClick={generateTestKey} className="pill rounded-full bg-[#292929] px-5 py-3.5 text-[13px] font-semibold text-white">{testKey ? "Сгенерировать заново" : "Сгенерировать ключ"} <KeyRound className="ml-2 inline" size={14}/></button>
                   <span className="text-[11px] text-[#698072]">без карты · 60 секунд</span>
                 </div>
               </div>
               <div className="rounded-[24px] bg-[#f7f7f5]/90 p-5 shadow-[0_18px_50px_rgba(85,110,95,.12)] sm:p-6">
                 <div className="mb-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.12em] text-[#8a9c91]"><span>Быстрый старт</span><span className="rounded-full bg-[#dcebe1] px-2 py-1 text-[#5e816c]">openai compatible</span></div>
                 <div className="rounded-2xl bg-[#292929] p-4 font-mono text-[11px] leading-[1.8] text-[#c4c8c3]">
                   <div><span className="text-[#9dbda9]">curl</span> https://api.stratushub.dev/v1/chat/completions \</div>
                   <div className="pl-4">-H <span className="text-[#d9be8d]">&quot;Authorization: Bearer {testKey ?? "sk_test_••••••••"}&quot;</span> \</div>
                   <div className="pl-4">-d <span className="text-[#b8ce9b]">&apos;{"{\"model\":\"auto\",\"messages\":[...]}"}&apos;</span></div>
                 </div>
                 <div className="mt-4 flex flex-wrap gap-3">
                   <button onClick={() => { if (!testKey) generateTestKey(); }} className="flex-1 rounded-full border border-[#cbd8ce] px-4 py-3 text-[12px] font-semibold text-[#466653] hover:bg-[#e2eee7]"><Terminal className="mr-2 inline" size={14}/> {testKey ? "Ключ готов" : "Показать API-ключ"}</button>
                   <button onClick={copy} className="rounded-full bg-[#dcebe1] px-4 py-3 text-[12px] font-semibold text-[#466653] hover:bg-[#cfe3d5]"><Copy className="mr-2 inline" size={14}/> {copied ? "Скопировано" : "Копировать"}</button>
                 </div>
                 <a href="/register" className="mt-3 block rounded-full bg-[#292929] py-3 text-center text-[12px] font-semibold text-white transition hover:bg-[#454545]">Зарегистрироваться и продолжить <ArrowRight className="ml-2 inline" size={13}/></a>
               </div>
             </div>
           </section>

           <section id="тарифы" className="py-20 sm:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><div><div className="mb-4 text-[11px] font-medium text-[#767676]">Простые тарифы</div><h2 className="display text-[44px] font-extrabold leading-none sm:text-[58px]">Плати за то,<br/>что используешь.</h2></div><div className="max-w-[245px] text-[13px] leading-relaxed text-[#747472]">Начни бесплатно. Перейди на Pro, когда продукт начнёт расти.</div></div><div className="mt-10 grid gap-4 sm:grid-cols-2"><div className="rounded-[24px] border border-[#dededb] p-7"><div className="text-[14px] font-semibold">Hobby</div><div className="mt-5 text-[39px] font-bold tracking-[-.06em]">$0 <span className="text-[13px] font-normal text-[#777]">/ месяц</span></div><p className="mt-3 text-[12px] text-[#777]">Для первых прототипов и экспериментов.</p><button onClick={() => setDemoOpen(true)} className="mt-7 w-full rounded-full border border-[#bbb] py-3 text-[12px] font-semibold hover:bg-[#ededeb]">Начать бесплатно</button></div><div className="rounded-[24px] bg-[#e2eee7] p-7"><div className="flex items-center justify-between text-[14px] font-semibold">Pro <span className="rounded-full bg-[#c4dfcf] px-2 py-1 text-[9px] text-[#466653]">ПОПУЛЯРНЫЙ</span></div><div className="mt-5 text-[39px] font-bold tracking-[-.06em]">$19 <span className="text-[13px] font-normal text-[#607b6a]">/ месяц</span></div><p className="mt-3 text-[12px] text-[#607b6a]">Для продуктов, которые уже в продакшене.</p><button onClick={() => setDemoOpen(true)} className="mt-7 w-full rounded-full bg-[#292929] py-3 text-[12px] font-semibold text-white hover:bg-[#454545]">Подключить Pro <ArrowRight className="ml-2 inline" size={13}/></button></div></div></section>
           <section className="rounded-[32px] bg-[#e5eee8] px-7 py-12 sm:px-12 sm:py-16"><div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div><div className="mb-4 text-[11px] font-semibold uppercase tracking-[.12em] text-[#5e816c]">История запуска</div><h2 className="display max-w-[650px] text-[42px] font-extrabold leading-[.98] sm:text-[56px]">«Переключили модель — и не переписали продукт».</h2><p className="mt-5 max-w-[520px] text-[14px] leading-relaxed text-[#617268]">Команда customer support запустила новый AI-маршрут за один день: сначала дешёвая модель для классификации, затем сильная — только для сложных диалогов.</p></div><div className="rounded-2xl bg-[#f7f7f5]/80 p-5 lg:min-w-[230px]"><div className="text-[10px] uppercase tracking-[.1em] text-[#789384]">Результат</div><div className="mt-3 text-[38px] font-bold tracking-[-.06em] text-[#2d4537]">−38%</div><div className="text-[12px] text-[#698072]">стоимость ответа</div><div className="mt-5 text-[38px] font-bold tracking-[-.06em] text-[#2d4537]">2.4×</div><div className="text-[12px] text-[#698072]">быстрее запуск</div></div></div></section>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-[#dededb] pt-7 text-[11px] text-[#787876]"><span className="font-semibold text-[#373735]">stratus/hub</span><span>© 2024 Northstar Labs</span><div className="flex gap-5"><a href="#faq" className="hover:text-black">Документация</a><a href="#faq" className="hover:text-black">Статус</a><a href="#faq" className="hover:text-black">Контакты</a></div></footer>
      </div>
      {demoOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-5 backdrop-blur-sm"><div className="w-full max-w-[420px] rounded-[28px] bg-[#f7f7f5] p-7 shadow-2xl"><div className="flex items-center justify-between"><h2 className="display text-2xl font-bold">Добро пожаловать</h2><button aria-label="Закрыть" onClick={() => setDemoOpen(false)}><X size={18}/></button></div><p className="mt-3 text-sm leading-relaxed text-[#6d6d6a]">Ваш workspace почти готов. Оставьте email — пришлём доступ к раннему запуску.</p><input autoFocus className="mt-6 w-full rounded-xl border border-[#d4d4d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#7ea68f]" placeholder="you@company.com"/><button onClick={() => setDemoOpen(false)} className="mt-3 w-full rounded-full bg-[#292929] py-3 text-sm font-semibold text-white">Получить доступ <ArrowRight className="ml-2 inline" size={14}/></button></div></div>}
    </div>
  );
}