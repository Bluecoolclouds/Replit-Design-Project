import { useState } from "react";
import { Link } from "wouter";
import { useClerk, useUser } from "@clerk/react";
import { useCreateKey, useGetWorkspace, useRevokeKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetWorkspaceQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, Check, Copy, Info, LogOut, Plus, Trash2 } from "lucide-react";

export function Settings() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useGetWorkspace();
  const createKey = useCreateKey();
  const revokeKey = useRevokeKey();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [newKeyName, setNewKeyName] = useState("");
  const [createdSecret, setCreatedSecret] = useState<{ name: string; secret: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [mutationError, setMutationError] = useState("");
  const keys = data?.keys ?? [];

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = newKeyName.trim();
    if (!name) return;
    setMutationError("");
    try {
      const result = await createKey.mutateAsync({ data: { name } });
      setCreatedSecret({ name: result.key.name, secret: result.secret });
      setNewKeyName("");
      await queryClient.invalidateQueries({ queryKey: getGetWorkspaceQueryKey() });
    } catch (cause) {
      setMutationError(cause instanceof Error ? `Не удалось создать API-ключ: ${cause.message}` : "Не удалось создать API-ключ.");
    }
  };

  const handleRevoke = async (id: string, name: string) => {
    if (!window.confirm(`Отозвать ключ «${name}»? Это действие нельзя отменить.`)) return;
    setMutationError("");
    try {
      await revokeKey.mutateAsync({ id });
      await queryClient.invalidateQueries({ queryKey: getGetWorkspaceQueryKey() });
    } catch (cause) {
      setMutationError(cause instanceof Error ? `Не удалось отозвать API-ключ: ${cause.message}` : "Не удалось отозвать API-ключ.");
    }
  };

  const copySecret = async () => {
    if (!createdSecret) return;
    try {
      await navigator.clipboard.writeText(createdSecret.secret);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setMutationError("Не удалось скопировать в буфер обмена. Выделите и скопируйте секрет вручную.");
    }
  };

  return (
    <div className="workspace settings-page">
      <style>{`
        .settings-page{min-height:100dvh;background:#f2f9fa;color:#153040;font-family:var(--app-font-sans,'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif)}.settings-page *{box-sizing:border-box}.settings-shell{max-width:1180px;margin:auto;padding:18px 24px 48px}.settings-nav{height:58px;border:1px solid #dcecef;background:rgba(255,255,255,.84);border-radius:20px;display:flex;align-items:center;padding:0 18px;gap:20px;box-shadow:0 8px 28px rgba(48,120,139,.07)}.settings-logo{font-size:18px;font-weight:800;letter-spacing:-.07em;color:#183746;text-decoration:none}.settings-logo span{color:#71b9c3}.settings-navlinks{display:flex;gap:8px}.settings-navlinks a{font-size:11px;color:#66818b;text-decoration:none;padding:8px 12px;border-radius:10px}.settings-navlinks a:hover,.settings-navlinks .active{background:#e6f4f6;color:#315d6d}.settings-navright{margin-left:auto;display:flex;align-items:center;gap:9px;color:#76929b;font-size:11px}.settings-logout{border:0;border-radius:10px;padding:9px 11px;background:#edf5f6;color:#587883;display:flex;gap:7px;align-items:center;cursor:pointer;font-size:11px}.settings-head{margin:42px 2px 24px}.settings-eyebrow,.settings-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#6a9ca9;font-weight:700}.settings-head h1{font-size:34px;letter-spacing:-.06em;margin:8px 0}.settings-head p{font-size:12px;color:#78919a}.settings-card{border:1px solid #dcecef;background:rgba(255,255,255,.78);border-radius:20px;padding:24px;box-shadow:0 7px 22px rgba(48,120,139,.045)}.settings-card h2{font-size:20px;letter-spacing:-.04em;margin:5px 0 8px}.settings-copy{font-size:12px;line-height:1.6;color:#78919a}.settings-note{margin:18px 0;padding:13px 14px;border:1px solid #dcecef;background:#edf6f7;color:#527783;border-radius:12px;font-size:11px;line-height:1.55;display:flex;gap:9px;align-items:flex-start}.settings-alert{margin:14px 0;padding:12px 14px;border-radius:12px;background:#fae7e7;border:1px solid #eed6d6;color:#af6d72;font-size:11px}.settings-form{display:flex;gap:10px;margin:20px 0}.settings-input{flex:1;min-width:0;border:1px solid #d8e9eb;background:#fafdfe;border-radius:10px;padding:11px 12px;font-size:12px;color:#315460;outline:none}.settings-input:focus{border-color:#83c5cc}.settings-button{border:0;border-radius:10px;background:#244b5a;color:#eaf9fa;padding:10px 16px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px}.settings-button:disabled{opacity:.5;cursor:not-allowed}.settings-table-wrap{overflow:auto;margin-top:20px;border:1px solid #dcecef;border-radius:14px;background:#fff}.settings-table{width:100%;border-collapse:collapse;min-width:470px}.settings-table th{text-align:left;color:#8aa4aa;text-transform:uppercase;letter-spacing:.08em;font-size:9px;padding:12px 16px;border-bottom:1px solid #dcecef;background:#fafdfe}.settings-table td{padding:14px 16px;color:#526f78;font-size:11px;border-bottom:1px solid #eff5f6}.key-prefix{display:inline-block;font-family:var(--app-font-mono,monospace);font-size:10px;color:#6a9ca9;background:#f2f9fa;padding:5px 7px;border-radius:6px}.settings-revoke{border:0;background:transparent;color:#9c7478;cursor:pointer;padding:7px;border-radius:8px}.settings-revoke:hover{background:#fae7e7}.settings-empty,.settings-state{text-align:center;padding:28px;color:#78919a;font-size:12px}.secret-box{padding:17px;border:1px solid #badbd5;background:#eff8f4;border-radius:14px;margin-top:20px}.secret-title{color:#3f795f;font-size:13px;font-weight:700}.secret-warning{color:#55796a;font-size:11px;line-height:1.55;margin:8px 0}.secret-value{display:flex;align-items:center;gap:8px;padding:10px;border-radius:9px;background:white;color:#365d51;font-family:var(--app-font-mono,monospace);font-size:11px;overflow-wrap:anywhere}.secret-value button{flex:none;border:0;background:#e7f3ed;border-radius:7px;padding:7px;color:#42775e;cursor:pointer}@media(max-width:650px){.settings-shell{padding:12px 13px 35px}.settings-navlinks{display:none}.settings-head{margin-top:30px}.settings-form{flex-direction:column}.settings-form .settings-button{min-height:42px}.settings-navright>span{display:none}}
      `}</style>
      <div className="settings-shell">
        <nav className="settings-nav" aria-label="Навигация по настройкам">
          <Link href="/" className="settings-logo">stratus<span>/</span>hub</Link>
          <div className="settings-navlinks"><Link href="/dashboard"><ArrowLeft size={13} style={{verticalAlign:"middle",marginRight:4}}/>Кабинет</Link><Link href="/settings" className="active">Настройки</Link><Link href="/docs">Документация</Link></div>
          <div className="settings-navright"><span>{user?.fullName ?? user?.primaryEmailAddress?.emailAddress}</span><button className="settings-logout" onClick={() => signOut({ redirectUrl: import.meta.env.BASE_URL })}><LogOut size={14}/> Выйти</button></div>
        </nav>
        <header className="settings-head"><div className="settings-eyebrow">Управление аккаунтом</div><h1>Настройки</h1><p>Управление аккаунтом и сохранёнными API-ключами.</p></header>
        <main>
          <section className="settings-card" data-testid="card-api-keys">
            <div className="settings-label">Интеграция</div><h2>API-ключи</h2>
            <p className="settings-copy">Создайте ключ для идентификации запросов вашего приложения или отзовите ненужный.</p>
            <div className="settings-note"><Info size={16} style={{flex:"none"}}/><span>Созданные здесь ключи сохраняются в аккаунте, но <strong>не подключены к инференсу</strong>. Секрет показывается только один раз — скопируйте и сохраните его в надёжном месте.</span></div>
            {isLoading && <div className="settings-state" role="status">Загружаем API-ключи…</div>}
            {isError && <div className="settings-alert" role="alert">Не удалось загрузить ключи: {error instanceof Error ? error.message : "Попробуйте ещё раз."} <button type="button" onClick={() => void refetch()}>Повторить</button></div>}
            {mutationError && <div className="settings-alert" role="alert">{mutationError}</div>}
            {createdSecret && <div className="secret-box" role="status"><div className="secret-title">Ключ «{createdSecret.name}» создан</div><p className="secret-warning">Секрет будет показан только сейчас. Скопируйте его и сохраните в надёжном месте.</p><div className="secret-value"><span>{createdSecret.secret}</span><button type="button" aria-label="Скопировать секрет" onClick={() => void copySecret()}>{copied ? <Check size={15}/> : <Copy size={15}/>}</button></div><button className="settings-button" style={{marginTop:12}} type="button" onClick={() => setCreatedSecret(null)}>Секрет сохранён</button></div>}
            {data && <div className="settings-table-wrap"><table className="settings-table"><thead><tr><th>Название</th><th>Префикс ключа</th><th>Создан</th><th aria-label="Действия"></th></tr></thead><tbody>{keys.map((key) => <tr key={key.id}><td><strong>{key.name}</strong></td><td><span className="key-prefix">{key.prefix}</span></td><td>{new Date(key.createdAt).toLocaleString("ru-RU")}</td><td style={{textAlign:"right"}}><button className="settings-revoke" type="button" aria-label={`Отозвать ${key.name}`} title="Отозвать ключ" disabled={revokeKey.isPending} onClick={() => void handleRevoke(key.id, key.name)}><Trash2 size={15}/></button></td></tr>)}{keys.length === 0 && <tr><td colSpan={4} className="settings-empty">API-ключей пока нет.</td></tr>}</tbody></table></div>}
            <form className="settings-form" onSubmit={(event) => void handleCreate(event)}><input className="settings-input" maxLength={80} required value={newKeyName} onChange={(event) => setNewKeyName(event.target.value)} placeholder="Название ключа, например production" aria-label="Название ключа"/><button className="settings-button" type="submit" disabled={!newKeyName.trim() || createKey.isPending}><Plus size={14}/>{createKey.isPending ? "Создаём…" : "Создать ключ"}</button></form>
          </section>
        </main>
      </div>
    </div>
  );
}