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

## Specs, docs and agent-instruction hierarchy

This repository separates three kinds of project knowledge:

- AGENTS.md: instructions for the agent, including scope, safety, coding standards, verification and task workflow.
- specs/: source of truth for requirements, architecture decisions, API contracts, business rules and acceptance criteria.
- docs/: human-facing documentation that explains current behavior, setup, operations and usage.

Use the following locations:

~~~text
AGENTS.md                         # Rules for the whole monorepo
fashion-api/AGENTS.md             # Backend-specific rules
fashion-admin/AGENTS.md           # Admin-specific rules
fashion-storefront/AGENTS.md      # Storefront-specific rules
specs/admin/                      # Admin requirements and acceptance criteria
specs/storefront/                 # Storefront requirements and flows
specs/api/                        # API/database/security contracts
specs/shared/                     # Cross-app architecture and operational decisions
docs/admin/                       # Admin implementation and usage documentation
docs/storefront/                  # Storefront implementation and usage documentation
docs/api/                         # API reference and backend documentation
docs/shared/                      # Setup, CI/CD, deployment and troubleshooting
~~~

### Reading order before a task

1. Read this root file.
2. Read the nearest workspace AGENTS.md before editing that workspace.
3. Read the relevant file(s) under specs/ before implementing behavior covered by a specification.
4. Read the relevant file(s) under docs/ to understand current implementation, setup and known limitations.
5. Inspect source code and tests when the specification and implementation may differ.

The current user request defines the desired outcome. AGENTS.md defines the required agent process and safety rules. A spec defines acceptance criteria and contracts. Source code and tests establish what is actually implemented. If these conflict, do not silently choose one: implement the explicit request when safe, preserve the repository rules, and record or resolve the discrepancy in the relevant spec/docs file.

### Specs rules

- Write requirements and decisions, not a copy of source code.
- Include scope, actors/roles, main flow, edge cases, permissions, validation, non-goals and acceptance criteria when relevant.
- Put public API request/response shapes, status codes and compatibility notes in specs/api/.
- Put UI behavior, route expectations, states and responsive acceptance criteria in specs/admin/ or specs/storefront/.
- Put cross-cutting deployment, environment, testing or architecture decisions in specs/shared/.
- Mark each item as implemented, partial, planned or blocked when its status matters.
- Never change an approved requirement only to make an implementation appear correct. If the requirement changes, record the new decision and its impact.
- Do not store secrets, tokens, real customer data or generated output in specs.

### Docs rules

- Document observable current behavior, setup steps, commands, contracts and operational guidance.
- Keep docs actionable: include prerequisites, examples, expected output or failure handling where useful.
- Do not claim a feature is available when its route, UI, migration or configuration is missing.
- Clearly label gaps, source-only modules, planned behavior and temporary workarounds.
- Avoid duplicating the same contract in many files; link to the authoritative spec or API reference.
- Update the root README or docs/README.md when adding a new documentation area or changing the navigation structure.

### Required post-task synchronization

After completing every task, perform a documentation impact review before reporting completion:

1. List the behavior, interface, configuration, schema, permission, test or process changes made.
2. Update every directly related spec whose requirement, contract or acceptance criterion changed.
3. Update every directly related doc whose setup, route, API, UI behavior, data flow, security rule or troubleshooting guidance changed.
4. Update the nearest AGENTS.md only when the task changes agent instructions, workspace conventions, verification commands, file boundaries or safety rules. Update the root file when the rule is cross-workspace.
5. Update README/index links when a file is added, renamed or moved.
6. If no spec/docs/AGENTS.md update is needed, state that conclusion and the reason in the final summary.

Use this impact map:

| Change | Update |
| --- | --- |
| Admin UI route, widget, form, table or permission | specs/admin/, relevant docs/admin/, and admin AGENTS.md only if the rule changed |
| Storefront route, checkout, cart, auth or responsive behavior | specs/storefront/, relevant docs/storefront/ |
| API endpoint, DTO, validation, auth/RBAC or error contract | specs/api/, relevant docs/api/, and client docs if the contract is consumed there |
| Prisma schema or migration | specs/api/, docs/api/database-schema.md, docs/api/database-migrations.md |
| Environment, port, build, CI/CD or deployment | specs/shared/, relevant docs/shared/, README when user setup changes |
| Agent workflow, naming, boundaries, verification or safety | Relevant workspace AGENTS.md and/or root AGENTS.md |
| Tests only, with no behavior or workflow change | Update testing docs only when the strategy, command or required coverage changes |

Do not update unrelated docs just to create noise. Do not overwrite unrelated user changes. Documentation synchronization is part of the task, not a follow-up task.

### Final task checklist

- The implementation matches the requested behavior and relevant acceptance criteria.
- Related specs, docs and agent rules are synchronized.
- New paths and internal links resolve.
- Code examples use current commands and route names.
- Tests/checks appropriate to the change have run.
- The final response names changed files, verification results and any remaining documented gaps.

## Documentation

Put human-facing project documentation in `docs/` or the relevant README. Put instructions for agents in these `AGENTS.md` files. Keep both synchronized when setup or architecture changes.
