import React, { type ReactNode } from "react";

const setLocalStorageData = (value: string[]) => {
  const valueString = JSON.stringify(value);
  if (window) {
    window.localStorage.setItem("recipe-favorites", valueString);
  }
}

const getLocalStorageData = () => {
  if (window && window.localStorage) {
    const recipeString = window.localStorage.getItem("recipe-favorites");
    return recipeString ? JSON.parse(recipeString) : [];
  }
  return [] as string[];
}

const FavoriteContext = React.createContext<{
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
} | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = React.useState<string[]>(() => {
    const storedFavorites = getLocalStorageData();
    return storedFavorites ? storedFavorites : [];
  });

  const addFavorite = (id: string) => {
    setFavorites((prev) => [...prev, id]);
    setLocalStorageData([...favorites, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setLocalStorageData(favorites.filter((favId) => favId !== id));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => {
  const context = React.useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};