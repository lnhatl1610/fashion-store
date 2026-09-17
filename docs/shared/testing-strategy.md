# Testing strategy

## Unit/domain tests

Test business rule thuần như:

- order status transition.
- coupon validation.
- price/discount calculation.
- inventory adjustment.
- token/cookie policy.

Unit test không cần database nếu dependency được inject.

## API integration

Test qua HTTP với database test riêng:

- auth success/failure.
- product/category CRUD.
- order ownership/status.
- coupon role policy.
- review owner/moderator.
- validation 400, unauthenticated 401, forbidden 403, not found 404.

Không dùng database production trong test.

## Frontend tests

Storefront có Vitest và Testing Library dependencies; test cart store, validators, auth redirect và product listing behavior. Admin cần bổ sung component/page tests khi logic tăng.

## E2E

Root có Playwright config dependency và script test:e2e. Luồng ưu tiên:

1. Guest browse.
2. Login/register.
3. Add cart.
4. Checkout COD.
5. Account orders.
6. Admin login.
7. Admin filter/pagination/status update.

## Required checks

~~~text
npm run check:api
npm run check:admin
npm run check:storefront
npm run check
npm test
npm run test:e2e
~~~

## UI QA

Kiểm tra desktop, tablet và mobile; keyboard navigation; loading, success, empty, error; cookie refresh; horizontal overflow; direct-link refresh của SPA.

## Test data

Dùng fixture có tên rõ, password giả lập và database reset riêng. Không ghi access token, refresh token hoặc thông tin thanh toán thật vào snapshot/log.

