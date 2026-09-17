import assert from "node:assert/strict";
import test from "node:test";
import { createCouponSchema } from "../dist/modules/coupons/coupon.schema.js";

test("percentage discounts are capped at 100 percent", () => {
  const valid = createCouponSchema.safeParse({
    code: "summer10",
    discountType: "PERCENTAGE",
    discountValue: 10,
    validFrom: "2026-01-01T00:00:00.000Z",
    validTo: "2026-02-01T00:00:00.000Z",
  });
  const invalid = createCouponSchema.safeParse({
    code: "summer120",
    discountType: "PERCENTAGE",
    discountValue: 120,
    validFrom: "2026-01-01T00:00:00.000Z",
    validTo: "2026-02-01T00:00:00.000Z",
  });

  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});

test("coupon codes are normalized to uppercase", () => {
  const result = createCouponSchema.parse({
    code: "  welcome  ",
    discountType: "FIXED",
    discountValue: 80_000,
    validFrom: "2026-01-01T00:00:00.000Z",
    validTo: "2026-02-01T00:00:00.000Z",
  });

  assert.equal(result.code, "WELCOME");
});

test("coupon validity must end after it starts", () => {
  const result = createCouponSchema.safeParse({
    code: "invalid-date",
    discountType: "FIXED",
    discountValue: 50_000,
    validFrom: "2026-02-01T00:00:00.000Z",
    validTo: "2026-01-01T00:00:00.000Z",
  });

  assert.equal(result.success, false);
});
