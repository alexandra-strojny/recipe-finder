import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-gray-800 text-white p-4 relative">
      <div className="flex items-center justify-center relative">
        <button className="absolute left-0 w-10 h-10 rounded-full hover:cursor-pointer"
          onClick={() => navigate(-1)}>
          <FaRegArrowAltCircleLeft size={48} />
        </button>
        <h1 className="text-2xl font-bold mx-auto">Recipe Finder</h1>
      </div>
      <div className="mt-2">
        Powered by API <a href='https://www.themealdb.com/'>TheMealDB</a>
      </div>
    </header>
  );
}