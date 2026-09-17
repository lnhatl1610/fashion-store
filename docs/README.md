# Project documentation

Tài liệu được chia theo ranh giới của ba ứng dụng và các quy tắc dùng chung:

## Admin

- [Tổng quan](admin/overview.md)
- [Cấu trúc trang](admin/pages-structure.md)
- [Roles và permissions](admin/roles-permissions.md)
- [Dashboard widgets](admin/dashboard-widgets.md)
- [Quản lý sản phẩm](admin/products-management.md)
- [Quản lý đơn hàng](admin/orders-management.md)
- [Quản lý user](admin/users-management.md)
- [Quản lý tồn kho](admin/inventory-management.md)
- [Coupons và discounts](admin/coupons-discounts.md)
- [UI patterns](admin/ui-patterns.md)
- [Routing](admin/routing.md)
- [Forms và validation](admin/forms-validation.md)
- [State management](admin/state-management.md)

## Storefront

- [Tổng quan](storefront/overview.md)
- [Cấu trúc trang](storefront/pages-structure.md)
- [Auth pages](storefront/auth-pages.md)
- [Product listing](storefront/product-listing.md)
- [Product detail](storefront/product-detail.md)
- [Cart flow](storefront/cart-flow.md)
- [Checkout flow](storefront/checkout-flow.md)
- [User dashboard](storefront/user-dashboard.md)
- [UI patterns](storefront/ui-patterns.md)
- [Responsive design](storefront/responsive-design.md)
- [SEO](storefront/seo.md)
- [Performance](storefront/performance.md)

## API

- [Tổng quan](api/overview.md)
- [API reference](api/api-reference.md)
- [Auth API](api/auth-api.md)
- [Product API](api/product-api.md)
- [Cart API](api/cart-api.md)
- [Order API](api/order-api.md)
- [Payment API](api/payment-api.md)
- [Customer API](api/customer-api.md)
- [Authentication](api/authentication.md)
- [Authorization](api/authorization.md)
- [Database schema](api/database-schema.md)
- [Database migrations](api/database-migrations.md)
- [Payment integration](api/payment-integration.md)
- [Error handling](api/error-handling.md)
- [Middleware](api/middleware.md)
- [Validation rules](api/validation-rules.md)
- [Rate limiting](api/rate-limiting.md)

## Shared

- [Environment variables](shared/environment-variables.md)
- [Deployment](shared/deployment.md)
- [CI/CD](shared/ci-cd.md)
- [Coding conventions](shared/coding-conventions.md)
- [Testing strategy](shared/testing-strategy.md)
- [Troubleshooting](shared/troubleshooting.md)

## Đọc tài liệu theo task

1. Thay đổi UI admin: đọc admin/overview, ui-patterns và file feature tương ứng.
2. Thay đổi storefront flow: đọc storefront/overview, file flow tương ứng và responsive-design.
3. Thay đổi API/database: đọc api/overview, authentication/authorization và database docs.
4. Thay đổi deploy/CI: đọc toàn bộ shared docs liên quan.
