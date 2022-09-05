import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../features/auth/authSlice";

function SignUp() {
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
      name: "",
      email: "",
      password: "",
      re_password: "",
    },
    onSubmit: (values) => {
      dispatch(signup(values));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, "User name must be at least 6 characters long.")
        .max(255, "User name cannot exceed 255 characters.")
        .required("User name is required."),
      email: Yup.string()
        .email("Not a valid email.")
        .required("Email is required."),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(255, "Password cannot exceed 255 characters.")
        .required("Password is required."),
      re_password: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
  });

  return (
    <Container>
      <Card className="p-3 mt-5 Auth-card">
        <Form onSubmit={formik.handleSubmit}>
          <h3 className="Auth-form-title">
            <FaUser className="me-1" />
            Sign up
          </h3>
          <Form.Group className="mb-2">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Form.Group>

          {formik.errors.name && formik.touched.name ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.name}
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

          {/* Form validation errors */}
          {formik.errors.email && formik.touched.email ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.email}
            </Alert>
          ) : null}

          {/* Backend errors */}
          {message.email
            ? message.email.map((msg) => (
                <Alert className="mt-2" variant="danger">
                  {msg}
                </Alert>
              ))
            : null}

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

          {/* Form validation errors */}
          {formik.errors.password && formik.touched.password ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.password}
            </Alert>
          ) : null}

          {/* Backend errors */}
          {message.password
            ? message.password.map((msg) => (
                <Alert className="mt-2" variant="danger">
                  {msg}
                </Alert>
              ))
            : null}

          <Form.Group className="mb-2">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="re_password"
              onChange={formik.handleChange}
              value={formik.values.re_password}
            />
          </Form.Group>

          {formik.errors.re_password && formik.touched.re_password ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.re_password}
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

export default SignUp;
