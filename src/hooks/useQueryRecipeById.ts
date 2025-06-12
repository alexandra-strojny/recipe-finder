import { useQuery } from "@tanstack/react-query";
import type { RecipeResponse } from "../types/Recipe";

export const fetchRecipeById = async (recipeId: string): Promise<RecipeResponse> => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  const data = await resp.json();
  return data
}

export const useQueryRecipeById = (recipeId: string) => {
  return useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipeById(recipeId),
  })
} 