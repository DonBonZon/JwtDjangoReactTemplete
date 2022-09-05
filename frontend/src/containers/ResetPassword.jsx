import React from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { reset_password } from "../features/auth/authSlice";

function ResetPassword() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(reset_password(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a valid email.")
        .required("Email is required."),
    }),
  });

  return (
    <Container>
      <Card className="p-3 mt-5 Auth-card">
        <Form onSubmit={formik.handleSubmit}>
          <h3 className="Auth-form-title">
            {/* <FaUser className="me-1" /> */}
            Reset password
          </h3>

          <Form.Group className="mb-2">
            <Form.Label>Please eneter you email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
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

          <Button variant="danger" type="submit" className="w-100 mt-2">
            Reset
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ResetPassword;
