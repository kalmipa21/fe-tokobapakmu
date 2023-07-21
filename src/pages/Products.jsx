import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/Products/ProductCard";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

import { axiosInstance } from "../configs/https";

import { useDispatch } from "react-redux";

export default function Products() {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    q: "",
    sort_by: "desc",
    page: 1,
    per_page: 10,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .get("/products/all", { params: { ...params } })
      .then((responese) => {
        setData(responese.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      {data.map((product, index) => (
        <Col key={`product-${index}`} lg="3" md="4" sm="6" xs="12">
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
}
