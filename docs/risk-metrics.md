# Risk Metrics

## Objective

Huginn risk metrics contextualize wallet performance so users can distinguish durable signal from uncontrolled exposure.

## 1) Exposure Concentration

Concentration risk evaluates how much portfolio risk is dominated by a small number of positions.

Core views:

- **Top Position Weight:** largest position as a share of total marked exposure
- **Top 3 Weight:** aggregate share of three largest positions
- **Concentration Index:** normalized concentration score over all positions

Interpretation:

- high concentration can amplify returns and drawdowns
- concentration should be evaluated alongside liquidity depth

## 2) Liquidity Risk

Liquidity risk estimates exit difficulty under realistic market conditions.

Core views:

- **Position-to-Liquidity Ratio:** position notional relative to observable venue liquidity
- **Slippage Sensitivity Band:** expected price impact regime (low/medium/high)
- **Illiquid Exposure Share:** share of exposure in thin-liquidity assets

Interpretation:

- strong realized PnL with persistent high liquidity risk can degrade replication quality

## 3) Volatility Impact

Volatility impact measures how strongly wallet outcomes depend on high-volatility conditions.

Core views:

- realized PnL variance by window
- drawdown magnitude and recovery speed
- outcome stability across volatility regimes

Interpretation:

- stable performers preserve edge across both expansion and compression regimes

## 4) Behavioral Consistency

Behavioral consistency measures process discipline.

Core views:

- trade cadence stability
- holding-period distribution consistency
- impulsive turnover signals (rapid churn, overreaction patterns)

Interpretation:

- consistent process quality generally supports more robust signal extraction

## 5) Risk-Adjusted Performance

Huginn combines return and risk context to produce practical interpretation tiers.

Reference framing:

- **High Return / High Risk:** strong upside, fragile profile
- **High Return / Controlled Risk:** preferred signal profile
- **Low Return / High Risk:** structurally unattractive profile
- **Moderate Return / Controlled Risk:** steady operator profile

## Recommended Workflow

1. Start with [Wallet Analytics](wallet-analytics.md) for outcome quality.
2. Validate concentration and liquidity risks.
3. Confirm behavior consistency before replication.
4. Use [Scoring System](scoring-system.md) as a summary layer, not a replacement for risk review.
