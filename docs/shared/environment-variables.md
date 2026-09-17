# Environment variables

## API: fashion-api/.env

| Variable | Required | Default/example | Mục đích |
| --- | --- | --- | --- |
| DATABASE_URL | Có | PostgreSQL URL | Prisma database connection |
| PORT | Không | 3000 | API listen port |
| NODE_ENV | Không | development | Runtime behavior |
| CLIENT_ORIGINS | Không | 5173,5174 | CORS allowlist cho browser clients |
| AUTH_COOKIE_SAME_SITE | Không | lax | SameSite của refresh cookie |
| JWT_ACCESS_SECRET | Có | Secret riêng | Sign/verify access JWT |
| JWT_REFRESH_SECRET | Có | Secret riêng | Sign/verify refresh JWT |

Các biến integration có thể được thêm theo module:

- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- PAYMENT_WEBHOOK_SECRET
- Stripe secret/publishable keys theo payment implementation

Các biến integration chưa nằm trong .env.example hiện tại cần bổ sung vào example khi module được bật.

## Admin

Admin đọc:

~~~text
VITE_API_URL=http://localhost:3000/api
~~~

Nếu bỏ trống, source có fallback về cùng URL. Không đặt refresh token, JWT secret hoặc database credential trong VITE_ variable vì Vite expose chúng vào browser bundle.

## Storefront

Storefront đọc theo thứ tự:

~~~text
VITE_API_BASE_URL
VITE_API_URL
~~~

Fallback là http://localhost:3000/api. Publishable payment key nếu cần có thể bắt đầu bằng VITE_, nhưng secret key tuyệt đối chỉ ở API.

## Rules

- Commit .env.example, không commit .env.
- Dùng secret khác nhau giữa local, CI, staging và production.
- Secret nên dài và random.
- Rotate khi lộ.
- Không in environment vào log hoặc bundle debug.

