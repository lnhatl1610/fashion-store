# User và account API

## Users module

Các endpoint users hiện có:

~~~text
POST   /api/users
GET    /api/users
GET    /api/users/:id
GET    /api/users/email/:email
PUT    /api/users/:id
DELETE /api/users/:id
~~~

Controller sanitize dữ liệu nhạy cảm trước response, nhưng route hiện chưa gắn auth/role middleware. Đây là điểm cần khóa trước production.

User response an toàn gồm:

~~~json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "Nguyen Van A",
  "phone": "0900000000",
  "avatar": null,
  "role": "CUSTOMER",
  "dateOfBirth": null,
  "deletedAt": null,
  "emailVerifiedAt": null,
  "gender": null,
  "lastLoginAt": null,
  "phoneVerifiedAt": null,
  "provider": "LOCAL",
  "status": "ACTIVE",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
~~~

`password` và `providerId` được loại khỏi mọi user response.

`PUT /api/users/:id` hỗ trợ cập nhật các trường hồ sơ/tài khoản an toàn: `name`, `email`, `phone`, `avatar`, `role`, `dateOfBirth`, `gender` và `status`. `status` là nguồn trạng thái duy nhất của user, nhận `ACTIVE` hoặc `BANNED`. Các trường như `id`, `provider`, `deletedAt`, thời điểm xác thực, `lastLoginAt`, `createdAt` và `updatedAt` do hệ thống quản lý; `password` và `providerId` không nhận từ giao diện admin.

## Account overview

~~~text
GET /api/account/overview
Authorization: Bearer <access-token>
~~~

Response gồm user cơ bản, stats và recentOrders cho user trong JWT.

## Address

Schema có Address gắn với User và Order. Module account hiện mới expose overview; CRUD address cần được bổ sung nếu checkout phụ thuộc hoàn toàn vào API.

Contract đề xuất:

~~~text
GET    /api/account/addresses
POST   /api/account/addresses
PUT    /api/account/addresses/:id
DELETE /api/account/addresses/:id
PATCH  /api/account/addresses/:id/default
~~~

Mọi id address phải được kiểm tra ownership.

## Customer history

Admin customer detail nên trả profile đã sanitize, order summary, review summary và timestamps cần thiết. Không trả password hash, refresh token hoặc secret provider id không cần thiết.

## Deactivate vs delete

Ưu tiên `status=BANNED` để khóa tài khoản và giữ referential integrity. Delete chỉ dùng khi có policy, audit và xử lý relation rõ ràng.
