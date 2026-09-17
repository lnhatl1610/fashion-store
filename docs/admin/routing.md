# Routing và bảo vệ route Admin

## Route hiện tại

fashion-admin/src/routes/dashboardRoutes.tsx đăng ký:

~~~text
/login
/register
/dashboard
/users
/orders
/products
/categories
/inventory
/coupons
/reviews
~~~

Hiện tại không dùng prefix /admin. Nếu triển khai dưới /admin, cần cấu hình base path của Vite, router và reverse proxy đồng bộ; không tự đổi URL chỉ ở breadcrumb.

## ProtectedRoute

Route root được bọc bởi ProtectedRoute. Auth page nằm ngoài dashboard shell để không render sidebar khi chưa đăng nhập.

Guard frontend nên:

- Chờ trạng thái auth được initialize.
- Redirect về /login khi chưa có session.
- Giữ from để quay lại trang trước sau login.
- Không coi localStorage là bằng chứng authorization cuối cùng.

## API base URL

Admin dùng:

~~~text
VITE_API_URL=http://localhost:3000/api
~~~

API cũng giữ legacy alias không có /api, nhưng client mới nên dùng /api.

## Breadcrumb

Header hiển thị Home / Current page. Không thêm /admin vào breadcrumb vì đó không phải route segment hiện tại.

## Thêm route mới

1. Tạo page.
2. Đăng ký dưới DashboardLayout.
3. Thêm sidebar item.
4. Xác định có cần role-specific gate không.
5. Test direct navigation và refresh.
6. Test unauthorized và forbidden behavior.

