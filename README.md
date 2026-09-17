# SHOP.CO Fashion Store

SHOP.CO is a full-stack e-commerce platform for fashion retail. The project is organized as a TypeScript monorepo with an Express API, PostgreSQL database and two React applications: a customer storefront and an administration dashboard.

## Demo / Screenshots

No live demo or screenshots are configured yet. Run the applications locally using the instructions below.

## Tech Stack

### Backend

- Node.js and TypeScript
- Express 5
- PostgreSQL
- Prisma ORM
- Zod request validation
- JWT authentication
- CORS and `dotenv`
- Cloudinary configuration for media uploads

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui-style components
- Zustand for client state
- TanStack React Query
- Axios
- React Hook Form and Zod
- Stripe React packages are included in the storefront for payment UI integration

## Main Features

- Customer registration, login, refresh-token flow and logout
- JWT-protected customer account area
- Product catalog, product details, categories, variants and inventory
- Shopping cart and checkout flows in the storefront
- Order lifecycle and payment-provider models in the database
- Wishlist management
- Product reviews and review helpful votes
- Coupons and promotions
- Product questions and answers
- Brands, media, bundles and shipping configuration
- Returns and inventory adjustments
- Admin dashboard for products, categories, users, orders, coupons, reviews and inventory
- Prisma migrations and generated database client

## Prerequisites

- Node.js 20 LTS or newer recommended
- npm 10 or newer recommended
- PostgreSQL 14 or newer recommended
- A PostgreSQL database for local development
- Cloudinary credentials when using the upload functionality

The repository does not enforce Node.js or PostgreSQL versions through an `engines` field, so the versions above are recommended rather than hard requirements.

## Installation

```bash
git clone <your-repository-url>
cd fashion-store
npm install
```

Create the environment files from the committed examples:

```powershell
Copy-Item fashion-api/.env.example fashion-api/.env
Copy-Item fashion-admin/.env.example fashion-admin/.env
```

Update `fashion-api/.env` with a valid PostgreSQL connection string and secure JWT secrets. Set the admin API URL if necessary:

```env
# fashion-admin/.env
VITE_API_URL=http://localhost:3000/api
```

Generate the Prisma client and apply migrations:

```bash
npm run prisma:generate --workspace=fashion-api
npm run prisma:migrate --workspace=fashion-api
```

Start all applications:

```bash
npm run dev
```

By default, the API runs on `http://localhost:3000`. Vite prints the local URLs for the admin dashboard and storefront in the terminal.

## Environment Variables

### `fashion-api/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma |
| `PORT` | No | API port; defaults to `3000` |
| `NODE_ENV` | No | Runtime environment, for example `development` or `production` |
| `JWT_ACCESS_SECRET` | Yes | Secret used to sign access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret used to sign refresh tokens |
| `CLOUDINARY_CLOUD_NAME` | When uploading media | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | When uploading media | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | When uploading media | Cloudinary API secret |
| `PAYMENT_WEBHOOK_SECRET` | When using webhooks | Secret used to validate payment webhooks |

Never commit real credentials or `.env` files. The repository ignores environment files, build output and generated Prisma client output.

### Frontend environment variables

`fashion-admin` reads:

```env
VITE_API_URL=http://localhost:3000/api
```

`fashion-storefront` accepts either `VITE_API_BASE_URL` or `VITE_API_URL`. If neither is set, it defaults to `http://localhost:3000/api`.

## Project Structure

```text
fashion-store/
├── fashion-api/
│   ├── prisma/
│   │   ├── migrations/       # Database migrations
│   │   └── schema.prisma     # PostgreSQL data model
│   ├── src/
│   │   ├── modules/          # Feature modules
│   │   ├── middlewares/      # Authentication and validation
│   │   ├── config/           # Prisma configuration
│   │   └── server.ts         # API entry point
│   ├── tests/                # API and domain tests
│   └── dist/                 # TypeScript build output, generated and ignored
├── fashion-admin/
│   └── src/                  # React administration dashboard
├── fashion-storefront/
│   └── src/                  # React customer storefront
├── package.json              # Workspace scripts
└── package-lock.json
```

Backend feature modules follow this structure where applicable:

```text
src/modules/<feature>/
├── *.types.ts
├── *.dto.ts
├── *.schema.ts
├── *.dao.ts
├── *.repository.ts
├── *.service.ts
├── *.controller.ts
└── *.route.ts
```

## API Documentation

The API listens on `http://localhost:3000` and exposes versioned routes under `/api`. Legacy non-versioned route aliases are also retained for the currently registered modules.

