import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BNavbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";

const Navbar = () => {
  const getClassName = (isActive: boolean) => `nav-link ${isActive ? "fw-bold text-primary" : ""}  `;

  return (
    <BNavbar bg="light" expand="lg">
      <Container>
        <BNavbar.Brand href={ROUTES.PRODUCT_LIST} className="fw-bold">AvaiBook</BNavbar.Brand>
        <BNavbar.Toggle aria-controls="navbar" />
        <BNavbar.Collapse>
          <Nav>
            <NavLink to={ROUTES.PRODUCT_LIST} className={({ isActive }) => getClassName(isActive)}>
              Products
            </NavLink>
            <NavLink to={ROUTES.NEW_PRODUCT} className={({ isActive }) => getClassName(isActive)}>
              Add product
            </NavLink>
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

export default Navbar ;

