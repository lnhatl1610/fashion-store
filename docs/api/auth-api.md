# Auth API

## Register

~~~text
POST /api/auth/register
~~~

Body:

~~~json
{
  "name": "Demo Customer",
  "email": "customer@example.com",
  "password": "secret123",
  "phone": "0900000000"
}
~~~

Rules:

- name không rỗng.
- email đúng format.
- password tối thiểu 6 ký tự.
- phone tùy chọn.

Success trả user đã sanitize và accessToken; refresh token được set vào cookie theo X-Client-App. User profile response dùng cùng safe projection với [User API](customer-api.md), không gồm `password` hoặc `providerId`.

## Login

~~~text
POST /api/auth/login
X-Client-App: admin | storefront
~~~

Body gồm email và password. Client header quyết định cookie namespace:

- admin → shopco_admin_refresh_token
- storefront hoặc header thiếu → shopco_storefront_refresh_token

## Refresh

~~~text
POST /api/auth/refresh
X-Client-App: admin | storefront
Cookie: shopco_<client>_refresh_token=...
~~~

Refresh token không nằm trong JSON body. Server verify refresh secret và tạo access token mới.

## Logout

~~~text
POST /api/auth/logout
X-Client-App: admin | storefront
~~~

Server clear cookie tương ứng với client. Client cũng nên clear access token và in-memory user state.

## Client contract

Success envelope dự kiến:

~~~json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "...", "email": "...", "role": "CUSTOMER", "status": "ACTIVE", "provider": "LOCAL" },
    "accessToken": "..."
  }
}
~~~

Không trả password. Access token có thể đọc bởi client để gửi Authorization; refresh token phải HttpOnly.
