# Features

## Capability Summary

| Domain | Capability | Description |
| --- | --- | --- |
| Wallet Tracking | Multi-wallet watchlists | Track operational or strategic wallets through a Telegram-native console. |
| Analytics | Realized PnL | Average-cost-basis realized PnL from normalized swap events. |
| Analytics | Win/Loss metrics | Win rate, avg win, avg loss, best/worst trade, and recent winners/losers. |
| Positions | Open position view | Token-level open positions with mark-price coverage indicators. |
| Data Quality | 30-day backfill | Historical reconstruction for newly added wallets. |
| Data Quality | Deep-scan fallback | Extended scan path when first pass finds no qualifying swaps. |
| Parsing | Solana parser | Program-aware swap parsing with robust delta logic. |
| Parsing | Token-2022 compatibility | Handles Token-2022 mint/account identification in parser and token classification flows. |
| Architecture | Async ingestion | Concurrent workers and queues for throughput and low-latency processing. |
| Security | Read-only tracking | No private-key requirement for tracked wallets. |

## Wallet Dashboard Metrics

Huginn dashboard metrics are designed for operational decision-making, not vanity reporting.

| Metric | Meaning | Primary Use |
| --- | --- | --- |
| Realized PnL | Closed-trade PnL with known cost basis | Evaluate monetized performance |
| Unrealized PnL | Mark-to-last-observed-price estimate on open positions | Assess embedded exposure |
| Combined PnL | Realized + unrealized | Quick portfolio-level orientation |
| Buys / Sells | Count of detected trade actions in selected window | Activity profile |
| Known-basis sells | Sells with reliable cost-basis attribution | Confidence in realized metrics |
| Unknown-basis sells | Sells lacking prior attributable inventory | Data quality flag |
| Win rate | Winning closed trades / total closed trades | Strategy hit-rate context |
| Avg win / avg loss | Mean result per winning/losing trade | Payoff asymmetry insight |
| Best / worst trade | Largest realized positive/negative single trade | Tail-risk and upside profile |
| Open positions | Tokens with non-zero inventory | Exposure breadth |
| Mark coverage | Positions with usable mark price vs total | Unrealized PnL confidence |

## Deep Scan System

Deep scan is a resilience layer for wallets with noisy transaction history.

### Why It Exists

Some wallets produce high transaction volume where initial scans may capture many non-swap events before reaching meaningful swaps.

### How It Works

- first pass runs bounded scan limits for speed
- if no swaps are found but scan activity indicates potential signal, deep scan is triggered
- deep scan increases signature and transaction budgets within time bounds
- deduplication prevents replaying already processed signatures

### Outcome

This approach improves first-day analytics completeness for newly tracked wallets while preserving runtime safeguards.

## Parsing and Chain Support

### Solana (Current Core)

- swap parsing from transaction payloads
- DEX-program route awareness with fallback confidence checks
- stablecoin and WSOL anchor prioritization
- native SOL fallback only when anchor deltas are unavailable

### EVM (Expansion Track)

- architecture already supports EVM ingestion and backfill patterns
- network-specific RPC/streams configuration
- normalized event model aligned to Solana analytics outputs

## Operational Characteristics

- asynchronous architecture with bounded queues and dedupe sets
- periodic wallet refresh and heartbeat monitoring
- database-backed repositories for durable operations
- explicit handling for partial data and known edge cases

## Related Reading

- [Wallet Analytics Methodology](wallet-analytics.md)
- [Tracking Engine](tracking-engine.md)
- [Architecture](architecture.md)
