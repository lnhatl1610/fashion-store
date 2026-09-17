# Quản lý user

## Phân biệt tên gọi

Trong admin, trang `/users` là màn hình quản lý user chung. Customer là user có `role=CUSTOMER`; staff/admin cũng nằm trong cùng bảng backend.

## UI hiện tại

Trang `/users` hiện:

- Gọi `GET /api/users` và lọc client-side theo tên, email hoặc phone.
- Có filter theo role (`CUSTOMER`, `STAFF`, `ADMIN`) và trạng thái tài khoản `ACTIVE`/`BANNED`.
- Có nút xóa filter và tải lại danh sách; khi đổi filter sẽ quay về trang 1.
- Từng input/select/button trong thanh filter có đổ bóng nhẹ; thanh filter và các control bên trong không có viền bao ngoài. Trạng thái focus dùng ring, chữ vẫn có màu tối để dễ đọc trên nền sáng.
- Bộ lọc `Cột hiển thị` nằm trên table, cùng toolbar tìm kiếm và lọc; card table không lặp lại phần mô tả chọn cột.
- Có card chứa table với các thuộc tính user: `Ảnh đại diện`, `ID`, `Tên user`, `Email`, `Điện thoại`, `Vai trò`, `Ngày sinh`, `Ngày xóa`, `Email xác thực lúc`, `Giới tính`, `Đăng nhập lần cuối`, `Điện thoại xác thực lúc`, `Nhà cung cấp`, `Trạng thái`, `Ngày tạo`, `Cập nhật lần cuối` và `Tùy chọn`.
- Cột `Tên user` và `Tùy chọn` luôn hiển thị; các thuộc tính còn lại, theo thứ tự `Ảnh đại diện` rồi `ID`, có thể bật/tắt từ menu `Cột hiển thị` ở toolbar phía trên table.
- Card và table bị giới hạn theo chiều rộng viewport; table không tạo thanh cuộn ngang. Cột dùng layout cố định, padding compact và tự xuống dòng với nội dung dài.
- Mặc định chỉ hiển thị các cột quản trị cốt lõi để giữ table dễ đọc; các thuộc tính user còn lại vẫn bật/tắt được từ menu `Cột hiển thị`.
- Header và từng hàng có đường phân cách rõ ràng.
- Phân trang client-side 10 dòng/trang với nút đầu, trước, số trang, sau và cuối; control nằm bên dưới card, tách khỏi table.
- Mỗi dòng có icon bánh răng `Settings` mở menu `Xem chi tiết`, `Sửa` và `Xóa`.
- `Sửa` mở dialog cập nhật name, email, phone, avatar, role, ngày sinh, giới tính và trạng thái tài khoản (`ACTIVE`/`BANNED`).
- `Xem chi tiết` hiển thị toàn bộ thuộc tính user an toàn, gồm cả các trường hệ thống chỉ đọc.
- `Xóa` mở confirm dialog trước khi gọi API; sau khi thành công danh sách được tải lại.
- Có loading, empty, error và retry state.

## API liên quan

~~~text
GET /api/users
GET /api/users/:id
GET /api/users/email/:email
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
GET /api/account/overview
~~~

`/account/overview` dành cho user đã đăng nhập xem thông tin của chính mình; không dùng endpoint này để thay thế admin user detail.

Response user đã sanitize gồm các trường hồ sơ và trạng thái: `id`, `email`, `name`, `phone`, `avatar`, `role`, `dateOfBirth`, `deletedAt`, `emailVerifiedAt`, `gender`, `lastLoginAt`, `phoneVerifiedAt`, `provider`, `status`, `createdAt`, `updatedAt`. `status` chỉ nhận `ACTIVE` hoặc `BANNED`; `password` và `providerId` không được trả về client.

## Nghiệp vụ mục tiêu và phần còn thiếu

- Tìm theo email, tên, phone.
- Lọc theo role, trạng thái và ngày đăng ký.
- Xem profile cơ bản và lịch sử order.
- Chuyển `status` sang `BANNED` thay vì xóa cứng.
- Reset session khi khóa tài khoản.
- Ghi audit log cho thay đổi nhạy cảm.

Hiện UI mới thực hiện tìm kiếm theo text, role, trạng thái tài khoản, xem đầy đủ thuộc tính an toàn, cập nhật các trường được phép và xóa theo API hiện có. Lọc theo ngày đăng ký, lịch sử order, soft-delete, reset session và audit log chưa được triển khai đầy đủ.

## Bảo mật

Password phải bị loại khỏi mọi response và không xuất hiện trong dialog sửa/chi tiết. UI không được xem việc ẩn action là biện pháp bảo mật; các mutation của users vẫn cần được rà soát để bổ sung `requireAuth`/`requireRole` ở backend trước production.

## Empty và error states

- Không có user: giải thích cách tạo user hoặc đăng ký từ storefront.
- API lỗi: hiển thị retry, không xóa bảng cũ nếu đang refresh.
- 403: báo rõ tài khoản không đủ quyền.
