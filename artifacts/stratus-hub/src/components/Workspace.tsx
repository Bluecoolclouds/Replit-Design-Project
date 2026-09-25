import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import { useGetWorkspace } from "@workspace/api-client-react";
import { ModelPrices } from "./ModelPrices";
import { CircleHelp, FileKey2, LayoutDashboard, LogOut, Menu, Search, Settings2, X } from "lucide-react";

const money = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency }).format(cents / 100);

const localizedStatus = (status: string) => {
  const normalized = status.toLowerCase();
  if (["ok", "success", "successful", "succeeded"].includes(normalized)) return "Успешно";
  if (["error", "failed", "failure"].includes(normalized)) return "Ошибка";
  if (["pending", "queued"].includes(normalized)) return "В обработке";
  return status;
};

export function Workspace() {
  const { data, isLoading, isError, error, refetch } = useGetWorkspace();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [query, setQuery] = useState("");
  const [transport, setTransport] = useState("Все");
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleRequests = useMemo(() => (data?.requests ?? []).filter((request) => {
    const haystack = `${request.keyName} ${request.model} ${request.status} ${request.error ?? ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (transport === "Все" || request.transport === transport);
  }), [data?.requests, query, transport]);

  return (
    <div className="workspace">
      <style>{`
        .workspace{min-height:100dvh;background:#f2f9fa;color:#153040;font-family:var(--app-font-sans,'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif);font-synthesis:none}
        .workspace *{box-sizing:border-box}.workspace button,.workspace input,.workspace select{font:inherit}
        .workspace-shell{max-width:1440px;margin:auto;padding:18px 24px 48px}.workspace-nav{height:58px;border:1px solid #dcecef;background:rgba(255,255,255,.84);border-radius:20px;display:flex;align-items:center;padding:0 14px 0 20px;gap:28px;box-shadow:0 8px 28px rgba(48,120,139,.07);position:sticky;top:14px;z-index:10;backdrop-filter:blur(14px)}
        .workspace-logo{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);font-size:18px;font-weight:800;letter-spacing:-.07em;color:#183746;white-space:nowrap;text-decoration:none}.workspace-logo span{color:#71b9c3}.workspace-navlinks{display:flex;gap:4px;align-items:center}.workspace-navlinks a{padding:8px 13px;border-radius:11px;color:#66818b;font-size:11px;text-decoration:none;display:flex;align-items:center;gap:5px}.workspace-navlinks a.active,.workspace-navlinks a:hover{background:#e6f4f6;color:#315d6d}.workspace-navright{margin-left:auto;display:flex;align-items:center;gap:8px}.workspace-icon{border:0;background:#edf5f6;color:#587883;width:33px;height:33px;border-radius:11px;display:grid;place-items:center;cursor:pointer}.workspace-menu{display:none}
        .workspace-head{display:flex;align-items:end;justify-content:space-between;margin:44px 2px 24px;gap:20px}.workspace-eyebrow{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#6a9ca9;font-weight:700}.workspace h1{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);letter-spacing:-.06em;font-size:34px;line-height:1;margin:9px 0 0}.workspace-sub{font-size:12px;color:#78919a;margin-top:8px}
        .workspace-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.workspace-card{min-width:0;border:1px solid #dcecef;background:rgba(255,255,255,.72);border-radius:20px;padding:20px;box-shadow:0 7px 22px rgba(48,120,139,.045)}.workspace-card h2{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);font-size:15px;letter-spacing:-.03em;margin:0}.workspace-card-label{color:#76929b;font-size:10px}.workspace-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;grid-column:1/-1}.workspace-metric{padding:17px;border:1px solid #dcecef;background:#fff;border-radius:16px}.workspace-metric strong{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);font-size:23px;display:block;letter-spacing:-.05em;margin:8px 0 4px;overflow-wrap:anywhere}.workspace-metric small{font-size:10px;color:#79939b}.workspace-card-label.upper{font-weight:700;text-transform:uppercase;letter-spacing:.08em}.workspace-log{grid-column:1/-1;overflow:hidden}.workspace-log-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:15px}.workspace-controls{display:flex;gap:7px;align-items:center}.workspace-search{border:1px solid #d8e9eb;background:#fafdfe;border-radius:9px;padding:8px 10px 8px 30px;font-size:10px;width:190px;outline:none;color:#315460}.workspace-search:focus{border-color:#83c5cc}.workspace-search-wrap{position:relative}.workspace-search-wrap svg{position:absolute;left:10px;top:8px;color:#8ca9b1}.workspace-select{border:1px solid #d8e9eb;background:#fafdfe;border-radius:9px;padding:8px 25px 8px 10px;color:#64818a;font-size:10px}.workspace-table-wrap{overflow:auto}.workspace table{width:100%;border-collapse:collapse;min-width:650px}.workspace th{text-align:left;color:#8aa4aa;text-transform:uppercase;letter-spacing:.1em;font-size:8px;font-weight:700;padding:10px 8px;border-bottom:1px solid #dcecef}.workspace td{padding:12px 8px;color:#526f78;font-size:10px;border-bottom:1px solid #e7f0f1}.workspace td:first-child{font-family:var(--app-font-mono,'SFMono-Regular',Consolas,monospace);color:#678a94}.workspace-status{display:inline-flex;padding:4px 7px;border-radius:7px;background:#ddf2e9;color:#4f9580;font-size:9px}.workspace-status.error{background:#fae7e7;color:#af6d72}.workspace-empty{padding:30px;text-align:center;color:#7d999f;font-size:12px}.workspace-state{grid-column:1/-1;padding:24px;border-radius:16px;background:#fff;border:1px solid #dcecef;color:#67838c;font-size:12px}.workspace-support{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.workspace-support a,.workspace-action{display:flex;align-items:center;gap:7px;color:#5d8490;background:#edf6f7;border:0;border-radius:9px;padding:9px 11px;text-decoration:none;font-size:10px;cursor:pointer}.workspace-support a:hover,.workspace-action:hover{background:#e0f1f3}
        @media(max-width:800px){.workspace-shell{padding:12px 13px 35px}.workspace-nav{top:8px}.workspace-navlinks{display:none}.workspace-menu{display:grid}.workspace-head{margin-top:32px;align-items:start;flex-direction:column}.workspace-grid{grid-template-columns:1fr}.workspace-metrics,.workspace-log{grid-column:auto}.workspace-metrics{grid-template-columns:1fr}.workspace-log-head{align-items:start;flex-direction:column}.workspace-controls{width:100%}.workspace-search{width:100%}.workspace-search-wrap{flex:1}}
        /* Keep the cabinet readable as live values and model prices vary. */
        .workspace-shell,.workspace-grid,.workspace-card,.workspace-log { min-width:0 }
        .workspace-grid { grid-template-columns:repeat(2,minmax(0,1fr)) }
        .workspace-nav { gap:clamp(10px,1.8vw,28px) }
        .workspace-navlinks a { display:inline-flex; align-items:center; gap:6px; white-space:nowrap; font-size:12px; line-height:1.4 }
        .workspace-navlinks a svg { flex:none }
        .workspace-navright { min-width:0; flex-shrink:1 }
        .workspace-navright > .workspace-card-label { min-width:0; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
        .workspace-eyebrow { font-size:11px }
        .workspace-sub { font-size:13px; line-height:1.5 }
        .workspace-card h2 { font-size:17px; line-height:1.3 }
        .workspace-card-label { font-size:12px; line-height:1.4 }
        .workspace-metric small { font-size:11px; line-height:1.5 }
        .workspace-controls,.workspace-search-wrap { min-width:0 }
        .workspace-search { font-size:12px; min-width:0 }
        .workspace-search-wrap svg { top:50%; transform:translateY(-50%) }
        .workspace-select { font-size:12px }
        .workspace-table-wrap { max-width:100%; overflow-x:auto }
        .workspace table { min-width:790px }
        .workspace th { font-size:10px; line-height:1.4 }
        .workspace td { font-size:12px; line-height:1.4 }
        .workspace td:first-child { font-size:11px }
        .workspace-status { font-size:11px }
        .workspace-support a { font-size:12px; line-height:1.4 }
        @media(max-width:950px) {
          .workspace-navlinks { display:none }
          .workspace-menu { display:grid }
        }
        @media(max-width:800px) {
          .workspace-grid { grid-template-columns:minmax(0,1fr) }
          .workspace-log,.workspace-metrics { min-width:0 }
        }
        @media(max-width:500px) {
          .workspace-nav { gap:10px }
          .workspace-navright > .workspace-card-label { max-width:21vw }
          .workspace-card { padding:17px }
          .workspace-controls { width:100% }
          .workspace-search-wrap { flex:1 }
          .workspace-search { width:100% }
        }
        @media(max-width:370px) {
          .workspace-log-head .workspace-controls { display:grid; grid-template-columns:minmax(0,1fr) 90px }
          .workspace-controls .workspace-search-wrap { grid-column:1/-1 }
          .workspace-controls .workspace-select { min-width:0; width:100% }
        }
      `}</style>
      <div className="workspace-shell">
        <nav className="workspace-nav" aria-label="Навигация рабочего пространства">
          <Link href="/" className="workspace-logo">stratus<span>/</span>hub</Link>
          <div className="workspace-navlinks"><Link href="/dashboard" className="active"><LayoutDashboard size={13}/> Кабинет</Link><a href="#logs">Запросы</a><Link href="/settings">API-ключи</Link><Link href="/docs">Документация</Link></div>
          <div className="workspace-navright"><span className="workspace-card-label">{user?.fullName ?? user?.primaryEmailAddress?.emailAddress}</span><Link href="/settings" className="workspace-icon" aria-label="Настройки"><Settings2 size={15}/></Link><button className="workspace-icon" aria-label="Выйти из аккаунта" onClick={() => signOut({ redirectUrl: import.meta.env.BASE_URL })}><LogOut size={15}/></button><button className="workspace-icon workspace-menu" aria-label="Открыть меню" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={15}/> : <Menu size={15}/>}</button></div>
        </nav>
        {mobileOpen && <div className="workspace-card" style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}><Link href="/settings">Настройки</Link><Link href="/docs">Документация</Link><a href="#logs">История запросов</a></div>}
        <header className="workspace-head"><div><div className="workspace-eyebrow">Рабочее пространство аккаунта</div><h1>Кабинет</h1><p className="workspace-sub">Текущий баланс, опубликованные цены и последние API-запросы.</p></div></header>
        <main className="workspace-grid">
          {isLoading && <div className="workspace-state" role="status">Загружаем данные кабинета…</div>}
          {isError && <div className="workspace-state" role="alert">Не удалось загрузить данные кабинета: {error instanceof Error ? error.message : "Попробуйте ещё раз."} <button className="workspace-action" onClick={() => void refetch()}>Повторить</button></div>}
          {data && <>
            <section className="workspace-metrics">
              <div className="workspace-metric" data-testid="metric-balance"><div className="workspace-card-label upper">Баланс аккаунта</div><strong>{money(data.account.balanceCents, data.account.currency)}</strong><small>Доступный баланс</small></div>
              <div className="workspace-metric" data-testid="metric-requests"><div className="workspace-card-label upper">Всего запросов</div><strong>{data.requestCount.toLocaleString("ru-RU")}</strong><small>Запросы, записанные для аккаунта</small></div>
              <div className="workspace-metric" data-testid="metric-spend"><div className="workspace-card-label upper">Потрачено</div><strong>{money(data.spentCents, data.account.currency)}</strong><small>Списания за API-запросы</small></div>
            </section>
            <ModelPrices />
            <section className="workspace-card" id="keys"><div className="workspace-card-label upper">Доступ к API</div><h2 style={{marginTop:6}}>Управление ключами</h2><p className="workspace-sub">Создавайте и отзывайте сохранённые ключи в настройках. Ключи пока не подключены к инференсу.</p><div className="workspace-support"><Link href="/settings"><FileKey2 size={13}/> Управление API-ключами</Link><Link href="/docs"><CircleHelp size={13}/> Документация</Link></div></section>
            <section className="workspace-card workspace-log" id="logs" data-testid="card-request-logs">
              <div className="workspace-log-head"><div><div className="workspace-card-label upper">История запросов</div><h2 style={{marginTop:6}}>Последние API-запросы</h2></div><div className="workspace-controls"><div className="workspace-search-wrap"><Search size={13}/><input className="workspace-search" aria-label="Поиск запросов" placeholder="Модель, ключ или статус" value={query} onChange={(e) => setQuery(e.target.value)}/></div><select className="workspace-select" aria-label="Фильтр по транспорту" value={transport} onChange={(e) => setTransport(e.target.value)}><option>Все</option>{Array.from(new Set(data.requests.map((request) => request.transport))).map((kind) => <option key={kind}>{kind}</option>)}</select></div></div>
              {data.requests.length === 0 ? <div className="workspace-empty">API-запросов пока нет.</div> : visibleRequests.length ? <div className="workspace-table-wrap"><table><thead><tr><th>Создан</th><th>Ключ</th><th>Модель</th><th>Транспорт</th><th>Статус</th><th>Токены</th><th>Списано</th><th>Ошибка</th></tr></thead><tbody>{visibleRequests.map((request) => <tr key={request.id}><td>{new Date(request.createdAt).toLocaleString("ru-RU")}</td><td>{request.keyName}</td><td>{request.model}</td><td>{request.transport}</td><td><span className={`workspace-status ${/error|fail/i.test(request.status) ? "error" : ""}`}>{localizedStatus(request.status)}</span></td><td>{(request.inputTokens + request.outputTokens).toLocaleString("ru-RU")}</td><td>{money(request.chargedCents, data.account.currency)}</td><td>{request.error || "—"}</td></tr>)}</tbody></table></div> : <div className="workspace-empty">По заданным фильтрам запросов нет.</div>}
            </section>
          </>}
        </main>
      </div>
    </div>
  );
}