# Configuration

## Configuration Model

Huginn uses environment-variable configuration for runtime wiring, security boundaries, and feature controls.

## Core Bot and Identity

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `BOT_TOKEN` | Yes | None | Telegram bot token used to start the console. |
| `BOT_USERNAME` | Recommended | Empty | Public Telegram username for deep links and bot URLs. |
| `HUGINN_BOT_USERNAME` | Optional | Falls back to `BOT_USERNAME` | Explicit override for generated Huginn bot URLs in outbound links. |
| `ENVIRONMENT` | No | `dev` | Runtime environment label for operational context. |
| `ADMIN_USER_IDS` | No | Empty | Comma-separated Telegram user IDs with admin privileges. |
| `HUGINN_WHITELIST_IDS` | No | Empty | Comma-separated Telegram IDs with whitelist entitlements. |
| `WHITELIST_USER_IDS` | No | Empty | Legacy alias for `HUGINN_WHITELIST_IDS`. |

## Database

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `DATABASE_URL` | Yes for production | None | PostgreSQL DSN for persistent repositories and jobs. |

## Solana and Settlement

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `SOLANA_RPC_URL` | Yes | `https://api.mainnet-beta.solana.com` | Primary Solana HTTP RPC endpoint. |
| `HELIUS_API_KEY` | Optional | Empty | Helius key used when constructing provider URLs. |
| `HELIUS_RPC_URL` | Optional | Empty | Full Helius RPC URL override; takes precedence over `SOLANA_RPC_URL`. |
| `DEPOSIT_SOL_ADDRESS` | Required for billing flows | None | Deposit address shown in invoice/payment screens. |
| `SOLANA_INVOICE_MASTER_MNEMONIC` | Required for on-chain invoice derivation | None | Master mnemonic for derived deposit wallets. |
| `SOLANA_TREASURY_PUBKEY` | Required for settlement wiring | None | Treasury destination public key for settlement operations. |
| `SOLANA_TREASURY_MNEMONIC` | Required for settlement wiring | None | Treasury mnemonic for settlement signing context. |
| `SOLANA_CONFIRMATION_THRESHOLD` | No | `1` | Required Solana confirmation count for payment settlement. |
| `CONFIRM_SOLANA` | No | Empty | Legacy alias for `SOLANA_CONFIRMATION_THRESHOLD`. |

## Plans, Pricing, and Billing Jobs

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `PLAN_FREE_LIMIT` | No | `75` | Free-plan tracking cap. |
| `PLAN_MUNINN_LIMIT` | No | `350` | Muninn-plan tracking cap. |
| `PLAN_ALLFATHER_LIMIT` | No | `10000` | Allfather-plan tracking cap. |
| `MUNINN_MONTHLY_PRICE_CENTS` | No | `2000` | Muninn monthly price in USD cents. |
| `PRICE_MUNINN_MONTHLY_USD_CENTS` | No | Empty | Legacy alias for Muninn monthly price. |
| `ALLFATHER_MONTHLY_PRICE_CENTS` | No | `5000` | Allfather monthly price in USD cents. |
| `PRICE_ALLFATHER_MONTHLY_USD_CENTS` | No | Empty | Legacy alias for Allfather monthly price. |
| `ANNUAL_DISCOUNT_PERCENT` | No | `15` | Annual billing discount percentage. |
| `INVOICE_TTL_MINUTES` | No | `60` | Lifetime of open invoices before expiry. |
| `EXPIRY_JOB_INTERVAL_SECONDS` | No | `60` | Invoice/subscription expiry job poll interval. |
| `PAYMENT_POLL_INTERVAL_SECONDS` | No | `30` | Payment verification polling interval. |

