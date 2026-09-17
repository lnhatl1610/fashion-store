# Storefront Agent Guide

## Stack and boundaries

The customer storefront uses React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7, React Query, Axios, Zustand and shadcn-style primitives. Keep storefront code under `fashion-storefront`; communicate with the API through HTTP only.

## Architecture

- `src/pages` and route-level components compose screens.
- `src/components` contains reusable presentation components.
- `src/features` owns domain UI, hooks and API functions.
- `src/lib/apiClient.ts` is the only shared API client.
- `src/stores` contains client state; `src/types` contains shared storefront types.

Use the `@/` alias and keep API calls out of render bodies. Do not import dashboard or backend source files.

## UI and UX

- Design mobile-first for shopping on phones and desktop.
- Keep product imagery prominent, reserve image space to prevent layout shift and use descriptive alt text.
- Use clear hierarchy, readable 16px body text, consistent spacing and visible focus states.
- Use semantic status colors with text labels; maintain accessible contrast.
- Use `lucide-react` icons with labels for icon-only controls and comfortable touch targets.
- Product cards, filters, cart controls and checkout forms must remain usable at narrow widths without page-level horizontal scrolling.
- Show skeleton/loading, empty, error and retry states for asynchronous content.

## Data, forms and auth

- Use `apiClient` and the `/api` base URL; respect the `{ success, data, message }` envelope.
- Use React Query for server state and invalidate related queries after mutations.
- Validate forms with the existing schema/resolver patterns; show errors next to the relevant field.
- Never log or render passwords, tokens or payment secrets.
- Preserve guest cart/session behavior and refresh-token handling in `apiClient`.

## Routing and performance

- Register routes in the existing router and preserve deep links/back behavior.
- Lazy-load large route screens where useful; avoid unnecessary global state and rerenders.
- Use pagination/filter parameters for large catalog results and debounce free-text search.

## Verification

```bash
npm run typecheck --workspace=fashion-storefront
npm run build --workspace=fashion-storefront
npm run test --workspace=fashion-storefront
```

For UI work, verify mobile, tablet and desktop widths, keyboard navigation, loading/error states and the affected API request path.
