export const setLocalStorageData = (value: string[]) => {
  const valueString = JSON.stringify(value);
  if (window) {
    window.localStorage.setItem("recipe-favorites", valueString);
  }
}

export const getLocalStorageData = () => {
  if (window && window.localStorage) {
    const recipeString = window.localStorage.getItem("recipe-favorites");
    return recipeString ? JSON.parse(recipeString) : [];
  }
  return [] as string[];
}