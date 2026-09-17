# Admin roles và permissions

## Role model

Role được lưu trong enum Prisma Role:

- CUSTOMER
- STAFF
- ADMIN

Admin frontend chỉ dành cho STAFF và ADMIN. Customer nên dùng storefront.

## Ma trận nghiệp vụ mục tiêu

| Nghiệp vụ | Admin | Staff | Customer |
| --- | ---: | ---: | ---: |
| Xem dashboard | Có | Có | Không |
| Xem đơn hàng | Có | Có | Chỉ đơn của mình ở storefront |
| Cập nhật trạng thái đơn | Có | Có | Không |
| Tạo/sửa/xóa sản phẩm | Có | Theo chính sách | Không |
| Quản lý danh mục | Có | Theo chính sách | Không |
| Điều chỉnh tồn kho | Có | Có | Không |
| Tạo/sửa coupon | Có | Có | Không |
| Xóa coupon | Có | Không | Không |
| Kiểm duyệt/xóa review | Có | Có | Chỉ tạo/sửa review của mình |
| Quản lý users | Có | Read-only hoặc theo policy | Không |
| Cấu hình hệ thống | Có | Không | Không |

## Enforcement hiện tại

Backend dùng requireAuth và requireRole("ADMIN", "STAFF") ở các module dashboard, orders, coupons và review list. Delete coupon yêu cầu riêng ADMIN.

Các route users, products và categories hiện có trong source nhưng chưa đồng nhất middleware role ở router. Đây là việc cần xử lý trước production; không được xem UI ẩn nút là một biện pháp bảo mật.

## Quy tắc bảo mật

- Quyền phải được kiểm tra ở backend cho mọi mutation.
- Frontend chỉ dùng role để điều hướng/ẩn affordance, không dùng role để thay thế authorization.
- Khi role không đủ quyền, hiển thị lỗi 403 thân thiện và giữ nguyên dữ liệu form.
- Không log JWT, cookie, password hoặc payload chứa secret.

## Checklist khi thêm permission

- Xác định action và resource.
- Thêm middleware ở route backend.
- Viết test success, unauthenticated và forbidden.
- Đồng bộ menu/CTA ở admin.
- Cập nhật tài liệu và ma trận này.

