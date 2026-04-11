import { useDeferredValue, useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { jewelleryCategories } from "../lib/brand.js";

const PRICE_FILTERS = {
  all: {},
  under_500: { maxPrice: 500 },
  between_500_1000: { minPrice: 500, maxPrice: 1000 },
  above_1000: { minPrice: 1000 },
};

const CATEGORY_OPTIONS = [
  { label: "All", value: "all" },
  ...jewelleryCategories.map((entry) => ({
    label: entry.name,
    value: entry.href.replace("/", ""),
  })),
];

const CategoryPage = () => {
  const { fetchCatalogProducts, catalogProducts, catalogLoading } =
    useProductStore();

  const { category } = useParams();
  const navigate = useNavigate();
  const activeCategory = (category || "all").toLowerCase();
  const [sort, setSort] = useState("newest");
  const [minRating, setMinRating] = useState("0");
  const [availability, setAvailability] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    const priceRange = PRICE_FILTERS[priceFilter] || PRICE_FILTERS.all;

    fetchCatalogProducts({
      category: activeCategory,
      sort,
      minRating: Number(minRating) > 0 ? Number(minRating) : undefined,
      inStock: availability === "in-stock" ? true : undefined,
      search: deferredSearchTerm.trim() || undefined,
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    });
  }, [
    activeCategory,
    availability,
    deferredSearchTerm,
    fetchCatalogProducts,
    minRating,
    priceFilter,
    sort,
  ]);

  const heading =
    activeCategory === "all"
      ? "All Jewellery"
      : `${activeCategory.charAt(0).toUpperCase()}${activeCategory.slice(1)}`;

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center font-display text-5xl sm:text-6xl font-semibold text-[var(--color-accent-deep)] mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heading}
        </motion.h1>
        <p className="text-center text-[var(--color-muted)] mb-10">
          Browse handcrafted styles, refine the collection, and open any piece
          for full details.
        </p>

        <motion.div
          className="lux-card mb-10 p-5 sm:p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-3">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => navigate(`/category/${option.value}`)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === option.value
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[rgba(124,31,61,0.08)] text-[var(--color-accent-deep)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name or style"
                className="lux-input"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Sort
              </span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="lux-input"
              >
                <option value="newest">Newest first</option>
                <option value="price_asc">Price: Low to high</option>
                <option value="price_desc">Price: High to low</option>
                <option value="rating_desc">Highest rated</option>
                <option value="name_asc">Name: A to Z</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Price
              </span>
              <select
                value={priceFilter}
                onChange={(event) => setPriceFilter(event.target.value)}
                className="lux-input"
              >
                <option value="all">All prices</option>
                <option value="under_500">Under Rs. 500</option>
                <option value="between_500_1000">Rs. 500 to Rs. 1000</option>
                <option value="above_1000">Above Rs. 1000</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Rating
              </span>
              <select
                value={minRating}
                onChange={(event) => setMinRating(event.target.value)}
                className="lux-input"
              >
                <option value="0">All ratings</option>
                <option value="4">4.0 and above</option>
                <option value="4.5">4.5 and above</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Availability
              </span>
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="lux-input"
              >
                <option value="all">Show all</option>
                <option value="in-stock">In stock only</option>
              </select>
            </label>
          </div>
        </motion.div>

        {catalogLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <p className="mb-6 text-sm font-medium text-[var(--color-muted)]">
              {catalogProducts.length} piece{catalogProducts.length === 1 ? "" : "s"} found
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {catalogProducts.length === 0 && (
                <div className="col-span-full lux-card p-10 text-center">
                  <h2 className="font-display text-4xl font-semibold text-[var(--color-accent-deep)]">
                    No products found
                  </h2>
                  <p className="mt-3 text-[var(--color-muted)]">
                    Try a different category, rating, or price range.
                  </p>
                </div>
              )}

              {catalogProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
export default CategoryPage;
