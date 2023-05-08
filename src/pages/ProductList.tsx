import Table from "../components/table/Table";
import useProductAPI from "../hooks/useProductAPI";
import { IProduct } from "../models";
import { getAllProducts } from "../services/productService";

const ROWS_PER_PAGE = 24;
const COLUMNS: Array<keyof IProduct> = ["name", "category", "price"];

const ProductList = () => {
  const { response: products } = useProductAPI(getAllProducts);

  return <Table columns={COLUMNS} rowsPerPage={ROWS_PER_PAGE} values={products} />;
};

export default ProductList;
