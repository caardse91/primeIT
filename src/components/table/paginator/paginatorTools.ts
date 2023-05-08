/**
 * Devuelve un array de números que representan las páginas a mostrar en la paginación.
 *
 * @param interval rango de paginas del paginador
 * @param firstPage primera página a mostrar en la paginación
 * @param totalPages numero de paginas totales
 * @returns lista con las paginas a mostrar en el paginador
 */
export function getPages(interval: number, firstPage: number, totalPages: number) {
  const pageNumbers = [];

  for (let i = firstPage; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.slice(0, interval + 1);
}
