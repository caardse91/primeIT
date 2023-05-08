//#region local storage keys
export const PRODUCTS_KEY = "products";
//#endregion

export function getDataFromLocalStorage(key: string) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
}
