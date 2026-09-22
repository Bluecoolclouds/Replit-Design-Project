import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft, Check, Copy, Info, Plus, ShieldAlert, ShieldCheck, Trash2, Settings2, Menu, X
} from "lucide-react";

type ApiKey = {
  id: string;
  name: string;
  maskedKey: string;
  usagePercent: number;
  usedLabel: string;
  limitLabel: string;
};

const initialKeys: ApiKey[] = [
  { id: "1", name: "агент", maskedKey: "sk-clb-_br••••••••••••", usagePercent: 4, usedLabel: "44,5 млн", limitLabel: "1 млрд" },
  { id: "2", name: "офлигры", maskedKey: "sk-clb-b6••••••••••••", usagePercent: 100, usedLabel: "5 млн", limitLabel: "5 млн" },
  { id: "3", name: "digi", maskedKey: "sk-clb-Hnc••••••••••••", usagePercent: 0, usedLabel: "141,1 тыс", limitLabel: "110 млн" },
  { id: "4", name: "user:nicklodeon555", maskedKey: "sk-clb-KDr••••••••••••", usagePercent: 0, usedLabel: "0", limitLabel: "∞" },
];

export function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyLimit, setNewKeyLimit] = useState("");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError("Введите текущий пароль");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Новый пароль должен содержать минимум 8 символов");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }

    // Success mockup
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    if (keys.length >= 20) return;

    const limitVal = newKeyLimit.trim() ? `${newKeyLimit.trim()} млн` : "∞";
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      maskedKey: `sk-clb-${Math.random().toString(36).substring(2, 5)}••••••••••••`,
      usagePercent: 0,
      usedLabel: "0",
      limitLabel: limitVal,
    };
    setKeys([newKey, ...keys]);
    setNewKeyName("");
    setNewKeyLimit("");
  };

  const handleRevoke = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 1500);
  };

  return (
    <div className="workspace">
      <style>{`
        .workspace{min-height:100dvh;background:#f2f9fa;color:#153040;font-family:var(--app-font-sans,'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif);font-synthesis:none}
        .workspace *{box-sizing:border-box}.workspace button,.workspace input,.workspace select{font:inherit}
        .settings-shell{max-width:1440px;margin:auto;padding:18px 24px 48px}
        .workspace-nav{height:58px;border:1px solid #dcecef;background:rgba(255,255,255,.84);border-radius:20px;display:flex;align-items:center;padding:0 14px 0 20px;gap:28px;box-shadow:0 8px 28px rgba(48,120,139,.07);position:sticky;top:14px;z-index:10;backdrop-filter:blur(14px)}
        .workspace-logo{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);font-size:18px;font-weight:800;letter-spacing:-.07em;color:#183746;white-space:nowrap;text-decoration:none}.workspace-logo b{color:#71b9c3}
        .workspace-navlinks{display:flex;gap:4px;align-items:center}.workspace-navlinks a,.workspace-back{padding:8px 13px;border-radius:11px;color:#66818b;font-size:11px;text-decoration:none;display:flex;align-items:center;gap:6px;transition:all .2s}.workspace-navlinks a.active,.workspace-navlinks a:hover,.workspace-back:hover{background:#e6f4f6;color:#315d6d}
        .workspace-navright{margin-left:auto;display:flex;align-items:center;gap:8px}.workspace-icon{border:0;background:#edf5f6;color:#587883;width:33px;height:33px;border-radius:11px;display:grid;place-items:center;cursor:pointer}.workspace-menu{display:none}
        .workspace-head{display:flex;align-items:end;justify-content:space-between;margin:44px 2px 24px;gap:20px}.workspace-eyebrow{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#6a9ca9;font-weight:700}.workspace h1{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);letter-spacing:-.06em;font-size:34px;line-height:1;margin:9px 0 0}.workspace-sub{font-size:12px;color:#78919a;margin-top:8px}

        .workspace-card{min-width:0;border:1px solid #dcecef;background:rgba(255,255,255,.72);border-radius:20px;padding:24px;box-shadow:0 7px 22px rgba(48,120,139,.045)}
        .workspace-card h2{font-family:var(--app-font-serif,'DM Sans','Plus Jakarta Sans',sans-serif);font-size:22px;letter-spacing:-.04em;margin:0}
        .workspace-card-label{color:#76929b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em}

        .settings-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:24px;margin-top:30px;min-width:0}.settings-grid>*{min-width:0}
        @media(min-width:1000px){.settings-grid{grid-template-columns:360px 1fr;align-items:start}}

        .settings-form-group{margin-top:16px;display:flex;flex-direction:column;gap:6px}
        .settings-label{font-size:11px;font-weight:600;color:#496d77}
        .settings-input{border:1px solid #d8e9eb;background:#fafdfe;border-radius:10px;padding:10px 12px;font-size:12px;color:#315460;outline:none;transition:border-color .2s}
        .settings-input:focus{border-color:#83c5cc;box-shadow:0 0 0 3px rgba(131,197,204,.15)}

        .settings-button{border:0;border-radius:10px;background:#244b5a;color:#eaf9fa;padding:10px 18px;font-size:12px;font-weight:700;cursor:pointer;transition:transform .2s,background .2s;display:inline-flex;align-items:center;justify-content:center;gap:6px;width:100%}
        .settings-button:hover{transform:translateY(-1px);background:#326b7a}
        .settings-button:disabled{opacity:0.5;cursor:not-allowed;transform:none;background:#5e7b85}

        .settings-alert{padding:12px 14px;border-radius:12px;font-size:11px;line-height:1.5;display:flex;align-items:flex-start;gap:10px;margin-top:16px}
        .settings-alert-info{background:#edf6f7;color:#527783;border:1px solid #dcecef}
        .settings-alert-info svg{color:#6a9ca9;flex-shrink:0}
        .settings-alert-success{background:#edf7f2;color:#498063;border:1px solid #cde6d9}
        .settings-alert-success svg{color:#5ea680;flex-shrink:0}
        .settings-alert-error{background:#fae7e7;color:#af6d72;border:1px solid #eed6d6}
        .settings-alert-error svg{color:#c47e84;flex-shrink:0}

        .key-table-wrap{overflow:auto;margin-top:20px;border:1px solid #dcecef;border-radius:14px;background:#fff}
        .key-table{width:100%;border-collapse:collapse;min-width:450px}
        .key-table th{text-align:left;color:#8aa4aa;text-transform:uppercase;letter-spacing:.08em;font-size:9px;font-weight:700;padding:12px 16px;border-bottom:1px solid #dcecef;background:#fafdfe}
        .key-table td{padding:14px 16px;color:#526f78;font-size:11px;border-bottom:1px solid #eff5f6;vertical-align:middle}
        .key-table tr:last-child td{border-bottom:0}

        .key-name{font-weight:700;color:#315460;font-size:12px;margin-bottom:4px}
        .key-masked{font-family:var(--app-font-mono,'SFMono-Regular',Consolas,monospace);font-size:10px;color:#6a9ca9;background:#f2f9fa;padding:3px 6px;border-radius:6px;display:inline-flex;align-items:center;gap:6px}

        .key-copy-inline{border:0;background:none;color:inherit;cursor:pointer;padding:2px;border-radius:4px;display:inline-flex;align-items:center;opacity:0.7;transition:all .2s}
        .key-copy-inline:hover{opacity:1;background:rgba(0,0,0,0.05)}

        .key-progress-bar{height:6px;background:#e5f0f1;border-radius:3px;overflow:hidden;margin-top:6px;width:100%}
        .key-progress-fill{height:100%;background:#56aeb9;border-radius:3px;transition:width .3s}
        .key-progress-fill.full{background:#c07b7b}

        .key-actions{display:flex;align-items:center;gap:8px;justify-content:flex-end}
        .key-action-btn{border:0;background:none;color:#8ba8b0;cursor:pointer;padding:6px;border-radius:8px;display:inline-flex;align-items:center;transition:all .2s}
        .key-action-btn:hover{background:#edf5f6;color:#315460}
        .key-action-btn.delete:hover{background:#fae7e7;color:#b66e72}

        .new-key-form{display:grid;grid-template-columns:1fr 110px auto;gap:12px;align-items:end;margin-top:20px;padding-top:20px;border-top:1px dashed #dcecef}
        @media(max-width:700px){.new-key-form{grid-template-columns:1fr;align-items:stretch}}
        @media(max-width:800px){
          .settings-shell{padding:12px 13px 35px}
          .workspace-nav{top:8px}
          .workspace-navlinks{display:none}
          .workspace-menu{display:grid}
          .workspace-head{margin-top:32px;align-items:start;flex-direction:column}
        }
      `}</style>
      
      <div className="settings-shell">
        <nav className="workspace-nav" aria-label="Навигация настроек">
          <Link href="/" className="workspace-logo" data-testid="link-settings-logo">stratus<span>/</span>hub</Link>
          <div className="workspace-navlinks">
            <Link href="/dashboard" data-testid="link-settings-dashboard"><ArrowLeft size={13}/> Кабинет</Link>
            <Link href="/settings" className="active" data-testid="link-settings-active">Настройки</Link>
          </div>
          <div className="workspace-navright">
            <span className="workspace-card-label" style={{textTransform:'none', letterSpacing:'normal'}}>nicklodeon555</span>
            <Link href="/settings" className="workspace-icon" aria-label="Настройки" data-testid="button-settings" style={{textDecoration:'none', color:'inherit'}}>
              <Settings2 size={15}/>
            </Link>
            <button className="workspace-icon workspace-menu" aria-label="Открыть меню" data-testid="button-mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={15}/> : <Menu size={15}/>}
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="workspace-card" style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/" className="workspace-back" data-testid="link-mobile-home">Вернуться на сайт</Link>
            <Link href="/dashboard" className="workspace-back" data-testid="link-mobile-dashboard">Кабинет</Link>
            <Link href="/settings" className="workspace-back" data-testid="link-mobile-settings">Настройки</Link>
          </div>
        )}

        <header className="workspace-head">
          <div>
            <div className="workspace-eyebrow">Управление аккаунтом</div>
            <h1 data-testid="text-settings-title">Настройки</h1>
            <p className="workspace-sub">Безопасность и маршрутизация API-запросов.</p>
          </div>
        </header>

        <main className="settings-grid">
          <section className="workspace-card" data-testid="card-security">
            <div className="workspace-card-label">Авторизация</div>
            <h2 style={{marginTop:4, marginBottom:16}}>Безопасность аккаунта</h2>

            <form onSubmit={handlePasswordSubmit}>
              <input type="text" name="username" autoComplete="username" value="nicklodeon555" readOnly hidden/>
              <div className="settings-form-group">
                <label className="settings-label">Текущий пароль</label>
                <input className="settings-input" type="password" autoComplete="current-password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} data-testid="input-current-password"/>
              </div>
              <div className="settings-form-group">
                <label className="settings-label">Новый пароль</label>
                <input className="settings-input" type="password" autoComplete="new-password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} data-testid="input-new-password"/>
              </div>
              <div className="settings-form-group">
                <label className="settings-label">Подтвердите новый пароль</label>
                <input className="settings-input" type="password" autoComplete="new-password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} data-testid="input-confirm-password"/>
              </div>

              {passwordError && (
                <div className="settings-alert settings-alert-error" data-testid="alert-password-error">
                  <ShieldAlert size={16} />
                  <div>{passwordError}</div>
                </div>
              )}

              {passwordSuccess && (
                <div className="settings-alert settings-alert-success" data-testid="alert-password-success">
                  <ShieldCheck size={16} />
                  <div>Пароль успешно изменён. Текущая сессия в браузере останется активной.</div>
                </div>
              )}

              <div className="settings-alert settings-alert-info" style={{marginBottom: 20}}>
                <Info size={16} />
                <div>После смены пароля <strong>другие сессии на всех устройствах будут завершены</strong>. Текущая сессия в браузере останется активной.</div>
              </div>

              <button className="settings-button" type="submit" data-testid="button-update-password">Сменить пароль</button>
            </form>
          </section>

          <section className="workspace-card" data-testid="card-api-keys">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div className="workspace-card-label">Интеграция</div>
                <h2 style={{marginTop:4}}>API ключи</h2>
              </div>
              <div style={{fontSize:12, fontWeight:700, color:'#56aeb9', background:'#edf6f7', padding:'4px 10px', borderRadius:10}}>
                {keys.length} / 20
              </div>
            </div>

            <div className="key-table-wrap">
              <table className="key-table">
                <thead>
                  <tr>
                    <th>Название и ключ</th>
                    <th style={{width: 150}}>Использование</th>
                    <th style={{width: 60, textAlign:'right'}}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map(key => (
                    <tr key={key.id} data-testid={`row-api-key-${key.id}`}>
                      <td>
                        <div className="key-name">{key.name}</div>
                        <div className="key-masked">
                          {key.maskedKey} 
                          <button type="button" onClick={() => handleCopy(key.id, key.maskedKey)} title="Копировать" className="key-copy-inline" data-testid={`button-copy-${key.id}`}>
                            {copiedKeyId === key.id ? <Check size={10}/> : <Copy size={10}/>}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:10}}>
                          <span>{key.usedLabel}</span>
                          <span style={{color: '#8aa4aa'}}>{key.limitLabel}</span>
                        </div>
                        <div className="key-progress-bar">
                          <div className={`key-progress-fill ${key.usagePercent >= 100 ? 'full' : ''}`} style={{width: `${Math.min(key.usagePercent, 100)}%`}}></div>
                        </div>
                      </td>
                      <td>
                        <div className="key-actions">
                          <button type="button" className="key-action-btn delete" onClick={() => handleRevoke(key.id)} title="Отозвать ключ" data-testid={`button-revoke-${key.id}`}><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {keys.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{textAlign:'center', padding: '30px 10px', color: '#8aa4aa'}}>
                        У вас пока нет API ключей
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <form className="new-key-form" onSubmit={handleCreateKey}>
              <div className="settings-form-group" style={{marginTop:0}}>
                <label className="settings-label">Название ключа</label>
                <input className="settings-input" value={newKeyName} onChange={e=>setNewKeyName(e.target.value)} placeholder="например, prod-server" data-testid="input-new-key-name"/>
              </div>
              <div className="settings-form-group" style={{marginTop:0}}>
                <label className="settings-label">Лимит (млн)</label>
                <input className="settings-input" type="number" min="0.1" step="0.1" value={newKeyLimit} onChange={e=>setNewKeyLimit(e.target.value)} placeholder="∞" data-testid="input-new-key-limit"/>
              </div>
              <button className="settings-button" type="submit" disabled={!newKeyName.trim() || keys.length >= 20} data-testid="button-create-key">
                <Plus size={14}/> Создать
              </button>
            </form>
            
            <div style={{marginTop: 16, fontSize: 10, color: '#8aa4aa', textAlign: 'center'}}>
              Это демонстрационный интерфейс (UI state). Реальные ключи не создаются.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
