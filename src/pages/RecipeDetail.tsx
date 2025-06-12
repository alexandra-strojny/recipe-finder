import { useParams } from "react-router-dom";
import { useQueryRecipeById } from "../hooks/useQueryRecipeById";
import { getIngredientsList } from "../util/ingredients";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useFavorites } from "../FavoriteContext";

export const RecipeDetail = () => {
  const { recipeId } = useParams();
  const {data, error, isLoading} = useQueryRecipeById(recipeId || "");
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const recipe = data?.meals?.[0] || null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const isFavorite = recipeId && favorites.includes(recipeId);

  return (
    <div className="border rounded-xl border-gray-300 p-4 m-8">
      {isFavorite ?
        <button className="text-amber-300 px-4 py-2 rounded-full mb-4 hover:text-blue-600 float-left"
          onClick={()=>removeFavorite(recipeId || "")}>
          <FaStar size={36} />
        </button> :
        <button className="text-amber-300 px-4 py-2 rounded-full mb-4 hover:text-blue-600 float-left"
          onClick={()=>addFavorite(recipeId || "")}>
          <FaRegStar size={36} />
        </button>
      }
    <div className="flex gap-8 justify-center items-center">
      <div className="text-right">
        <h2 className="text-4xl mb-4 underline">{recipe?.strMeal}</h2>
        <h2 className="text-2xl">Category: {recipe?.strCategory}</h2>
        <h2 className="text-2xl">Cuisine: {recipe?.strArea}</h2>
        {recipe?.strTags && <h2 className="text-2xl">Tags: {recipe.strTags}</h2>}
      </div>
      <div>
        <img src={recipe?.strMealThumb} alt={recipe?.strMeal} className="w-96 h-96 object-cover" />
      </div>
    </div>
    <div>
      {recipe?.strIngredient1 && (
        <div className="text-left mt-4">
          <h2 className="text-xl font-bold">Ingredients</h2>
          <ul className="list-disc pl-6">
            {getIngredientsList(recipe).map((list, index) => (
              <li key={index} className="text-left mt-2">
                {list.measurement} {list.ingredient}
              </li>
            ))} 
          </ul>
        </div>
      )}
      {recipe?.strInstructions && (
        <div className="text-left mt-4">
          <h2 className="text-xl font-bold">Instructions</h2>
          <ol type="1" className="list-decimal pl-6">
            {recipe.strInstructions
              .split('.')
              .filter(instruction => instruction).map((instruction, index) => (
                <li key={index} className="text-left mt-2">
                  {instruction.trim()}
                </li>
            ))}
          </ol>
        </div>
      )}
    </div>
    </div>
  );
}