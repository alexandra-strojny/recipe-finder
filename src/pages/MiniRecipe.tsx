import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types";

export const MiniRecipe = ({meal, size}: {meal:Recipe, size?: 'sm' | 'lg'}) => {
  const navigate = useNavigate();
  return (
    <div key={meal.idMeal} className="flex flex-col gap-2 border rounded-xl border-gray-300 p-4 mb-4 items-center">
      <div>
        <img src={meal.strMealThumb} alt={meal.strMeal} 
          className={`${size==='sm' ? 'w-64 h-64' : 'w-32 h-32'} object-cover`} />
      </div>
      <div className="text-center text-2xl">
        <button className="underline" onClick={()=>navigate(`/recipes/${meal.idMeal}`)}>{meal?.strMeal}</button>
      </div>
    </div>
  );
}