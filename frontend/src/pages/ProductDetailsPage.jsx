import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { formatCurrencyINR } from "../lib/currency";
import { getProductImages, getPrimaryProductImage } from "../lib/product";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const {
    fetchProductById,
    clearSelectedProduct,
    selectedProduct,
    relatedProducts,
    productLoading,
  } = useProductStore();
  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    fetchProductById(productId);

    return () => {
      clearSelectedProduct();
    };
  }, [clearSelectedProduct, fetchProductById, productId]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProduct?._id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }

    addToCart(selectedProduct);
  };

  if (productLoading) {
    return <LoadingSpinner />;
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen px-4 py-16">
        <div className="mx-auto max-w-3xl lux-card p-10 text-center">
          <h1 className="font-display text-5xl text-[var(--color-accent-deep)]">
            Product not found
          </h1>
          <p className="mt-4 text-[var(--color-muted)]">
            The jewellery piece you are looking for is unavailable right now.
          </p>
          <Link to="/category/all" className="mt-6 lux-btn-primary">
            Explore collection
          </Link>
        </div>
      </div>
    );
  }

  const productImages = getProductImages(selectedProduct);
  const activeImage =
    productImages[activeImageIndex] || getPrimaryProductImage(selectedProduct);

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to={`/category/${selectedProduct.category}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-deep)]"
        >
          <ArrowLeft size={16} />
          Back to collection
        </Link>

        <motion.section
          className="mt-6 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lux-card p-4 sm:p-5">
            <div className="overflow-hidden rounded-[28px] bg-[var(--color-accent-soft)]">
              <img
                src={activeImage}
                alt={selectedProduct.name}
                className="h-[25rem] w-full object-cover sm:h-[34rem]"
                loading="eager"
                decoding="async"
              />
            </div>

            {productImages.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {productImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`overflow-hidden rounded-[20px] border p-1 transition ${
                      index === activeImageIndex
                        ? "border-[var(--color-accent)]"
                        : "border-[rgba(91,31,51,0.12)]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedProduct.name} preview ${index + 1}`}
                      className="h-20 w-full rounded-2xl object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="lux-card p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="lux-chip">{selectedProduct.category}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(124,31,61,0.08)] px-3 py-1 text-sm font-semibold text-[var(--color-accent-deep)]">
                  <Star size={14} className="fill-current" />
                  {selectedProduct.rating?.toFixed(1) || "4.5"}
                </span>
                <span className="rounded-full bg-[rgba(95,127,99,0.14)] px-3 py-1 text-sm font-semibold text-[var(--color-success)]">
                  {selectedProduct.stock > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>

              <h1 className="mt-5 font-display text-5xl leading-none text-[var(--color-accent-deep)] sm:text-6xl">
                {selectedProduct.name}
              </h1>

              <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
                {selectedProduct.description}
              </p>

              <div className="mt-8 flex items-end justify-between gap-4 border-y border-[var(--color-border)] py-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                    Price
                  </p>
                  <p className="mt-2 text-4xl font-bold text-[var(--color-accent-deep)]">
                    {formatCurrencyINR(selectedProduct.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                    Availability
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
                    {selectedProduct.stock} piece{selectedProduct.stock === 1 ? "" : "s"} ready
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={selectedProduct.stock <= 0}
                  className="lux-btn-primary flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShoppingCart size={18} />
                  Add to cart
                </button>
                <Link
                  to="/cart"
                  className="lux-btn-secondary flex items-center justify-center"
                >
                  View cart
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="lux-panel p-5">
                <div className="flex items-center gap-3">
                  <Truck className="text-[var(--color-accent-deep)]" size={20} />
                  <p className="text-base font-semibold text-[var(--color-ink)]">
                    Fast order processing
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  Order updates and confirmation email are sent automatically
                  after checkout.
                </p>
              </div>

              <div className="lux-panel p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="text-[var(--color-accent-deep)]"
                    size={20}
                  />
                  <p className="text-base font-semibold text-[var(--color-ink)]">
                    Handpicked quality
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  Premium catalogue imagery, polished finishing, and styling made
                  for celebrations and gifting.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="lux-chip">More to explore</p>
                <h2 className="mt-4 font-display text-4xl text-[var(--color-accent-deep)]">
                  Similar pieces you may love
                </h2>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
