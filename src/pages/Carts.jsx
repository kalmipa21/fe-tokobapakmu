import ABreadCrumbs from "../components/ABreadCrumbs";
import ItemCart from "../components/Carts/ItemCart";
import CardCheckout from "../components/Carts/CardCheckout";

import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Cart() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/cart",
      name: "Carts",
      active: true,
    },
  ];

  const storeCarts = useSelector((state) => state.carts);
  return (
    <>
      <Row>
        <Col xs="12">
          <ABreadCrumbs options={options} />
        </Col>
        <Col md="8" sm="12" xs="12">
          <div
            style={{ height: "calc(100vh - 14rem)", overflowY: "auto" }}
            className="mb-2 border-bottom"
          >
            {storeCarts.dataCart.length ? (
              storeCarts.dataCart.map((cart, index) => (
                <ItemCart
                  key={`item-cart-${cart._id}`}
                  index={index}
                  cart={cart}
                  isActive
                />
              ))
            ) : (
              <h3>Your Cart Empty</h3>
            )}
          </div>
        </Col>
        <Col md="4" sm="12" xs="12">
          <CardCheckout />
        </Col>
      </Row>
    </>
  );
}
