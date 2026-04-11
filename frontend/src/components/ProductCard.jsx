import toast from "react-hot-toast";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";
import { formatCurrencyINR } from "../lib/currency";
import { getPrimaryProductImage } from "../lib/product";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      // add to cart
      addToCart(product);
    }
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden lux-card">
      <Link
        to={`/products/${product._id || product.id}`}
        className="relative m-3 flex h-72 overflow-hidden rounded-[24px] bg-[var(--color-accent-soft)]"
      >
        <img
          className="object-cover w-full transition-transform duration-500 hover:scale-105"
          src={getPrimaryProductImage(product)}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(47,41,36,0.15)] to-transparent" />
        <div className="absolute left-4 top-4 lux-chip">
          {product.category}
        </div>
      </Link>

      <div className="px-5 pb-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/products/${product._id || product.id}`}
            className="font-display text-3xl font-semibold tracking-tight text-[var(--color-ink)] transition hover:text-[var(--color-accent-deep)]"
          >
            {product.name}
          </Link>
          <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(124,31,61,0.08)] px-3 py-1 text-sm font-semibold text-[var(--color-accent-deep)]">
            <Star size={14} className="fill-current" />
            {product.rating?.toFixed(1) || "4.5"}
          </span>
        </div>
        <p className="mt-2 min-h-[48px] text-sm leading-6 text-[var(--color-muted)]">
          {product.description}
        </p>
        <div className="mt-4 mb-5 flex items-center justify-between">
          <p className="text-2xl font-bold text-[var(--color-accent-deep)]">
            {formatCurrencyINR(product.price)}
          </p>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
            {product.stock} in stock
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/products/${product._id || product.id}`}
            className="lux-btn-secondary flex-1"
          >
            View details
          </Link>
          <button
            className="lux-btn-primary flex flex-1 items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={20} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
