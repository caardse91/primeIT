import { IProduct } from "../../../models/IProduct";

export interface ITableProps {
  columns: Array<keyof IProduct>;
  rowsPerPage: number;
  values: IProduct[];
}

export interface IPriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface IQueryParams {
  category: string;
  range: IPriceRange;
}

export const createDefaultQueryParams = (maxPrice: number) => ({
  category: "",
  minPrice: "0",
  maxPrice: String(maxPrice),
});
