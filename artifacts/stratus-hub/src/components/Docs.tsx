import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { Search, Menu, ChevronRight, ChevronDown, Copy, Check, ArrowLeft, FileKey2, Info } from 'lucide-react';
import { docsGroups, docsArticles, type DocEntry } from './docs-data';
import './Docs.css';

export function Docs() {
  const [, params] = useRoute('/docs/:slug');
  const [, setLocation] = useLocation();
  
  const currentSlug = params?.slug;
  const defaultSlug = docsGroups?.[0]?.entries?.[0]?.slug;
  
  useEffect(() => {
    if (!currentSlug && defaultSlug) {
      setLocation(`/docs/${defaultSlug}`);
    }
  }, [currentSlug, defaultSlug, setLocation]);
  
  const activeSlug = currentSlug || defaultSlug || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(docsGroups.map((g) => [g.title, g.entries.some((entry) => entry.slug === activeSlug)]))
  );

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredGroups = useMemo(() => {
    if (!docsGroups) return [];
    if (!searchQuery.trim()) return docsGroups;
    const q = searchQuery.toLowerCase();
    return docsGroups.map(group => {
      const matchedEntries = group.entries.filter(e => e.title.toLowerCase().includes(q));
      if (group.title.toLowerCase().includes(q) || matchedEntries.length > 0) {
        return {
          ...group,
          entries: matchedEntries.length > 0 ? matchedEntries : group.entries
        };
      }
      return null;
    }).filter(Boolean) as typeof docsGroups;
  }, [searchQuery]);

  const activeEntry = useMemo(() => {
    if (!docsGroups) return null;
    for (const g of docsGroups) {
      const found = g.entries.find((e: DocEntry) => e.slug === activeSlug);
      if (found) return found;
    }
    return null;
  }, [activeSlug]);

  const article = (activeEntry && docsArticles) ? docsArticles[activeEntry.slug] : null;

  useEffect(() => {
    if (activeEntry) {
      setExpandedGroups((previous) => ({ ...previous, [activeEntry.category]: true }));
    }
  }, [activeEntry]);

  useEffect(() => {
    document.title = `${activeEntry?.title ?? 'Инструкции'} — Stratus Hub`;
  }, [activeEntry]);

  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (!article?.sections) return;
      const sectionIds = article.sections.map((s: any) => s.id);
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 150) {
          current = id;
        }
      }
      setActiveSectionId(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  return (
    <div className="docs-layout">
      <div 
        className={`docs-overlay ${mobileOpen ? 'open' : ''}`} 
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside className={`docs-sidebar ${mobileOpen ? 'open' : ''}`} aria-label="Навигация документации">
        <div className="docs-sidebar-header">
          <button className="docs-mobile-close" type="button" aria-label="Закрыть разделы документации" onClick={() => setMobileOpen(false)} data-testid="button-close-docs-menu">Закрыть</button>
          <Link href="/" className="docs-logo" data-testid="link-docs-home">stratus<span>/</span>hub</Link>
          <Link href="/dashboard" className="docs-back" data-testid="link-docs-dashboard">
            <ArrowLeft size={12}/> В кабинет
          </Link>
          <div className="docs-search">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="Поиск по документации..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              data-testid="input-docs-search"
            />
          </div>
        </div>

        <nav className="docs-nav">
          {filteredGroups.map(group => (
            <div key={group.title} className="docs-group">
              <button 
                className="docs-group-btn" 
                onClick={() => toggleGroup(group.title)}
                aria-expanded={Boolean(expandedGroups[group.title] || searchQuery.trim())}
                data-testid={`button-group-${group.title}`}
              >
                {group.title}
                {expandedGroups[group.title] ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
              </button>
              {(expandedGroups[group.title] || searchQuery.trim()) && (
                <div className="docs-group-items">
                  {group.entries.map(entry => (
                    <Link 
                      key={entry.slug} 
                      href={`/docs/${entry.slug}`}
                      className={`docs-item ${activeSlug === entry.slug ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                      data-testid={`link-doc-${entry.slug}`}
                    >
                      <span>{entry.title}</span>
                      <span className="docs-draft-label">{docsArticles[entry.slug] ? 'подготовка' : 'нет статьи'}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <div style={{ fontSize: 11, color: '#6a9ca9', padding: '10px 12px' }}>
              Ничего не найдено
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="docs-main">
        {/* Mobile Header */}
        <header className="docs-mobile-header">
          <Link href="/" className="docs-logo" data-testid="link-docs-mobile-home">stratus<span>/</span>hub</Link>
          <button 
            className="docs-mobile-menu-btn" 
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть разделы документации"
            data-testid="button-mobile-docs-menu"
          >
            <Menu size={20} color="#315460" />
          </button>
        </header>

        <div className="docs-content-wrapper">
          <article className="docs-article" aria-label="Содержимое статьи">
            {activeEntry ? (
              <>
                <div className="docs-eyebrow" data-testid="text-doc-category">{activeEntry.category}</div>
                <h1 className="docs-title" data-testid="text-doc-title">{activeEntry.title}</h1>
                 <div className="docs-availability" role="note" data-testid="docs-availability">
                   <Info size={16} aria-hidden="true" />
                   <span>Материал для подготовки, не подтверждение подключения. Сейчас сервер Stratus Hub предоставляет только проверку состояния /api/healthz; действующие ключи, модели и API генерации ещё не доступны.</span>
                 </div>
                
                {article ? (
                  <>
                    {article.intro && (
                      <p className="docs-intro" data-testid="text-doc-intro">{article.intro}</p>
                    )}
                    
                    {article.sections?.map(section => (
                      <section key={section.id} id={section.id} className="docs-section" data-testid={`section-${section.id}`}>
                        <h2 className="docs-section-title">{section.title}</h2>
                        
                        {section.paragraphs?.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                        
                        {section.bullets && section.bullets.length > 0 && (
                          <ul>
                            {section.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}

                        {section.code && (
                          <CodeBlock code={section.code} />
                        )}
                      </section>
                    ))}
                  </>
                ) : (
                  <div className="docs-empty-state" data-testid="empty-doc-state">
                    <div className="docs-empty-icon">
                      <FileKey2 size={24} />
                    </div>
                    <h3>Раздел в разработке</h3>
                    <p>Для этой темы пока нет статьи. Выберите другую тему из навигации.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="docs-empty-state" data-testid="empty-doc-state-no-selection">
                <p>Выберите раздел в меню слева, чтобы начать чтение.</p>
              </div>
            )}
          </article>

          {/* Right Sidebar (TOC) */}
          {article && article.sections && article.sections.length > 0 && (
            <aside className="docs-toc" aria-label="Оглавление">
              <div className="docs-toc-title">На этой странице</div>
              <div className="docs-toc-list">
                {article.sections.map(section => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    className={`docs-toc-link ${activeSectionId === section.id ? 'active' : ''}`}
                    data-testid={`link-toc-${section.id}`}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="docs-code-block" data-testid="code-block">
      <button 
        className="docs-code-copy" 
        onClick={copy} 
        aria-label="Скопировать код"
        data-testid="button-copy-code"
      >
        {copied ? <Check size={14} color="#5ea680" /> : <Copy size={14} />}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  );
}
