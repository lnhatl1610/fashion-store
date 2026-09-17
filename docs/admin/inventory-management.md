# Quản lý tồn kho

## UI hiện tại

Trang /inventory flatten các product variants thành các dòng SKU và hỗ trợ:

- Tìm theo product name hoặc SKU.
- Hiển thị thuộc tính variant.
- Hiển thị số lượng tồn.
- Nhãn Hết hàng, Sắp hết hoặc Còn hàng.
- Phân trang client-side 10 dòng/trang.

Ngưỡng hiện tại của UI: stockQuantity <= 5 được xem là low stock.

## Data model

Tồn kho chính nằm tại ProductVariant.stockQuantity. Biến động kho được ghi ở InventoryTransaction với các type:

- ADJUSTMENT
- RETURN
- SALE
- RESTOCK

## Điều chỉnh tồn kho

Backend catalog experience có endpoint admin:

~~~text
POST /api/catalog/admin/inventory/adjust
~~~

Endpoint yêu cầu ADMIN hoặc STAFF và cần payload đã validate. UI điều chỉnh trực tiếp chưa có; không sửa số lượng bằng cách mutate local state rồi coi là đã lưu.

Flow đề xuất:

1. Chọn SKU.
2. Nhập delta hoặc số lượng mới và note.
3. Hiển thị số lượng trước/sau.
4. Confirm.
5. Backend transaction cập nhật variant và tạo InventoryTransaction.
6. Reload bảng.

## Cảnh báo

- Low stock cần link tới inventory.
- Out of stock cần được phân biệt với sản phẩm chưa có variant.
- Không chỉ dùng màu; luôn có text.
- Khi nhiều SKU, dùng server-side pagination/filter để tránh tải toàn bộ catalog.

