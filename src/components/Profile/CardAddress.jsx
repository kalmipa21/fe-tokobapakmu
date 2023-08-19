import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import TableAddress from "./TableAddress";
import handleErrorMessage from "../../utils/handleErrorMessage";
import { axiosInstance } from "../../configs/https";

export default function CardAddress() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  function handleCreateAddress() {
    navigate("/address/create");
  }

  const [isLoad, setIsLoad] = useState(true);
  const [dataAddress, setDataAddress] = useState([]);
  const [params, setParams] = useState({
    q: "",
    sort_by: "desc",
    page: 1,
    per_page: 10,
  });
  const [totalData, setTotalData] = useState(0);

  function handlePagination(page) {
    setParams({ ...params, page });
    setIsLoad(true);
  }

  function handleChangeSearch(event) {
    const key = event.target.name;
    setParams({ ...params, [key]: event.target.value });
    if (event.target.value.length === 0) setIsLoad(true);
  }

  function handleChange(event) {
    const key = event.target.name;
    setParams({ ...params, [key]: event.target.value });
    setIsLoad(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoad(true);
  }

  useEffect(() => {
    if (isLoad) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });

      axiosInstance
        .get("/api/address/all", { params: { ...params } })
        .then((response) => {
          setDataAddress(response.data.data);
          setTotalData(response.data.pagination.total);
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
          setIsLoad(false);
        });
    }
  }, [isLoad, dispatch, params, dataAddress]);

  function handleDeleteAddress(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .delete(`/api/address/${id}/delete`)
      .then((response) => {
        setIsLoad(true);
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

  return (
    <Card>
      <Card.Body>
        <Row>
          {/* SORT, SEARCH AND CREATE */}
          <Col lg="9" md="12" sm="12" className="pe-0">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Select
                  name="sort_by"
                  value={params.sort_by}
                  onChange={handleChange}
                  style={{ width: "15%" }}
                  className="mt-sm-0 mb-2"
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </Form.Select>

                <Form.Control
                  name="q"
                  value={params.q}
                  onChange={handleChangeSearch}
                  placeholder="Cari alamatmu..."
                  style={{ width: "85%" }}
                  className="mt-sm-0 mb-2 rounded-end-0"
                />
              </InputGroup>
            </Form>
          </Col>

          <Col lg="3" md="12" sm="12" className="ps-0">
            <Button
              variant="success"
              onClick={handleCreateAddress}
              className=" text-truncate w-100 mt-lg-0 mt-2 rounded-start-0"
            >
              Create
              <i className="bi bi-pencil-fill"></i>
            </Button>
          </Col>

          {/* TABLE */}
          <Col xs="12" className="mt-md-0 mt-2">
            <TableAddress
              list={dataAddress}
              handleDeleteAddress={handleDeleteAddress}
            />
          </Col>

          {/* PAGINATION */}
          <Col xs="12">
            <div
              md="6"
              xs="12"
              className="d-flex justify-content-end align-items-center"
            >
              <Form.Select
                name="per_page"
                value={params.per_page}
                onChange={handleChange}
                className="w-auto me-4 mb-3"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </Form.Select>
              <PaginationControl
                page={params.page}
                between={4}
                total={totalData}
                limit={params.per_page}
                ellipsis={1}
                changePage={handlePagination}
              ></PaginationControl>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
