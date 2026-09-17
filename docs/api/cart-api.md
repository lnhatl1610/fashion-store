# Cart API

## Trạng thái hiện tại

fashion-api hiện có Prisma model Cart và CartItem, nhưng chưa có module cart route/controller/service và app.ts chưa mount /api/cart.

Storefront đã chuẩn bị client gọi contract sau:

~~~text
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
POST   /api/cart/merge
~~~

Vì vậy cart UI không nên được coi là đã tích hợp backend hoàn chỉnh chỉ vì cartApi đã tồn tại.

## Contract đề xuất

GET /api/cart trả cart hiện tại của authenticated user hoặc guest session.

POST /api/cart/items nhận:

~~~json
{ "variantId": "uuid", "quantity": 1 }
~~~

Server phải kiểm tra variant tồn tại, quantity dương và stock đủ.

PUT /api/cart/items/:id cập nhật quantity. DELETE xóa item. Cả hai phải kiểm tra ownership của cart.

POST /api/cart/merge hợp nhất guest cart vào user cart sau login. Unique constraint theo cartId và variantId giúp tránh duplicate item.

## Guest session

Có thể dùng sessionId hoặc cookie opaque. Không dùng access token làm session guest. Cookie session cần SameSite phù hợp và không chứa dữ liệu nhạy cảm.

## Transaction và race condition

Add/update/merge cần transaction và kiểm tra stock tại thời điểm commit. Checkout phải revalidate cart, không tin tổng tiền client gửi.

