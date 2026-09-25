---
name: Billing and access boundaries
description: Product decisions for account balances, shared prices, and unsupported inference
---

Use a prepaid balance denominated in USD, without automatic top-ups for now. Each person owns their own balance, keys, and request history; published model prices are shared across accounts. Do not assume a team workspace or an administrator role. A future payment integration may be brought from another project, but it was not part of this implementation.

**Why:** The user explicitly corrected an initial ruble billing choice to dollars and selected private personal accounts. No verified inference or payment provider was connected, so promising automatic charges, complimentary tokens, or live model access would be misleading.

**How to apply:** When adding payments or inference, preserve per-account isolation and USD accounting. Verify the provider and an actual pricing source before publishing prices or describing saved keys as usable for model calls. Keep illustrative landing-page material distinct from recorded account data.