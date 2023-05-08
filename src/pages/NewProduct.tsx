import { useId, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../models/ECategory";
import { TProductPost } from "../models/IProduct";
import { insertProduct } from "../services/productService";
import { ROUTES } from "../routes";
import {Message} from "../components";
import InputGroup from "react-bootstrap/InputGroup";

const NewProduct = () => {
  const [validated, setValidated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const uniqueKey = useId();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault(); //Para evitar que refresque la pagina
    event.stopPropagation();

    if (form.checkValidity() && selectedCategory) {
      const formData = new FormData(form);
      const newProduct = Object.fromEntries(formData.entries()) as TProductPost;
      const insertedProduct = insertProduct(newProduct);

      if (insertedProduct) {
        setDisplayMessage(true);
        // Espera 2 segundos para simular tráfico de red
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(ROUTES.PRODUCT_LIST);
      }

      //Faltaria implementar el else para manejar posibles errores pero no tiene sentido en esta prueba
    }

    setValidated(true);
  };

  return (
    <>
      <div className="card">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Stack className="m-3" gap={3}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control name="name" required type="text" placeholder="Type a name" />
                  <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label className="fw-bold">Price</Form.Label>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Text>€</InputGroup.Text>
                    <Form.Control name="price" required type="number" placeholder="Type a price..." />
                    <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={selectedCategory}
                    required
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {getCategories().map((category) => (
                      <option key={`${category}-${uniqueKey}`} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Required field</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="text-end">
              <Col>
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Stack>
        </Form>
      </div>
      <Message title="Success!" message="New product registered" display={displayMessage} />
    </>
  );
};

export default NewProduct;