## EVM Engine Core

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `EVM_NETWORKS` | No | `eth,arb,op,base,bsc,polygon,avax` | Enabled EVM networks list. |
| `EVM_DEFAULT_NETWORK` | No | `eth` | Default network key for fallback RPC resolution. |
| `EVM_RPC_URL` | Optional | Empty | Legacy global EVM RPC URL fallback. |
| `EVM_RPC` | Optional | Empty | Legacy alias for `EVM_RPC_URL`. |
| `EVM_WS_URL` | Optional | Empty | Legacy global EVM websocket URL. |
| `EVM_WS` | Optional | Empty | Legacy alias for `EVM_WS_URL`. |
| `EVM_RPC_URLS_JSON` | Recommended for multi-network | Empty | JSON map of network ID to RPC URL. |
| `EVM_RPC_URLS_CSV` | Optional | Empty | Comma list of RPC URLs aligned with `EVM_NETWORKS`. |
| `EVM_CONFIRMATIONS` | No | `2` | Confirmations required for EVM event confidence. |
| `EVM_POLL_INTERVAL` | No | `2.0` | Polling loop interval in seconds. |
| `EVM_WALLET_REFRESH_INTERVAL` | No | `30.0` | Wallet-set refresh interval for EVM engine. |
| `EVM_WALLET_TOPIC_CHUNK` | No | `80` | Chunk size for topic-filter wallet lists. |
| `EVM_MAX_TXS_SCAN_PER_BLOCK` | No | `8000` | Max transactions scanned per block in polling fallback. |
| `EVM_MIN_AMOUNT_HUMAN` | No | `1e-18` | Minimum human-readable transfer amount threshold. |
| `EVM_STREAMS_STALE_SECONDS` | No | `20` | Staleness threshold for streams health checks. |
| `EVM_ENABLE_POLLING_FALLBACK` | No | `1` | Enables fallback polling when streams are unhealthy. |
| `EVM_SEEN_MAX` | No | `250000` | Max dedupe set size for seen EVM transactions. |
| `EVM_INFLIGHT_MAX` | No | `25000` | Max inflight processing set size for EVM engine. |
| `EVM_METRIC_SNAPSHOT_EVERY` | No | `60` | Metrics snapshot interval in seconds. |

## Wallet Analytics Backfill

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `WALLET_BACKFILL_DAYS` | No | `30` | Lookback window for historical wallet reconstruction. |
| `WALLET_BACKFILL_MAX_SIGNATURES` | No | `1200` | Signature cap for Solana signature scan path. |
| `WALLET_BACKFILL_MAX_TRANSACTIONS` | No | `800` | Transaction parse cap per backfill run. |
| `WALLET_BACKFILL_REFRESH_SECONDS` | No | `21600` | Cooldown between non-forced backfill runs per wallet. |
| `WALLET_BACKFILL_MAX_SECONDS` | No | `20` | Time budget for primary backfill pass. |
| `WALLET_BACKFILL_EVM_BLOCK_CHUNK` | No | `4000` | Initial EVM block chunk size for backfill scans. |
| `WALLET_BACKFILL_EVM_MIN_BLOCK_CHUNK` | No | `250` | Minimum EVM block chunk size under adaptive scanning. |

## Conviction and Signal Tuning

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `CONVICTION_EARLY_MAX_AGE_MINUTES` | No | `20` | Max age for early-conviction classification. |
| `CONVICTION_EARLY_MAX_AGE_HOURS` | No | Empty | Legacy alias for early-conviction age threshold. |

## QuickNode Streams

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `QN_STREAMS_ENABLE` | No | `1` | Enables QuickNode streams webhook ingestion. |
| `QN_STREAMS_HOST` | No | `0.0.0.0` | Bind host for webhook receiver. |
| `QN_STREAMS_PORT` | No | `3000` | Bind port for webhook receiver. |
| `QN_STREAMS_PATH` | No | `/webhook` | Path for QuickNode stream delivery. |
| `QN_STREAMS_SECURITY_TOKEN` | Recommended when streams enabled | Empty | HMAC secret for webhook signature validation. |
| `QN_API_KEY` | Optional | Empty | QuickNode API key for stream filter auto-sync APIs. |
| `QN_STREAM_IDS_JSON` | Optional | Empty | JSON map of network ID to stream ID. |
| `QN_STREAM_IDS_JSON_PATH` | Optional | `./qn_stream_ids.json` | File path fallback for stream ID mapping. |
| `QN_STREAMS_SYNC_ENABLE` | No | `1` | Enables periodic stream filter auto-sync. |
| `QN_STREAMS_SYNC_INTERVAL` | No | `15` | Stream filter sync interval in seconds. |
| `QN_STREAMS_SYNC_MAX_ADDRS` | No | `1500` | Max addresses embedded in stream filter script. |
| `QN_STREAMS_MAX_SKEW_SECONDS` | No | `300` | Maximum allowed webhook timestamp skew. |
| `QN_STREAMS_NONCE_CACHE_SIZE` | No | `10000` | Nonce replay-protection cache size. |

