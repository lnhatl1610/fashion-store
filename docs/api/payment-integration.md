# Payment integration

## Trạng thái

Payment model và payment module source đã có, nhưng payment router chưa được mount trong app.ts. Storefront checkout chỉ bật COD; Stripe UI đang disabled vì PaymentIntent backend chưa hoàn thiện.

## Stripe target flow

~~~text
checkout client
  → POST /api/payments/intent
  ← clientSecret
  → Stripe Elements confirmPayment
  ← client result
  → provider webhook
  → API verify signature
  → transaction update Payment + Order
~~~

Client callback chỉ dùng để hiển thị trạng thái tạm thời. Webhook mới là source of truth cho paid/failed.

## PaymentIntent

Endpoint đề xuất:

~~~text
POST /api/payments/intent
~~~

Body nên nhận order/cart reference và currency; server tự tính amount từ database. Không nhận amount cuối cùng như giá trị tin cậy từ browser.

Response chỉ trả clientSecret và payment intent reference cần thiết.

## Webhook

Endpoint source hiện tại là POST /webhook/:provider trong payment router. Trước khi production cần:

- mount route với URL provider gọi được;
- verify signature;
- lưu event id để idempotency;
- xử lý duplicate/out-of-order events;
- không trả lỗi retry vô hạn nếu event đã xử lý;
- log correlation id, không log secret/card number.

## Refund

Refund phải kiểm tra quyền admin, payment status và số tiền còn có thể refund. Lưu refund transaction/reference và cập nhật PaymentStatus REFUNDED hoặc order partial refund policy trong transaction.

## Security

- Secret key, webhook secret chỉ ở API environment.
- Publishable key có thể dùng ở storefront qua VITE_ variable.
- Không lưu card data trong PostgreSQL.
- Không đánh dấu thanh toán thành công từ URL redirect.

