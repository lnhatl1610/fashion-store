# User API

## Status

Partial

## Goal

Define the requirements, decisions and acceptance criteria for this area.

## Scope

- User CRUD response contract used by admin and account flows.
- Safe user profile fields and security exclusions.

## Actors and permissions

- Admin user-management screens consume the list/detail response.
- Authenticated customers consume their own account response.
- Password hashes, refresh tokens and provider identifiers are not public response fields.

## Main flow

1. The route loads a user from the repository.
2. The controller sanitizes sensitive fields before calling `sendSuccess`.
3. The client receives profile, role, status and timestamp fields in JSON.

## Interfaces

- `GET /api/users` returns an array of sanitized users.
- `GET /api/users/:id` and `GET /api/users/email/:email` return one sanitized user.
- `PUT /api/users/:id` accepts safe editable profile/account fields: `name`, `email`, `phone`, `avatar`, `role`, `dateOfBirth`, `gender` and `status`.
- Safe fields: `id`, `email`, `name`, `phone`, `avatar`, `role`, `dateOfBirth`, `deletedAt`, `emailVerifiedAt`, `gender`, `lastLoginAt`, `phoneVerifiedAt`, `provider`, `status`, `createdAt`, `updatedAt`.
- `status` is the single user-account status and accepts only `ACTIVE` or `BANNED`.
- Excluded fields: `password`, `providerId`.

## Validation and edge cases

- Nullable profile and verification timestamps serialize as `null`.
- Unknown users return `404`.
- User routes still require backend authentication/RBAC hardening before production.

## Acceptance criteria

- [x] User list/detail responses include the safe profile and account-status fields.
- [x] Password and provider identifier are absent from user responses.
- [ ] User route authentication and role middleware are enforced.

## Non-goals

- Implementation details are not defined in this scaffold.

## Related docs and source
- Documentation: [docs/api/customer-api.md](../../docs/api/customer-api.md)
- Source: To be linked during the detailed specification pass.
