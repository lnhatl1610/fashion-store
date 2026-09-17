# Database Migrations

## Status

Partial — the User `logo_url` removal migration is implemented locally.

## Goal

Define the requirements, decisions and acceptance criteria for this area.

## Scope

- Versioned Prisma migrations for the PostgreSQL schema.
- Removal of the obsolete `users.logo_url` column after profile image usage was consolidated on `users.avatar`.

## Actors and permissions

- Actors, roles and permissions to be defined.

## Main flow

1. Update `fashion-api/prisma/schema.prisma`.
2. Add a new migration without changing already-applied migration files.
3. Apply and verify migration status on the target database.
4. Synchronize API/client contracts and related documentation.

## Interfaces

- Migration: `20260917225034_remove_user_logo_url`.
- Database change: `ALTER TABLE "users" DROP COLUMN "logo_url"`.

## Validation and edge cases

- Applied migrations are immutable; the earlier migration that added `users.logo_url` remains unchanged.
- The `Brand.logoUrl` field is unrelated and must remain available.
- Prisma schema validation and migration status must pass after deployment.

## Acceptance criteria

- [x] A follow-up migration removes `users.logo_url`.
- [x] The Prisma User model no longer declares `logoUrl`.
- [x] API and storefront User contracts no longer expose or submit `logoUrl`.
- [x] Local database reports all migrations applied.
- [ ] Production deployment is reviewed and approved through the deployment workflow.

## Non-goals

- Implementation details are not defined in this scaffold.

## Related docs and source
- Documentation: [docs/api/database-migrations.md](../../docs/api/database-migrations.md)
- Source: To be linked during the detailed specification pass.
