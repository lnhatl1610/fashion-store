# Payment API

## Source hiện tại

payment.route.ts định nghĩa:

~~~text
POST /webhook/:provider
~~~

Route validate paymentWebhookSchema và gọi PaymentController.webhook. Tuy nhiên paymentRouter hiện chưa được mount trong app.ts, nên endpoint chưa có base URL hoạt động.

## Payment model

Prisma có:

- PaymentProvider: COD, VNPAY, MOMO, STRIPE.
- PaymentStatus: PENDING, SUCCESS, FAILED, REFUNDED.
- Payment.amount, transactionId, orderId.

## Webhook contract

Provider webhook cần:

- provider param đã allowlist.
- raw payload hoặc signature data nếu provider yêu cầu.
- transaction id.
- external status.
- amount và order reference.

Không dùng body client checkout làm bằng chứng thanh toán.

## Integration checklist

- Mount router dưới /api/payments hoặc /api/payment.
- Cấu hình raw body nếu Stripe signature cần raw bytes.
- Verify signature trước parse business data.
- Map provider event vào PaymentStatus.
- Idempotent theo provider event/transaction id.
- Update order trong transaction.
- Log event id và outcome, không log secret/card data.

## Client usage

Stripe client cần clientSecret từ backend. Secret key chỉ ở API; publishable key có thể ở browser qua VITE_ variable.

