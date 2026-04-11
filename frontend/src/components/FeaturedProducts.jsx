import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrencyINR } from "../lib/currency";
import { getProductImages, getPrimaryProductImage } from "../lib/product";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [activeImages, setActiveImages] = useState({});

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="lux-chip mx-auto">Curated spotlight</p>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl font-semibold text-[var(--color-accent-deep)] mb-4">
            Featured treasures
          </h2>
          <p className="text-[var(--color-muted)] max-w-2xl mx-auto">
            Preview multiple product angles while browsing the featured jewellery
            edit.
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
                >
                  <div className="lux-card overflow-hidden h-full transition-all duration-300">
                    <Link
                      to={`/products/${product._id || product.id}`}
                      className="block overflow-hidden p-3"
                    >
                      <img
                        src={
                          getProductImages(product)[activeImages[product._id] || 0] ||
                          getPrimaryProductImage(product)
                        }
                        alt={product.name}
                        className="w-full h-60 rounded-[24px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                    <div className="px-4">
                      <div className="mb-4 flex gap-2">
                        {getProductImages(product).slice(0, 4).map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() =>
                              setActiveImages((prevState) => ({
                                ...prevState,
                                [product._id]: index,
                              }))
                            }
                            className={`h-12 w-12 overflow-hidden rounded-2xl border transition ${
                              (activeImages[product._id] || 0) === index
                                ? "border-[var(--color-accent)]"
                                : "border-[rgba(91,31,51,0.12)]"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${product.name} preview ${index + 1}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="lux-chip mb-3">{product.category}</p>
                      <Link
                        to={`/products/${product._id || product.id}`}
                        className="font-display text-2xl font-semibold mb-2 block text-[var(--color-ink)] transition hover:text-[var(--color-accent-deep)]"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[var(--color-accent-deep)] font-semibold mb-4">
                        {formatCurrencyINR(product.price)}
                      </p>
                      <div className="flex gap-3">
                        <Link
                          to={`/products/${product._id || product.id}`}
                          className="lux-btn-secondary flex-1"
                        >
                          View details
                        </Link>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 lux-btn-primary transition-colors duration-300 flex items-center justify-center"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isStartDisabled
                ? "bg-[rgba(91,31,51,0.16)] text-[var(--color-muted)] cursor-not-allowed"
                : "bg-[var(--color-accent)] text-white"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isEndDisabled
                ? "bg-[rgba(91,31,51,0.16)] text-[var(--color-muted)] cursor-not-allowed"
                : "bg-[var(--color-accent)] text-white"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeaturedProducts;