## Per-Network EVM RPC and WS Overrides

All variables below are optional and default to empty.

| Variable | Description |
| --- | --- |
| `EVM_RPC_ETH`, `ETH_RPC`, `EVM_WS_ETH` | Ethereum mainnet overrides. |
| `EVM_RPC_BASE`, `BASE_RPC`, `EVM_WS_BASE` | Base network overrides. |
| `EVM_RPC_ARB`, `ARB_RPC`, `EVM_WS_ARB` | Arbitrum network overrides. |
| `EVM_RPC_BSC`, `BSC_RPC`, `EVM_WS_BSC` | BNB Chain overrides. |
| `EVM_RPC_OP`, `EVM_WS_OP` | Optimism network overrides. |
| `EVM_RPC_POLYGON`, `EVM_WS_POLYGON` | Polygon network overrides. |
| `EVM_RPC_AVAX`, `EVM_WS_AVAX` | Avalanche network overrides. |
| `EVM_RPC_FTM`, `EVM_WS_FTM` | Fantom network overrides. |
| `EVM_RPC_GNOSIS`, `EVM_WS_GNOSIS` | Gnosis network overrides. |
| `EVM_RPC_LINEA`, `EVM_WS_LINEA` | Linea network overrides. |
| `EVM_RPC_SCROLL`, `EVM_WS_SCROLL` | Scroll network overrides. |
| `EVM_RPC_ZKSYNC`, `EVM_WS_ZKSYNC` | zkSync network overrides. |
| `EVM_RPC_ZKEVM`, `EVM_WS_ZKEVM` | Polygon zkEVM overrides. |
| `EVM_RPC_BLAST`, `EVM_WS_BLAST` | Blast network overrides. |
| `EVM_RPC_MANTLE`, `EVM_WS_MANTLE` | Mantle network overrides. |
| `EVM_RPC_MODE`, `EVM_WS_MODE` | Mode network overrides. |
| `EVM_RPC_ZORA`, `EVM_WS_ZORA` | Zora network overrides. |
| `EVM_RPC_CELO`, `EVM_WS_CELO` | Celo network overrides. |
| `EVM_RPC_CRONOS`, `EVM_WS_CRONOS` | Cronos network overrides. |
| `EVM_RPC_MOONBEAM`, `EVM_WS_MOONBEAM` | Moonbeam network overrides. |
| `EVM_RPC_MOONRIVER`, `EVM_WS_MOONRIVER` | Moonriver network overrides. |
| `EVM_RPC_AURORA`, `EVM_WS_AURORA` | Aurora network overrides. |
| `EVM_RPC_METIS`, `EVM_WS_METIS` | Metis network overrides. |
| `EVM_RPC_KAVA`, `EVM_WS_KAVA` | Kava network overrides. |
| `EVM_RPC_HARMONY`, `EVM_WS_HARMONY` | Harmony network overrides. |
| `EVM_RPC_OPBNB`, `EVM_WS_OPBNB` | opBNB network overrides. |

## Configuration Hygiene

- Keep production secrets out of source control.
- Prefer explicit network-specific RPC settings over legacy global aliases.
- Use legacy aliases only during migration windows.
- Validate configuration in staging before expanding wallet coverage.

## Related Reading

- [Deployment](deployment.md)
- [Security](security.md)
