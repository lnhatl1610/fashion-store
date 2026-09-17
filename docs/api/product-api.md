# Product API

## List products

~~~text
GET /api/products
~~~

Query hiện được đọc bởi controller:

| Param | Ý nghĩa |
| --- | --- |
| search | Tìm theo nội dung được repository hỗ trợ |
| categoryId | Lọc category |
| minPrice | Giá tối thiểu |
| maxPrice | Giá tối đa |
| page | Trang, tùy chọn |
| limit | Số item/trang, tùy chọn |
| sortBy | basePrice, createdAt hoặc name |
| sortOrder | asc hoặc desc |

Response là data dạng PaginatedProducts. Storefront dùng items, total, page, limit và totalPages.

## Detail

~~~text
GET /api/products/:id
GET /api/products/slug/:slug
~~~

Read public và trả product kèm category/variants theo repository.

## Create

~~~text
POST /api/products
~~~

Body tối thiểu gồm name, description, categoryId và basePrice. Có thể gửi slug, shortDescription, thumbnail, status, sku, variants và images.

Service:

- Kiểm tra category tồn tại.
- Generate slug nếu thiếu.
- Generate SKU nếu thiếu.
- Chặn slug/SKU trùng.

## Update

~~~text
PUT /api/products/:id
~~~

Fields optional. Khi name đổi và không gửi slug, service tự generate slug. Nếu gửi sku/slug, phải kiểm tra unique.

## Delete

~~~text
DELETE /api/products/:id
~~~

Trả success với data null khi xóa thành công. Authorization cho các mutation cần được bổ sung ở route trước production.

## Catalog rules

- Product phải thuộc category hợp lệ.
- Product status gồm DRAFT, ACTIVE, ARCHIVED.
- Variant SKU unique.
- Giá và stock phải được validation ở backend.
- Không để product API trả password hoặc dữ liệu nội bộ không cần thiết.

