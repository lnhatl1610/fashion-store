# Quản lý đơn hàng

## UI hiện tại

Trang /orders hỗ trợ:

- Tải danh sách đơn.
- Tìm theo mã đơn.
- Lọc theo status.
- Phân trang client-side 10 dòng/trang.
- Cập nhật status theo transition được phép.
- Export danh sách hiện tải thành CSV.
- Mở dialog xem nhanh chi tiết.

## API hiện tại

~~~text
GET /api/orders
PUT /api/orders/:id/status
~~~

Cả hai endpoint yêu cầu access token và role ADMIN hoặc STAFF.

Payload cập nhật:

~~~json
{ "status": "SHIPPING" }
~~~

## Order lifecycle

Enum hiện tại trong schema là:

~~~text
PENDING → PAID → SHIPPING → COMPLETED
   └──────────────────────→ CANCELLED
~~~

Transition thực tế phải đọc từ orders.types.ts và service. Không tự thêm status mới ở frontend nếu chưa cập nhật Prisma, DTO, service và migration.

## Thông tin cần hiển thị

- Mã đơn.
- Ngày tạo.
- Tổng tiền.
- Phương thức thanh toán.
- Status hiện tại.
- Status tiếp theo được phép.
- Lịch sử trạng thái, tracking và lý do hủy là phần mở rộng.

## Refund flow

Refund chưa được nối đầy đủ trong UI/API hiện tại. Khi triển khai:

1. Kiểm tra payment status và quyền người thao tác.
2. Xác định refund toàn phần hay một phần.
3. Gọi provider và lưu payment/refund result.
4. Ghi order status history.
5. Cập nhật tồn kho theo policy.
6. Trả response idempotent để retry không hoàn tiền hai lần.

Không hiển thị nút Refund như đã sẵn sàng khi payment provider chưa được cấu hình.

