import { useEffect, useMemo, useRef, useState } from "react";
import { formatRubles, getDemoSpend, spendModels, type SpendRange } from "./spend-data";
import "./SpendChart.css";

export function SpendChart({ range }: { range: SpendRange }) {
  const intervals = useMemo(() => getDemoSpend(range), [range]);
  const [selectedIndex, setSelectedIndex] = useState(intervals.length - 1);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const active = intervals[previewIndex ?? selectedIndex];
  const max = Math.ceil(Math.max(...intervals.map((item) => item.total)) / 10_000) * 10_000;
  const tick = range === "7 дней" ? 1 : range === "24 часа" ? 3 : 5;

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
  }, [range]);

  return (
    <section className="workspace-card spend-card" data-testid="card-usage">
      <div className="spend-heading">
        <div>
          <div className="workspace-card-label">Демонстрационные данные · {range.toLowerCase()}</div>
          <h2>Расходы по моделям</h2>
        </div>
        <span className="spend-unit">₽ · {range === "24 часа" ? "по часам" : "по дням"}</span>
      </div>
      <div className="spend-legend" aria-label="Модели на графике">
        {spendModels.map((model) => (
          <span key={model.id} className="spend-legend-item">
            <i style={{ backgroundColor: model.color }} aria-hidden="true" />{model.name}
          </span>
        ))}
      </div>
      <div className="spend-graph" aria-label={`Составной столбчатый график расходов за ${range.toLowerCase()}`}>
        <div className="spend-y-axis" aria-hidden="true">
          {[1, .75, .5, .25, 0].map((part) => <span key={part}>{Math.round(max * part / 100).toLocaleString("ru-RU")} ₽</span>)}
        </div>
        <div className="spend-scroll" ref={scrollRef}>
          <div className="spend-plot" style={{ minWidth: range === "7 дней" ? 390 : range === "24 часа" ? 690 : 810 }}>
            <div className="spend-grid-lines" aria-hidden="true" />
            <div className="spend-columns">
              {intervals.map((interval, index) => (
                <div className="spend-column" key={interval.id}>
                  <button
                    type="button"
                    className={`spend-bar-button ${selectedIndex === index ? "selected" : ""}`}
                    aria-label={`${interval.title}: ${formatRubles(interval.total)}. Показать расходы по моделям`}
                    aria-pressed={selectedIndex === index}
                    data-testid={`button-spend-${interval.id}`}
                    onMouseEnter={() => setPreviewIndex(index)}
                    onMouseLeave={() => setPreviewIndex(null)}
                    onFocus={() => setPreviewIndex(index)}
                    onBlur={() => setPreviewIndex(null)}
                    onClick={() => { setSelectedIndex(index); setPreviewIndex(null); }}
                  >
                    <span className="spend-stack" style={{ height: `${interval.total / max * 100}%` }}>
                      {spendModels.map((model) => interval.amounts[model.id] > 0 && (
                        <span key={model.id} style={{
                          backgroundColor: model.color,
                          height: `${interval.amounts[model.id] / interval.total * 100}%`,
                        }} />
                      ))}
                    </span>
                  </button>
                  <span className="spend-x-label" aria-hidden="true">{index % tick === 0 || index === intervals.length - 1 ? interval.label : ""}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="spend-hint">Наведите на столбец или выберите его, чтобы увидеть состав расходов.</div>
      <div className="spend-detail" aria-live="polite" data-testid="spend-detail">
        <div className="spend-detail-head">
          <div><span>{range === "24 часа" ? "Интервал · час" : "Интервал · день"}</span><strong data-testid="text-spend-interval">{active.title}</strong></div>
          <div className="spend-detail-total"><span>Итого</span><strong data-testid="text-spend-total">{formatRubles(active.total)}</strong></div>
        </div>
        <div className="spend-detail-rows">
          {spendModels.filter((model) => active.amounts[model.id] > 0).map((model) => (
            <div className="spend-detail-row" key={model.id} data-testid={`row-spend-${model.id}`}>
              <span><i style={{ backgroundColor: model.color }} aria-hidden="true" />{model.name}</span>
              <b>{formatRubles(active.amounts[model.id])}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}