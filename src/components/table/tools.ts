import { IProduct } from "../../models/IProduct";
import { IPriceRange, IQueryParams } from "./models/ITable";

export function getMaxPrice(products: IProduct[]): number {
  return products.reduce((maxPrice, value) => {
    const price = typeof value.price === "number" ? value.price : parseFloat(value.price);
    return isNaN(price) ? maxPrice : Math.max(maxPrice, price);
  }, 0);
}

/**
 * Comprueba si un precio se encuentra dentro de un rango de precios establecido
 *
 * @param price precio a comprobar si se encuentra dentro del rango establecido
 * @param range rango de precios
 * @returns true si el price está dentro del rango establecido, false en caso contrario
 */
export function checkPriceInRange(price: number | string, { minPrice, maxPrice }: IPriceRange) {
  const parsedPrice = Number(price);

  if (isNaN(parsedPrice)) {
    return false;
  }

  return parsedPrice >= minPrice && parsedPrice <= maxPrice;
}

/**
 * Obtiene las filas que se deben mostrar en la tabla de acuerdo a la pagina actual y la cantidad de filas por página
 *
 * @param currentPage representa la página actual
 * @param rowsPerPage representa la cantidad de filas que se deben mostrar por pagina
 * @param products listado de productos
 * @returns las filas a mostrar
 */
export function getRowsToDisplay(currentPage: number, rowsPerPage: number, products: IProduct[]) {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return products.slice(startIndex, endIndex);
}

export function getTotalPages(values: IProduct[], rowsPerPage: number) {
  return Math.ceil(values.length / rowsPerPage);
}

export function getQueryParams(params: URLSearchParams, values: IProduct[]): IQueryParams {
  const maxPriceParam = params.get("maxPrice");

  const category = params.get("category") || "";
  const minPrice = Number(params.get("minPrice")) || 0;
  const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : getMaxPrice(values);

  return {
    category,
    range: { minPrice, maxPrice },
  };
}

export function filterValues(values: IProduct[], category: string, priceRange: IPriceRange): IProduct[] {
  let filteredValues: IProduct[] = values;

  if (category) {
    filteredValues = filteredValues.filter((value) => value.category === category.toLowerCase());
  }

  if (priceRange.minPrice !== 0 || priceRange.maxPrice !== 0) {
    filteredValues = filteredValues.filter((value) => checkPriceInRange(value.price, priceRange));
  }

  return filteredValues;
}
