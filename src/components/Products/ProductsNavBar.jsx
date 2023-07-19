import {
  Container,
  Button,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import "../../assets/css/cust-navbar.css";

function ProductsNavBar() {
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand className="heading__4" href="/">
          Market.ID
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className=" w-100 d-flex align-items-center justify-content-center">
            <Form className="container__search my-md-0 mt-3">
              <InputGroup>
                <Form.Select className="select__search">
                  <option>Sort By</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

                <Form.Control
                  className="input__search border-0"
                  placeholder="Cari produk kesayanganmu..."
                />
                <Button className=" d-flex align-items-center" variant="light">
                  <i className=" bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>

          <Nav>
            <Button
              variant="outline-light"
              className="me-md-3 my-md-0 my-2 me-0"
            >
              Login
            </Button>
            <Button variant="light" className=" text-primary">
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProductsNavBar;
