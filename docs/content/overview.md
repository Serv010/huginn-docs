# Overview

## What Wallet Intelligence Means

Wallet intelligence is the process of converting raw on-chain activity into structured signals that can inform trading, risk, and allocation decisions. In Huginn, this includes:

- normalized trade events from heterogeneous transaction formats
- realized and unrealized performance attribution
- behavior profiling across time windows
- risk context for concentration and liquidity

The objective is not data collection alone. The objective is decision support under market time pressure.

## Market Need

Web3 markets are transparent by design, but operationally opaque in practice. Teams that rely on manual wallet review or simplistic trackers typically face:

- delayed interpretation of complex swaps and routed transactions
- inconsistent PnL logic across analysts and tools
- false confidence from incomplete history
- poor separation between signal and noise

A dedicated intelligence layer is now a core requirement for active trading and treasury workflows.

## Who Huginn Is For

Huginn is designed for users who evaluate wallets as investable signals:

- discretionary traders monitoring high-conviction wallets
- systematic or quant teams building wallet-driven strategies
- crypto funds performing wallet-level due diligence
- research and intelligence desks tracking sector rotation through wallet behavior

## Representative Use Cases

## Alpha Hunting

Identify wallets that repeatedly execute profitable entries, then evaluate whether performance quality is stable or regime-dependent.

## Whale and Smart-Money Tracking

Monitor known operator wallets with both performance context and risk context, not just transaction volume.

## Fund and Treasury Analysis

Assess counterpart behavior over time, including realized outcomes, exposure concentration, and execution consistency.

## Strategy Validation

Use historical wallet outcomes to test whether a following strategy is statistically defensible before capital deployment.

## Operating Scope

Current production focus is Solana-first wallet intelligence with EVM expansion architecture already in place. Huginn is intentionally read-only for tracked wallets and does not require custody permissions to produce analytics.

## Related Reading

- [Feature Catalog](features.md)
- [Wallet Analytics Methodology](wallet-analytics.md)
- [Tracking Engine](tracking-engine.md)
- [Risk Metrics](risk-metrics.md)
