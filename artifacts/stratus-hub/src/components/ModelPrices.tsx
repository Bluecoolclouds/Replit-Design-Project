import "./ModelPrices.css";

// These illustrative figures match the landing page catalog; billing is not connected yet.
const modelPrices = [
  { provider: "OpenAI", mark: "O", model: "GPT-5.5", input: 69, output: 413 },
  { provider: "Anthropic", mark: "A", model: "Claude Sonnet 4.6", input: 41, output: 207 },
  { provider: "Google", mark: "G", model: "Gemini 3.5 Flash", input: 21, output: 124 },
  { provider: "DeepSeek", mark: "DS", model: "DeepSeek V4 Pro", input: 18, output: 55 },
] as const;

export function ModelPrices() {
  return (
    <section className="workspace-card model-prices" data-testid="card-model-prices">
      <div className="workspace-card-label">Каталог моделей · примерные цены</div>
      <h2>Цены моделей</h2>
      <div className="model-prices-head" aria-hidden="true">
        <span>Модель</span><span>Вход</span><span>Выход</span>
      </div>
      <div className="model-prices-list">
        {modelPrices.map(({ provider, mark, model, input, output }) => (
          <div className="model-prices-row" key={model}>
            <div className="model-prices-identity">
              <span className="model-prices-mark" aria-hidden="true">{mark}</span>
              <span><strong>{model}</strong><small>{provider}</small></span>
            </div>
            <span className="model-prices-value" aria-label={`Вход: ${input} рублей за миллион токенов`}>{input} ₽</span>
            <span className="model-prices-value" aria-label={`Выход: ${output} рублей за миллион токенов`}>{output} ₽</span>
          </div>
        ))}
      </div>
      <p className="model-prices-note">₽ за 1 млн токенов · демонстрационные значения из каталога, не данные биллинга.</p>
    </section>
  );
}