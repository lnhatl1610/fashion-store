# Dashboard widgets

## Data source

Dashboard gọi:

~~~text
GET /api/dashboard/overview?range=7d
~~~

range nhận 7d, 30d hoặc 12m; giá trị không hợp lệ được backend quy về 7d. Endpoint yêu cầu access token và role ADMIN hoặc STAFF.

Response chính:

~~~json
{
  "success": true,
  "data": {
    "range": "7d",
    "stats": {
      "revenue": { "value": 0, "change": 0 },
      "orders": { "value": 0, "change": 0 },
      "newCustomers": { "value": 0, "change": 0 },
      "lowStock": { "value": 0, "change": 0 }
    },
    "revenue": [],
    "orderStatus": [],
    "recentOrders": [],
    "topProducts": [],
    "alerts": { "lowStock": 0, "pendingOrders": 0 }
  }
}
~~~

## Stat cards

- **Tổng doanh thu**: tổng totalAmount trong kỳ hiện tại và phần trăm thay đổi so với kỳ trước.
- **Đơn hàng mới**: số order tạo trong kỳ.
- **Khách hàng mới**: số user customer mới trong kỳ.
- **Sản phẩm sắp hết**: số variant có tồn kho thấp theo logic DAO.

Card phải có label, giá trị, change indicator và trạng thái zero rõ ràng. Không dùng màu đỏ/xanh làm tín hiệu duy nhất.

## Revenue chart

revenue là mảng { label, value }. Dashboard hiện vẽ SVG line/area chart tự quản lý, không phụ thuộc chart library.

- 7d: điểm theo ngày.
- 30d: điểm theo ngày hoặc bucket tương ứng do service trả về.
- 12m: điểm theo tháng.
- Khi không có order, vẫn giữ trục và empty message để tránh layout shift.

## Order status breakdown

orderStatus dùng cho donut chart và hiển thị số lượng ở giữa. Status phải đi kèm text label; chart không được là cách duy nhất để đọc dữ liệu.

Status hiện được đồng bộ với Prisma OrderStatus trong frontend admin: PENDING, PAID, SHIPPING, COMPLETED, CANCELLED.

## Recent orders

Bảng mini hiển thị id rút gọn, khách hàng, ngày tạo, tổng tiền và trạng thái. Đây là preview; thao tác đầy đủ nằm ở /orders. Khi không có dữ liệu, hiển thị empty state thay vì bảng trống.

## Top products

Hiển thị các sản phẩm nổi bật theo soldQuantity, thumbnail fallback và thanh tỷ lệ tương đối. Ảnh phải có alt phù hợp hoặc alt rỗng nếu chỉ mang tính trang trí.

## Alerts

Alert hiện gồm:

- Số sản phẩm cần bổ sung.
- Số đơn đang chờ xử lý.

CTA tương lai có thể dẫn tới /inventory và /orders.

