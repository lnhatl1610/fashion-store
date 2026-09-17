# UI patterns cho Admin

## Card chứa table

Mỗi data table nằm trong một card chung:

- Nền trắng.
- Border mảnh.
- Border radius 16px.
- Shadow nhẹ.
- Horizontal scroll chỉ xảy ra bên trong vùng table.

Không biến từng row thành card khi dữ liệu có nhiều cột; table header vẫn phải hiển thị trên desktop.

## DataTable

Table dùng các primitive trong src/components/ui/table.tsx:

- Table
- TableHeader
- TableBody
- TableHead
- TableRow
- TableCell

Header và các hàng dữ liệu có border-bottom rõ ràng để giữ nhịp đọc khi bảng có nhiều cột.

Khi số dòng lớn, dùng server-side pagination. Các màn hình hiện tại đang phân trang client-side sau khi tải dữ liệu.

## Pagination

DataTablePagination dùng chung cho các page:

- 10 dòng mỗi trang.
- Nút Trang đầu, Trước, số trang hiện tại, Sau và Trang cuối.
- Disabled ở biên.
- Có `aria-label` cho navigation, từng nút và `aria-current` cho trang hiện tại.
- Khi đổi filter/search phải reset về trang 1.
- Không hiển thị đường kẻ ngang ở mép trên của vùng pagination; pagination vẫn có khoảng đệm riêng dưới table/card.

## Row actions

RowActionsMenu gom các action của một dòng. Action xóa phải có:

- Icon bánh răng `Settings` có accessible label cụ thể theo resource.
- Menu dropdown mở bằng click, đóng khi chọn action, nhấn Escape hoặc click ra ngoài.
- Label cụ thể theo resource.
- Tone danger.
- Confirm dialog.
- Loading state.
- Reload/invalidate dữ liệu sau thành công.

## Filters và toolbar

Toolbar nên đặt search, select filter, refresh và CTA trên cùng vùng card. Input phải có label hoặc aria-label; không dựa chỉ vào placeholder.

- Thanh filter không có border bao ngoài.
- Từng input/select/button filter có đổ bóng nhẹ để tách khỏi nền toolbar.
- Input/select/button bên trong không dùng viền bao ngoài; trạng thái focus vẫn dùng ring để nhận biết vùng tương tác.
- Chữ của filter và control phải có màu tối, tương phản rõ trên nền sáng.

## Column visibility

Các table có nhiều cột có thể cung cấp menu `Cột hiển thị`:

- Đặt menu trong toolbar phía trên table để filter và thao tác bảng ở cùng một vùng.
- Cột định danh chính và cột `Tùy chọn` luôn hiển thị.
- Các cột dữ liệu còn lại có thể bật/tắt bằng checkbox có label.
- Menu có accessible name, đóng bằng Escape hoặc click ra ngoài.
- Khi thay đổi cột, table vẫn giữ horizontal scroll trong vùng table, bị giới hạn theo viewport và không làm body tràn ngang.

## Feedback states

Mỗi page cần bốn trạng thái:

1. Loading với layout ổn định.
2. Success có dữ liệu.
3. Empty có hướng dẫn hành động.
4. Error có message và retry.

## Responsive

- Desktop giữ table để so sánh nhiều cột.
- Mobile giữ horizontal scroll trong table region, không làm body tràn ngang.
- Button tương tác nên có vùng chạm khoảng 44px.
- Icon-only button phải có aria-label.
