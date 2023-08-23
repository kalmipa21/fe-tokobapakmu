import { Card, Button, Image } from "react-bootstrap";
import formatCurrency from "../../utils/currency";
import { useDispatch, useSelector } from "react-redux";

export default function ItemCart(props) {
  const { cart, index, isActive = false } = props;
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  function handleAddPerItem() {
    storeCarts.dataCart.forEach((item) => {
      if (item._id === cart._id) {
        item.qty += 1;
        item.sub_total = item.qty * item.price;
      }
      dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
    });
  }
  function handleSubtPerItem() {
    storeCarts.dataCart.forEach((item) => {
      if (item._id === cart._id) {
        item.qty -= 1;
        item.sub_total = item.qty * item.price;
      }
      dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
    });
  }

  function handleDeleteByIndex() {
    storeCarts.dataCart.splice(index, 1);
    dispatch({ type: "SET_CARTS", value: storeCarts.dataCart });
  }
  return (
    <Card className=" mb-2">
      <Card.Body className="d-flex justify-content-sm-between align-items-center">
        <div className=" d-lg-flex align-items-center justify-content-evenly col-6">
          <Image
            src={cart.image.url}
            alt={`product-${cart.name}`}
            className=" object-fit-cover rounded"
            height="90"
            width="100"
          />
          <h6 className="ms-2">{cart.name}</h6>
        </div>
        <div className="d-lg-flex align-items-center col-6 justify-content-sm-evenly">
          {!isActive && <span className=" mx-2">x{cart.qty}</span>}
          <h6 className="">{formatCurrency(cart.sub_total)}</h6>

          {isActive && (
            <div className="">
              <Button
                size="sm"
                disabled={cart.qty < 2}
                variant={cart.qty < 2 ? "secondary" : "primary"}
                onClick={handleSubtPerItem}
              >
                <i className="bi bi-dash"></i>
              </Button>
              <span className=" mx-2">{cart.qty}</span>
              <Button size="sm" variant="primary" onClick={handleAddPerItem}>
                <i className="bi bi-plus"></i>
              </Button>
              <Button
                size="sm"
                variant="danger"
                className=" ms-2"
                onClick={handleDeleteByIndex}
              >
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
