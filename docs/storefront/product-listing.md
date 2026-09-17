# Product listing

## Routes và query string

Các route /shop, /shop/:slug và /search dùng CategoryPage. State filter được lưu trên URL để deep link và back behavior hoạt động:

~~~text
/shop?page=1&sort=popular&minPrice=100000&maxPrice=500000
/search?q=dress&page=2&sort=price-asc
~~~

Query được hỗ trợ:

- q: text search.
- page: trang hiện tại, tối thiểu 1.
- limit: mặc định 12.
- sort: popular, new, price-asc, price-desc.
- minPrice và maxPrice.
- categoryId được suy ra từ slug category.

## API request

productApi.list gửi page, limit, search, categoryId, minPrice, maxPrice, sortBy và sortOrder tới GET /api/products.

Response pagination dự kiến:

~~~json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 12,
  "totalPages": 1
}
~~~

## UX

- ProductGrid dùng ProductCard.
- 12 sản phẩm/trang.
- keepPreviousData giữ grid cũ trong lúc trang mới tải.
- Pagination đặt dưới grid, có Trước/Sau.
- EmptyState khi không có kết quả.
- ErrorState có retry.
- Bộ lọc desktop ở sidebar; mobile mở bottom sheet.

## Filter behavior

Đổi filter hoặc sort phải set page về 1. Filter cần phản ánh vào URL, không chỉ giữ trong state tạm. Search nên debounce nếu chuyển sang gọi API ở mỗi ký tự.

## Sorting

Current UI map:

- popular: mặc định backend.
- new: sortBy=createdAt, sortOrder=desc.
- price-asc: sortBy=basePrice, sortOrder=asc.
- price-desc: sortBy=basePrice, sortOrder=desc.

