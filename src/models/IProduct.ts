export interface IProduct {
  id: string;
  name: string;
  price: number | string;
  category: string;
}

export type TProductPost = Omit<IProduct, "id">;
