import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/products";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

export const useProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
