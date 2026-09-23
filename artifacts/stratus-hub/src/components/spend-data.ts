export type SpendRange = "24 часа" | "7 дней" | "30 дней";

export const spendModels = [
  { id: "gpt", name: "GPT-5.5", color: "#438caa" },
  { id: "sonnet", name: "Claude Sonnet 4.6", color: "#86b6b1" },
  { id: "gemini", name: "Gemini 3.5 Flash", color: "#c8a66b" },
  { id: "deepseek", name: "DeepSeek V4 Pro", color: "#7e9dce" },
  { id: "haiku", name: "Claude Haiku 4.5", color: "#b09ac2" },
  { id: "transcribe", name: "GPT-4o Transcribe", color: "#d6928d" },
] as const;

export type SpendInterval = {
  id: string;
  label: string;
  title: string;
  amounts: Record<(typeof spendModels)[number]["id"], number>;
  total: number;
};

const referenceDate = Date.UTC(2026, 8, 23);
const dateTitle = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
});
const dateLabel = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric", month: "short", timeZone: "UTC",
});

// Amounts are integer kopecks: the sum of the visible segments always equals the interval total.
// These deterministic samples are not billing records.
export function getDemoSpend(range: SpendRange): SpendInterval[] {
  const count = range === "24 часа" ? 24 : range === "7 дней" ? 7 : 30;
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(referenceDate - (range === "24 часа" ? 0 : count - 1 - index) * 86_400_000);
    const hour = index;
    const amounts = Object.fromEntries(spendModels.map((model, modelIndex) => {
      const pulse = (index * 17 + modelIndex * 29 + (index * modelIndex * 7)) % 67;
      const inactive = (index + modelIndex * 3) % 8 === 0;
      const amount = inactive ? 0 : range === "24 часа"
        ? (24 + pulse * 3) * (7 - modelIndex)
        : (110 + pulse * 12) * (7 - modelIndex);
      return [model.id, amount];
    })) as SpendInterval["amounts"];
    const total = spendModels.reduce((sum, model) => sum + amounts[model.id], 0);
    const hourly = range === "24 часа";
    return {
      id: hourly ? `hour-${hour}` : date.toISOString().slice(0, 10),
      label: hourly ? `${String(hour).padStart(2, "0")}:00` : dateLabel.format(date),
      title: hourly
        ? `${dateTitle.format(date)}, ${String(hour).padStart(2, "0")}:00–${String(hour + 1).padStart(2, "0")}:00`
        : dateTitle.format(date),
      amounts,
      total,
    };
  });
}

export const formatRubles = (kopecks: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 2 })
    .format(kopecks / 100);