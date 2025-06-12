import { useQuery } from "@tanstack/react-query";
import type { CategoryResponse } from "../types/Category";

const fetchCategories = async (): Promise<CategoryResponse> => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  const data = await resp.json();
  return data
}

export const useQueryCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 10, // 10 minute
  })
} 