# SEO Storefront

## Metadata

HomePage hiện dùng react-helmet-async để đặt title và meta description. Mỗi route indexable nên có:

- title riêng.
- description ngắn, chính xác.
- canonical URL.
- Open Graph title, description, image.
- Twitter card nếu cần.

## Product và category

Product detail nên sinh metadata từ product name, short description và thumbnail. Category/search cần phân biệt:

- Category pages có thể index nếu có nội dung hữu ích.
- Search result thường nên noindex nếu query tạo nhiều URL trùng.
- Product slug phải ổn định; khi đổi slug cần redirect hoặc canonical.

## Structured data

Có thể bổ sung JSON-LD:

- Product.
- Offer.
- AggregateRating.
- BreadcrumbList.
- Organization.

Chỉ phát structured data khớp nội dung người dùng thấy.

## Open Graph images

Ảnh OG cần kích thước cố định, URL public và alt/text phù hợp. Không dùng ảnh private hoặc URL local trong production.

## Sitemap và robots

Vite SPA cần host static sitemap.xml và robots.txt ở public. Danh sách URL product/category phải lấy từ nguồn dữ liệu xuất bản, không đưa cart, account, checkout hoặc admin vào sitemap.

