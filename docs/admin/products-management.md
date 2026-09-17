# Quản lý sản phẩm

## Phạm vi

Product domain gồm:

- Product và slug.
- Category.
- Product variant/SKU.
- Thumbnail, images và media.
- Giá, trạng thái và tồn kho.

## UI hiện tại

Trang /products hỗ trợ:

- Tải danh sách sản phẩm.
- Lọc theo trạng thái ACTIVE, DRAFT, ARCHIVED.
- Tìm theo tên hoặc slug.
- Phân trang client-side 10 dòng/trang.
- Hiển thị category, giá, số SKU, tồn kho và status.
- Retry khi API lỗi.

API adapter đã có các hàm getProducts, getProductById, getProductBySlug, createProduct, updateProduct, deleteProduct; form CRUD đầy đủ cần tiếp tục hoàn thiện trong UI.

## Product fields

| Field | Bắt buộc khi tạo | Ghi chú |
| --- | ---: | --- |
| name | Có | Tên hiển thị |
| slug | Không | Tự sinh từ name nếu bỏ trống |
| description | Có | Mô tả đầy đủ |
| shortDescription | Không | Mô tả ngắn |
| categoryId | Có | Phải tồn tại |
| basePrice | Có | Giá cơ sở |
| thumbnail | Không | URL ảnh đại diện |
| status | Không | Mặc định DRAFT |
| variants | Không | SKU, attributes, price, stock |
| images | Không | Danh sách URL ảnh |

## Variant và SKU

Mỗi SKU thuộc một product và có:

- sku duy nhất.
- attributes JSON, ví dụ { "color": "Black", "size": "M" }.
- price.
- stockQuantity.

Không cho phép trùng SKU. Khi đổi variant phải kiểm tra tồn kho và giữ dữ liệu cart/order đang tham chiếu.

## Upload ảnh

Module upload có endpoint tạo Cloudinary signature cho Admin/Staff. Upload file nên đi theo flow:

1. Gọi API lấy signature.
2. Upload trực tiếp tới Cloudinary.
3. Nhận URL an toàn.
4. Lưu URL vào product/media.

Không gửi CLOUDINARY_API_SECRET tới browser.

## Validation và UX

- Hiển thị lỗi cạnh field.
- Cảnh báo slug/SKU trùng trước khi submit nếu có thể.
- Disable submit khi đang lưu.
- Confirm trước delete.
- Giữ ảnh preview và fallback khi URL lỗi.

