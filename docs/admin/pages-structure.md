# Cấu trúc trang Admin

## Route hiện tại

Admin hiện dùng route ở root domain, chưa có prefix /admin.

| URL | Trang | Mục đích | Trạng thái |
| --- | --- | --- | --- |
| /login | Login | Đăng nhập admin/staff | Đã có |
| /register | Register | Tạo tài khoản từ giao diện auth | Đã có |
| /dashboard | Dashboard | KPI, doanh thu, đơn gần đây | Đã có |
| /users | Users | Danh sách, lọc và quản lý tài khoản | Đã có, action sửa/xóa cơ bản; RBAC và soft-delete backend còn cần hoàn thiện |
| /orders | Orders | Xem và cập nhật trạng thái đơn | Đã có |
| /products | Products | Lọc và xem catalog | Đã có, CRUD UI còn hạn chế |
| /categories | Categories | CRUD danh mục | Đã có |
| /inventory | Inventory | Theo dõi SKU và tồn kho | Đã có |
| /coupons | Coupons | CRUD mã giảm giá | Đã có |
| /reviews | Reviews | Kiểm duyệt đánh giá | Đã có |
| /settings | Settings | Cấu hình hệ thống | Chưa có |

## Layout

DashboardLayout gồm:

- Sidebar: logo, navigation và nút thu gọn/mở rộng.
- Header: toggle sidebar, breadcrumb Home / current page, tìm kiếm, thông báo, theme control và user menu.
- Main content: page toolbar, filters, card/table hoặc widget.
- Footer: thông tin bản quyền.

## Quy ước thêm trang

1. Tạo page trong src/features/<feature>.
2. Tạo API/service riêng nếu page có dữ liệu.
3. Thêm route trong src/routes/dashboardRoutes.tsx.
4. Thêm navigation item trong DashboardLayout.tsx.
5. Bọc route dưới ProtectedRoute nếu page yêu cầu đăng nhập.
6. Bổ sung loading, empty, error và responsive state.

## Future pages

Các trang có thể bổ sung theo schema nhưng chưa có route UI:

- Brands và media
- Promotions và bundles
- Returns
- Shipping zones/rates
- Product questions
- Audit log và Settings
