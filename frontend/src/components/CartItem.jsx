import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrencyINR } from "../lib/currency";
import { getPrimaryProductImage } from "../lib/product";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="lux-card p-4 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 md:h-32 md:w-32 rounded-[22px] object-cover"
            src={getPrimaryProductImage(item)}
            alt={item.name}
            loading="lazy"
            decoding="async"
          />
        </div>
        <label className="sr-only">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                background: "rgba(255,253,249,0.95)",
              }}
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-[var(--color-accent-deep)]" />
            </button>
            <p>{item.quantity}</p>
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-border)",
                background: "rgba(255,253,249,0.95)",
              }}
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-[var(--color-accent-deep)]" />
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-[var(--color-accent-deep)]">
              {formatCurrencyINR(item.price)}
            </p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="font-display text-2xl font-semibold text-[var(--color-ink)]">
            {item.name}
          </p>
          <p className="text-sm text-[var(--color-muted)]">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-500 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
