import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const parseImages = (images, image) => {
  if (Array.isArray(images)) {
    return images.map((entry) => entry?.trim()).filter(Boolean);
  }

  if (typeof images === "string" && images.trim()) {
    return images
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  if (typeof image === "string" && image.trim()) {
    return [image.trim()];
  }

  return [];
};

const getPrimaryImage = (product) =>
  product?.images?.[0] || product?.image || "";

const normalizeProduct = (product) => {
  const normalized =
    typeof product?.toJSON === "function" ? product.toJSON() : { ...product };

  return {
    ...normalized,
    images: normalized.images || [],
    image: getPrimaryImage(normalized),
  };
};

const CATALOG_SORT_OPTIONS = {
  newest: { createdAt: -1 },
  price_asc: { price: 1, createdAt: -1 },
  price_desc: { price: -1, createdAt: -1 },
  rating_desc: { rating: -1, createdAt: -1 },
  name_asc: { name: 1 },
};

const buildCatalogQuery = ({
  category,
  minPrice,
  maxPrice,
  minRating,
  inStock,
  search,
}) => {
  const query = {};

  if (category && category !== "all") {
    query.category = category.trim().toLowerCase();
  }

  if (
    Number.isFinite(Number(minPrice)) ||
    Number.isFinite(Number(maxPrice))
  ) {
    query.price = {};

    if (Number.isFinite(Number(minPrice))) {
      query.price.$gte = Number(minPrice);
    }

    if (Number.isFinite(Number(maxPrice))) {
      query.price.$lte = Number(maxPrice);
    }
  }

  if (Number.isFinite(Number(minRating))) {
    query.rating = { $gte: Number(minRating) };
  }

  if (String(inStock) === "true") {
    query.stock = { $gt: 0 };
  }

  if (search?.trim()) {
    query.$or = [
      { name: { $regex: search.trim(), $options: "i" } },
      { description: { $regex: search.trim(), $options: "i" } },
    ];
  }

  return query;
};

const isCloudinaryProductImage = (url = "") =>
  url.includes("res.cloudinary.com") && url.includes("/products/");

const getCloudinaryPublicId = (url) => {
  const [pathname] = url.split("/upload/");

  if (!pathname) {
    return null;
  }

  const publicId = url
    .split("/upload/")[1]
    ?.split("/")
    .slice(1)
    .join("/")
    .split(".")[0];

  return publicId || null;
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json({ products: products.map(normalizeProduct) });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    if (!featuredProducts.length) {
      return res.status(404).json({ message: "No featured products found" });
    }

    res.json(featuredProducts.map(normalizeProduct));
  } catch (error) {
    console.log("Error in getFeaturedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      image,
      images,
      category,
      rating,
      stock,
      isFeatured,
    } = req.body;

    const normalizedImages = parseImages(images, image);
    let uploadedImages = [];

    if (
      normalizedImages.length === 1 &&
      normalizedImages[0].startsWith("data:image/")
    ) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        normalizedImages[0],
        {
          folder: "products",
        }
      );
      uploadedImages = [cloudinaryResponse.secure_url];
    }

    const productImages = uploadedImages.length ? uploadedImages : normalizedImages;

    if (!productImages.length) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const product = await Product.create({
      id: id?.trim() || `prod_${Date.now()}`,
      name,
      description,
      price,
      images: productImages,
      category: category?.trim().toLowerCase(),
      rating: Number(rating) || 4.5,
      stock: Number.isFinite(Number(stock)) ? Number(stock) : 1,
      isFeatured:
        typeof isFeatured === "boolean"
          ? isFeatured
          : String(isFeatured) === "true",
    });

    res.status(201).json(normalizeProduct(product));
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCatalogProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      search,
      sort = "newest",
    } = req.query;

    const query = buildCatalogQuery({
      category,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      search,
    });

    const sortConfig = CATALOG_SORT_OPTIONS[sort] || CATALOG_SORT_OPTIONS.newest;
    const products = await Product.find(query).sort(sortConfig);

    res.json({ products: products.map(normalizeProduct) });
  } catch (error) {
    console.log("Error in getCatalogProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cloudinaryImages = (product.images || []).filter(isCloudinaryProductImage);

    for (const imageUrl of cloudinaryImages) {
      const publicId = getCloudinaryPublicId(imageUrl);
      if (!publicId) {
        continue;
      }

      try {
        await cloudinary.uploader.destroy(publicId, {
          folder: "products",
        });
      } catch (error) {
        console.log("error deleting image from cloudinary", error.message);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          id: 1,
          name: 1,
          description: 1,
          images: 1,
          image: { $arrayElemAt: ["$images", 0] },
          price: 1,
          category: 1,
          rating: 1,
          stock: 1,
          isFeatured: 1,
        },
      },
    ]);

    res.json(products.map(normalizeProduct));
  } catch (error) {
    console.log("Error in getRecommendedProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.params.category?.trim().toLowerCase();
  try {
    const products = await Product.find({ category }).sort({ createdAt: -1 });
    res.json({ products: products.map(normalizeProduct) });
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [
        ...(mongoose.isValidObjectId(id) ? [{ _id: id }] : []),
        { id: id.trim() },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .sort({ rating: -1, createdAt: -1 })
      .limit(4);

    return res.status(200).json({
      product: normalizeProduct(product),
      relatedProducts: relatedProducts.map(normalizeProduct),
    });
  } catch (error) {
    console.log("Error in getProductById controller", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      res.json(normalizeProduct(updatedProduct));
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProduct controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
