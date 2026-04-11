import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-[26rem] w-full rounded-[28px] group lux-card">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(47,41,36,0.82)] z-10" />
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <p className="text-white/80 text-xs uppercase tracking-[0.3em] mb-2">
              Signature edit
            </p>
            <h3 className="font-display text-white text-4xl font-semibold mb-2">
              {category.name}
            </h3>
            <p className="text-white/80 text-sm">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
