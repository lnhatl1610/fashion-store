# Backend Agent Guide

## Stack and boundaries

## Specs and documentation

Before changing backend behavior, read the root AGENTS.md, the relevant files in specs/api/ or specs/shared/, and the matching files in docs/api/ or docs/shared/. After changing routes, DTOs, validation, authentication, authorization, schema, migrations, environment variables or operational behavior, update the directly affected specs/docs in the same task. Update this file only when backend agent rules or verification requirements change.

The API uses Node.js, Express 5, TypeScript ESM, PostgreSQL and Prisma. Keep all backend code under `fashion-api`; frontend apps consume HTTP APIs only.

## Module architecture

Each feature lives in `src/modules/<feature>/` and may contain:

```text
feature.types.ts       # domain and Prisma-derived types
feature.dto.ts         # request/response DTOs
feature.schema.ts      # Zod validation
feature.dao.ts         # direct Prisma queries
feature.repository.ts  # data access abstraction
feature.service.ts     # business rules
feature.controller.ts  # HTTP handling
feature.route.ts       # router and middleware
```

Controllers use arrow functions and services/repositories support constructor injection for tests.

## TypeScript and ESM

- Use `strict: true`, explicit types and `unknown` in catch blocks.
- Do not use `any`. Replace unsafe casts with DTO validation or type guards.
- Use `import type` for types.
- Every local ESM import must include `.js`.
- Cast Express 5 route params explicitly: `const id = req.params.id as string`.

## Prisma and database

- Schema: `prisma/schema.prisma`; generated client output is `generated/prisma`.
- After schema changes run:

```bash
npm run prisma:validate --workspace=fashion-api
npm run prisma:generate --workspace=fashion-api
```

- Use transactions for checkout, inventory changes, returns and other multi-write operations.
- Add indexes for frequent filters and relations; use pagination for list endpoints.
- Use `prisma migrate dev` only when a database migration is explicitly intended.
- Never commit `.env`, credentials or generated client output.

## API and security

- API is available under `/api` and legacy root routes; keep new client-facing routes under `/api`.
- Validate every external body/query/param with Zod.
- Use correct status codes: `200`, `201`, `400`, `401`, `403`, `404`, `409`, `500`.
- Hash passwords with bcrypt and never return `password`.
- Protect admin/staff actions with `requireAuth` and `requireRole`.
- Keep CORS and secrets in environment configuration.

## Verification

```bash
npm run check:api
npm run build --workspace=fashion-api
```

For endpoint changes, test a success case, validation failure and authorization failure where applicable.
