# Backend API — tổng quan

## Vai trò

fashion-api là REST API Node.js/Express 5, TypeScript ESM, PostgreSQL và Prisma cho cả admin và storefront.

Mặc định chạy tại http://localhost:3000. Mỗi router được mount hai lần:

- Prefix khuyến nghị: /api
- Legacy alias hiện còn giữ: không có /api

Ví dụ, cả /api/products và /products cùng trỏ tới productRouter.

## Kiến trúc module

~~~text
fashion-api/src/
├── config/             # Prisma client
├── docs/               # OpenAPI document và Swagger helper
├── lib/                # response, auth cookie
├── middlewares/        # auth và validation
├── modules/
│   └── <feature>/
│       ├── *.types.ts
│       ├── *.dto.ts
│       ├── *.schema.ts
│       ├── *.dao.ts
│       ├── *.repository.ts
│       ├── *.service.ts
│       ├── *.controller.ts
│       └── *.route.ts
└── server.ts           # dotenv, Prisma connect, listen
~~~

Flow chuẩn:

~~~text
request → route/middleware → controller → service
→ repository/DAO → Prisma/PostgreSQL → response envelope
~~~

## Module hiện có

auth, users, account, products, categories, coupons, reviews, wishlists, catalog-experience, dashboard, orders, payments và upload.

Lưu ý: app.ts hiện mount payments và upload chưa đầy đủ; cart chưa có module/router độc lập.

## Response envelope

Success có dạng success=true, message và data. Error có success=false, message và error. Client không nên phụ thuộc vào text message để quyết định business rule; dùng HTTP status và field error khi có.

## Runtime

- PORT mặc định 3000.
- DATABASE_URL bắt buộc cho Prisma.
- CORS cho phép CLIENT_ORIGINS.
- Auth cookie dùng HttpOnly, SameSite và Secure theo environment.

