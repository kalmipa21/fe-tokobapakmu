import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";

import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance } from "../../configs/https";
import formatCurrency from "../../utils/currency";

export default function CardCheckout() {
  const [optionAddress, setOptionAddress] = useState([]);

  const dispatch = useDispatch();
  const { dataCart } = useSelector((state) => state.carts);
  const dataSubTotal = dataCart.map((cart) => cart.sub_total);
  const subTotal = dataSubTotal.reduce((a, b) => a + b, 0);
  const ppn = subTotal * 0.01;
  const total = ppn + subTotal;

  useEffect(() => {
    if (!optionAddress.length) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });
      axiosInstance
        .get("/address/all")
        .then((respones) => {
          // console.log("Address", respones.data);
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
  }, [optionAddress, dispatch]);

  const [fullAddress, setFullAddress] = useState("-");
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
      console.log("Address", findAddressByID);
    }
  }

  return (
    <Card className="w-100">
      <Card.Body>
        <Form.Label htmlFor="form-addres" className=" fw-bold">
          Address
        </Form.Label>
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
          disabled={address._id.length === 0}
          color=" primary"
          className="w-100"
        >
          Checkout
        </Button>
      </Card.Body>
    </Card>
  );
}
