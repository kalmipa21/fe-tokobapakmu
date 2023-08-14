import { Container, Navbar } from "react-bootstrap";
import "../../assets/css/cust-navbar.css";

function CustProfileNavBar() {
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand className="heading__4" href="/">
          Tokobapakmu
        </Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default CustProfileNavBar;
