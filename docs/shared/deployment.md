# Deployment

## Services

Monorepo có ba runtime độc lập:

1. API: build TypeScript rồi chạy fashion-api/dist/server.js.
2. Admin: Vite build tạo static assets trong fashion-admin/dist.
3. Storefront: Vite build tạo static assets trong fashion-storefront/dist.

Dist/build output là generated artifact; không commit vào Git. Host deployment có thể build lại từ source.

## Build order

~~~text
npm ci
→ prisma validate/generate
→ build API
→ build admin
→ build storefront
→ migrate database trong release step có kiểm soát
→ start API
→ serve static admin/storefront
~~~

Migration database phải chạy trước code phụ thuộc schema mới, nhưng cần backward compatibility nếu rolling deploy.

## Local ports

- API: 3000.
- Admin Vite: 5173.
- Storefront dev script: 5174.

Production nên dùng domain riêng hoặc subdomain và cập nhật CLIENT_ORIGINS, cookie policy và Vite API URLs.

## Static hosting

SPA host phải fallback các route như /dashboard, /shop và /account về index.html. Nếu không, refresh deep link sẽ trả 404.

## API hosting

- Set NODE_ENV=production.
- Set secure random JWT secrets.
- Dùng HTTPS.
- Cấu hình database connection pooling.
- Chạy process manager/container restart policy.
- Không expose Prisma Studio công khai.

## Release checklist

- Environment đã set.
- Database backup/migration reviewed.
- CORS origins chính xác.
- Cookies hoạt động qua HTTPS.
- Admin/storefront gọi đúng API.
- Health/observability kiểm tra được.
- Không có dist, build, .env hoặc generated secret trong commit.

