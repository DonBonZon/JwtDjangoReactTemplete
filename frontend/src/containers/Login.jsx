import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
    // should we validate login attemps?
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a valid email.")
        .required("Email is required."),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(255, "Password cannot exceed 255 characters.")
        .required("Password is required."),
    }),
  });

  return (
    <Container>
      <Card className="p-3 mt-5 Auth-card">
        <Form onSubmit={formik.handleSubmit}>
          <h3 className="Auth-form-title">
            <FaSignInAlt className="me-1" />
            Login
          </h3>

          {message.detail ? (
            <Alert className="mt-2" variant="danger">
              Login failed. Check email address or retype your password.
            </Alert>
          ) : null}
          <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Form.Group>

          {formik.errors.email && formik.touched.email ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.email}
            </Alert>
          ) : null}

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Group>

          {formik.errors.password && formik.touched.password ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.password}
            </Alert>
          ) : null}

          <Button variant="primary" type="submit" className="w-100 mb-2">
            Submit
          </Button>

          <p className="">
            Forgot <Link to="/reset_passwor">password?</Link>
          </p>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
