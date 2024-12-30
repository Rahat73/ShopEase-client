import { z } from "zod";

export const addCouponValidationSchema = z.object({
  code: z.string().min(1, "Coupon code is required").trim(),
  discount: z.string().min(1, "Coupon discount is required").trim(),
});
