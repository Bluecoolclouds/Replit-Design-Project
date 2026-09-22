import { useState } from "react";
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  Copy,
  Globe2,
  Layers3,
  LockKeyhole,
  Sparkles,
  Zap,
} from "lucide-react";

const styles = `
  @keyframes iceFloat { 0%,100% { transform: translateY(0) rotate(-1deg) } 50% { transform: translateY(-10px) rotate(1deg) } }
  @keyframes cloudDrift { 0%,100% { transform: translateX(0) } 50% { transform: translateX(10px) } }
  @keyframes shimmer { 0% { transform: translateX(-130%) } 100% { transform: translateX(130%) } }
  .ice-page * { box-sizing: border-box }
  .ice-page { color: #132a3a; font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif; background: #edf7fb; }
  .ice-page .ice-display { font-family: "DM Sans", "Plus Jakarta Sans", sans-serif; letter-spacing: -.075em; }
  .ice-page button { font: inherit; cursor: pointer; }
  .ice-page .ice-float { animation: iceFloat 7s ease-in-out infinite; }
  .ice-page .cloud-drift { animation: cloudDrift 8s ease-in-out infinite; }
  .ice-page .ice-button { transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease; }
  .ice-page .ice-button:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(72, 142, 170, .2); }
  .ice-page .ice-shimmer { overflow: hidden; position: relative; }
  .ice-page .ice-shimmer::after { content: ""; position: absolute; inset: 0 auto 0 -30%; width: 30%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent); transform: skewX(-18deg); animation: shimmer 5s ease-in-out infinite; pointer-events: none; }
`;

const models = [
  { name: "Claude Sonnet", provider: "Anthropic", color: "#d3ecf4" },
  { name: "GPT-5.5", provider: "OpenAI", color: "#d9f3ed" },
  { name: "Gemini Flash", provider: "Google", color: "#e3e5fa" },
];

