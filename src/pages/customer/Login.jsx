import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { axiosInstance } from "../../configs/https.js";
import { toast } from "react-toastify";
import handleErrorMessage from "../../utils/handleErrorMessage.js";

const validationSchema = Yup.object({
  email: Yup.string().required("Field is required").email(),
  password: Yup.string().required("Field is required").min(8).max(20),
});

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

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
    axiosInstance
      .post("/users/login", form)
      .then((response) => {
        const { data, message } = response.data;

        console.log(data);

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        navigate("/login");
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      });
  }

  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "24.5rem", padding: "2rem" }}>
        <Card.Body>
          <h4 className="heading__4 mb-4">Register</h4>

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
                onChange={formik.handleChange}
                className={formik.errors.email && "border-danger"}
              />
              {formik.errors.email && (
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
                  onChange={formik.handleChange}
                  className={formik.errors.password && "border-danger"}
                />
                <Button variant="light" onClick={handleShowPass}>
                  {showPass ? (
                    <i className="bi bi-eye"></i>
                  ) : (
                    <i className="bi bi-eye-slash"></i>
                  )}
                </Button>
              </InputGroup>

              {formik.errors.password && (
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
