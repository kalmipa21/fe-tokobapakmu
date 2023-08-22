/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import ProductCard from "../../components/Products/ProductCard";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";

import { axiosInstance } from "../../configs/https";

import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const storeParamsProduct = useSelector((state) => state.product);
  const storeLoading = useSelector((state) => state.loading);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch({ type: "ACTION_PER_PAGE", value: event.target.value });
  }

  function handlePagination(page) {
    dispatch({ type: "ACTION_PAGE", value: page });
    setPagination({ ...pagination, page: page });
  }

  useEffect(() => {
    if (storeParamsProduct) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });

      axiosInstance
        .get(`/${process.env.REACT_APP_BASE_URL}/products`, {
          params: { ...storeParamsProduct },
        })
        .then((response) => {
          setData(response.data.data);

          setPagination(response.data.pagination);
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
    }

    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeParamsProduct]);

  return (
    <>
      <Row>
        {data.map((product, index) => (
          <Col
            key={`product-${index}`}
            className="mb-4"
            lg="3"
            md="4"
            sm="6"
            xs="12"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Product Not Found Display */}
      {!storeLoading.isLoading && !data.length && (
        <div className="d-flex justify-content-center align-items-center">
          <h4>Product Not Found</h4>
        </div>
      )}

      {/* PAGINATION */}
      {!storeLoading.isLoading && (
        <Row>
          <Col
            xs="12"
            className="d-flex justify-content-end align-items-center"
          >
            <Form.Select
              value={storeParamsProduct.per_page}
              onChange={handleChange}
              className="w-auto me-4 mb-3"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Form.Select>
            <PaginationControl
              page={pagination.page}
              between={4}
              total={pagination.total}
              limit={pagination.per_page}
              ellipsis={1}
              changePage={handlePagination}
            ></PaginationControl>
          </Col>
        </Row>
      )}

      {/* {data.length ? (
        <Row>
          <Col
            xs="12"
            className="d-flex justify-content-end align-items-center"
          >
            <Form.Select
              value={storeParamsProduct.per_page}
              onChange={handleChange}
              className="w-auto me-4 mb-3"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Form.Select>
            <PaginationControl
              page={pagination.page}
              between={4}
              total={pagination.total}
              limit={pagination.per_page}
              ellipsis={1}
              changePage={handlePagination}
            ></PaginationControl>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h4>Product Not Found</h4>
        </div>
      )} */}
    </>
  );
}
