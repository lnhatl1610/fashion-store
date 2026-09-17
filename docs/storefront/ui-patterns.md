# UI patterns Storefront

## Product Card

ProductCard cần có:

- Ảnh reserve space, object-fit phù hợp.
- Tên product.
- Rating và review count.
- Giá hiện tại và compare-at price.
- Wishlist action nếu được truyền.
- Add to cart với disabled out-of-stock.

Card phải giữ chiều cao tương đối ổn định để grid không nhảy.

## Skeleton

Skeleton dùng cho product grid, account summary và async sections. Kích thước skeleton phải gần bằng content thật để giảm CLS. Không dùng spinner toàn trang nếu chỉ một vùng đang tải.

## Empty state

EmptyState gồm title, mô tả ngắn và CTA khi có hành động hợp lý. Ví dụ cart trống dẫn tới shop; wishlist trống dẫn tới browse.

## Error state

ErrorState hiển thị message dễ hiểu và retry. Không render raw Axios error hoặc stack trace cho customer.

## Toast

Toast dùng cho kết quả mutation như add cart, wishlist, login và checkout. Message phải ngắn, không lộ token hay dữ liệu nhạy cảm.

## Dialog và drawer

- CartDrawer và mobile filter phải keyboard reachable.
- Có close button label.
- Khóa hoặc quản lý focus khi mở.
- Click backdrop chỉ đóng khi không gây mất form data.

## Buttons

Button component thống nhất variant, loading/disabled state và focus ring. Icon-only control phải có aria-label.

