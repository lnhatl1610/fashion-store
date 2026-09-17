# Checkout flow

## Các bước

Checkout hiện gồm:

1. Chọn địa chỉ giao hàng.
2. Chọn phương thức vận chuyển.
3. Chọn phương thức thanh toán.
4. Nhập coupon.
5. Xem summary.
6. Tạo order.
7. Điều hướng tới /order-confirmation?orderId=....

## Authentication

Checkout nằm dưới ProtectedRoute. User chưa login được redirect về /login với redirect URL.

## Address

Address lấy từ account API. Nếu chưa có địa chỉ, UI link sang /account/addresses. Server phải kiểm tra address thuộc user hiện tại.

## Payment

COD là lựa chọn đang hoạt động. Stripe hiển thị disabled vì backend chưa cấu hình PaymentIntent theo source hiện tại.

Flow Stripe mục tiêu:

1. Backend tạo PaymentIntent.
2. Trả clientSecret.
3. Stripe Elements confirm payment.
4. Backend nhận webhook làm source of truth.
5. Tạo/cập nhật order transactionally.
6. Điều hướng confirmation.

Không đánh dấu order paid chỉ dựa vào redirect hoặc client callback.

## Coupon và total

Coupon code chỉ là input. Backend phải tải coupon, kiểm tra thời gian, usage, min order và tính discount lại. Giá, phí giao hàng và tổng cuối phải được server quyết định.

## Failure handling

- Disable submit trong lúc tạo order.
- Không tạo duplicate order khi request retry.
- Hiển thị lỗi gần summary hoặc toast.
- Giữ cart nếu order thất bại.
- Xóa/refresh cart chỉ sau khi backend xác nhận thành công.

