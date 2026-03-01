# FAQ

## What is Huginn Intelligence Console?

Huginn is a Telegram-based wallet intelligence platform that converts on-chain transaction activity into performance, risk, and behavior analytics for professional users.

## Is Huginn a trading bot?

No. Huginn is an intelligence and analytics system. It tracks and analyzes wallets; it does not execute trades for tracked wallets.

## Does Huginn require private keys for tracked wallets?

No. Tracking is read-only and based on public blockchain data.

## Does Huginn custody user funds?

No for tracked-wallet intelligence workflows. Huginn is not a custody service for tracked addresses.

## Which chains are supported?

Solana is the primary production analytics path. EVM expansion is supported by the underlying architecture and configuration surface.

## What analytics are available?

Core metrics include realized/unrealized/combined PnL, win/loss counts, win rate, avg win/avg loss, best/worst trades, open positions, and mark coverage.

## How is realized PnL calculated?

Huginn uses average cost basis for tracked positions and calculates realized PnL on known-basis sells.

## Why do unknown-basis sells appear?

Unknown-basis sells occur when a sell is detected without attributable tracked inventory in scope. They are intentionally surfaced as a confidence indicator.

## What does backfill do?

Backfill reconstructs up to 30 days of wallet history to warm analytics when a wallet is added or refreshed.

## What is deep scan?

Deep scan is a fallback pass that expands scan budgets when first-pass history scans show activity but no qualifying swaps.

## Is Token-2022 supported?

Yes. Huginn parsing and token classification paths account for Token-2022 patterns.

## How fresh is wallet data?

Huginn is designed for low-latency ingestion with async workers. Freshness depends on chain conditions, provider latency, and configured fallbacks.

## Is there a public API?

Yes. A REST API surface is documented in [API Reference](api.md) for analytics, scoring, risk, watchlists, and event delivery integrations.

## How should I interpret high win rate with low score?

Use risk context. A high win rate can coexist with poor concentration, liquidity, or behavioral discipline.

## Can Huginn guarantee future wallet performance?

No. Huginn provides intelligence signals, not return guarantees.

## Where can I access Huginn?

Telegram access is available at [@HuginnIntelligenceBot](https://t.me/HuginnIntelligenceBot).
