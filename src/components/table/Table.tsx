import { useMemo, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BTable from "react-bootstrap/Table";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../routes";
import { TableFilters } from "./TableFilters";
import { IPriceRange, ITableProps, createDefaultQueryParams } from "./models/ITable";
import Paginator from "./paginator/Paginator";
import "./table.css";
import { filterValues, getMaxPrice, getQueryParams, getRowsToDisplay, getTotalPages } from "./tools";

const DEFAULT_CURRENT_PAGE = 1;

const Table = ({ columns, rowsPerPage, values }: ITableProps) => {
  //#region Hooks
  const [params, setParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  const navigate = useNavigate();
  //#endregion

  //#region Variables
  const { category, range } = getQueryParams(params, values);
  const valuesToDisplay = filterValues(values, category, range);
  const totalPages = useMemo(() => getTotalPages(valuesToDisplay, rowsPerPage), [valuesToDisplay, rowsPerPage]);
  //#endregion

  //#region Handlers
  const handleResetFilters = () => {
    const defultQueryParams = createDefaultQueryParams(getMaxPrice(values));
    setParams(defultQueryParams);
  };

  const handleSelectProduct = (idProduct: string) => {
    const newURL = generatePath(ROUTES.RELATED_PRODUCTS, { idProduct });
    navigate(newURL);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterCategory = (category: string) => {
    const { minPrice, maxPrice } = range;
    setParams({ category, minPrice: String(minPrice), maxPrice: String(maxPrice) });
  };

  const handleFilterRange = ({ minPrice, maxPrice }: IPriceRange) => {
    setParams({ category, minPrice: String(minPrice), maxPrice: String(maxPrice) });
  };
  //#endregion

  return (
    <Row xs={1} className="g-3">
      <Col className="card">
        <TableFilters
          category={category}
          priceRange={range}
          onFilterCategory={handleFilterCategory}
          onFilterPriceRange={handleFilterRange}
          onResetFilters={() => handleResetFilters()}
        />
      </Col>
      <Col>
        <BTable hover responsive>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={`col-${column}-${index}`} className="text-capitalize">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getRowsToDisplay(currentPage, rowsPerPage, valuesToDisplay).map((row) => (
              <tr key={`${row.id}`} onClick={() => handleSelectProduct(row.id)}>
                {columns.map((column) => (
                  <td key={`${column}-${row.id}`}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </BTable>
      </Col>
      <Col>
        <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </Col>
    </Row>
  );
};

export default Table;
