import { useId } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { getCategories } from "../../models/ECategory";
import { IPriceRange } from "./models/ITable";

const TableFilters = ({
  category,
  priceRange,
  onFilterCategory,
  onFilterPriceRange,
  onResetFilters,
}: {
  category: string;
  priceRange: IPriceRange;
  onFilterCategory: (category: string) => void;
  onFilterPriceRange: (range: IPriceRange) => void;
  onResetFilters: VoidFunction;
}) => {
  const uniqueKey = useId();

  return (
    <>
      <Row className="pt-3 px-3 text-end">
        <Col>
          <Button onClick={() => onResetFilters()}>Clear filters</Button>
        </Col>
      </Row>
      <Row className="p-3 fluid">
        <Col xs={12} md={4}>
          <Form.Label className="fw-bold">Category</Form.Label>
          <Form.Select value={category} onChange={(e) => onFilterCategory(e.target.value)}>
            <option value="">Filter by category</option>
            {getCategories().map((category) => (
              <option key={`${category}-${uniqueKey}`} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={4}>
          <Form.Label className="fw-bold">Min price</Form.Label>
          <InputGroup>
            <InputGroup.Text>€</InputGroup.Text>
            <Form.Control
              value={priceRange.minPrice}
              onChange={(e) => {
                onFilterPriceRange({ ...priceRange, minPrice: Number(e.target.value) });
              }}
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={4}>
          <Form.Label className="fw-bold">Max price</Form.Label>
          <InputGroup>
            <InputGroup.Text>€</InputGroup.Text>
            <Form.Control
              value={priceRange.maxPrice}
              onChange={(e) => onFilterPriceRange({ ...priceRange, maxPrice: Number(e.target.value) })}
            />
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export { TableFilters };
