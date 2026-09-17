# Performance Storefront

## Image performance

- Reserve width/height hoặc aspect ratio.
- Dùng Cloudinary transformation khi có thể.
- Ưu tiên WebP/AVIF qua CDN.
- Lazy-load gallery thumbnails và product card ngoài viewport.
- Hero image above-the-fold cần preload có kiểm soát.

## Code splitting

Router đã lazy-load nhiều route-level component. Giữ checkout/account/admin-only code ngoài initial home chunk khi có thể.

## Data fetching

TanStack React Query dùng cache key ổn định và keepPreviousData cho pagination. Không fetch cùng một resource ở nhiều component nếu có thể chia sẻ query.

## Rendering

- Tránh map danh sách lớn không giới hạn.
- Product listing dùng pagination server-side.
- Debounce search.
- Không lưu toàn bộ product object vào localStorage.

## Core Web Vitals

Theo dõi:

- LCP: hero và font.
- CLS: ảnh/product card skeleton.
- INP: filter, cart và menu.

## Production checklist

- Build production và kiểm tra bundle.
- Kiểm tra ảnh broken và fallback.
- Test mạng chậm/offline error state.
- Không log dữ liệu nhạy cảm.
- Kiểm tra cache invalidation sau cart/order mutation.

