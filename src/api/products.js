import client from "./client";

export const fetchProducts = async () => {
  const { data } = await client.get("/products");
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await client.get(`/products/${id}`);
  return data;
};

export const fetchFeatured = async (count = 10) => {
  const { data } = await client.get(`/products/get/featured/${count}`);
  return data;
};
