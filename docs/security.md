# Security

## Security Principles

Huginn is designed around least privilege, operational separation, and explicit risk boundaries.

## Read-Only Tracking

For tracked wallets, Huginn operates in a read-only model:

- tracks public blockchain activity only
- does not require tracked-wallet private keys
- does not execute trades on behalf of tracked wallets

This materially reduces user-side key-management risk for intelligence workflows.

## Custody Boundary

Huginn Intelligence Console is not a wallet custodian for tracked addresses.

Important boundary:

- intelligence and tracking modules are separate from optional billing/payment operations
- operational treasury keys used for platform billing flows are isolated from wallet-intelligence parsing and scoring paths

## Data Protection

Security controls include:

- environment-based secret configuration
- database-backed persistence with role-segregated access patterns
- controlled storage of operational identifiers and telemetry
- explicit input validation and defensive parsing for external payloads

## Operational Safeguards

- bounded queues and dedupe windows to mitigate resource exhaustion
- health and heartbeat monitoring for engine state visibility
- controlled backfill budgets and timeout ceilings for external RPC dependencies
- signature/timestamp verification for webhook-style ingestion channels

## Access Control

- Telegram user identity mapping for account-bound views
- whitelist/admin controls for privileged operations
- subscription-aware limits to protect service integrity under load

## Incident Readiness

Huginn operational model supports:

- rapid credential rotation through environment secrets
- deterministic restart behavior for async workers
- audit-friendly logs for ingestion, parsing, and settlement operations

## User Security Guidance

- never share private keys or seed phrases with any tracking platform
- validate official bot identity before onboarding
- isolate operational wallets from long-term treasury wallets

## Related Reading

- [Architecture](architecture.md)
- [Deployment](deployment.md)
- [Configuration](configuration.md)
