import { Container, Button, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/cust-navbar.css";

function CartNavbar() {
  const navigate = useNavigate();
  function handleGoToProfile() {
    navigate("/profile");
  }
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand className="heading__4" href="/">
          Tokobapakmu
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="d-flex justify-content-end w-100">
            <Button onClick={handleGoToProfile} variant="light">
              Profile
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CartNavbar;
