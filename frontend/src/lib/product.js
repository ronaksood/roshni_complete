export const getProductImages = (product) => {
  const images = Array.isArray(product?.images) ? product.images : [];

  if (images.length) {
    return images.filter(Boolean);
  }

  return product?.image ? [product.image] : [];
};

export const getPrimaryProductImage = (product, index = 0) =>
  getProductImages(product)[index] || getProductImages(product)[0] || "";
