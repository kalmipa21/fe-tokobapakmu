import { Button, Card } from "react-bootstrap";
import defaultImg from "../../assets/images/default.png";
import formatCurrency from "../../utils/currency";

import { useDispatch, useSelector } from "react-redux";

export default function ProductCard(props) {
  const { product } = props;
  const storeCarts = useSelector((state) => state.carts);
  const dispatch = useDispatch();

  function handleAddToCart() {
    let dataCart = storeCarts.dataCart;

    const findProductByID = dataCart.find((item) => item._id === product._id);
    if (!findProductByID) {
      dataCart.push({ ...product, qty: 1, sub_total: product.price * 1 });
      dispatch({ type: "SET_CARTS", value: dataCart });
    }

    if (findProductByID) {
      dataCart.forEach((item) => {
        if (item._id === product._id) {
          item.qty += 1;
          item.sub_total = item.qty * item.price;
        }
      });
      dispatch({ type: "SET_CARTS", value: dataCart });
    }
  }

  return (
    <Card className="w-100">
      <Card.Img
        variant="top"
        src={product.image ? product.image.url : defaultImg}
        alt={`product-${product.name}`}
        className=" object-fit-cover"
        height={"250px"}
      />
      <Card.Body>
        <Card.Subtitle className="text__2">{product.name}</Card.Subtitle>
        <Card.Text className="text__4 my-2">{product.category.name}</Card.Text>
        <Card.Title className="sub__heading__2 my-2">
          {formatCurrency(product.price)}
        </Card.Title>
        <Button
          variant="outline-primary"
          className="w-100"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
  //   : (
  //     <Card style={{ width: "18rem" }}>
  //       <Card.Img variant="top" src={defaultImg} />
  //       <Card.Body>
  //         <Placeholder as={Card.Title} animation="glow">
  //           <Placeholder xs={12} />
  //           <Placeholder xs={5} />
  //           <Placeholder xs={8} />
  //         </Placeholder>
  //       </Card.Body>
  //     </Card>
  //   );
}
