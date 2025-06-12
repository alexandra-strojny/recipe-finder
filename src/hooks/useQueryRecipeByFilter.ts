
import { useQuery } from "@tanstack/react-query";
import type { RecipeResponse } from "../types/Recipe";

const queryRecipeByFilter = async (categoryFilter: string, ingredientFilter?: string, areaFilter?: string ): Promise<RecipeResponse> => {
  const mainUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?`;

  const allFilters = []
  if (categoryFilter !== 'empty') {
    allFilters.push(`c=${categoryFilter}`);
  }
  if (ingredientFilter) {
    allFilters.push(`i=${ingredientFilter}`);
  }
  if (areaFilter) {
    allFilters.push(`a=${areaFilter}`);
  }

  const fetchUrl = mainUrl + allFilters.join('&');

  const resp = await fetch(fetchUrl);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  const data = await resp.json();
  return data
}

export const useQueryRecipeByFilter = (categoryFilter: string, ingredientFilter?: string, areaFilter?: string) => {
  return useQuery({
    queryKey: ['filter', categoryFilter, ingredientFilter, areaFilter],
    enabled: categoryFilter !== 'empty' || !!ingredientFilter || !!areaFilter,
    queryFn: () => queryRecipeByFilter(categoryFilter, ingredientFilter, areaFilter),
  })
} 