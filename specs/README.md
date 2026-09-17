# Project specifications

The specs/ directory contains decision-oriented requirements and contracts used by agents and developers as implementation acceptance criteria.

## Directory convention

~~~text
specs/
├── admin/       # Admin routes, roles, widgets, forms and table behavior
├── storefront/  # Customer flows, catalog, cart, checkout and responsive behavior
├── api/         # Endpoint, schema, auth, RBAC and database contracts
└── shared/      # Architecture, environment, CI/CD and cross-app decisions
~~~

## Spec versus docs

- A spec answers: what must the system do, what is in scope, what is forbidden and how do we accept the work?
- Docs answer: how does the current system work, how do I run it and how do I troubleshoot it?
- AGENTS.md answers: how must the agent work in this repository?

Do not copy entire implementation files into a spec. Keep contracts concise and link to source/docs when more detail is needed.

## Recommended spec template

~~~md
# Feature name

## Status
Implemented | Partial | Planned | Blocked

## Goal

## Scope

## Actors and permissions

## Main flow

## Interfaces

## Validation and edge cases

## Acceptance criteria

- [ ] ...

## Non-goals

## Related docs and source
~~~

Every task that changes a requirement, public contract, acceptance criterion, permission, schema or user-visible behavior must update the relevant spec and matching documentation in the same task. If no update is needed, record why in the task summary.

## Spec index

The following scaffold files mirror the current documentation areas. Each file is intentionally minimal and should be completed when the related feature is specified in detail.

### Admin

- [Coupons and Discounts](admin/coupons-discounts.md)
- [User Management](admin/users-management.md)
- [Dashboard Widgets](admin/dashboard-widgets.md)
- [Admin Forms and Validation](admin/forms-validation.md)
- [Inventory Management](admin/inventory-management.md)
- [Order Management](admin/orders-management.md)
- [Admin Overview](admin/overview.md)
- [Admin Pages Structure](admin/pages-structure.md)
- [Product Management](admin/products-management.md)
- [Admin Roles and Permissions](admin/roles-permissions.md)
- [Admin Routing](admin/routing.md)
- [Admin State Management](admin/state-management.md)
- [Admin UI Patterns](admin/ui-patterns.md)

### Storefront

- [Storefront Authentication Pages](storefront/auth-pages.md)
- [Cart Flow](storefront/cart-flow.md)
- [Checkout Flow](storefront/checkout-flow.md)
- [Storefront Overview](storefront/overview.md)
- [Storefront Pages Structure](storefront/pages-structure.md)
- [Storefront Performance](storefront/performance.md)
- [Product Detail](storefront/product-detail.md)
- [Product Listing](storefront/product-listing.md)
- [Responsive Design](storefront/responsive-design.md)
- [Storefront SEO](storefront/seo.md)
- [Storefront UI Patterns](storefront/ui-patterns.md)
- [Storefront User Dashboard](storefront/user-dashboard.md)

### API

- [API Reference](api/api-reference.md)
- [Authentication API](api/auth-api.md)
- [Authentication Flow](api/authentication.md)
- [Authorization and RBAC](api/authorization.md)
- [Cart API](api/cart-api.md)
- [Customer API](api/customer-api.md)
- [Database Migrations](api/database-migrations.md)
- [Database Schema](api/database-schema.md)
- [API Error Handling](api/error-handling.md)
- [API Middleware](api/middleware.md)
- [Order API](api/order-api.md)
- [API Overview](api/overview.md)
- [Payment API](api/payment-api.md)
- [Payment Integration](api/payment-integration.md)
- [Product API](api/product-api.md)
- [API Rate Limiting](api/rate-limiting.md)
- [API Validation Rules](api/validation-rules.md)

### Shared

- [CI/CD](shared/ci-cd.md)
- [Coding Conventions](shared/coding-conventions.md)
- [Deployment](shared/deployment.md)
- [Environment Variables](shared/environment-variables.md)
- [Testing Strategy](shared/testing-strategy.md)
- [Troubleshooting](shared/troubleshooting.md)
