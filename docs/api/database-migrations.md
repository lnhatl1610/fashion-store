# Database migrations

## Source of truth

Prisma schema là model hiện tại; thư mục fashion-api/prisma/migrations lưu lịch sử thay đổi. Mỗi migration là bất biến sau khi đã chạy trên môi trường dùng chung.

## Lịch sử hiện có

Repository hiện có các nhóm migration:

- init: user, catalog, cart, order, payment, review và các bảng nền.
- password reset tokens.
- catalog experience: brand, media, promotions, shipping, returns, bundles, inventory và analytics.
- order lifecycle.
- mở rộng user profile/status/provider.
- unique user phone.
- user logo URL.
- remove user logo URL after storefront profile behavior was consolidated on `avatar` (`20260917225034_remove_user_logo_url`, applied locally).

Tên thư mục bắt đầu bằng timestamp để Prisma áp dụng theo thứ tự.

## Local workflow

~~~text
chỉnh schema.prisma
→ npm run prisma:validate --workspace=fashion-api
→ npm run prisma:migrate --workspace=fashion-api
→ npm run prisma:generate --workspace=fashion-api
→ npm run check:api
~~~

prisma migrate dev dùng cho local development khi có chủ ý tạo migration. Không chạy migration mới chỉ để sửa lỗi runtime tạm thời.

## Production workflow

- Review SQL trước khi deploy.
- Backup database.
- Chạy migration bằng pipeline có lock/approval.
- Kiểm tra backward compatibility với API đang chạy.
- Theo dõi query/error sau migration.

## Destructive changes

Drop/rename column, enum value, cascade relation và thay đổi nullable cần migration nhiều bước:

1. Add field/table mới.
2. Deploy code tương thích cả hai dạng.
3. Backfill.
4. Xóa field cũ ở migration sau.

Không sửa migration đã được apply ở shared environment.
