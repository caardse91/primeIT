import { v4 as uuidv4 } from "uuid";
import { IProduct, TProductPost } from "../models/IProduct";
import { PRODUCTS_KEY, getDataFromLocalStorage } from "../utils/localStorageUtils";

/*
 * NOTA: Servicios para la simulación de peticiones a una API. A falta de una bbdd,
 * he usado el local storage para simular la persistencia de los productos
 */

export const getAllProducts = (): IProduct[] => getDataFromLocalStorage(PRODUCTS_KEY) || [];

export const insertProduct = (product: TProductPost): IProduct => {
  const newProduct = { ...product, id: uuidv4() };
  let products: IProduct[] = getDataFromLocalStorage(PRODUCTS_KEY);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([...products, newProduct]));

  return newProduct;
};

export const getProductById = (idProduct: string): IProduct | undefined => {
  if (!idProduct) return;
  const products: IProduct[] = getDataFromLocalStorage(PRODUCTS_KEY);

  return products?.find((product) => product.id === idProduct);
};

/**
 * Obtiene los 6 productos con el precio mas cercano al producto seleccionado de su misma categoría
 *
 * @param selectedProduct producto seleccionado en el listado
 * @returns listado de productos relacionados
 */
export const getRelatedProducts = (selectedProduct?: IProduct): IProduct[] | undefined => {
  if (!selectedProduct) return;
  const products: IProduct[] = getDataFromLocalStorage(PRODUCTS_KEY);

  const filteredProducts = products.filter(
    (product) => product.category === selectedProduct.category && product.id !== selectedProduct.id
  );

  // Calcular la distancia entre el precio del producto seleccionado y el precio de cada uno de los productos filtrados
  const relatedProducts = filteredProducts.map((product) => {
    const price = Number(product.price);
    const distance = Math.abs(price - Number(selectedProduct.price));
    return { ...product, distance };
  });

  // Ordenar los productos filtrados por la distancia calculada de menor a mayor
  const sortedProducts = relatedProducts.sort((a, b) => a.distance - b.distance);

  // Devolver los 6 productos más cercanos al precio del producto seleccionado
  return sortedProducts.slice(0, 6).sort((a, b) => Number(a.price) - Number(b.price));
};


