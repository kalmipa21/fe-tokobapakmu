import { Button, Card, Image } from "react-bootstrap";
import formatCurrency from "../../utils/currency";
import { useNavigate } from "react-router-dom";

export default function CardHistory({ detail }) {
  const navigate = useNavigate();
  function handleDetailInvoice(inovice_code) {
    navigate(`/invoice/${inovice_code}`);
  }
  return (
    <Card className=" p-0 mb-1">
      <Card.Body className="d-flex justify-content-between align-items-center p-1">
        <Image
          src={detail.cart[0].image.url}
          alt=""
          className="p-2"
          style={{
            width: "100px",
            aspectRatio: "3/2",
            objectFit: "contain",
          }}
        />
        <Card.Text className="m-0 sub__heading__5">
          INVOICE#{detail.invoice}
        </Card.Text>
        <Card.Text className="m-0 sub__heading__5">
          {formatCurrency(detail.total)}
        </Card.Text>
        <Button
          variant="success"
          size="sm"
          onClick={() => handleDetailInvoice(detail.invoice)}
        >
          <i className=" bi bi-eye-fill"></i>
        </Button>
      </Card.Body>
    </Card>
  );
}
