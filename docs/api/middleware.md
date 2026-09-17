# API middleware

## Express setup

app.ts hiện dùng:

1. dotenv config.
2. CORS với credentials=true.
3. express.json().
4. Mount feature routers.

## CORS

CLIENT_ORIGINS là danh sách origin phân tách bằng dấu phẩy. Mặc định local gồm admin 5173 và storefront 5174 cùng các host 127.0.0.1 tương ứng.

Khi credentials=true:

- origin phải là allowlist cụ thể;
- không dùng Access-Control-Allow-Origin=*;
- browser client phải gửi withCredentials=true.

## Authentication middleware

requireAuth verify Authorization Bearer bằng JWT_ACCESS_SECRET và gắn payload vào req.user. optionalAuth bỏ qua anonymous khi token invalid.

## Role middleware

requireRole nhận một hoặc nhiều role. Middleware phải chạy sau requireAuth vì cần req.user.

## Validation middleware

validateBody parse body bằng Zod schema. validateQuery parse query và trả lỗi 400 nếu fail. Route nên validate trước controller để controller nhận DTO đã chuẩn hóa.

## Missing operational middleware

Source hiện chưa có rate limiting, request id, helmet, centralized error handler hoặc structured request logging rõ ràng. Nên bổ sung trước production tùy threat model.

## Ordering

~~~text
CORS → body parser → request id/logging
→ auth/role/validation theo route
→ controller
→ centralized error fallback
~~~

