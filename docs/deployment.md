# Deployment

## Production Deployment Overview

Huginn is deployed as a long-running async application with three critical dependencies:

- PostgreSQL for durable application state
- reliable Solana RPC access
- reliable EVM RPC/stream inputs when EVM mode is enabled

## Reference Topology

```text
[Telegram API]                 [RPC / Streams Providers]
      |                                   |
      v                                   v
+------------------------------------------------------+
|                  Huginn Application                  |
|  - Bot handlers                                       |
|  - Solana/EVM engines                                |
|  - Backfill + analytics workers                      |
|  - Background jobs (expiry, settlement, polling)     |
+------------------------------------------------------+
                          |
                          v
                  [PostgreSQL Primary]
```

## Environment Preparation

1. Create `.env` from `.env.example`.
2. Set all mandatory credentials and URLs.
3. Validate connectivity to PostgreSQL and RPC endpoints.
4. Confirm Telegram bot token and username mapping.

## Docker Deployment

### Dockerfile

```dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "-m", "bot.main"]
```

### docker-compose.yml (single-node baseline)

```yaml
version: "3.9"

services:
  huginn:
    build: .
    restart: unless-stopped
    env_file:
      - .env
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: huginn
      POSTGRES_PASSWORD: huginn_secure_password
      POSTGRES_DB: huginn
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Runtime Controls

- Use process supervisors (or orchestrator probes) for automatic restarts.
- Keep structured logs enabled for engine health diagnosis.
- Use explicit resource limits for memory and CPU under high wallet counts.

## Scaling Considerations

### Vertical Scaling

First scaling step for moderate growth:

- increase CPU for parser-heavy workloads
- increase memory for larger dedupe/backfill windows
- tune RPC concurrency responsibly to avoid provider throttling

### Horizontal Scaling

For multi-instance deployments:

- run a single active engine worker group per tracked-wallet partition
- avoid duplicate ingestion ownership across instances without partition control
- keep PostgreSQL as shared source of truth

### Database Scaling

- tune connection pool sizes to match workload
- add read replicas for API-heavy analytics reads
- enforce backup and restore testing cadence

## Observability

Track the following as operational minimum:

- engine heartbeat freshness
- backfill duration and success ratio
- queue depth and processing lag
- RPC error rates and timeout frequency
- database latency and connection saturation

## Deployment Checklist

- Environment variables validated
- Database reachable and schema prepared
- Telegram bot credentials active
- Solana RPC healthy
- EVM RPC/streams configured (if enabled)
- Alerting wired to heartbeat and error thresholds

## Related Reading

- [Configuration](configuration.md)
- [Architecture](architecture.md)
- [Security](security.md)
