# User Management

## Status

Partial

## Goal

Provide a searchable, filterable and paginated admin view for customer, staff and admin accounts without exposing passwords or relying on UI-only authorization.

## Scope

- Admin route `/users`.
- User list table, client-side search/filter and pagination.
- Row actions for view, edit and delete.
- Edit form for safe profile and account fields: name, email, phone, avatar, role, date of birth, gender and account status (`ACTIVE`/`BANNED`).
- Configurable table columns exposing all safe `User` attributes while keeping user identity and row actions visible.
- Column visibility control is placed in the filter toolbar above the table; the table card has no redundant column-selection heading.
- Loading, empty, error and retry states.

## Actors and permissions

- `ADMIN`: may view and mutate users when the backend authorizes the operation.
- `STAFF`: read-only or policy-limited access; exact mutation policy belongs to backend RBAC.
- `CUSTOMER`: must not access the admin user-management route.
- The UI must not expose password or provider identifier editing. System-managed timestamps and verification fields are read-only.

## Main flow

1. Load users from `GET /api/users`.
2. Search by name, email or phone and filter by role/account status.
3. Reset filters and return to page 1 when criteria change.
4. Browse 10 rows per page using first/previous/page/next/last controls.
5. Open the column visibility menu in the toolbar above the table and toggle optional table columns.
6. Open the row settings menu to view, edit or delete a user.
7. Confirm destructive deletion, call the API and reload the list after success.
8. Show a retry action when loading fails.

## Interfaces

- `GET /api/users` returns sanitized users.
- `GET /api/users/:id` supports user detail retrieval.
- `PUT /api/users/:id` accepts the editable fields used by the UI: `name`, `email`, `phone`, `avatar`, `role`, `dateOfBirth`, `gender` and `status`.
- `DELETE /api/users/:id` deletes the selected user through the existing API contract.
- Table actions use the shared `RowActionsMenu` with a `Settings` gear icon; pagination uses `DataTablePagination`.
- The detail dialog displays every safe User attribute, including system-managed fields as read-only values.
- Delete opens a confirmation dialog before the mutation is sent.
- The sanitized user response includes `id`, `email`, `name`, `phone`, `avatar`, `role`, `dateOfBirth`, `deletedAt`, `emailVerifiedAt`, `gender`, `lastLoginAt`, `phoneVerifiedAt`, `provider`, `status`, `createdAt` and `updatedAt`; `status` is `ACTIVE` or `BANNED`.
- The column visibility menu keeps `Tên user` and `Tùy chọn` fixed, presents `Ảnh đại diện` before `ID`, and toggles the supported table fields. `password` and `providerId` are never returned to the client.

## Validation and edge cases

- Do not render passwords, access tokens or refresh tokens.
- Name must contain at least two characters and email must be valid before update submission.
- Empty phone values are sent as omitted/undefined values.
- Delete requires confirmation and disables the confirm action while pending.
- If filtering removes the current page, the visible page must remain within the available page range.
- API errors must preserve the existing table context and expose retry feedback.
- Backend authorization remains mandatory even when the UI hides or shows actions.

## Acceptance criteria

- [x] The page does not render a redundant `Danh sách user`/column-selection subheading; the filter and column controls are above the table.
- [x] The table is contained in a card and does not create horizontal scrolling on narrow screens.
- [x] The column order begins with `Ảnh đại diện`, then `ID`, then `Tên user` when those optional columns are enabled.
- [x] The table uses a fixed layout, compact cells and wrapping for long values so it stays within the available viewport width.
- [x] The default view shows core user columns; all other safe user attributes remain available through the column visibility menu.
- [x] Table headers use explicit names for every supported user attribute.
- [x] The column visibility menu presents `Ảnh đại diện` before `ID` and toggles every supported table column while keeping identity and actions visible.
- [x] The table header and body rows have visible separators.
- [x] Search supports name, email and phone.
- [x] Role and account-status filters are available and reset pagination to page 1.
- [x] The filter toolbar and its controls have no outer border; individual controls use a subtle shadow, focus rings provide interaction feedback and text remains readable on a light surface.
- [x] Pagination provides first, previous, numbered, next and last controls.
- [x] Pagination has no top divider line.
- [x] Pagination is rendered below and outside the table card.
- [x] Each row exposes an accessible `Settings` gear icon and view/edit/delete actions.
- [x] Edit opens a labeled dialog for all supported editable profile/account fields.
- [x] Detail shows all safe user attributes and keeps system-managed fields read-only.
- [x] Delete requires confirmation and reloads the list after success.
- [x] Loading, empty, error and retry states are visible.
- [ ] Server-side filtering/pagination is implemented for large datasets.
- [ ] Backend RBAC, soft-delete, session reset and audit logging are complete.

## Non-goals

- Editing passwords or provider identifiers from this dialog.
- Replacing backend authorization with frontend visibility rules.
- Implementing order history and audit-log screens in this task.

## Related docs and source

- Documentation: [docs/admin/users-management.md](../../docs/admin/users-management.md)
- UI page: [UserPage.tsx](../../fashion-admin/src/features/users/UserPage.tsx)
- Table: [UserTable.tsx](../../fashion-admin/src/features/users/components/UserTable.tsx)
- Edit dialog: [UserEditDialog.tsx](../../fashion-admin/src/features/users/components/UserEditDialog.tsx)
- Detail dialog: [UserDetailDialog.tsx](../../fashion-admin/src/features/users/components/UserDetailDialog.tsx)
- API service: [userService.ts](../../fashion-admin/src/features/users/services/userService.ts)
