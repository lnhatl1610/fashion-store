# Coding conventions

## Language và naming

- Code, file name, database identifier và public API field dùng English.
- Explanation và UI copy có thể dùng Vietnamese hoặc English.
- Folder dùng kebab-case hoặc camelCase.
- React component dùng PascalCase.
- Variable/function dùng camelCase.
- Constant dùng UPPER_SNAKE_CASE.
- Type/interface dùng PascalCase.

## TypeScript

- Bật strict mode.
- Không thêm any mới.
- Dùng unknown ở catch và type guard khi parse external data.
- Dùng import type cho type-only import.
- Backend ESM import local phải có .js.
- DTO và schema là boundary của request.

## React

- Functional components.
- Hook dependency đầy đủ.
- API call không đặt trực tiếp trong render body.
- Loading/error/empty state rõ.
- Không import source giữa admin, storefront và API.

## Backend

Module ưu tiên flow route → controller → service → repository/DAO. Controller xử lý HTTP; business rule nằm ở service; query nằm ở repository/DAO.

## UI

- Mobile-first.
- Spacing theo nhịp 8px khi phù hợp.
- Focus state nhìn thấy được.
- Icon-only control có aria-label.
- Không dùng màu là tín hiệu duy nhất.
- Table scroll trong vùng table, không làm body overflow.

## Git

Dùng Conventional Commits:

~~~text
feat: add customer address API
fix: handle expired refresh cookie
docs: describe order lifecycle
test: cover coupon validation
~~~

Không commit .env, credentials, node_modules, dist, build hoặc generated output.

