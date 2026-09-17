# Product detail

## Data

ProductDetailPage tải:

- Product theo slug.
- Recommendation list.
- Brand/product experience.
- Product questions.
- Product reviews.

API chính:

~~~text
GET /api/products/slug/:slug
GET /api/catalog/products/:productId
GET /api/catalog/products/:productId/questions
GET /api/reviews/product/:productId
~~~

## Gallery

- Ảnh chính và thumbnail nên giữ aspect ratio cố định.
- Reserve image space để tránh layout shift.
- Ảnh không có URL phải có placeholder.
- Alt text dùng tên sản phẩm hoặc mô tả ảnh.
- Lazy-load ảnh ngoài viewport.

## Variant selection

Customer chọn variant dựa trên attributes như color/size. Khi variant đổi:

1. Cập nhật selectedVariant.
2. Cập nhật giá/SKU/tồn.
3. Disable add nếu stockQuantity bằng 0.
4. Không reset quantity ngoài chủ ý.

## Add to cart

Add gọi POST cart items với variantId và quantity. Thành công thì cập nhật Zustand cart store và hiển thị toast. Lỗi tồn kho phải được nói rõ.

## Wishlist và compare

Wishlist yêu cầu auth. Recent product và compare list hiện dùng localStorage cho trải nghiệm client; không lưu secret vào localStorage.

## Review và question

Review list có thể public; tạo/sửa review yêu cầu auth. Question creation yêu cầu auth, answer chính thức yêu cầu ADMIN hoặc STAFF. UI cần phân biệt owner với official answer.

