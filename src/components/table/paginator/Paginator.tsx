import Button from "react-bootstrap/Button";
import Icon from "@reacticons/bootstrap-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { getPages } from "./paginatorTools";
import { useMemo } from "react";

const PAGES_INTERVAL = 4;

const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const negativePages = totalPages - PAGES_INTERVAL <= 0
  const pageInRange =  totalPages - currentPage <= PAGES_INTERVAL
  const intervalFirtPage = negativePages ? 1 : pageInRange ? totalPages - PAGES_INTERVAL : currentPage;
  const pageNumbers = useMemo(
    () => getPages(PAGES_INTERVAL, intervalFirtPage, totalPages),
    [intervalFirtPage, totalPages]
  );

  const handleChangePage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    onPageChange(pageNumber);
  };

  return (
    <Container fluid>
      <Row className="p-1 text-center">
        <Col>
          <Button
            variant="outline-primary"
            disabled={currentPage === 1}
            className="border-0"
            onClick={() => handleChangePage(1)}
          >
            <Icon name="skip-backward" />
          </Button>
          <Button
            variant="outline-primary"
            disabled={currentPage === 1}
            className="border-0"
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <Icon name="caret-left" />
          </Button>
            <Button
              variant="outline-secondary"
              className="border-0 d-inline-bloc d-md-none"
              disabled
            >
              {currentPage}
            </Button>
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              variant="outline-secondary"
              disabled={pageNumber === currentPage}
              className="border-0 d-none d-md-inline-block"
              onClick={() => handleChangePage(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
          <Button
            variant="outline-primary"
            disabled={currentPage === totalPages}
            className="border-0"
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <Icon name="caret-right" />
          </Button>
          <Button
            variant="outline-primary"
            disabled={currentPage === totalPages}
            className="border-0"
            onClick={() => handleChangePage(totalPages)}
          >
            <Icon name="skip-forward" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Paginator;
