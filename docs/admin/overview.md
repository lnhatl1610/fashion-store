# Admin frontend — tổng quan

## Mục đích

Admin frontend là ứng dụng React/Vite dành cho nhân viên vận hành SHOP.CO. Ứng dụng tập trung vào catalog, đơn hàng, người dùng, tồn kho, mã giảm giá, đánh giá và các chỉ số kinh doanh.

Ứng dụng hiện chạy mặc định tại:

- Admin: http://localhost:5173
- API: http://localhost:3000
- Storefront: http://localhost:5174

Admin gọi API qua biến Vite VITE_API_URL; nếu không khai báo, client dùng http://localhost:3000/api.

## Đối tượng sử dụng

- **Admin**: quản trị toàn hệ thống, cấu hình dữ liệu và xử lý các nghiệp vụ nhạy cảm.
- **Staff**: vận hành hằng ngày như theo dõi dashboard, đơn hàng, coupon và đánh giá theo chính sách được cấp.
- **Customer**: không sử dụng admin frontend; customer dùng storefront.

## Kiến trúc

~~~text
fashion-admin/src/
├── components/       # UI dùng chung: table, pagination, dialog, logo
├── features/         # auth, dashboard, users, products, orders...
├── layouts/          # AuthPage layout và DashboardLayout
├── routes/           # route objects và ProtectedRoute
└── lib/api.ts        # Axios client, Authorization header, refresh flow
~~~

Mỗi feature sở hữu UI và API adapter của feature đó. Không import source trực tiếp từ API hoặc storefront.

## Luồng request

1. Người dùng đăng nhập tại /login.
2. Admin client lưu access token trong localStorage.
3. Refresh token được backend gửi vào HttpOnly cookie shopco_admin_refresh_token.
4. Axios interceptor thêm Authorization: Bearer vào request.
5. Khi API trả 401, interceptor gọi /api/auth/refresh, cập nhật access token và retry request một lần.

## Trạng thái hiện tại

- Đã có dashboard, users, orders, products, categories, inventory, coupons và reviews.
- Đã có card bao quanh table và phân trang client-side cho các bảng.
- Trang Settings chưa được tạo.
- Một số route CRUD của API đã tồn tại nhưng UI chưa expose đầy đủ form tạo/sửa/xóa.

## Nguyên tắc phát triển

- Ưu tiên component dùng chung và giữ layout mobile-first.
- API call đặt trong service/API adapter, không gọi Axios trực tiếp trong JSX.
- Luôn có loading, empty, error và retry state cho dữ liệu bất đồng bộ.
- Không render password, access token hoặc refresh token.
- Sau thay đổi UI chạy npm run check:admin và npm run build --workspace=fashion-admin.

