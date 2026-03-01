# Architecture

## Design Intent

Huginn architecture prioritizes deterministic analytics, operational resilience, and low-latency intelligence delivery while keeping chain-specific complexity isolated in parsing and ingestion layers.

## Component Layers

- **Interface Layer:** Telegram bot flows and external API endpoints
- **Application Layer:** plan enforcement, watchlist management, analytics read services
- **Engine Layer:** Solana/EVM ingestion, parsing, detection, enrichment, scoring inputs
- **Data Layer:** PostgreSQL repositories plus process-local analytics state caches
- **Integration Layer:** RPC providers, market metadata providers, stream/webhook providers

## System Flow

```text
[Tracked Wallet Set]
        |
        v
[Chain Ingestion]
  - Solana logs stream (+ optional poll fallback)
  - EVM streams webhook (+ health-gated poll fallback)
        |
        v
[Transaction Parser]
  - Normalize swaps/transfers
  - Token metadata enrichment
        |
        v
[Analytics Engine]
  - Position state updates
  - Realized/unrealized PnL
  - Win/loss quality metrics
        |
        +------------------------+
        |                        |
        v                        v
[Alert/Console Output]      [API / Scoring / Risk Views]
```

## Event Processing Lifecycle

```text
1. Wallet selector loads currently tracked wallets.
2. Ingestion watchers collect candidate on-chain activity.
3. Raw transactions are fetched and parsed.
4. Valid swap/transfer events are normalized.
5. Analytics state is updated with dedupe protection.
6. Downstream consumers (dashboard/API/webhooks) read derived metrics.
```

## Solana Data Flow

```text
logsSubscribe shards
    -> signature queue
    -> getTransaction
    -> parse_swap_from_tx
    -> record_swap_event
    -> dashboard/API metrics
```

Reliability controls:

- wallet-sharded websocket subscriptions
- bounded inflight and dedupe caches
- optional fallback poller and cursor support
- heartbeat/metrics snapshots

## EVM Data Flow

```text
QuickNode Streams webhook
    -> signature/timestamp validation
    -> receipt normalization per network
    -> swap/transfer extraction
    -> analytics update
```

Fallback path activates when streams become stale/unhealthy:

```text
health monitor
    -> polling loop (per configured network)
    -> transaction fetch and parse
    -> analytics update
```

## Historical Backfill Flow

```text
wallet added/opened
    -> ensure_wallet_month_backfill
    -> fast path (provider transaction endpoint) when available
    -> fallback signature scan + transaction fetch
    -> deep scan if initial pass has no swaps
    -> analytics state warm-up
```

## Data Stores and State Boundaries

- **PostgreSQL:** subscriptions, wallets, tokens, invoices, settlement artifacts, user identity
- **In-memory analytics state:** high-frequency wallet metrics computed from normalized events
- **Configuration:** environment-driven runtime wiring for providers, limits, and jobs

## Non-Sensitive Security Posture

Architecture deliberately separates:

- read-only intelligence operations
- administrative/billing operations with stricter key boundaries
- external ingestion channels with signature and replay controls

## Related Reading

- [Tracking Engine](tracking-engine.md)
- [Wallet Analytics Methodology](wallet-analytics.md)
- [Security](security.md)
