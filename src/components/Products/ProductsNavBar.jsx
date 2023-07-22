import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../configs/https";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage";

import {
  Container,
  Button,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import "../../assets/css/cust-navbar.css";
import { useState } from "react";

function ProductsNavBar() {
  // STORE AUTH
  const { token, user } = useSelector((state) => state.auth);
  const { q, sort_by } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  //   const headers = { Authorization: `Basic ${token}` };

  // STATE
  const [params, setParams] = useState({
    q,
    sort_by,
  });

  function handleOnChange(event) {
    setParams({ ...params, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // SET PARAMS Q AND SORT BY
    dispatch({ type: "ACTION_PAGE", value: 1 });
    dispatch({ type: "ACTION_SORT_BY", value: params.sort_by });
    dispatch({ type: "ACTION_SEARCH", value: params.q });
  }

  function handleLogout() {
    const _id = user._id;

    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .post(`/users/${_id}/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const message = response.data.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        // TO PAGE LOGIN
        window.location.href = "/login";
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
    <Navbar bg="primary" expand="md" variant="dark">
      <Container>
        <Navbar.Brand className="heading__4" href="/">
          Tokobapakmu
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className=" w-100 d-flex align-items-center justify-content-center">
            <Form
              className="container__search my-md-0 mt-3"
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Form.Select
                  className="select__search"
                  value={params.sort_by}
                  name="sort_by"
                  onChange={handleOnChange}
                >
                  <option value="asc">ASC</option>
                  <option value="desc">DESC</option>
                </Form.Select>

                <Form.Control
                  className="input__search border-0"
                  placeholder="Cari produk kesayanganmu..."
                  name="q"
                  value={params.q}
                  onChange={handleOnChange}
                />
                <Button
                  type="submit"
                  className=" d-flex align-items-center"
                  variant="light"
                >
                  <i className=" bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>

          <Nav>
            {token ? (
              <>
                <Link className="me-md-3 my-md-0 my-3 me-0 d-flex justify-content-center align-items-center btn btn-outline-light">
                  <i className="bi bi-cart-fill"></i>
                  <span className="sub__heading__5 ms-2">0</span>
                </Link>
                <Button variant="light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="me-md-3 my-md-0 my-3 me-0 btn btn-outline-light"
                >
                  Login
                </Link>
                <Link to="/register" className=" text-primary btn btn-light">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ProductsNavBar;
