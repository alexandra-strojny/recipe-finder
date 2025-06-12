import type { Recipe } from "../types";

export type IngredientMeasurement = {
  ingredient: string;
  measurement: string;
};

export function getIngredientsList(recipe: Recipe): IngredientMeasurement[] {
  const ingredients: IngredientMeasurement[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
    const measurement = recipe[`strMeasure${i}` as keyof Recipe];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measurement: measurement ? measurement.trim() : "",
      });
    }
  }
  return ingredients;
}