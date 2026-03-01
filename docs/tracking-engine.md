# Tracking Engine

## Purpose

The Huginn tracking engine ingests on-chain activity, normalizes transactions, updates wallet analytics, and emits intelligence outputs through a Telegram-native interface.

## Architecture at a Glance

The engine is built around asynchronous workers and bounded queues to support high event throughput while preserving ordering and deduplication guarantees.

Core responsibilities:

- watch tracked wallets across supported chains
- parse candidate transactions into normalized events
- compute/update wallet analytics state
- backfill recent history for newly tracked wallets
- keep health, heartbeat, and metrics observable

## Asynchronous Processing Model

### Solana Path

- streaming-first ingestion via logs watchers
- optional fallback poller for missed signatures
- per-signature transaction fetch and parse
- ordered emit buffer to reduce out-of-order user-facing events

### EVM Path

- streams-first webhook ingestion
- health-gated polling fallback on stale/unhealthy streams
- per-network processing with bounded inflight controls

## Historical Backfill

Backfill ensures analytics are useful immediately after wallet onboarding.

Default behavior:

- scan window: 30 days
- bounded signature/transaction/time limits
- refresh interval guard to avoid repeated heavy scans

## Deep-Scan Fallback

When first-pass history scans produce no swaps but indicate likely missed signal, deep-scan runs with expanded limits.

Deep-scan improves recovery for:

- high-activity wallets with many non-swap transactions
- routed/aggregated transaction patterns
- sparse wallet periods where swap signal is buried in broader activity

## Data Pipeline Overview

1. Wallet set resolved from subscription and tracking repositories.
2. Chain watchers ingest candidate activity.
3. Transaction parsers extract swap/transfer events.
4. Event handlers enrich context and apply analytics updates.
5. Dashboard/API layers read from analytics state and persistent repositories.

## Operational Safeguards

- bounded dedupe sets to prevent unbounded memory growth
- lock-guarded per-wallet backfill execution
- timeout-bounded remote RPC calls
- heartbeat recording for engine status visibility

## Related Reading

- [Architecture](architecture.md)
- [Wallet Analytics Methodology](wallet-analytics.md)
- [Deployment](deployment.md)
