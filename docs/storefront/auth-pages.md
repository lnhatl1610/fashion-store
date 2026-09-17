# Auth pages

## Layout hiện tại

AuthLayout dùng centered card:

- Full viewport tối thiểu.
- Nền stone nhẹ.
- Card rộng tối đa khoảng 448px.
- Logo SHOP.CO link về home.
- Outlet render login/register/forgot/reset page.

Nếu đổi sang split-screen, cần giữ fallback centered card cho mobile và không làm form dài hơn viewport mà không có scroll.

## Login

Input:

- Email.
- Password.

Flow:

1. Validate bằng react-hook-form + Zod.
2. Normalize email lowercase và trim.
3. POST /api/auth/login.
4. Lưu user và access token.
5. Merge cart rồi tải lại cart.
6. Redirect về redirect query, from location hoặc home.

## Register

Input hiện tại:

- Họ và tên.
- Email.
- Password.
- Confirm password.

Register schema yêu cầu name tối thiểu 2 ký tự, password tối thiểu 6 ký tự theo auth validator hiện tại và confirm khớp. Backend register nhận name, email, password và phone tùy chọn.

## Password reset

Forgot/reset UI đã có route và validator ở storefront. Backend auth route hiện tại cần được đối chiếu để bảo đảm endpoint forgot-password và reset-password được mount trước khi bật production flow.

## Token handling

- Access token: client-side memory/localStorage theo authToken.
- Refresh token: HttpOnly cookie shopco_storefront_refresh_token.
- JavaScript không đọc refresh token.
- Khi refresh thất bại, clear session và phát event auth:expired.

## Accessibility

- Label phải gắn với input.
- Dùng aria-invalid khi schema lỗi.
- Giữ focus và message lỗi gần field.
- Button submit có loading state.
- Không hiển thị password/token trong error hoặc log.

