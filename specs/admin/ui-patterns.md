# Admin UI Patterns

## Status

Partial

## Goal

Provide consistent table, filter, pagination and row-action behavior across admin data pages.

## Scope

- Card-wrapped data tables with responsive horizontal scrolling.
- Toolbar search/filter controls.
- Optional column visibility controls with fixed identity/action columns.
- Visible separators for the table header and data rows.
- Shared pagination controls.
- Accessible row action menus and destructive-action confirmation.

## Actors and permissions

- Admin and staff users interact with controls allowed by backend authorization.
- Icon-only controls must expose an accessible name.

## Main flow

1. User enters a filter or search value.
2. The list resets to page 1 and renders matching rows.
3. User toggles optional columns while identity and row actions remain visible.
4. User navigates through numbered pagination controls.
5. User opens a row settings menu and selects an action.
6. Destructive actions require confirmation and show loading feedback.

## Interfaces

- `RowActionsMenu` exposes labeled menu actions through a `Settings` gear icon.
- `DataTablePagination` exposes first, previous, numbered, next and last page controls.
- Column visibility controls expose labeled checkboxes and preserve fixed identity/action columns.
- Table content remains inside a card and scrolls horizontally on narrow screens.

## Validation and edge cases

- Reset pagination when filter/search criteria change.
- Disable boundary pagination buttons.
- Keep icon controls keyboard reachable and labeled.
- Close menus on Escape, outside click or action selection.
- Confirm delete before calling the mutation API.

## Acceptance criteria

- [x] Shared tables use a card container.
- [x] Tables preserve horizontal scrolling inside the table region.
- [x] Table header and body rows have visible separators.
- [x] Filters have labels or accessible names.
- [x] Filter toolbars use readable dark text on light surfaces and do not render an outer border.
- [x] Individual filter inputs, selects and action controls use a subtle shadow, while the toolbar container has no shadow.
- [x] Column visibility controls have labeled checkboxes and a keyboard-dismissible menu.
- [x] Pagination has boundary, numbered and accessible controls.
- [x] Shared pagination does not render a top divider line.
- [x] Row actions use a consistent icon menu.
- [x] Destructive actions expose confirmation and loading states.

## Non-goals

- This spec does not define resource-specific permissions or API contracts.

## Related docs and source
- Documentation: [docs/admin/ui-patterns.md](../../docs/admin/ui-patterns.md)
- Row actions: [RowActionsMenu.tsx](../../fashion-admin/src/components/RowActionsMenu.tsx)
- Pagination: [DataTablePagination.tsx](../../fashion-admin/src/components/DataTablePagination.tsx)
