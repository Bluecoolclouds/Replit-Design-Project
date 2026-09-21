import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Copy,
  Globe2,
  Layers3,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
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
`;

const navItems = ["Продукт", "Возможности", "Тарифы", "FAQ"];

export function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<"RU" | "EN">("RU");
  const [demoOpen, setDemoOpen] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText("sk_live_••••••••8f2a");
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
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
              <p className="mt-7 max-w-[460px] text-[17px] leading-[1.55] text-[#666]">Единый API-прокси для OpenAI, Anthropic, Google и других. Подключай инструменты, выбирай модели и плати только за использованные токены.</p>
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

          <section id="продукт" className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
            <div><div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#767676]"><Sparkles size={14} className="text-[#7ea68f]"/> Один слой для всего</div><h2 className="display max-w-[490px] text-[43px] font-extrabold leading-[.98] sm:text-[58px]">От идеи до работающего проекта.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[{icon:Network,title:"Один API",text:"Одинаковый формат запросов для любой модели. Переключай провайдера без переписывания кода."},{icon:Zap,title:"Умная маршрутизация",text:"Автоматически отправляй запросы к лучшей модели по цене, скорости или качеству."},{icon:Terminal,title:"Готово за минуту",text:"Скопируй ключ, вставь endpoint и отправь первый запрос. Никаких SDK и сложных настроек."},{icon:ShieldCheck,title:"Прозрачные расходы",text:"Видь каждую модель и каждый токен. Установи лимиты, чтобы расходы были под контролем."}].map(({icon:Icon,title,text}) => <div key={title} className="rounded-[24px] bg-[#ededeb] p-6 transition hover:-translate-y-1 hover:bg-[#e7e7e4]"><Icon size={19} className="mb-10 text-[#719984]"/><h3 className="text-[16px] font-bold">{title}</h3><p className="mt-2 text-[13px] leading-[1.55] text-[#6c6c6a]">{text}</p></div>)}
            </div>
          </section>

          <section id="возможности" className="grid items-center gap-12 rounded-[32px] bg-[#292929] px-7 py-10 text-white sm:px-12 sm:py-14 lg:grid-cols-[1fr_1fr]">
            <div><div className="mb-4 flex items-center gap-2 text-[11px] text-[#bdbdb8]"><CircleHelp size={14} className="text-[#9fc8b4]"/> API, который не мешает</div><h2 className="display max-w-[460px] text-[42px] font-extrabold leading-[.98] sm:text-[55px]">Меньше инфраструктуры. Больше продукта.</h2><p className="mt-6 max-w-[420px] text-[14px] leading-relaxed text-[#aaa9a5]">stratus/hub берёт на себя ключи, лимиты, фолбэки и наблюдаемость. Ты строишь продукт — мы держим шлюз.</p><button onClick={copy} className="mt-7 rounded-full bg-[#f3f3f0] px-4 py-3 text-[12px] font-semibold text-[#252525]">{copied ? <Check className="mr-2 inline text-[#6f9c84]" size={14}/> : <Copy className="mr-2 inline" size={14}/>} {copied ? "Скопировано" : "Скопировать API-ключ"}</button></div>
            <div className="rounded-[23px] bg-[#363635] p-5 font-mono text-[11px] leading-[2] text-[#b6b6b1] shadow-2xl"><div className="mb-4 flex items-center gap-2 text-[10px] text-[#83837e]"><span className="h-2 w-2 rounded-full bg-[#df7770]"/><span className="h-2 w-2 rounded-full bg-[#d6ae6f]"/><span className="h-2 w-2 rounded-full bg-[#81b99b]"/><span className="ml-auto">request.ts</span></div><div><span className="text-[#9dbda9]">const</span> response = <span className="text-[#d9be8d]">await</span> hub.chat.completions.create({"{"}</div><div className="pl-4">model: <span className="text-[#b8ce9b]">&quot;auto / balanced&quot;</span>,</div><div className="pl-4">messages: messages,</div><div className="pl-4">stream: <span className="text-[#b8ce9b]">true</span></div><div>{"}"}</div><div className="mt-4 text-[#83b59d]">✓ routed to claude-3-5-sonnet · 412ms</div></div>
          </section>

          <section id="тарифы" className="py-20 sm:py-28"><div className="flex flex-wrap items-end justify-between gap-6"><div><div className="mb-4 text-[11px] font-medium text-[#767676]">Простые тарифы</div><h2 className="display text-[44px] font-extrabold leading-none sm:text-[58px]">Плати за то,<br/>что используешь.</h2></div><div className="max-w-[245px] text-[13px] leading-relaxed text-[#747472]">Начни бесплатно. Перейди на Pro, когда продукт начнёт расти.</div></div><div className="mt-10 grid gap-4 sm:grid-cols-2"><div className="rounded-[24px] border border-[#dededb] p-7"><div className="text-[14px] font-semibold">Hobby</div><div className="mt-5 text-[39px] font-bold tracking-[-.06em]">$0 <span className="text-[13px] font-normal text-[#777]">/ месяц</span></div><p className="mt-3 text-[12px] text-[#777]">Для первых прототипов и экспериментов.</p><button onClick={() => setDemoOpen(true)} className="mt-7 w-full rounded-full border border-[#bbb] py-3 text-[12px] font-semibold hover:bg-[#ededeb]">Начать бесплатно</button></div><div className="rounded-[24px] bg-[#e2eee7] p-7"><div className="flex items-center justify-between text-[14px] font-semibold">Pro <span className="rounded-full bg-[#c4dfcf] px-2 py-1 text-[9px] text-[#466653]">ПОПУЛЯРНЫЙ</span></div><div className="mt-5 text-[39px] font-bold tracking-[-.06em]">$19 <span className="text-[13px] font-normal text-[#607b6a]">/ месяц</span></div><p className="mt-3 text-[12px] text-[#607b6a]">Для продуктов, которые уже в продакшене.</p><button onClick={() => setDemoOpen(true)} className="mt-7 w-full rounded-full bg-[#292929] py-3 text-[12px] font-semibold text-white hover:bg-[#454545]">Подключить Pro <ArrowRight className="ml-2 inline" size={13}/></button></div></div></section>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-[#dededb] pt-7 text-[11px] text-[#787876]"><span className="font-semibold text-[#373735]">stratus/hub</span><span>© 2024 Northstar Labs</span><div className="flex gap-5"><a href="#faq" className="hover:text-black">Документация</a><a href="#faq" className="hover:text-black">Статус</a><a href="#faq" className="hover:text-black">Контакты</a></div></footer>
      </div>
      {demoOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-5 backdrop-blur-sm"><div className="w-full max-w-[420px] rounded-[28px] bg-[#f7f7f5] p-7 shadow-2xl"><div className="flex items-center justify-between"><h2 className="display text-2xl font-bold">Добро пожаловать</h2><button aria-label="Закрыть" onClick={() => setDemoOpen(false)}><X size={18}/></button></div><p className="mt-3 text-sm leading-relaxed text-[#6d6d6a]">Ваш workspace почти готов. Оставьте email — пришлём доступ к раннему запуску.</p><input autoFocus className="mt-6 w-full rounded-xl border border-[#d4d4d0] bg-white px-4 py-3 text-sm outline-none focus:border-[#7ea68f]" placeholder="you@company.com"/><button onClick={() => setDemoOpen(false)} className="mt-3 w-full rounded-full bg-[#292929] py-3 text-sm font-semibold text-white">Получить доступ <ArrowRight className="ml-2 inline" size={14}/></button></div></div>}
    </div>
  );
}