# Order API

## Trạng thái hiện tại

orders router hiện chỉ phục vụ admin/staff:

~~~text
GET /api/orders
PUT /api/orders/:id/status
~~~

Router dùng requireAuth và requireRole("ADMIN", "STAFF").

## List orders

GET /api/orders trả danh sách AdminOrder từ repository. Pagination query chưa được expose; admin hiện tải list rồi phân trang client-side.

Contract mở rộng nên nhận page, limit, status, userId, search, from, to và sort.

## Update status

PUT /api/orders/:id/status:

~~~json
{ "status": "SHIPPING" }
~~~

Controller parse status bằng isOrderStatus và trả 400 khi status không hợp lệ, 404 khi order không tồn tại.

## Customer order contract còn thiếu

Storefront checkout đang gọi POST /api/orders; account pages gọi GET /api/orders và GET /api/orders/:id. Các route customer này chưa có trong orders router hiện tại.

Contract cần bổ sung:

~~~text
POST /api/orders
GET  /api/account/orders
GET  /api/account/orders/:id
POST /api/account/orders/:id/cancel
~~~

Mỗi endpoint customer phải derive userId từ JWT, không nhận userId tùy ý từ body.

## Checkout transaction

Tạo order cần transaction:

1. Validate address ownership.
2. Load cart và product variant.
3. Recalculate prices, discount, shipping.
4. Reserve/decrement stock.
5. Create order and order items.
6. Create payment record nếu cần.
7. Clear cart.

Retry phải có idempotency key để không tạo duplicate order.

