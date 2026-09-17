# API reference

## Base URL

Khuyến nghị dùng http://localhost:3000/api ở local. Legacy routes không có /api vẫn tồn tại để tương thích.

## Auth

| Method | Path | Auth |
| --- | --- | --- |
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/refresh | Refresh cookie |
| POST | /api/auth/logout | Refresh cookie |

## Users và account

| Method | Path | Auth hiện tại |
| --- | --- | --- |
| POST | /api/users | Chưa gắn role middleware ở router |
| GET | /api/users | Chưa gắn role middleware ở router |
| GET | /api/users/:id | Chưa gắn role middleware ở router |
| GET | /api/users/email/:email | Chưa gắn role middleware ở router |
| PUT | /api/users/:id | Chưa gắn role middleware ở router |
| DELETE | /api/users/:id | Chưa gắn role middleware ở router |
| GET | /api/account/overview | Bearer JWT |

User list/detail responses include the safe profile fields documented in [User và account API](customer-api.md). `password` and `providerId` are excluded.

## Catalog

| Method | Path | Auth hiện tại |
| --- | --- | --- |
| GET | /api/products | Public |
| GET | /api/products/:id | Public |
| GET | /api/products/slug/:slug | Public |
| POST | /api/products | Chưa gắn role middleware ở router |
| PUT | /api/products/:id | Chưa gắn role middleware ở router |
| DELETE | /api/products/:id | Chưa gắn role middleware ở router |
| GET | /api/categories | Public |
| GET | /api/categories/:id | Public |
| GET | /api/categories/slug/:slug | Public |
| POST | /api/categories | Chưa gắn role middleware ở router |
| PUT | /api/categories/:id | Chưa gắn role middleware ở router |
| DELETE | /api/categories/:id | Chưa gắn role middleware ở router |

## Operations

| Method | Path | Auth |
| --- | --- | --- |
| GET | /api/dashboard/overview | ADMIN hoặc STAFF |
| GET | /api/orders | ADMIN hoặc STAFF |
| PUT | /api/orders/:id/status | ADMIN hoặc STAFF |
| GET | /api/coupons | ADMIN hoặc STAFF |
| POST | /api/coupons | ADMIN hoặc STAFF |
| PUT | /api/coupons/:id | ADMIN hoặc STAFF |
| DELETE | /api/coupons/:id | ADMIN |
| GET | /api/reviews | ADMIN hoặc STAFF |
| GET | /api/reviews/product/:productId | Public |
| POST | /api/reviews | Bearer JWT |
| PUT | /api/reviews/:id | Bearer JWT |
| DELETE | /api/reviews/:id | Bearer JWT |
| GET | /api/wishlists | Bearer JWT |
| POST | /api/wishlists | Bearer JWT |
| DELETE | /api/wishlists/:productId | Bearer JWT |

## Catalog experience

| Method | Path | Auth |
| --- | --- | --- |
| GET | /api/catalog/brands | Public |
| GET | /api/catalog/products/:productId | Public |
| POST | /api/catalog/products/:productId/views | Optional |
| GET | /api/catalog/products/:productId/questions | Public |
| POST | /api/catalog/questions | Bearer JWT |
| POST | /api/catalog/questions/:questionId/answers | ADMIN hoặc STAFF |
| GET | /api/catalog/shipping/quote | Query validation |
| GET | /api/catalog/returns | Bearer JWT |
| POST | /api/catalog/returns | Bearer JWT |
| POST | /api/catalog/reviews/:reviewId/helpful | Bearer JWT |
| POST | /api/catalog/admin/brands | ADMIN |
| POST | /api/catalog/admin/media | ADMIN |
| DELETE | /api/catalog/admin/media/:id | ADMIN |
| POST | /api/catalog/admin/promotions | ADMIN |
| POST | /api/catalog/admin/shipping-zones | ADMIN |
| POST | /api/catalog/admin/bundles | ADMIN |
| POST | /api/catalog/admin/inventory/adjust | ADMIN hoặc STAFF |
| PATCH | /api/catalog/admin/returns/:id | ADMIN hoặc STAFF |

## Source-only routes

- Payment router có POST /webhook/:provider nhưng chưa được mount trong app.ts.
- Upload router có POST /signature nhưng chưa được mount trong app.ts.
- Storefront gọi /cart và POST /orders, nhưng backend hiện chưa có cart router và orders router chỉ có list/status cho ADMIN/STAFF.
