# Coupons và discounts

## UI hiện tại

Trang /coupons hỗ trợ:

- Liệt kê coupon.
- Tìm theo code.
- Lọc active/inactive.
- Tạo coupon.
- Sửa coupon.
- Xóa coupon.
- Phân trang client-side 10 dòng/trang.

## API

~~~text
GET    /api/coupons
POST   /api/coupons
PUT    /api/coupons/:id
DELETE /api/coupons/:id
~~~

Toàn bộ router yêu cầu ADMIN hoặc STAFF; delete yêu cầu riêng ADMIN.

## Fields

| Field | Ý nghĩa |
| --- | --- |
| code | Mã duy nhất, nên normalize uppercase |
| discountType | PERCENTAGE hoặc FIXED |
| discountValue | Giá trị giảm |
| minOrderValue | Giá trị order tối thiểu |
| validFrom, validTo | Khoảng hiệu lực |
| usageLimit | Giới hạn lượt dùng |
| isActive | Có cho phép sử dụng không |

Schema hiện kiểm tra validTo sau validFrom và phần trăm không vượt 100.

## UX và an toàn

- Code không phân biệt hoa thường ở input nhưng lưu một dạng chuẩn.
- Hiển thị preview discount và thời gian hiệu lực.
- Confirm delete.
- Không giảm tiền ở client; server phải tính lại trên checkout.
- Cần idempotency khi ghi usage để tránh dùng coupon hai lần do retry.

## Promotions

Schema có thêm Promotion, ProductBundle và liên kết product/category. Đây là discount nâng cao, chưa có màn hình admin riêng.

