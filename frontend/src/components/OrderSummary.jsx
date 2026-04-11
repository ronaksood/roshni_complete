import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import { formatCurrencyINR } from "../lib/currency";

const stripePromise = loadStripe(
  "pk_test_51Q5SRkLUGfbiowZhIODmT3tnZa0Shac0VEX8BGBWd8ybkAzm5InqLnQbu0QzdULd6o4ALV6SYWmvHQCs5daCEXD700O0ZLxo0Q"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = formatCurrencyINR(subtotal);
  const formattedTotal = formatCurrencyINR(total);
  const formattedSavings = formatCurrencyINR(savings);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });
    
    console.log(res.data);
    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <motion.div
      className="lux-card space-y-4 p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-display text-3xl font-semibold text-[var(--color-accent-deep)]">
        Order summary
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-[var(--color-muted)]">
              Original price
            </dt>
            <dd className="text-base font-medium text-[var(--color-ink)]">
              {formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-[var(--color-muted)]">
                Savings
              </dt>
              <dd className="text-base font-medium text-[var(--color-success)]">
                -{formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-[var(--color-muted)]">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-[var(--color-success)]">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t pt-3">
            <dt className="text-base font-bold text-[var(--color-ink)]">Total</dt>
            <dd className="text-base font-bold text-[var(--color-accent-deep)]">
              {formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          className="lux-btn-primary flex w-full items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-[var(--color-muted)]">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-deep)] underline hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderSummary;
