# CI/CD

## Workflow hiện tại

Workflow nằm tại .github/workflows/ci.yml và chạy trên push/pull_request.

Các bước chính:

1. Checkout.
2. Setup Node 22 và npm cache.
3. npm ci.
4. Prisma validate/generate.
5. Type-check toàn bộ workspace.
6. npm test ở root, hiện build API và chạy Node test order policy.
7. Lint/typecheck/test storefront.
8. Build admin và storefront.

## Commands

~~~text
npm run check
npm test
npm run lint --workspace=fashion-storefront
npm run typecheck --workspace=fashion-storefront
npm run test --workspace=fashion-storefront
npm run build --workspace=fashion-admin
npm run build --workspace=fashion-storefront
~~~

## Known gaps

- CI chưa chạy admin lint.
- CI chưa chạy API integration test với PostgreSQL service thực.
- Root test script hiện tập trung vào API test.
- Deploy step chưa được khai báo trong workflow.

Khi thêm job, giữ nguyên workspace boundary và khai báo service/secret tối thiểu.

## Branch protection đề xuất

- Require CI green.
- Require review.
- Không push trực tiếp main.
- Migration production cần approval riêng.
- Không expose secret trong command output.

## Artifact policy

Build artifact có thể upload cho release nhưng không commit dist/build vào source repository.

