import { useListPrices } from "@workspace/api-client-react";
import "./ModelPrices.css";

const usd = (value: string) => {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 6 }).format(amount)
    : `${value} USD`;
};

export function ModelPrices() {
  const { data: prices, isLoading, isError, error, refetch } = useListPrices();
  return (
    <section className="workspace-card model-prices" data-testid="card-model-prices">
      <div className="workspace-card-label">Опубликованный каталог</div>
      <h2>Цены моделей</h2>
      {isLoading && <p className="model-prices-state" role="status">Загружаем опубликованные цены…</p>}
      {isError && <p className="model-prices-state" role="alert">Не удалось загрузить цены: {error instanceof Error ? error.message : "Попробуйте ещё раз."} <button type="button" onClick={() => void refetch()}>Повторить</button></p>}
      {prices && prices.length === 0 && <p className="model-prices-state">Опубликованных цен на модели пока нет.</p>}
      {!!prices?.length && <>
        <div className="model-prices-head" aria-hidden="true"><span>Модель</span><span>Ввод / 1 млн</span><span>Вывод / 1 млн</span></div>
        <div className="model-prices-list">
          {prices.map(({ id, provider, model, inputUsdPerMillion, outputUsdPerMillion }) => (
            <div className="model-prices-row" key={id}>
              <div className="model-prices-identity"><span className="model-prices-mark" aria-hidden="true">{provider.slice(0, 2).toUpperCase()}</span><span><strong>{model}</strong><small>{provider}</small></span></div>
              <span className="model-prices-value" aria-label={`Ввод: ${inputUsdPerMillion} долларов США за миллион токенов`}>{usd(inputUsdPerMillion)}</span>
              <span className="model-prices-value" aria-label={`Вывод: ${outputUsdPerMillion} долларов США за миллион токенов`}>{usd(outputUsdPerMillion)}</span>
            </div>
          ))}
        </div>
        <p className="model-prices-note">Цены указаны в долларах США за 1 млн токенов. Это опубликованные тарифы каталога; фактические списания могут отличаться.</p>
      </>}
    </section>
  );
}