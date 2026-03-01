# API Reference

## Scope

This document defines the public REST surface for Huginn Intelligence Console.

The API is designed for analytics retrieval, watchlist operations, scoring access, and event delivery integration.

## Base URL

`https://api.huginn.console/v1`

## Authentication

Use API key authentication via bearer token.

```http
Authorization: Bearer huginn_live_9f1d8d8a67b247f8b9a712a214f0b16a
```

## Response Conventions

- All responses are JSON.
- Timestamps are ISO-8601 UTC.
- Monetary values are USD-denominated unless otherwise specified.

### Standard Error Payload

```json
{
  "error": {
    "code": "invalid_request",
    "message": "window must be one of: 7d, 30d, all",
    "request_id": "req_01HRWZ2NZ8G5Q6A2Q6J8M8PB7D"
  }
}
```

## Rate Limits

- Default: 120 requests/minute per API key
- Burst: 30 requests per 10 seconds
- Higher tiers: available through enterprise plans

## Endpoints

## Health

### `GET /health`

Returns API and engine health summary.

#### Response

```json
{
  "status": "ok",
  "time": "2026-03-01T10:30:12Z",
  "services": {
    "api": "ok",
    "solana_engine": "ok",
    "evm_engine": "degraded",
    "database": "ok"
  }
}
```

## Wallet Analytics

### `GET /wallets/{chain}/{address}/analytics`

Returns wallet dashboard analytics.

#### Query Parameters

- `window`: `7d`, `30d`, or `all` (default: `30d`)

#### Example Request

```http
GET /v1/wallets/solana/9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W/analytics?window=30d
```

#### Response

```json
{
  "chain": "solana",
  "address": "9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W",
  "window": "30d",
  "updated_at": "2026-03-01T10:25:07Z",
  "performance": {
    "realized_pnl_usd": 18243.77,
    "unrealized_pnl_usd": 2941.08,
    "combined_pnl_usd": 21184.85
  },
  "trades": {
    "buys": 64,
    "sells": 49,
    "sells_with_cost_basis": 44,
    "unknown_basis_sells": 5,
    "wins": 28,
    "losses": 16,
    "win_rate_pct": 63.64,
    "avg_win_usd": 987.45,
    "avg_loss_usd": -412.22
  },
  "positions": {
    "open_positions": 9,
    "priced_open_positions": 7,
    "unpriced_open_positions": 2
  }
}
```

## Wallet Trades

### `GET /wallets/{chain}/{address}/trades`

Returns paginated closed-trade entries.

#### Query Parameters

- `limit` (1-200, default 50)
- `cursor` (opaque pagination token)
- `window`: `7d`, `30d`, or `all`

#### Response

```json
{
  "data": [
    {
      "timestamp": "2026-02-28T21:14:22Z",
      "tx_hash": "4hA2h1Ke7S2w7G6kY8DwPoQxU8mG3nW8r1i8v9p4m3a",
      "token_symbol": "HUGINN",
      "quantity": 124550.22,
      "proceeds_usd": 3150.0,
      "cost_usd": 2010.44,
      "pnl_usd": 1139.56
    }
  ],
  "next_cursor": "eyJvZmZzZXQiOjUwfQ"
}
```

## Wallet Score

### `GET /wallets/{chain}/{address}/score`

Returns composite wallet score and component breakdown.

#### Response

```json
{
  "chain": "solana",
  "address": "9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W",
  "wallet_score": 78.4,
  "band": "strong_operator",
  "components": {
    "performance": 82.1,
    "consistency": 74.6,
    "risk_control": 69.8,
    "execution_quality": 80.3
  },
  "updated_at": "2026-03-01T10:20:00Z"
}
```

## Risk Summary

### `GET /wallets/{chain}/{address}/risk`

Returns wallet risk metric snapshot.

#### Response

```json
{
  "chain": "solana",
  "address": "9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W",
  "risk": {
    "top_position_weight_pct": 31.4,
    "top_three_weight_pct": 67.9,
    "illiquid_exposure_pct": 12.7,
    "volatility_impact": "medium",
    "behavioral_consistency": "high"
  },
  "interpretation": "controlled_risk_with_concentration_watch"
}
```

## Watchlists

### `POST /watchlists`

Creates a watchlist.

#### Request

```json
{
  "name": "Solana Momentum",
  "description": "High-conviction operator set"
}
```

#### Response

```json
{
  "id": "wl_01HS2VQ6T8T2W3XQ74D7PTF6Y3",
  "name": "Solana Momentum",
  "description": "High-conviction operator set",
  "created_at": "2026-03-01T10:41:09Z"
}
```

### `POST /watchlists/{watchlist_id}/wallets`

Adds a wallet to a watchlist.

#### Request

```json
{
  "chain": "solana",
  "address": "9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W",
  "alias": "Primary Momentum Wallet"
}
```

#### Response

```json
{
  "watchlist_id": "wl_01HS2VQ6T8T2W3XQ74D7PTF6Y3",
  "wallet_id": "wal_01HS2VSHH8W7R4D5SN8M34WQ8P",
  "chain": "solana",
  "address": "9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W",
  "alias": "Primary Momentum Wallet"
}
```

### `DELETE /watchlists/{watchlist_id}/wallets/{chain}/{address}`

Removes a wallet from a watchlist.

#### Response

`204 No Content`

## Events Feed

### `GET /events`

Returns normalized events for polling integrations.

#### Query Parameters

- `type`: `swap`, `transfer`, `all`
- `since`: RFC3339 timestamp
- `limit`: maximum event count (default 100, max 1000)

#### Response

```json
{
  "data": [
    {
      "event_id": "evt_01HS2W9J9KG99J4QY8V6M7E3X9",
      "type": "swap",
      "chain": "solana",
      "wallet": "9xQeWvG816bUx9EPfR7V7H1D8hC57V6ZgE5r2z9r4R2W",
      "tx_hash": "5qQ5q2f7iBjk5A4g1C9kV4aJmYwq8LKv6z9M3XwN5r1a",
      "timestamp": "2026-03-01T10:42:20Z",
      "payload": {
        "sent_symbol": "USDC",
        "sent_amount": 1250.0,
        "recv_symbol": "HUGINN",
        "recv_amount": 485000.0,
        "sent_usd": 1250.0
      }
    }
  ],
  "next_cursor": "eyJ0aW1lc3RhbXAiOiIyMDI2LTAzLTAxVDEwOjQyOjIwWiJ9"
}
```

## Webhooks

### `POST /webhooks`

Creates a webhook destination for event push delivery.

#### Request

```json
{
  "url": "https://example-fund.com/huginn/events",
  "events": ["swap", "score_update"],
  "secret": "whsec_01HS2WJWCRXJDE6CCM2A7Q2N2G"
}
```

#### Response

```json
{
  "id": "wh_01HS2WK0Y75M4PV6V6RBVV8P8D",
  "url": "https://example-fund.com/huginn/events",
  "events": ["swap", "score_update"],
  "status": "active",
  "created_at": "2026-03-01T10:43:12Z"
}
```

## Idempotency

For mutating endpoints (`POST`, `PUT`, `PATCH`, `DELETE`), Huginn supports idempotency keys:

```http
Idempotency-Key: 7f46f123-f778-4d0f-9eeb-1a7b47c226b9
```

## Related Reading

- [Wallet Analytics Methodology](wallet-analytics.md)
- [Scoring System](scoring-system.md)
- [Risk Metrics](risk-metrics.md)
