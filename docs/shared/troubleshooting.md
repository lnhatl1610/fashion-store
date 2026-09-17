# Troubleshooting

## Không mở được admin/storefront

Chạy từ root:

~~~text
npm run dev
~~~

Xác nhận:

- API ở port 3000.
- Admin ở 5173.
- Storefront ở 5174.
- Không có process khác chiếm port.

## API không kết nối được

- Kiểm tra DATABASE_URL.
- Kiểm tra PostgreSQL đang chạy.
- Chạy prisma validate và prisma generate.
- Xem terminal API có connection warning hay không.

## CORS hoặc cookie không hoạt động

- CLIENT_ORIGINS phải khớp origin đầy đủ, gồm protocol và port.
- Browser client phải dùng withCredentials=true.
- Không dùng wildcard origin với credentials.
- Local dùng SameSite=Lax; cross-site production cần HTTPS và SameSite=None/Secure.
- Admin và storefront có cookie refresh riêng.

## 401 sau một thời gian

Access token đã hết hạn là bình thường. Client sẽ gọi refresh bằng HttpOnly cookie. Nếu refresh thất bại:

1. Kiểm tra cookie tồn tại và đúng client header.
2. Kiểm tra JWT_REFRESH_SECRET giống giữa process.
3. Kiểm tra CORS credentials.
4. Đăng nhập lại.

## ESLint báo thiếu config

ESLint 9 cần eslint.config.js, eslint.config.mjs hoặc eslint.config.cjs. Không dùng .eslintrc.* nếu chưa migrate flat config. Chạy lệnh đúng workspace.

## Refresh deep link trả 404

SPA host cần fallback mọi client route về index.html. Đây là cấu hình host, không phải lỗi React route.

## Build lỗi

- Xóa generated output chỉ khi đã xác định đúng workspace và có thể build lại.
- Chạy npm ci nếu lockfile/dependency lệch.
- Chạy check workspace bị lỗi trước khi chạy full check.
- Không commit dist/build để che lỗi build.

## Cart/order/payment không chạy

Đối chiếu contract:

- Backend hiện chưa mount cart router.
- Orders backend hiện chỉ có admin list/status.
- Payment router source chưa mount.

Đừng sửa bằng cách tắt auth hoặc hardcode success; bổ sung route, validation, authorization và test đúng flow.

