export type DocEntry = {
  slug: string;
  title: string;
  category: string;
};

export type DocArticle = {
  intro: string;
  sections: {
    id: string;
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    code?: string;
  }[];
};

const group = (title: string, entries: [string, string][]) => ({
  title,
  entries: entries.map(([slug, name]) => ({ slug, title: name, category: title })),
});

// The navigation is an editorial outline. Only entries in docsArticles are published guides.
export const docsGroups = [
  group("Начало работы", [
    ["quickstart", "Быстрый старт"], ["claude-code", "Подключение Claude Code"],
    ["claude-code-vscode", "Claude Code в VS Code"], ["opencode", "Подключение OpenCode"],
    ["hermes-openclaw", "Hermes, OpenClaw и другие агенты"], ["clients", "Все программы"],
    ["troubleshooting", "Частые ошибки"],
  ]),
  group("Код и IDE", [
    ["cline", "Cline"], ["antigravity", "Antigravity"], ["roo-code", "Roo Code"],
    ["kilo-code", "Kilo Code"], ["zoo-code", "Zoo Code"], ["kade", "Kade"],
    ["zcode", "ZCode"], ["qwen-code", "Qwen Code"], ["zed", "Zed"],
    ["mimo-code", "MiMo Code"], ["factory-droid", "Factory Droid"],
    ["opencodex", "OpenCodex"], ["codex-cli", "Codex CLI"], ["crush", "Crush"],
    ["oai-compatible-copilot", "OAI Compatible Copilot"], ["github-copilot", "GitHub Copilot"],
    ["cursor", "Cursor"], ["aigo123", "AiGo123"], ["claude-desktop", "Claude Desktop"],
  ]),
  group("Чаты и приложения", [
    ["rikkahub", "RikkaHub"], ["tavo", "Tavo"], ["cherry-studio", "Cherry Studio"],
    ["sillytavern", "SillyTavern"], ["airi", "AIRI"], ["janitor-ai", "Janitor AI"],
    ["lastchat", "LastChat"], ["shadowcompanion", "ShadowCompanion"],
    ["qstat-askai", "QSTAT AskAI"], ["openglasses", "OpenGlasses"], ["zotero", "Zotero"],
  ]),
  group("API и автоматизация", [
    ["reqable", "Reqable"], ["yaak", "Yaak"], ["insomnia", "Insomnia"],
    ["curl", "curl"], ["powershell", "PowerShell"], ["n8n", "n8n"], ["make", "Make"],
    ["wordpress", "WordPress"], ["onec", "1С:Предприятие"], ["vercel-edge", "Vercel Edge"],
  ]),
  group("SDK и библиотеки", [
    ["openai-python", "OpenAI Python"], ["openai-js", "OpenAI JavaScript"],
    ["openai-go", "OpenAI Go"], ["openai-java", "OpenAI Java"],
    ["anthropic-python", "Anthropic Python"], ["anthropic-js", "Anthropic JavaScript"],
    ["vercel-ai-sdk", "Vercel AI SDK"], ["langchain", "LangChain"],
    ["litellm", "LiteLLM"], ["spring-ai", "Spring AI"],
    ["python-requests", "Python requests"], ["python-httpx", "Python HTTPX"],
    ["python-aiohttp", "Python aiohttp"], ["python-urllib", "Python urllib"],
    ["node-fetch", "node-fetch"], ["undici", "Undici"], ["bun", "Bun fetch"],
    ["okhttp", "OkHttp"], ["ktor", "Ktor Client"], ["dart", "Dart / Flutter"],
    ["guzzle", "Guzzle PHP"], ["go-http-client", "Go http.Client"],
    ["java-http-client", "Java HttpClient"],
  ]),
  group("Платформа", [
    ["web-search", "Веб-поиск"], ["caching", "Кэширование промптов"],
    ["reasoning", "Reasoning (рассуждения)"], ["compressed-context", "Сжатый контекст"],
    ["omni", "Видео из чата"], ["images", "Генерация изображений"],
    ["media", "Генерация медиа (API)"], ["jobs-webhooks", "Задачи и вебхуки"],
    ["media-models", "Медиа: модели и биллинг"], ["evaluation", "Оценка вместо генерации"],
    ["referral", "Реферальная программа"],
  ]),
] satisfies { title: string; entries: DocEntry[] }[];

