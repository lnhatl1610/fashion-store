# Convention form Admin

## Trạng thái hiện tại

Admin đang dùng controlled form/native event ở một số page. fashion-admin hiện chưa khai báo react-hook-form và zod trong package riêng như storefront.

Các form hiện có gồm auth, category, coupon và các dialog xác nhận. Khi mở rộng, nên chuẩn hóa dần sang schema validation và reusable field components.

## Quy ước đề xuất

Mỗi form nên có:

- Schema input typed.
- Label luôn hiển thị.
- aria-invalid khi lỗi.
- Error message ngay dưới field.
- Trim/normalize dữ liệu trước submit.
- Disable submit trong lúc request.
- Giữ dữ liệu khi request thất bại.
- Toast hoặc inline success sau khi lưu.

## Validation boundary

Frontend validation giúp UX nhanh; backend vẫn phải validate mọi body/query/param. Không tin giá, role, discount, stock hoặc permission do browser gửi.

## Field rules mẫu

| Form | Rules chính |
| --- | --- |
| Login | Email hợp lệ, password không rỗng |
| Category | Name bắt buộc, slug chuẩn hóa, parent không tự trỏ |
| Product | Name, description, categoryId, basePrice bắt buộc |
| Variant | SKU duy nhất, price không âm, stock là integer không âm |
| Coupon | Code duy nhất, discount hợp lệ, validTo sau validFrom |
| Order status | Chỉ transition hợp lệ |

## Submit flow

~~~text
input → normalize → validate client → submit API
→ success: close/reload → error: map field/general error
~~~

## Destructive actions

Delete, deactivate, refund và inventory adjustment phải có confirm. Nội dung confirm phải nói rõ resource và hậu quả.

