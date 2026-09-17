# Database schema

## ORM và database

Schema nguồn: fashion-api/prisma/schema.prisma. Provider là PostgreSQL; Prisma client generated vào fashion-api/generated/prisma.

## Core models

### Identity

- User: email, password hash, name, phone, avatar, role, trạng thái tài khoản (`ACTIVE` hoặc `BANNED`), profile verification/provider timestamps và relations.
- Address: địa chỉ thuộc user, có thể được order tham chiếu.

### Catalog

- Category: slug unique, parent/children hierarchy.
- Brand: tên, slug, logo, active.
- Product: description, category, brand, basePrice, thumbnail, status.
- ProductVariant: SKU unique, attributes JSON, price, stockQuantity.
- ProductImage/ProductMedia: media của product hoặc variant.

### Shopping

- Cart và CartItem: user hoặc guest session, unique variant trong cart.
- Wishlist: unique theo userId/productId.

### Orders và payments

- Order: user, address, status, totalAmount, paymentMethod, coupon.
- OrderItem: variant, quantity, priceAtPurchase.
- Payment: provider, transactionId, status, amount.
- ReturnRequest/ReturnItem: return lifecycle.

### Engagement

- Review, ProductReviewMedia, ReviewHelpful.
- ProductQuestion và ProductAnswer.
- ProductViewEvent.

### Promotions và delivery

- Coupon.
- Promotion, PromotionProduct, PromotionCategory.
- ProductBundle, ProductBundleItem.
- ShippingZone, ShippingZoneProvince, ShippingRate.

### Inventory

- InventoryTransaction: adjustment, return, sale, restock.

## Important constraints

- Email, category slug, product slug, variant SKU unique.
- ProductVariant thuộc Product.
- CartItem unique theo cartId + variantId.
- Review unique theo productId + userId.
- Foreign key onDelete được định nghĩa trong schema; thay đổi cần đánh giá dữ liệu liên quan.

## Enum

Role, UserStatus, Gender, AuthProvider, ProductStatus, OrderStatus, PaymentStatus, PaymentProvider, PaymentMethod, DiscountType, ProductMediaType, QuestionStatus, ReturnStatus và InventoryTransactionType.

Khi schema và migration có dấu hiệu lệch, dùng prisma validate, kiểm tra migration history và không tự sửa database production bằng SQL ad-hoc.
