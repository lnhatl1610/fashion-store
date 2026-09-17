# Storefront frontend — tổng quan

## Mục đích

Storefront là ứng dụng React/Vite phục vụ khách mua sắm thời trang trên SHOP.CO. Luồng chính là browse catalog, xem chi tiết, thêm giỏ, checkout và theo dõi tài khoản.

Mặc định:

- URL: http://localhost:5174
- API base URL: VITE_API_BASE_URL hoặc VITE_API_URL
- Fallback API: http://localhost:3000/api

## Luồng người dùng

~~~text
Home → Shop/Search → Product detail → Cart
→ Login nếu cần → Checkout → Order confirmation
→ Account → Orders / Profile / Wishlist
~~~

Guest có thể xem catalog và giỏ hàng. Checkout, order confirmation, account và các mutation yêu cầu đăng nhập được bọc bởi ProtectedRoute.

## Kiến trúc

~~~text
fashion-storefront/src/
├── app/               # router, providers, route guards
├── components/        # layout, product, feedback, UI primitives
├── features/          # home, products, cart, checkout, auth, account...
├── layouts/           # storefront, auth, account
├── lib/               # API client, validators, formatters
├── stores/            # auth và cart Zustand stores
└── types/             # API, product, cart, order, user
~~~

API call đi qua apiClient; server state dùng TanStack React Query; client state dùng Zustand.

## Auth flow

Access token được giữ ở client qua authToken và gửi trong Authorization header. Refresh token là HttpOnly cookie theo client storefront, browser gửi cookie nhờ withCredentials=true.

## Trạng thái và gap hiện tại

- Catalog listing đã có filter, sort và pagination theo query string.
- Auth, cart UI, account shell và checkout UI đã có.
- Cart/order backend chưa có đầy đủ route tương ứng với các API call hiện tại; cần hoàn thiện trước khi gọi là production-ready.
- Stripe UI package đã cài nhưng checkout hiện disable Stripe vì backend PaymentIntent chưa hoàn tất.

