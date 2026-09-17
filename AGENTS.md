# Fashion Store — Agent Guide

## Scope

This is a TypeScript monorepo with three independent apps:

- `fashion-api`: Express 5 REST API, PostgreSQL and Prisma.
- `fashion-admin`: React/Vite/Tailwind admin dashboard.
- `fashion-storefront`: React/Vite customer storefront.

Read the nearest app-level `AGENTS.md` before editing that app. Keep app boundaries intact; do not import source files across apps.

## Working principles

- Use English for code, file names, database identifiers and public API fields; use Vietnamese or English for explanations.
- Use strict TypeScript. Never introduce `any`; use DTOs, interfaces, `unknown` and type guards.
- Prefer small, focused changes that preserve existing behavior.
- Reuse existing utilities and components before adding new abstractions.
- Never commit secrets, `.env` files, generated output, `dist`, `build` or `node_modules`.

## Naming and structure

- Folders: `kebab-case` or `camelCase`.
- React components: `PascalCase.tsx`.
- Variables/functions: `camelCase`; constants: `UPPER_SNAKE_CASE`.
- Types/interfaces: `PascalCase`.
- Backend modules follow `types`, `dto`, `dao`, `repository`, `service`, `controller`, `route`.

## Verification

Run the smallest relevant checks after changes, then the full check when practical:

```bash
npm run check:api
npm run check:admin
npm run check:storefront
npm run check
```

For UI changes also run the affected app build. For API/schema changes run Prisma validation and generation.

## Git and safety

- Use Conventional Commits: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.
- Do not reset, checkout, delete or overwrite unrelated user changes.
- Before destructive operations, verify the exact target and prefer recoverable alternatives.
- Report blockers, failed checks and any environment-only workaround clearly.

## Documentation

Put human-facing project documentation in `docs/` or the relevant README. Put instructions for agents in these `AGENTS.md` files. Keep both synchronized when setup or architecture changes.
