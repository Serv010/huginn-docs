# Scoring System

## Objective

Huginn wallet scoring provides a standardized, risk-aware ranking model to compare wallets across different activity profiles.

## Scoring Model

Wallet Score is a weighted composite from four component scores.

`Wallet Score = 0.40 * Performance + 0.25 * Consistency + 0.20 * Risk Control + 0.15 * Execution Quality`

Each component is normalized to a 0-100 scale.

## Component Definitions

### 1) Performance (40%)

Measures outcome quality from realized trading activity.

Primary inputs:

- realized PnL trend over selected windows
- win rate on known-basis closes
- payoff asymmetry (avg win vs avg loss)
- tail outcomes (best/worst trade impact)

### 2) Consistency (25%)

Measures stability of behavior and outcomes.

Primary inputs:

- frequency regularity of trading activity
- dispersion of trade-level outcomes
- persistence of positive expectancy across windows

### 3) Risk Control (20%)

Measures how efficiently a wallet manages downside and concentration.

Primary inputs:

- exposure concentration across open positions
- unknown-basis sell ratio
- realized drawdown profile
- liquidity sensitivity of active positions

### 4) Execution Quality (15%)

Measures structural quality of trade decisions independent of raw PnL.

Primary inputs:

- entry/exit behavior versus volatility regime
- anchor-leg quality and valuation confidence
- consistency of sizing relative to liquidity

## Rating Bands

| Wallet Score | Interpretation |
| --- | --- |
| 85-100 | Institutional-grade consistency and risk discipline |
| 70-84 | Strong operator with manageable risk profile |
| 55-69 | Mixed quality; requires selective use |
| 40-54 | Unstable behavior or weak risk controls |
| 0-39 | Speculative profile with low repeatability |

## Update Cadence

Scores are recomputed after material event updates and refreshed over rolling windows to limit stale ranking effects.

## Interpretation Guidance

- A high score is not a prediction of future returns.
- Compare score with [Risk Metrics](risk-metrics.md) before acting.
- Prefer sustained multi-window score quality over single-window spikes.

## Related Reading

- [Wallet Analytics Methodology](wallet-analytics.md)
- [Risk Metrics](risk-metrics.md)
