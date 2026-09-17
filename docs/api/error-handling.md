# Error handling

## Response format

Success:

~~~json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
~~~

Error:

~~~json
{
  "success": false,
  "message": "Validation failed",
  "error": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
~~~

## HTTP status

| Status | Dùng cho |
| ---: | --- |
| 200 | Read/update thành công |
| 201 | Tạo resource thành công |
| 400 | Body/query/param không hợp lệ |
| 401 | Thiếu hoặc token không hợp lệ |
| 403 | Không đủ role/ownership |
| 404 | Resource không tồn tại |
| 409 | Unique/conflict, ví dụ email đã tồn tại |
| 429 | Rate limit |
| 500 | Lỗi server không dự kiến |

## Client behavior

- 401: interceptor thử refresh một lần, sau đó clear session.
- 403: hiển thị không đủ quyền, không redirect loop.
- 404: hiển thị not found hoặc empty tùy context.
- 409/400: map field error nếu có.
- 5xx/network: giữ UI cũ, show retry.

## Production rules

Không trả stack trace, SQL, password hash, JWT hoặc provider secret. Log server cần correlation id, route, status và safe error context.

## Consistency

Mọi controller nên dùng sendSuccess/sendError. Error message public ổn định; chi tiết debug chỉ ở server log. Khi thêm error code, cập nhật client mapping và tài liệu.

