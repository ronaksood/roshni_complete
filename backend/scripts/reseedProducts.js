import dotenv from "dotenv";
import mongoose from "mongoose";
import { JEWELLERY_PRODUCTS } from "../data/jewelleryProducts.js";
import Product from "../models/product.model.js";

dotenv.config();

const buildSeedProducts = () =>
  JEWELLERY_PRODUCTS.map((product) => ({
    ...product,
    category: product.category.trim().toLowerCase(),
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.createdAt),
  }));

async function reseedProducts() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured.");
  }

  await mongoose.connect(mongoUri);

  const products = buildSeedProducts();

  await Product.deleteMany({});
  const insertedProducts = await Product.insertMany(products, {
    ordered: true,
  });

  console.log(`Deleted all existing products and inserted ${insertedProducts.length} products.`);
  console.log(
    `Featured products: ${insertedProducts.filter((product) => product.isFeatured).length}`
  );

  await mongoose.disconnect();
}

reseedProducts().catch(async (error) => {
  console.error("Error reseeding products:", error.message);
  await mongoose.disconnect();
  process.exit(1);
});
