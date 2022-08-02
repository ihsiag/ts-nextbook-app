import useSWR from "swr";
import type { ApiContext, Product } from "types";

export type UseSearchProps = {
  userId?: number;
  sort?: keyof Omit<Product, "owner">;
  order?: "asc" | "desc";
  initial?: Product[];
};

export type UseSearch = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

const useSearch = (
  context: ApiContext,
  {
    userId,
    initial,
    sort = "id",
    order = "desc",
  }: UseSearchProps = {}
): UseSearch => {
  const path = `${context.apiRootUrl.replace(/\/$/g, "")}/products`;
  const params = new URLSearchParams();

  userId && params.append("owner.id", `${userId}`);
  sort && params.append("_sort", sort);
  order && params.append("_order", order);
  const query = params.toString();
  const { data, error } = useSWR<Product[]>(
    query.length > 0 ? `${path}?${query}` : path
  );

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useSearch;
