import { InputGroup, Form } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardHistory from "./CardHistory";
import { axiosInstance } from "../../configs/https";
import handleErrorMessage from "../../utils/handleErrorMessage";
import formatCurrency from "../../utils/currency";

import { toast } from "react-toastify";

export default function CheckoutHistory() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const _id = user._id;

  const [isLoad, setIsLoad] = useState(true);
  const [dataCheckouts, setDataCheckouts] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const [params, setParams] = useState({
    q: "",
    sort_by: "desc",
    page: 1,
    per_page: 10,
  });
  const [totalData, setTotalData] = useState(0);

  function handleChange(event) {
    const key = event.target.name;
    setParams({ ...params, [key]: event.target.value });
    setIsLoad(true);
  }

  function handleChangeSearch(event) {
    const key = event.target.name;
    setParams({ ...params, [key]: event.target.value });
    if (event.target.value.length === 0) setIsLoad(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoad(true);
  }

  function handlePagination(page) {
    setParams({ ...params, page });
    setIsLoad(true);
  }

  useEffect(() => {
    if (isLoad) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });

      axiosInstance
        .get(`${process.env.REACT_APP_BASE_URL}/checkouts/${_id}/history`, {
          params: { ...params },
        })
        .then((response) => {
          setDataCheckouts(response.data.data.data);
          setTotalExpense(response.data.data.incomes);
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
  }, [isLoad, dispatch, _id, params]);

  return (
    <>
      {/* SORT AND SEARCH */}
      <Form className="mb-1 mt-md-0 mt-2" onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Select
            name="sort_by"
            value={params.sort_by}
            onChange={handleChange}
            style={{ width: "10%" }}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </Form.Select>

          <Form.Control
            name="q"
            value={params.q}
            onChange={handleChangeSearch}
            placeholder="Cari Invoice kamu..."
            style={{ width: "90%" }}
          />
        </InputGroup>
      </Form>

      {!dataCheckouts.length ? (
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ height: "cacl(100vh - 18rem)", overflowY: "auto" }}
        >
          <h4>Invoice Not Found</h4>
        </div>
      ) : (
        <>
          {/* CARD HISTORY */}
          <div
            className="border rounded-2 p-1 mb-1"
            style={{ height: "calc(100vh - 18rem)", overflowY: "auto" }}
          >
            {dataCheckouts.map((detail, index) => (
              <CardHistory
                key={`card-history-${index}-${detail.invoice}`}
                detail={detail}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center">
            <h5>Total Pengeluaran: {formatCurrency(totalExpense)}</h5>
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
          </div>
        </>
      )}
    </>
  );
}
