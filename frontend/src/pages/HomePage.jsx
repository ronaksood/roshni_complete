import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem.jsx";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { jewelleryCategories } from "../lib/brand";

const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="lux-card p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="lux-chip">Handcrafted elegance</span>
            <h1 className="mt-6 font-display text-5xl sm:text-7xl leading-none text-[var(--color-accent-deep)]">
              Jewellery designed for celebrations, heirlooms, and everyday glow.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Discover premium chokers, necklaces, mangalsutras, and watches
              curated with a warm bridal-luxury aesthetic and real catalogue
              imagery.
            </p>
          </div>
        </section>

        <div className="mt-14 flex items-end justify-between gap-4">
          <div>
            <p className="lux-chip">Collections</p>
            <h2 className="mt-4 font-display text-4xl text-[var(--color-accent-deep)]">
              Explore our jewellery categories
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {jewelleryCategories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!loading && featuredProducts.length > 0 && (
          <FeaturedProducts featuredProducts={featuredProducts} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
