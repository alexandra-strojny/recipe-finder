import { useState } from "react";
import { useQueryRecipe } from "../hooks/useQueryRecipe";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useQueryCategories } from "../hooks/useQueryCategories";
import { useQueryRecipeByFilter } from "../hooks/useQueryRecipeByFilter";

export const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('empty');
  const [ingredientFilter, setIngredientFilter] = useState<string>('');
  const [areaFilter, setAreaFilter] = useState<string>('');
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const debouncedIngredientFilter = useDebounce(ingredientFilter, 500);
  const debouncedAreaFilter = useDebounce(areaFilter, 500);
  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchTerm('');
  }

  const clearFilters = () => {
    setCategoryFilter('empty');
    setIngredientFilter('');
    setAreaFilter('');
  }

  const { data: categoriesData, isLoading: categoriesLoading} = useQueryCategories();
  const { data: searchedData, isLoading: searchedLoading, error: searchedError } = useQueryRecipe(debounceSearchTerm);
  const { data: filteredData, isLoading: filteredLoading, error: filteredError } = useQueryRecipeByFilter(categoryFilter, debouncedIngredientFilter, debouncedAreaFilter);

  const validFilterQuery = categoryFilter !== 'empty' || !!ingredientFilter || !!areaFilter
  const mealError = validFilterQuery ? filteredError : searchedError;
  const mealData = validFilterQuery ? filteredData : searchedData;

  return (
    <div className="p-4 m-8">
      <label className="text-xl font-bold mb-4">Search:</label>
      <input
        type="text"
        placeholder="Search by name..."
        className="border rounded-4xl p-2 w-full mb-6"
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value); clearFilters();}}
      />
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-400"></div>
    </div>
      <div className="flex gap-2 mt-6 mb-6 items-end justify-center">
        <div className="w-100 flex flex-col">
          <label className="text-lg font-bold">Category:</label>
          <select
            className="border rounded-2xl p-2 w-full"
            onChange={(e) => {setCategoryFilter(e.target.value); clearSearch();}}
            value={categoryFilter}
          >
            {!categoriesLoading && categoriesData?.categories?.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
            <option key={"empty"} value={"empty"}>
              None selected
            </option>
          </select>
        </div>

        <div className="w-100 flex flex-col">
          <label className="text-lg font-bold">Ingredient:</label>
          <input
            className="border rounded-2xl p-2 w-full"
            onChange={(e) => {setIngredientFilter(e.target.value); clearSearch();}}
            value={ingredientFilter}
          >
          </input>
        </div>

        <div className="w-100 flex flex-col">
          <label className="text-lg font-bold">Cuisine:</label>
          <input
            className="border rounded-2xl p-2 w-full"
            onChange={(e) => {setAreaFilter(e.target.value); clearSearch();}}
            value={areaFilter}
          >
          </input>
        </div>

      </div>
      {filteredLoading || searchedLoading ? <div>Loading...</div> :
        <div>
          {mealError && <div> Error: {mealError.message}</div>}
          {mealData && mealData.meals && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mealData?.meals?.map((meal) => (
              <div key={meal.idMeal} className="flex flex-col gap-2 border rounded-xl border-gray-300 p-4 mb-4 items-center">
                <div>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="w-64 h-64 object-cover" />
                </div>
                <div className="text-center text-2xl">
                  <button className="underline" onClick={()=>navigate(`/recipes/${meal.idMeal}`)}>{meal?.strMeal}</button>
                </div>
              </div>
            ))}
          </div>}
        </div>}
    </div>
  );
}