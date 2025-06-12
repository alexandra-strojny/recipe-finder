import { FaRegArrowAltCircleLeft, FaStar } from "react-icons/fa";
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
        <div className="text-6xl">
        <button className="text-2xl font-bold mx-auto"
          onClick={() => navigate("/recipes")}>
          Recipe Finder
        </button></div>
        <button className="absolute right-0 rounded-full hover:cursor-pointer"
          onClick={() => navigate('/favorites')}>
          <FaStar size={48} className="text-white hover:text-blue-600" />
        </button>
      </div>
      <div className="mt-2">
        Powered by API <a href='https://www.themealdb.com/'>TheMealDB</a>
      </div>
    </header>
  );
}