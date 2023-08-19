import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance } from "../../configs/https";
import formatCurrency from "../../utils/currency";
import PopupCheckout from "./PopupCheckout";

export default function CardCheckout(props) {
  const navigate = useNavigate();

  const {
    isCheckout = true,
    isStatus = true,
    detailInvoice = { address_id: "", subTotal: 0, ppn: 0, total: 0 },
    handleConfirmPayment = () => {},
  } = props;
  const [optionAddress, setOptionAddress] = useState([]);
  const [fullAddress, setFullAddress] = useState("-");

  const dispatch = useDispatch();
  const { dataCart } = useSelector((state) => state.carts);
  const dataSubTotal = dataCart.map((cart) => cart.sub_total);
  const subTotal = dataSubTotal.reduce((a, b) => a + b, 0);
  const ppn = subTotal * 0.01;
  const total = ppn + subTotal;

  // FOR OPTION ADDRESS
  useEffect(() => {
    if (!optionAddress.length && isCheckout) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axiosInstance
        .get("/api/address/all")
        .then((respones) => {
          setOptionAddress(respones.data.data);
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
  }, [optionAddress, dispatch, isCheckout]);

  // FOR DETAIL ADDRESS
  useEffect(() => {
    if (detailInvoice.address_id.length > 0) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axiosInstance
        .get(`/api/address/${detailInvoice.address_id}/detail`)
        .then((respones) => {
          const { address, village, district, regency, province, passcode } =
            respones.data.data;
          setFullAddress(
            `${address} ${village.name} ${district.name} ${regency.name} ${province.name} ${passcode}`
          );
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
  }, [detailInvoice, dispatch]);

  const [address, setAddress] = useState({
    _id: "",
    name: "",
  });

  function handleChangeAddress(event) {
    const _id = event.target.value;

    const findAddressByID = optionAddress.find(
      (address) => address._id === _id
    );
    if (!findAddressByID) {
      setFullAddress("-");
      setAddress({ _id: "", name: "" });
    } else {
      setAddress({ _id: findAddressByID._id, name: findAddressByID.name });
      setFullAddress(
        `${findAddressByID.address} ${findAddressByID.village.name} ${findAddressByID.regency.name} ${findAddressByID.district.name} ${findAddressByID.province.name} ${findAddressByID.passcode}`
      );
    }
  }

  // POPUP CHECKOUT
  const [show, setShow] = useState(false);

  function handlePayNow() {
    const cart = dataCart.map((cart) => {
      return {
        name: cart.name,
        price: cart.price,
        image: cart.image,
        category: cart.category,
        qty: cart.qty,
        sub_total: cart.sub_total,
      };
    });
    const dataCheckout = {
      cart,
      address,
      total,
    };

    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .post("/api/checkouts/new", dataCheckout)
      .then((response) => {
        const invoice = response.data.data.invoice;

        toast("Checkout Success", {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });

        setShow(false);
        navigate(`/invoice/${invoice}`);
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
      <Card className="w-100">
        <Card.Body>
          <Form.Label htmlFor="form-addres" className=" fw-bold">
            Address
          </Form.Label>

          {isCheckout ? (
            <>
              <Form.Select
                id="form-address"
                value={address._id}
                onChange={handleChangeAddress}
              >
                <option value="">Select Your Address</option>
                {optionAddress.map((address, index) => (
                  <option key={`option-address-${index}`} value={address._id}>
                    {address.name}
                  </option>
                ))}
              </Form.Select>
              <Card.Text className="my-2">{fullAddress}</Card.Text>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Subtitle className="fw-medium">Subtotal</Card.Subtitle>
                <Card.Subtitle className="fw-medium">
                  {formatCurrency(subTotal)}
                </Card.Subtitle>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Subtitle className="fw-medium">PPN (10%)</Card.Subtitle>
                <Card.Subtitle className="fw-medium">
                  {formatCurrency(ppn)}
                </Card.Subtitle>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Subtitle className="fw-medium">Total</Card.Subtitle>
                <Card.Subtitle className="fw-medium">
                  {formatCurrency(total)}
                </Card.Subtitle>
              </div>
              <Button
                disabled={address._id.length === 0 || total === 0}
                variant="primary"
                className="w-100"
                onClick={() => setShow(true)}
              >
                Checkout
              </Button>
            </>
          ) : (
            <>
              <Card.Text className="my-2">{fullAddress}</Card.Text>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Subtitle className="fw-medium">Subtotal</Card.Subtitle>
                <Card.Subtitle className="fw-medium">
                  {formatCurrency(detailInvoice.subTotal)}
                </Card.Subtitle>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Subtitle className="fw-medium">PPN (10%)</Card.Subtitle>
                <Card.Subtitle className="fw-medium">
                  {formatCurrency(detailInvoice.ppn)}
                </Card.Subtitle>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Subtitle className="fw-medium">Total</Card.Subtitle>
                <Card.Subtitle className="fw-medium">
                  {formatCurrency(detailInvoice.total)}
                </Card.Subtitle>
              </div>
              {!isStatus && (
                <Button
                  variant="success"
                  className="w-100"
                  onClick={handleConfirmPayment}
                >
                  Confirm Payment
                </Button>
              )}
            </>
          )}
        </Card.Body>
      </Card>

      {/* POPUP CHECKOUT */}
      <PopupCheckout
        show={show}
        handleClose={() => setShow(false)}
        handlePayNow={handlePayNow}
      />
    </>
  );
}
