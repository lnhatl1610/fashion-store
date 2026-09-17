# Admin Dashboard Agent Guide

## Stack and structure

## Specs and documentation

Before changing admin behavior, read the root AGENTS.md, the relevant files in specs/admin/ or specs/shared/, and the matching files in docs/admin/ or docs/shared/. After changing routes, permissions, widgets, forms, tables, filters, pagination, environment or verification behavior, update the directly affected specs/docs in the same task. Update this file only when admin-specific agent rules or verification requirements change.

This app uses React 19, TypeScript, Vite, Tailwind CSS v4, shadcn-style components, React Router v7 and Axios.

```text
src/components/     # shared UI and primitives
src/features/       # domain pages, services, types
src/layouts/        # dashboard/auth layouts
src/routes/         # route definitions and guards
src/lib/api.ts      # shared Axios client
```

Use the `@/` alias for imports. Keep feature API calls in that feature's service/API file.

## UI design rules

- Build mobile-first; support narrow screens without horizontal page overflow.
- Use a consistent 8px spacing rhythm, readable 16px body text and visible focus states.
- Keep dashboard density high but scannable: clear page title, toolbar, filters, table/card content and feedback states.
- Use semantic colors with sufficient contrast; do not rely on color alone for status.
- Use `lucide-react` icons, with `aria-label` for icon-only buttons.
- Interactive controls should have comfortable touch targets (at least 44px where practical).
- Use existing shared components before creating duplicates.
- Tables must provide horizontal scrolling inside the table region, not on the whole page.
- Modal/dialog content must be keyboard reachable, dismissible and responsive.

## Dashboard shell

The header should contain logo, sidebar toggle, breadcrumb/current page, search, notification affordance, theme control and user menu when applicable. The sidebar must expose every implemented route and work on mobile. Keep loading, empty and error states visible and helpful.

## Data and authentication

- Use `@/lib/api`; do not call Axios directly from JSX.
- Respect the API envelope `{ success, data, message }`.
- Handle loading, error, empty and retry states for every data page.
- Store auth tokens only in the established client storage keys and let the Axios interceptor attach them.
- Do not display or log passwords or tokens.

## React and TypeScript

- Use functional components and typed props/state.
- Avoid `any`; use domain types and `unknown` with narrowing.
- Keep effects focused and avoid duplicate requests under React Strict Mode.
- Keep forms labeled, validated and disabled while submitting.

## Routing

Register every page in `src/routes/dashboardRoutes.tsx`. Protected pages must remain behind `ProtectedRoute`; auth pages must not render the dashboard shell.

## Verification

```bash
npm run check:admin
npm run build --workspace=fashion-admin
```

After visual changes, verify desktop, tablet and mobile widths and confirm API-backed pages show loading, success and failure states.
