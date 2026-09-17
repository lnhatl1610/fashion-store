# Rate limiting

## Trạng thái hiện tại

API hiện chưa có middleware rate limit được mount. Đây là khoảng trống bảo mật, đặc biệt với auth, password reset, review, coupon và webhook.

## Policy đề xuất

| Nhóm | Policy gợi ý |
| --- | --- |
| Login/register | Giới hạn theo IP và email, backoff khi fail |
| Refresh | Giới hạn theo client/session |
| Password reset | Rất thấp, không tiết lộ email có tồn tại |
| Catalog read | Limit rộng hơn, hỗ trợ CDN/cache |
| Cart/checkout | Theo user/session, chống burst |
| Review/question | Theo user/IP, chống spam |
| Webhook | Verify signature trước business work; limit theo provider |

Giá trị cụ thể phải đo traffic và đặt qua environment/config, không hardcode trong controller.

## Implementation guidance

- Dùng middleware route-scoped.
- Trả HTTP 429 và Retry-After.
- Dùng store dùng chung nếu chạy nhiều instance; memory store chỉ phù hợp local.
- Không đưa password/token vào rate-limit key log.
- Kết hợp validation, body size limit và idempotency.

## Monitoring

Theo dõi route, status 429, IP aggregate và user/session aggregate. Alert khi có spike nhưng tránh log toàn bộ request body.

