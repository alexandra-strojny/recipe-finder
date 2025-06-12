
import { useQuery } from "@tanstack/react-query";
import type { RecipeResponse } from "../types/Recipe";

const queryRecipeByTitle = async (title: string): Promise<RecipeResponse> => {
  const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  const data = await resp.json();
  return data
}

export const useQueryRecipe = (title: string) => {
  return useQuery({
    queryKey: ['title', title],
    queryFn: () => queryRecipeByTitle(title),
  })
} 