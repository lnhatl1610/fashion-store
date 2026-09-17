# Authorization và RBAC

## Middleware

API có:

- requireAuth: yêu cầu Bearer access token hợp lệ.
- optionalAuth: cố gắng đọc token nhưng cho anonymous nếu token invalid.
- requireRole(...roles): yêu cầu req.user và role nằm trong allowlist.

JWT payload được gắn vào req.user sau verify.

## Current route policy

| Resource | ADMIN | STAFF | CUSTOMER |
| --- | ---: | ---: | ---: |
| Dashboard | Có | Có | Không |
| Admin orders | Có | Có | Không |
| Coupons list/create/update | Có | Có | Không |
| Coupon delete | Có | Không | Không |
| Review moderation list | Có | Có | Không |
| Product/category mutation | Cần khóa ở route hiện tại | Cần policy | Không |
| Customer account | Dữ liệu theo JWT | Dữ liệu theo JWT | Dữ liệu của mình |

## Ownership

Role check chưa đủ cho resource customer. Service phải kiểm tra:

- order.userId === req.user.userId;
- address.userId === req.user.userId;
- wishlist.userId === req.user.userId;
- review.userId === req.user.userId khi sửa/xóa.

## Deny by default

Mutation mới phải private mặc định. Public read cần nêu rõ vì sao được public. Đừng dựa vào route frontend hoặc hidden button.

## Test matrix

Với mỗi protected endpoint, test:

1. Không Authorization → 401.
2. Token invalid/expired → 401.
3. Role không đủ → 403.
4. Role đủ nhưng resource không thuộc ownership → 403 hoặc 404 theo policy.
5. Role và ownership đúng → success.

