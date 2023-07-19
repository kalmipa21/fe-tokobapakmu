import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { axiosInstance } from "../../configs/https.js";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage.js";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object({
  email: Yup.string().required("Field is required").email(),
  password: Yup.string().required("Field is required").min(8).max(20),
});

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  //redux store
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function handleShowPass() {
    setShowPass(!showPass);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(form) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .post("/users/login", form)
      .then((response) => {
        const { _id, token, role } = response.data.data;

        // set store
        dispatch({ type: "AUTH_TOKEN", value: token });
        dispatch({
          type: "AUTH_USER",
          value: { _id, role },
        });

        //set local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ _id, role }));

        const message = response.data.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        //REDIRECT TO HOME PAGE
        window.location.href = "/";
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        //SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Login</h4>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="email" className="mb-2">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="example@tokobapakmu.com"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={
                  formik.touched.email && formik.errors.email && "border-danger"
                }
              />
              {formik.touched.email && formik.errors.email && (
                <small className="text-danger text__5">
                  {formik.errors.email}
                </small>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password" className="mb-2">
                Password
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-danger"
                  }
                />
                <Button variant="light" onClick={handleShowPass}>
                  {showPass ? (
                    <i className="bi bi-eye"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </Button>
              </InputGroup>

              {formik.touched.password && formik.errors.password && (
                <small className="text-danger text__5">
                  {formik.errors.password}
                </small>
              )}
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 my-4">
              Login
            </Button>
          </Form>

          <p className="text__5 text-center mb-0">
            Don't have an account? Please <Link to="/login">register</Link>
          </p>
        </Card.Body>
      </Card>
    </section>
  );
}
