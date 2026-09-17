# Authentication Flow

## Status

Partial

## Goal

Define the requirements, decisions and acceptance criteria for this area.

## Scope

- Detailed scope to be completed during the specification pass.

## Actors and permissions

- Actors, roles and permissions to be defined.

## Main flow

1. Main flow to be documented in detail.
2. Authentication rejects users whose single account `status` is `BANNED` during login and refresh.

## Interfaces

- Login and refresh use the existing auth endpoints and return no session token for `status=BANNED`.

## Validation and edge cases

- Validation rules and edge cases to be documented.

## Acceptance criteria

- [ ] Detailed acceptance criteria are defined.

## Non-goals

- Implementation details are not defined in this scaffold.

## Related docs and source
- Documentation: [docs/api/authentication.md](../../docs/api/authentication.md)
- Source: To be linked during the detailed specification pass.
