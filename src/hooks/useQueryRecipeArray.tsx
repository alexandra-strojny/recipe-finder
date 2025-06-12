import { useQueries } from "@tanstack/react-query"
import { fetchRecipeById } from "./useQueryRecipeById"

export const useQueryRecipeArray = (recipeIds: string[]) => {
  return useQueries({
    queries: recipeIds.map((recipeId) => {
      return {
        queryKey: ['recipe', recipeId],
        queryFn: () => fetchRecipeById(recipeId),
      }
    }),
  })
} 