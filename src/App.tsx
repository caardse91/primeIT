import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { products } from "./database/db";
import { NewProduct, ProductList, RelatedProducts } from "./pages";
import { ROUTES } from "./routes";
import { PRODUCTS_KEY, getDataFromLocalStorage } from "./utils/localStorageUtils";

// Inicialización de los datos de la aplicación con
// local storage por no tener bbdd
const storedProducts = getDataFromLocalStorage(PRODUCTS_KEY);
if (!storedProducts) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function App() {
  return (
    <BrowserRouter basename={ROUTES.PRODUCT_LIST}>
      <Navbar />
      <Container fluid className="mt-5">
        <Row className="justify-content-center pb-5">
          <Col xs={10} md={8} lg={6}>
            <Routes>
              <Route path={ROUTES.PRODUCT_LIST} element={<ProductList />} />
              <Route path={ROUTES.NEW_PRODUCT} element={<NewProduct />} />
              <Route path={ROUTES.RELATED_PRODUCTS} element={<RelatedProducts />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
