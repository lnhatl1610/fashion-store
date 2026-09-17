# Responsive design

## Breakpoint convention

Dự án dùng Tailwind CSS v4 và mobile-first:

- Base: mobile khoảng 320px trở lên.
- sm: layout trung gian và grid rộng hơn.
- md: account navigation/desktop enhancements.
- lg: sidebar filters, account sidebar và checkout columns.

Không phụ thuộc vào một thiết bị cụ thể; test cả chiều rộng nhỏ và tablet.

## Rules

- Không để page-level horizontal overflow.
- Horizontal scroll chỉ dành cho vùng có chủ ý như filter chips.
- Product grid chuyển số cột theo viewport.
- Button/input có min-height khoảng 44px cho touch.
- Text không bị cắt mất thông tin quan trọng.
- Ảnh có kích thước/aspect ratio dự kiến.

## Layout patterns

- Header desktop và MobileNavigation tách behavior.
- Filter desktop là aside; mobile là bottom sheet.
- Checkout chuyển từ hai cột sang một cột.
- Account sidebar chuyển thành mobile nav.
- Cart items xếp lại theo chiều dọc ở màn hình hẹp.

## QA checklist

- 320px: không tràn ngang, form dùng được.
- 390px: product card và CTA không chồng.
- 768px: grid/spacing hợp lý.
- 1024px trở lên: sidebar và desktop controls hoạt động.
- Keyboard focus không bị hidden dưới sticky/fixed element.

