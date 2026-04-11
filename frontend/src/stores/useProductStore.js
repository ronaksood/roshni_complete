import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [],
  featuredProducts: [],
  catalogProducts: [],
  selectedProduct: null,
  relatedProducts: [],
  loading: false,
  catalogLoading: false,
  productLoading: false,
  error: null,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created Sucessfully!");
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },
  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  fetchProductsByCategory: async (category) => {
    set({ catalogLoading: true, error: null });
    try {
      const response = await axios.get("/products/catalog", {
        params: { category },
      });
      set({ catalogProducts: response.data.products, catalogLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", catalogLoading: false });
      toast.error(error.response.data.error || "Failed to fetch products");
    }
  },
  fetchCatalogProducts: async (filters = {}) => {
    set({ catalogLoading: true, error: null });
    try {
      const response = await axios.get("/products/catalog", {
        params: filters,
      });
      set({ catalogProducts: response.data.products, catalogLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", catalogLoading: false });
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevProducts) => ({
        products: prevProducts.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
      toast.success("Product Deleted Successfully!");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      // this will update the isFeatured prop of the product
      set((prevProducts) => ({
        products: prevProducts.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to update product");
    }
  },
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products/featured");
      set({ featuredProducts: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      console.log("Error fetching featured products:", error);
    }
  },
  fetchProductById: async (productId) => {
    set({ productLoading: true, error: null, selectedProduct: null });
    try {
      const response = await axios.get(`/products/details/${productId}`);
      set({
        selectedProduct: response.data.product,
        relatedProducts: response.data.relatedProducts || [],
        productLoading: false,
      });
    } catch (error) {
      set({
        error: "Failed to fetch product details",
        productLoading: false,
        selectedProduct: null,
        relatedProducts: [],
      });
      toast.error(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  },
  clearSelectedProduct: () =>
    set({ selectedProduct: null, relatedProducts: [], productLoading: false }),
}));
