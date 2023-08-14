import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ABreadCrumbs from "../../components/ABreadCrumbs";
import ItemCart from "../../components/Carts/ItemCart";
import CardCheckout from "../../components/Carts/CardCheckout";
import { axiosInstance } from "../../configs/https";
import handleErrorMessage from "../../utils/handleErrorMessage";

export default function Invoices() {
  const { code } = useParams();
  const [confirmed, setConfirmed] = useState(true);
  const dispatch = useDispatch();

  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/invoices",
      name: "Invoices",
      active: true,
    },
  ];

  const [data, setData] = useState({});
  const [cartInvoice, setCartInvoice] = useState([]);
  const [detailInvoice, setDetailInvoice] = useState({
    address_id: "",
    subTotal: 0,
    ppn: 0,
    total: 0,
  });

  useEffect(() => {
    if (confirmed) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axiosInstance
        .get(`/checkouts/${code}/detail`)
        .then((response) => {
          //   console.log("RES", response.data.data);
          setData(response.data.data);
          const carts = response.data.data.cart;
          const address = response.data.data.address;
          setCartInvoice(carts);
          const dataSubTotal = carts.map((cart) => cart.sub_total);
          const subTotal = dataSubTotal.reduce((a, b) => a + b, 0);
          const ppn = subTotal * 0.01;
          const total = ppn + subTotal;
          setDetailInvoice({ address_id: address._id, subTotal, ppn, total });
        })
        .catch((error) => {
          const message = error.response?.data?.message;
          toast(handleErrorMessage(message), {
            position: toast.POSITION.TOP_RIGHT,
            type: toast.TYPE.ERROR,
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", value: false });
          setConfirmed(false);
        });
    }
  }, [confirmed, code, dispatch]);

  function handleConfirmPayment() {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .put(`/checkouts/${code}/confirm`, { status: true })
      .then((response) => {
        setConfirmed(true);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  return (
    <>
      <Row>
        <Col xs="12">
          <ABreadCrumbs options={options} />
        </Col>
        <Col xs="12">
          {/* <h1>INVOICE {JSON.stringify(data)}</h1> */}
          <Card className="rounded-0 mb-4">
            <Card.Body>
              <Card.Title className="sub__heading__1 text-primary mb-2">
                Tokobapakmu
              </Card.Title>
              <div className="d-flex justify-content-between align-items-center">
                <p className=" mb-0 text__4">
                  Nama Pemesan: {data.user ? data.user.full_name : "-"}
                </p>
                <h6 className=" sub__heading__5">
                  Invoice: {data.invoice || "-"}
                </h6>
              </div>
              <div className="d-flex justify-content-between     align-items-center">
                <p className=" mb-0 text__4">
                  Email Pemesan: {data.user ? data.user.email : "-"}
                </p>
                {data.status ? (
                  <h6 className=" sub__heading__5 text-success">
                    Status payment success
                  </h6>
                ) : (
                  <h6 className=" sub__heading__5 text-warning">
                    Status waiting payment
                  </h6>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md="8" sm="12" xs="12">
          <div
            style={{ height: "25rem", overflowY: "auto" }}
            className="mb-2 border-bottom"
          >
            {cartInvoice.map((cart, index) => (
              <ItemCart
                key={`item-checkout-${cart.name}`}
                index={index}
                cart={cart}
              />
            ))}
          </div>
        </Col>
        <Col md="4" sm="12" xs="12">
          <CardCheckout
            isCheckout={false}
            handleConfirmPayment={handleConfirmPayment}
            detailInvoice={detailInvoice}
            isStatus={data.status}
          />
        </Col>
      </Row>
    </>
  );
}
