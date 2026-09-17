# Validation rules

## Auth

- Register: name min 1, email valid, password min 6, phone optional.
- Login: email valid, password min 1.
- Storefront client hiện dùng password min 8 ở một số reset form; backend rule phải là contract cuối cùng và cần align.

## Product

- Required: name, description, categoryId, basePrice.
- slug tự sinh/normalize.
- categoryId phải tồn tại.
- sku unique.
- status thuộc ProductStatus.
- variants có sku, price và stockQuantity hợp lệ.

## Category

- name bắt buộc.
- slug unique và normalize.
- parentId phải trỏ category hợp lệ nếu có.

## Coupon

- code unique.
- discountType là PERCENTAGE hoặc FIXED.
- percentage không vượt 100.
- validTo sau validFrom.
- minOrderValue và usageLimit không âm.

## Order

- status phải là status được isOrderStatus chấp nhận.
- userId lấy từ JWT với customer flow.
- quantity dương.
- address ownership phải được kiểm tra.

## Review

- productId và userId hợp lệ.
- rating trong khoảng 1–5.
- một user chỉ một review cho một product theo unique constraint.
- update/delete chỉ owner hoặc moderator theo policy.

## Catalog experience

Các schema riêng validate shipping quote, questions/answers, returns, media, promotions, bundles và inventory adjustment. Khi sửa schema, cập nhật DTO, type, test và tài liệu endpoint cùng lúc.

## Error mapping

Validation middleware trả message Validation failed hoặc Invalid query parameters với danh sách field/message. Client nên render field error cạnh input.

