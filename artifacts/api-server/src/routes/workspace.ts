import { randomBytes, createHash } from "node:crypto";
import { Router, type IRouter, type RequestHandler } from "express";
import { getAuth } from "@clerk/express";
import { and, eq, isNull, desc, sql } from "drizzle-orm";
import { db, accountsTable, apiKeysTable, modelPricesTable, requestRecordsTable } from "@workspace/db";
import {
  GetWorkspaceResponse, ListPricesResponse, CreateKeyBody, CreateKeyResponse, RevokeKeyParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

const requireAccount: RequestHandler = (req, res, next) => {
  const userId = getAuth(req).userId;
  if (!userId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  res.locals.accountId = userId;
  next();
};

router.use(requireAccount);

router.get("/workspace", async (_req, res): Promise<void> => {
  const accountId = res.locals.accountId as string;
  const [account] = await db.insert(accountsTable).values({ id: accountId })
    .onConflictDoNothing().returning();
  const currentAccount = account ?? (await db.select().from(accountsTable).where(eq(accountsTable.id, accountId)))[0];
  const [keys, requests, totals] = await Promise.all([
    db.select({ id: apiKeysTable.id, name: apiKeysTable.name, prefix: apiKeysTable.prefix, createdAt: apiKeysTable.createdAt })
      .from(apiKeysTable).where(and(eq(apiKeysTable.accountId, accountId), isNull(apiKeysTable.revokedAt)))
      .orderBy(desc(apiKeysTable.createdAt)),
    db.select({
      id: requestRecordsTable.id, createdAt: requestRecordsTable.createdAt,
      keyName: requestRecordsTable.keyName, model: requestRecordsTable.model,
      transport: requestRecordsTable.transport, status: requestRecordsTable.status,
      inputTokens: requestRecordsTable.inputTokens, outputTokens: requestRecordsTable.outputTokens,
      chargedCents: requestRecordsTable.chargedCents, error: requestRecordsTable.error,
    }).from(requestRecordsTable).where(eq(requestRecordsTable.accountId, accountId))
      .orderBy(desc(requestRecordsTable.createdAt)).limit(100),
    db.select({
      requestCount: sql<number>`count(*)::integer`,
      spentCents: sql<number>`coalesce(sum(${requestRecordsTable.chargedCents}), 0)::integer`,
    }).from(requestRecordsTable).where(eq(requestRecordsTable.accountId, accountId)),
  ]);
  res.json(GetWorkspaceResponse.parse({
    account: { id: currentAccount.id, balanceCents: currentAccount.balanceCents, currency: "USD" },
    keys, requests, requestCount: totals[0]?.requestCount ?? 0, spentCents: totals[0]?.spentCents ?? 0,
  }));
});

router.get("/prices", async (_req, res): Promise<void> => {
  const prices = await db.select({
    id: modelPricesTable.id, provider: modelPricesTable.provider, model: modelPricesTable.model,
    inputUsdPerMillion: modelPricesTable.inputUsdPerMillion,
    outputUsdPerMillion: modelPricesTable.outputUsdPerMillion,
  }).from(modelPricesTable).where(eq(modelPricesTable.published, true)).orderBy(modelPricesTable.provider, modelPricesTable.model);
  res.json(ListPricesResponse.parse(prices));
});

router.post("/keys", async (req, res): Promise<void> => {
  const parsed = CreateKeyBody.safeParse(req.body);
  const name = parsed.success ? parsed.data.name.trim() : "";
  if (!name || name.length > 80) {
    res.status(400).json({ error: "Name must be 1–80 characters" });
    return;
  }
  const accountId = res.locals.accountId as string;
  await db.insert(accountsTable).values({ id: accountId }).onConflictDoNothing();
  const secret = `sk_stratus_pending_${randomBytes(32).toString("base64url")}`;
  const [key] = await db.insert(apiKeysTable).values({
    accountId, name, prefix: `${secret.slice(0, 22)}…`,
    secretHash: createHash("sha256").update(secret).digest("hex"),
  }).returning();
  res.status(201).json(CreateKeyResponse.parse({
    key: { id: key.id, name: key.name, prefix: key.prefix, createdAt: key.createdAt },
    secret,
  }));
});

router.delete("/keys/:id", async (req, res): Promise<void> => {
  const parsed = RevokeKeyParams.safeParse(req.params);
  if (!parsed.success || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(parsed.data.id)) {
    res.status(404).json({ error: "Key not found" });
    return;
  }
  const [key] = await db.update(apiKeysTable).set({ revokedAt: new Date() })
    .where(and(eq(apiKeysTable.id, parsed.data.id), eq(apiKeysTable.accountId, res.locals.accountId as string), isNull(apiKeysTable.revokedAt)))
    .returning({ id: apiKeysTable.id });
  if (!key) {
    res.status(404).json({ error: "Key not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;