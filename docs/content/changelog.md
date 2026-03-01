# Changelog

All notable changes to Huginn Intelligence Console are documented in this file.

The format follows a versioned chronological log with production-focused highlights.

## [1.0.0] - 2026-03-01

### Added

- Public documentation suite for platform, analytics, risk, security, API, and deployment.
- Formalized wallet scoring and risk-interpretation framework.
- Production-facing MkDocs + Material documentation configuration.

### Changed

- Standardized product terminology around "wallet intelligence" across public materials.

## [0.9.0] - 2026-02-18

### Added

- 30-day wallet analytics backfill with deep-scan fallback.
- Expanded EVM ingestion architecture with streams-first design and polling fallback controls.
- Extended dashboard trade-quality metrics and position mark coverage reporting.

### Changed

- Improved swap parsing reliability for routed Solana activity.
- Strengthened dedupe and bounded in-memory controls for ingestion stability.

## [0.8.0] - 2026-02-05

### Added

- Subscription and plan enforcement model for tracking caps.
- Invoice-based upgrade workflow with Solana payment verification.
- Background jobs for invoice expiry and payment polling.

### Changed

- Migrated persistence model toward PostgreSQL-backed operational repositories.

## [0.7.0] - 2026-01-19

### Added

- Core Telegram console for wallet tracking lifecycle.
- Initial Solana event ingestion and normalized swap event model.
- Baseline performance metrics for wallet-level monitoring.
