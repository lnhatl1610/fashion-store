# State management Admin

## Phân loại state

| State | Nơi quản lý hiện tại |
| --- | --- |
| Access token | localStorage qua Axios client |
| Refresh token | HttpOnly cookie do backend quản lý |
| Form state | React local state |
| Table filter/search | React local state |
| Table page | React local state |
| Dashboard range | React local state |
| Server data | Feature API call + React state |
| Global UI theme/menu | Dashboard layout state hoặc browser state |

Admin chưa dùng Redux/Zustand/React Query làm data layer chính. Khi thêm global server cache, ưu tiên một abstraction thống nhất thay vì mỗi page tự cache.

## Table state

Mỗi table nên giữ:

- query
- filter values
- page
- pageSize
- sort field/order khi có
- loading/error
- selected rows nếu có bulk action

Khi query/filter thay đổi:

1. Reset page=1.
2. Tính lại totalPages.
3. Không để page hiện tại vượt tổng số trang.
4. Giữ empty/error state rõ ràng.

## Server-side pagination

Các bảng hiện tại thường tải tối đa 100 bản ghi rồi slice ở client. Đây chỉ là giải pháp tạm thời. Với dữ liệu lớn, API nên nhận page, limit, search, sortBy, sortOrder và trả:

~~~json
{
  "items": [],
  "page": 1,
  "limit": 10,
  "total": 0,
  "totalPages": 1
}
~~~

## Auth refresh

Axios dùng một shared refreshRequest để tránh nhiều request đồng thời cùng refresh. Sau refresh thất bại, clear access token và đưa người dùng về auth flow.

## Mutation consistency

Sau create/update/delete/status change:

- reload list hoặc invalidate cache;
- cập nhật page nếu bản ghi cuối bị xóa;
- hiển thị error nếu reload thất bại;
- không báo success trước khi server xác nhận.

