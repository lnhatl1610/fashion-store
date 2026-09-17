# Database Schema

## Status

Partial

## Goal

Define the requirements, decisions and acceptance criteria for this area.

## Scope

- PostgreSQL/Prisma models used by the API.
- User profile, verification, provider and account-status fields.
- Existing migration compatibility for the expanded User model.

## Actors and permissions

- API services and repositories own persistence access.
- Admin and storefront clients consume sanitized user projections.
- Password hashes and provider identifiers are persistence-only for public response purposes.

## Main flow

1. Update `schema.prisma` when a model contract changes.
2. Validate/generate Prisma client.
3. Create a new migration for a database change; do not edit applied migrations.
4. Update API DTO/projection and related docs/specs.

## Interfaces

- `User` includes `dateOfBirth`, `deletedAt`, `emailVerifiedAt`, `gender`, `lastLoginAt`, `phoneVerifiedAt`, `provider`, `providerId` and the single account `status` field in addition to core identity fields.
- Safe user responses omit `password` and `providerId`.

## Validation and edge cases

- Nullable profile and verification timestamps remain nullable.
- `provider` and `status` use database enums with defaults for existing rows; user `status` accepts only `ACTIVE` or `BANNED`.
- Composite provider/providerId indexing must remain compatible with nullable provider IDs.

## Acceptance criteria

- [x] Prisma schema models the fields from the expanded user-profile migration.
- [x] Prisma enum names match the migration (`UserStatus`, `Gender`, `AuthProvider`).
- [x] The `logo_url` column is removed by the follow-up migration `20260917225034_remove_user_logo_url`.
- [x] User account state is represented by `status` only; the `isActive` column is removed by migration `20260918090000_merge_user_status`.
- [ ] Every schema change has a reviewed migration in production workflow.

## Non-goals

- Implementation details are not defined in this scaffold.

## Related docs and source
- Documentation: [docs/api/database-schema.md](../../docs/api/database-schema.md)
- Source: To be linked during the detailed specification pass.
