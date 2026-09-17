# User dashboard

## Account layout

AccountLayout cung cấp:

- Profile summary.
- Desktop sidebar.
- Mobile account nav.
- Nested outlet.
- Breadcrumb tài khoản.

## Screens

- Overview: stats, recent orders, quick links.
- Profile: thông tin cá nhân.
- Password: đổi password.
- Orders: danh sách order và status.
- Order detail: chi tiết một order.
- Addresses: CRUD địa chỉ.
- Wishlist: product grid và remove.
- Reviews: review của customer.
- Coupons: coupon liên quan user.
- Notifications: thông báo.

## Data fetching

Account pages dùng TanStack React Query. Query key phải bao gồm resource và id khi cần; sau mutation invalidate query liên quan.

## Authorization

User chỉ được xem dữ liệu của chính mình. Backend không được tin userId từ browser nếu JWT đã có userId.

## Current integration notes

Storefront accountApi gọi /orders và /wishlist. Backend source hiện mount orders cho ADMIN/STAFF và wishlist route là /wishlists; cần align contract thành /api/account/orders hoặc route customer riêng và /api/wishlists trước production.

## UX

- Loading dùng skeleton hoặc message có reserve space.
- Empty orders/wishlist có CTA quay lại shop.
- Status dùng StatusBadge kèm text.
- Order detail có link quay lại danh sách.
- Mobile không cần table; dùng order cards.