export const docsArticles: Record<string, DocArticle> = {
  quickstart: {
    intro: "Первое знакомство с Stratus Hub: где получить ключ, как устроен запрос и что проверить перед подключением приложения.",
    sections: [
      { id: "key", title: "1. Получите API-ключ", paragraphs: [
        "Откройте кабинет и перейдите в «Настройки» → «API ключи». Задайте имя ключа и при необходимости лимит в миллионах токенов.",
        "В текущем preview создание ключа демонстрационное: ключи не сохраняются на сервере и не подходят для настоящих запросов. Не вставляйте в примеры пароль или чужой действующий ключ.",
      ] },
      { id: "endpoint", title: "2. Подготовьте первый запрос", paragraphs: [
        "Лендинг Stratus Hub показывает OpenAI-совместимый адрес как образец будущего подключения. Он пока не является подтверждённым рабочим endpoint. После запуска API замените адрес и модель на значения из действующего каталога.",
      ], code: `curl https://api.stratushub.dev/v1/chat/completions \\
  -H "Authorization: Bearer ВАШ_API_КЛЮЧ" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Привет!"}]
  }'` },
      { id: "next", title: "3. Что дальше", bullets: [
        "Для ручной проверки запроса откройте инструкцию «curl».",
        "Для приложения на Python или JavaScript откройте инструкцию соответствующего SDK.",
        "Если запрос не проходит, посмотрите «Частые ошибки».",
      ] },
    ],
  },
  clients: {
    intro: "Каталог способов подключения. Начните с инструкции для вашего клиента или SDK; опубликованные статьи отмечены в навигации.",
    sections: [
      { id: "choose", title: "Как выбрать инструкцию", bullets: [
        "Для терминала: curl.",
        "Для Python: OpenAI Python.",
        "Для Node.js и браузерного backend: OpenAI JavaScript.",
        "Для остальных программ сначала убедитесь, что они поддерживают пользовательский OpenAI-compatible Base URL.",
      ] },
      { id: "status", title: "Состояние каталога", paragraphs: [
        "Здесь перечислены запланированные интеграции Stratus Hub. Мы публикуем инструкции по мере проверки конкретного клиента; не опубликованные статьи не содержат непроверенных настроек.",
      ] },
    ],
  },
  curl: {
    intro: "Минимальный HTTP-запрос для проверки подключения без установки SDK.",
    sections: [
      { id: "prepare", title: "Подготовка", paragraphs: [
        "Нужны действующий API-ключ, модель из каталога и рабочий адрес API. В текущем preview эти значения ещё не выдаются сервером Stratus Hub.",
      ] },
      { id: "request", title: "Пример запроса", paragraphs: [
        "Команда ниже показывает формат OpenAI-compatible запроса на основе примера с главной страницы. Адрес является примером, а не гарантией доступности сервиса.",
      ], code: `curl https://api.stratushub.dev/v1/chat/completions \\
  -H "Authorization: Bearer ВАШ_API_КЛЮЧ" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"auto","messages":[{"role":"user","content":"Привет!"}]}'` },
      { id: "check", title: "Проверка ответа", bullets: [
        "401: проверьте действительность ключа и заголовок Authorization.",
        "404: проверьте базовый URL и путь /v1/chat/completions.",
        "429: проверьте доступный лимит ключа и повторите запрос позднее.",
      ] },
    ],
  },
  "openai-python": {
    intro: "Пример подключения Python-клиента через совместимый с OpenAI интерфейс.",
    sections: [
      { id: "install", title: "Установите библиотеку", code: "pip install openai" },
      { id: "configure", title: "Укажите базовый адрес и ключ", paragraphs: [
        "Этот код предназначен для будущего API Stratus Hub. Измените примерный адрес и имя модели, когда они будут подтверждены; секретный ключ передавайте через переменную окружения.",
      ], code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.stratushub.dev/v1",
    api_key=os.environ["STRATUS_API_KEY"],
)

response = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Привет!"}],
)
print(response.choices[0].message.content)` },
      { id: "security", title: "Безопасность", bullets: [
        "Не помещайте ключ в исходный код или публичный репозиторий.",
        "Прежде чем подключать клиент к production, проверьте действующий API и доступность модели.",
      ] },
    ],
  },
  "openai-js": {
    intro: "Пример интеграции Node.js приложения с OpenAI-compatible API Stratus Hub.",
    sections: [
      { id: "install", title: "Установите пакет", code: "npm install openai" },
      { id: "configure", title: "Создайте клиент", paragraphs: [
        "Примерный адрес взят из лендинга. Не используйте его как подтверждённый production endpoint до запуска API; ключ храните на сервере в переменной окружения.",
      ], code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.stratushub.dev/v1",
  apiKey: process.env.STRATUS_API_KEY,
});

const response = await client.chat.completions.create({
  model: "auto",
  messages: [{ role: "user", content: "Привет!" }],
});
console.log(response.choices[0]?.message?.content);` },
      { id: "security", title: "Ключ на сервере", paragraphs: [
        "Не передавайте API-ключ в браузерный JavaScript. Вызывайте модель со своего backend и выдавайте клиенту только результат.",
      ] },
    ],
  },
  troubleshooting: {
    intro: "Что проверить в первую очередь, если подключение не работает.",
    sections: [
      { id: "unauthorized", title: "401 · Неавторизованный запрос", bullets: [
        "Проверьте заголовок Authorization: Bearer <ключ>.",
        "Убедитесь, что используете действующий, а не замаскированный ключ из демонстрационного интерфейса.",
      ] },
      { id: "not-found", title: "404 · Путь не найден", bullets: [
        "Проверьте, что клиент не добавил /v1 дважды.",
        "Сверьте адрес сервиса с действующей документацией после запуска API.",
      ] },
      { id: "limit", title: "429 · Лимит запросов", bullets: [
        "Проверьте лимит ключа в настройках.",
        "Повторяйте запрос с задержкой; не запускайте бесконечные повторы.",
      ] },
      { id: "status", title: "Если ошибка сохраняется", paragraphs: [
        "Сохраните HTTP-статус, время и ID запроса, если он есть. Не отправляйте в поддержку сам ключ или полное содержимое заголовка Authorization.",
      ] },
    ],
  },
};