# Wallet Analytics Methodology

## Objective

Huginn wallet analytics convert normalized swap events into interpretable performance metrics with explicit confidence boundaries.

## Data Model

Each wallet maintains a per-token position ledger and a closed-trade ledger:

- `position.quantity`: current token quantity
- `position.cost_usd`: current remaining cost basis
- `closed_trades`: realized trade outcomes
- `trade_activity`: buy/sell event history for windowed metrics

## Realized PnL Method

Huginn uses an **average cost basis** model.

### Buy Event

On buy, the system increases inventory and cost basis:

- `quantity += bought_quantity`
- `cost_usd += buy_cost_usd`

### Sell Event With Known Cost Basis

For a sell where tracked inventory exists:

1. `avg_cost = position.cost_usd / position.quantity`
2. `sold_quantity = min(sell_quantity, position.quantity)`
3. `realized_cost = sold_quantity * avg_cost`
4. `realized_pnl = proceeds_usd - realized_cost`
5. Reduce position quantity and cost by `sold_quantity` and `realized_cost`

### Sell Event Without Known Cost Basis

If the wallet sells an asset without attributable inventory history in scope, the trade is recorded as **unknown-basis**:

- trade count is preserved
- realized PnL for that trade is not forced
- quality metrics explicitly surface unknown-basis volume

## Partial Sell Logic

Partial sells are handled natively by decrementing only the sold fraction of quantity and cost basis. Remaining inventory retains its residual average cost for future realization.

## Trade Grouping Logic

Trades are grouped by wallet and token key:

- Solana: token mint or symbol fallback
- EVM: token contract normalized to lowercase where applicable

Deduplication by transaction hash prevents double counting across ingestion paths and backfill reprocessing.

## Windowed Metrics

Dashboard windows (`7d`, `30d`, `all`) apply to trade activity and closed trades:

- realized PnL is aggregated from in-window known-basis closes
- win/loss statistics derive only from trades with known PnL
- unknown-basis sells remain visible as a confidence indicator

## Unrealized PnL Method

Unrealized PnL uses last observed token mark per wallet/token:

- `mark_value = position.quantity * last_token_price_usd`
- `unrealized_pnl = mark_value - position.cost_usd`

If no mark is available, the position is counted as **unpriced** and excluded from unrealized PnL.

## Parsing Reliability Principles

Analytics quality is upstream-dependent. Huginn parser design improves reliability by:

- prioritizing wallet-owned token deltas over noisy lamport deltas
- preferring stable/WSOL anchor legs for swap sizing
- requiring swap-like positive/negative delta structure when no known DEX route is detected
- supporting Token-2022 account/mint patterns

## Accuracy Considerations

- Native SOL fallback sizing is approximate when token anchor deltas are absent.
- `token_age_days` field currently carries seconds in Solana parser outputs for precision.
- `sent_usd` can be enriched downstream during backfill/engine passes when anchor or price context is available.
- Unknown-basis trades are intentionally preserved instead of overfitted.

## Practical Interpretation Guidelines

- Prefer wallets with low unknown-basis ratio for strategy replication.
- Read win rate together with avg win/avg loss, not in isolation.
- Use mark coverage to judge unrealized PnL confidence.

## Related Reading

- [Features](features.md)
- [Tracking Engine](tracking-engine.md)
- [Risk Metrics](risk-metrics.md)
