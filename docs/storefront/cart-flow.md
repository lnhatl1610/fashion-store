# Cart flow

## UX

Cart page gồm:

- Danh sách cart items.
- Thumbnail, product name, SKU, giá.
- Tăng/giảm quantity.
- Xóa item.
- Promo code draft.
- Order summary.
- Link checkout.

Cart drawer dùng cùng nguồn cart state để cập nhật header mà không reload toàn trang.

## State

Zustand cart store giữ:

- cart.
- couponCode.
- setCart.
- setCouponCode.
- itemCount.

Server là source of truth của quantity và stock. Client không tự tính để ghi đè server.

## API contract mục tiêu

~~~text
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
POST   /api/cart/merge
~~~

Storefront hiện gọi các endpoint trên, nhưng fashion-api chưa có module cart độc lập và app.ts chưa mount cart router. Đây là integration gap phải giải quyết trước khi bật flow thật.

## Guest cart

Guest cart có thể dùng session cookie/sessionId. Sau login:

1. Gửi merge.
2. Server hợp nhất item theo variant.
3. Resolve quantity vượt tồn kho.
4. Client tải lại cart.

Không lưu access/refresh token vào cart payload hoặc localStorage cart.

## Error cases

- Variant không tồn tại.
- Quantity nhỏ hơn 1.
- Vượt tồn kho.
- Cart item bị xóa đồng thời.
- Session hết hạn.

Mỗi lỗi cần toast có hướng dẫn và reload cart nếu state client cũ.

