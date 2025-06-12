import { FaStar } from "react-icons/fa";
import { useFavorites } from "../FavoriteContext";
import { useQueryRecipeArray } from "../hooks/useQueryRecipeArray";
import { MiniRecipe } from "./MiniRecipe";

export const Favorites = () => {
  const {favorites, removeFavorite} = useFavorites();

  const responses = useQueryRecipeArray(favorites);
  const anyLoading = responses.some(response => response.isLoading);
  const anyError = responses.some(response => response.isError);
  const recipes = responses.map(response => response.data).filter(data => data !== undefined);
  console.log(recipes);
  
  return (
    <div className="favorites">
    {anyError && <div>Error loading favorites</div>}
    {anyLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {recipes.map((data) => {
          const recipe = data?.meals?.[0];
          if (!recipe) return null;
          return (
            <div className="flex flex-col items-center" key={recipe.idMeal}>
              <MiniRecipe meal={recipe} key={recipe.idMeal} />
              <button className="text-amber-300 px-4 py-2 rounded-full mb-4 hover:text-blue-600 float-left"
                onClick={()=>removeFavorite(recipe.idMeal || "")}>
                <FaStar size={36} />
              </button>
            </div>
          );
        })}
      </div>
    )}
    </div>
  );
}