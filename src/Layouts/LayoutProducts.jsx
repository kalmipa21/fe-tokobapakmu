import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ProductsNavBar from "../components/Products/ProductsNavBar";

export default function LayoutProducts() {
  return (
    <>
      <ProductsNavBar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
}