export function AiProxyIceCopy1GH556P1() {
  const [activeModel, setActiveModel] = useState(0);
  const [copied, setCopied] = useState(false);
  const copyKey = () => {
    navigator.clipboard?.writeText("sk_ice_test_••••••8f2a");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="ice-page min-h-screen overflow-hidden">
      <style>{styles}</style>
      <div className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 lg:px-12">
        <header className="mt-5 flex items-center justify-between rounded-full border border-white/70 bg-white/55 px-5 py-3 shadow-[0_10px_35px_rgba(71,126,150,.08)] backdrop-blur-xl sm:px-7">
          <button className="ice-display text-[19px] font-extrabold tracking-[-.07em]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            stratus<span className="text-[#74b8ca]">/</span>ice
          </button>
          <nav className="hidden items-center gap-7 text-[12px] font-medium text-[#54707f] md:flex">
            <a href="#cloud">Платформа</a>
            <a href="#models">Модели</a>
            <a href="#quickstart">Быстрый старт</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1 rounded-full bg-white/65 px-3 py-2 text-[10px] font-semibold text-[#527080] sm:flex"><Globe2 size={13}/>RU</button>
            <button className="ice-button rounded-full bg-[#173c50] px-4 py-2.5 text-[11px] font-semibold text-white">Начать бесплатно <ArrowRight className="ml-2 inline" size={13}/></button>
          </div>
        </header>

        <main>
          <section id="cloud" className="grid items-center gap-12 pb-20 pt-20 sm:pt-28 lg:grid-cols-[.86fr_1.14fr] lg:gap-16 lg:pb-28">
            <div className="max-w-[590px]">
              <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.15em] text-[#6799a9]"><span className="h-2 w-2 rounded-full bg-[#8ad1da]"/> cloud gateway · live</div>
              <h1 className="ice-display max-w-[630px] text-[58px] font-extrabold leading-[.91] text-[#122e40] sm:text-[82px]">Лёгкий слой<br/><span className="text-[#6daebe]">для всех</span> моделей.</h1>
              <p className="mt-7 max-w-[490px] text-[16px] leading-[1.6] text-[#5e7a87]">Один прохладный API-слой для OpenAI, Anthropic, Google и медиа-моделей. Маршрутизация, лимиты и наблюдаемость уже внутри.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="ice-button rounded-full bg-[#173c50] px-5 py-3.5 text-[13px] font-semibold text-white">Создать API-ключ <ArrowRight className="ml-2 inline" size={15}/></button>
                <a className="text-[13px] font-semibold text-[#4d7c8e] underline decoration-[#a3ced7] underline-offset-4" href="#models">Смотреть модели <ArrowRight className="ml-1 inline" size={13}/></a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#6e8b96]"><span><Check size={13} className="mr-1 inline text-[#62b6b5]"/>Оплата по факту</span><span><LockKeyhole size={13} className="mr-1 inline text-[#62b6b5]"/>Ключи в одном контуре</span></div>
            </div>

            <div className="ice-shimmer relative min-h-[420px] overflow-hidden rounded-[38px] border border-white/80 bg-[radial-gradient(circle_at_62%_21%,rgba(255,255,255,.98),transparent_29%),linear-gradient(145deg,#d9f1f5,#b8dbe7)] p-6 shadow-[0_30px_80px_rgba(83,154,176,.2)] sm:min-h-[540px] sm:p-10">
              <div className="absolute -right-20 top-8 h-56 w-56 rounded-full bg-white/30 blur-3xl"/>
              <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#8bd4da]/25 blur-3xl"/>
              <div className="relative flex h-full min-h-[365px] items-center justify-center">
                <div className="ice-float relative w-full max-w-[410px]">
                  <div className="cloud-drift absolute -left-2 top-9 rounded-2xl border border-white/70 bg-white/72 px-3 py-2 text-[10px] font-semibold text-[#426879] shadow-[0_10px_25px_rgba(70,135,157,.13)]">your app <Code2 className="ml-2 inline" size={12}/></div>
                  <div className="relative mx-auto grid h-[190px] w-[190px] place-items-center rounded-[54px] border-[10px] border-white/65 bg-[#edfaff]/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,.8),0_25px_45px_rgba(64,131,151,.19)] backdrop-blur-xl sm:h-[220px] sm:w-[220px]">
                    <div className="grid h-24 w-24 place-items-center rounded-[30px] border border-white/75 bg-[#d4f0f2]/70 text-[#4b95aa] shadow-[0_12px_25px_rgba(72,155,171,.16)]"><Cloud size={43} strokeWidth={1.3}/></div>
                    <span className="absolute -right-2 top-9 h-3 w-3 rounded-full bg-[#7ad4c7] ring-4 ring-[#d4eef1]"/>
                  </div>
                  <div className="absolute -right-3 top-12 rounded-2xl border border-white/80 bg-white/75 px-3 py-2 text-[10px] font-semibold text-[#426879] shadow-[0_10px_25px_rgba(70,135,157,.13)]">route / balanced <Zap className="ml-2 inline text-[#59b4b6]" size={12}/></div>
                  <div className="absolute -bottom-5 left-1 rounded-2xl border border-white/75 bg-white/75 px-3 py-2 text-[10px] text-[#527481] shadow-[0_10px_25px_rgba(70,135,157,.12)]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#71ccb9]"/> 99.98% uptime</div>
                </div>
              </div>
              <div className="relative flex items-center justify-between text-[11px] font-medium text-[#5b7f8b]"><span>One gateway. Every model.</span><span className="font-mono">01 / 04</span></div>
            </div>
          </section>

          <section id="models" className="border-y border-[#cfe4e8] py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div><div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.14em] text-[#6b9ead]"><Layers3 size={14}/> ice model catalog</div><h2 className="ice-display max-w-[590px] text-[44px] font-extrabold leading-[.96] sm:text-[62px]">Холодная голова.<br/>Тёплый баланс.</h2></div>
              <p className="max-w-[270px] text-[13px] leading-relaxed text-[#63818c]">Выбирай модель по задаче, а не по привязке к провайдеру. Переключение без переписывания кода.</p>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {models.map((model, index) => <button key={model.name} onClick={() => setActiveModel(index)} className={`rounded-[24px] border p-5 text-left transition ${activeModel === index ? "border-[#8fc8d2] bg-white/75 shadow-[0_14px_35px_rgba(74,145,163,.12)]" : "border-white/70 bg-white/42 hover:bg-white/70"}`}><div className="flex items-center justify-between"><span className="grid h-9 w-9 place-items-center rounded-xl text-[11px] font-bold text-[#4e8494]" style={{ backgroundColor: model.color }}>{model.name[0]}</span><span className="text-[10px] font-semibold text-[#72a4b2]">pay as you go</span></div><div className="mt-7 text-[16px] font-bold text-[#1d3d4b]">{model.name}</div><div className="mt-1 text-[11px] text-[#718d96]">{model.provider} · 1M context</div><div className="mt-5 flex items-end justify-between border-t border-[#d8eaed] pt-4"><div><div className="text-[9px] uppercase tracking-[.1em] text-[#89a5ad]">вход / 1M</div><div className="mt-1 text-[18px] font-bold text-[#4d98a1]">{["41 ₽", "69 ₽", "21 ₽"][index]}</div></div><div className="text-right"><div className="text-[9px] uppercase tracking-[.1em] text-[#89a5ad]">выход / 1M</div><div className="mt-1 text-[18px] font-bold text-[#4d98a1]">{["207 ₽", "413 ₽", "124 ₽"][index]}</div></div></div></button>)}
            </div>
          </section>

          <section id="quickstart" className="grid gap-10 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><div className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.14em] text-[#6b9ead]"><Sparkles size={14}/> мягкий старт</div><h2 className="ice-display max-w-[520px] text-[45px] font-extrabold leading-[.95] sm:text-[62px]">Скопируй.<br/>Отправь.<br/><span className="text-[#6daebe]">Готово.</span></h2><p className="mt-6 max-w-[380px] text-[14px] leading-relaxed text-[#63818c]">Один OpenAI-совместимый endpoint для всех моделей. Без лишней настройки и холодного старта.</p></div>
            <div className="rounded-[28px] border border-white/80 bg-[#163a4c] p-5 text-[#d7f0f2] shadow-[0_22px_50px_rgba(38,100,120,.18)] sm:p-7"><div className="flex items-center justify-between text-[10px] text-[#8fbac4]"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#79d3c3]"/> quickstart.ts</span><button onClick={copyKey} className="ice-button rounded-full bg-white/10 px-3 py-1.5 font-semibold text-[#bce7e5]">{copied ? <Check className="mr-1 inline" size={12}/> : <Copy className="mr-1 inline" size={12}/>} {copied ? "Скопировано" : "Копировать"}</button></div><pre className="mt-7 overflow-x-auto font-mono text-[11px] leading-[1.9] text-[#c7e8ea]"><code><span className="text-[#7fd3c6]">curl</span> https://api.stratus.ice/v1/chat/completions \{"\n"}  -H <span className="text-[#b8dcae]">&quot;Authorization: Bearer sk_ice_test_••••••8f2a&quot;</span> \{"\n"}  -d <span className="text-[#b8dcae]">&apos;{"{\"model\":\"claude-sonnet\",\"messages\":[...]}"}&apos;</span></code></pre><div className="mt-7 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] text-[#9fcbd0]"><span>единый endpoint · 186 моделей</span><span>response 486ms</span></div></div>
          </section>
        </main>
      </div>
    </div>
  );
}