# Authentication và JWT flow

## Token types

- Access token: JWT ngắn hạn, gửi qua Authorization Bearer.
- Refresh token: JWT dài hạn hơn, lưu trong HttpOnly cookie.

Hai client dùng cookie riêng:

- shopco_admin_refresh_token
- shopco_storefront_refresh_token

Cookie được chọn theo header X-Client-App. Giá trị admin chọn admin; mọi giá trị khác mặc định storefront.

## Request flow

~~~text
login/register
  → server sign access + refresh
  → Set-Cookie refresh
  → JSON accessToken + user

API request
  → Authorization: Bearer access
  → requireAuth verify access

401
  → client POST /auth/refresh with cookie
  → receive new access token
  → retry original request once
~~~

User có `status=BANNED` không được đăng nhập và không được cấp access token mới khi refresh.

## Cookie attributes

- Path=/.
- HttpOnly.
- SameSite=Lax mặc định.
- SameSite=None yêu cầu HTTPS và Secure.
- Secure bật ở production hoặc SameSite=None.
- Max-Age hiện 7 ngày.

## Expiry

Access token lifetime phải đọc từ auth service/config hiện tại; client không nên tự giả định chỉ dựa vào đồng hồ browser. Khi access hết hạn, interceptor refresh tự động nếu refresh cookie còn hợp lệ.

## Logout và compromise

Logout clear cookie phía response và clear access token phía client. Production nên có refresh token rotation/revocation theo session để xử lý token bị đánh cắp.

## CORS

Browser clients phải nằm trong CLIENT_ORIGINS. CORS bật credentials=true để cookie được gửi. Không dùng wildcard origin khi credentials được bật.
