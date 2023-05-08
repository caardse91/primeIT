import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import useProductAPI from "../hooks/useProductAPI";
import { IProduct, ECategory } from "../models";
import { getProductById, getRelatedProducts } from "../services/productService";
import { ROUTES } from "../routes";

const COLOR_CATEGORY = {
  [ECategory.FISH.toLowerCase()]: "primary",
  [ECategory.MEAT.toLowerCase()]: "secondary",
  [ECategory.GREEN.toLowerCase()]: "success",
};

const getColorByCategory = (category: string) => COLOR_CATEGORY[category as ECategory];

const RelatedProducts = () => {
  const navigate = useNavigate();
  const { idProduct } = useParams<{ idProduct: string }>();
  const { response: selectedProduct } = useProductAPI(getProductById, [idProduct]);
  const { response: relatedProducts } = useProductAPI(getRelatedProducts, [selectedProduct]);

  const handleSelectProduct = (idProduct: string) => {
    const newURL = generatePath(ROUTES.RELATED_PRODUCTS, { idProduct });
    navigate(newURL);
  };

  if (!relatedProducts) return <>Loading</>;
  return (
    <>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="justify-content-between">
                <Col>
                  <Card.Title className="fs-4 mb-2">Selected product</Card.Title>
                  <Card.Text className="fs-6 mb-1 text-capitalize">Name: {selectedProduct.name}</Card.Text>
                  <Row>
                    <Col>
                      <Card.Text className="fs-6">Price: {selectedProduct.price} €</Card.Text>
                    </Col>
                  </Row>
                </Col>
                <Col className="text-end">
                  <Card.Text className="fs-5 text-capitalize">{selectedProduct.category} category</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5 mb-4">
        <Col xs={12}>
          <h4 className="mb-1">Related products</h4>
          <small className="text-secondary">Here are six products with similar prices to the selected one.</small>
        </Col>
      </Row>
      <Row xs={1} md={2} xl={3} className="g-4">
        {relatedProducts.map((product: IProduct) => (
          <Col key={product.id} xs={12} onClick={() => handleSelectProduct(product.id)}>
            <Card className="shadow selectable">
              <Card.Body className="min-h-12rem">
                <Row>
                  <Col xs={8}>
                    <Card.Title className="text-capitalize">{product.name}</Card.Title>
                  </Col>
                  <Col xs={4} className="text-end">
                    <Badge bg={getColorByCategory(product.category)}>{product.category}</Badge>
                  </Col>
                </Row>

                <Row className="text-center">
                  <Col>
                    <Card.Text className="p-3 fw-bold fs-2">{product.price} €</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default RelatedProducts;