Main route groups include:

| Group | Example endpoints | Authentication |
| --- | --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout` | Public, except where noted |
| Users | `GET /api/users`, `GET /api/users/:id`, `PUT /api/users/:id` | Depends on route/controller policy |
| Products | `GET /api/products`, `GET /api/products/slug/:slug`, `GET /api/products/:id` | Public reads |
| Categories | `GET /api/categories`, `GET /api/categories/slug/:slug` | Public reads |
| Account | `GET /api/account/overview` | Bearer JWT |
| Wishlists | `GET /api/wishlists`, `POST /api/wishlists`, `DELETE /api/wishlists/:productId` | Bearer JWT |
| Reviews | `GET /api/reviews/product/:productId`, `POST /api/reviews`, `PUT /api/reviews/:id` | Read public; writes authenticated |
| Coupons | `GET /api/coupons`, `POST /api/coupons`, `PUT /api/coupons/:id` | Admin or staff |
| Catalog experience | Brands, product questions, shipping quotes, returns, media, promotions, bundles and inventory | Varies by operation |

OpenAPI content is maintained in [`fashion-api/src/docs/openapi.ts`](fashion-api/src/docs/openapi.ts), with Swagger helpers in [`fashion-api/src/docs/swagger.ts`](fashion-api/src/docs/swagger.ts). Swagger is not currently mounted as an HTTP endpoint in `src/app.ts`; add a route there before advertising a `/docs` URL.

Authenticated requests use:

```http
Authorization: Bearer <access-token>
```

## Database Schema

Prisma models are defined in [`fashion-api/prisma/schema.prisma`](fashion-api/prisma/schema.prisma). The main domains are:

- Users and addresses: `User`, `Address`
- Catalog: `Category`, `Brand`, `Product`, `ProductVariant`, `ProductImage`, `ProductMedia`
- Shopping: `Cart`, `CartItem`, `Wishlist`
- Orders and payments: `Order`, `OrderItem`, `Payment`
- Reviews and questions: `Review`, `ProductReviewMedia`, `ReviewHelpful`, `ProductQuestion`, `ProductAnswer`
- Promotions: `Coupon`, `Promotion`, `PromotionProduct`, `PromotionCategory`, `ProductBundle`, `ProductBundleItem`
- Delivery and returns: `ShippingZone`, `ShippingZoneProvince`, `ShippingRate`, `ReturnRequest`, `ReturnItem`
- Inventory and analytics: `InventoryTransaction`, `ProductViewEvent`

The schema uses PostgreSQL enums for roles, product status, order status, payment status, payment providers, discounts and return/inventory states. Use Prisma migrations for schema changes; do not edit the database manually in shared environments.

## Scripts

Run these commands from the repository root:

| Command | Description |
| --- | --- |
| `npm install` | Install all workspace dependencies and generate Prisma client |
| `npm run dev` | Run API, admin and storefront together |
| `npm run dev:api` | Run only the API in watch mode |
| `npm run dev:admin` | Run only the admin dashboard |
| `npm run dev:storefront` | Run only the storefront |
| `npm run check` | Type-check all applications |
| `npm run check:api` | Type-check the API |
| `npm run check:admin` | Type-check the admin dashboard |
| `npm run check:storefront` | Type-check the storefront |
| `npm run build --workspace=fashion-api` | Compile the API to `fashion-api/dist` |
| `npm run build --workspace=fashion-admin` | Build the admin dashboard |
| `npm run build --workspace=fashion-storefront` | Build the storefront |
| `npm run prisma:validate --workspace=fashion-api` | Validate the Prisma schema |
| `npm run prisma:generate --workspace=fashion-api` | Generate the Prisma client |
| `npm run prisma:migrate --workspace=fashion-api` | Create/apply a local development migration |
| `npm run prisma:studio --workspace=fashion-api` | Open Prisma Studio |
| `npm test` | Build the API and run its Node test suite |
| `npm run test:e2e` | Run Playwright end-to-end tests |

## Contributing

1. Create a focused branch from the current development branch.
2. Keep changes inside the relevant app boundary.
3. Follow the existing TypeScript, module and naming conventions.
4. Update Prisma migrations when changing the database schema.
5. Run the smallest relevant checks, then `npm run check` when practical.
6. Describe configuration, migration and API changes in the pull request.

## License

No project-wide license has been declared yet. The `fashion-api` package metadata currently declares the ISC license; confirm the intended repository license before publishing or redistributing the project.
