import React from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { reset_password_confirm } from "../features/auth/authSlice";
import { useLocation } from "react-router-dom";

function ResetPasswordConfirm() {
  const dispatch = useDispatch();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      new_password: "",
      re_new_password: "",
    },
    onSubmit: (values) => {
      // dispatch(signup(values));
      const params = location.pathname.split("/");
      const uid = params[4];
      const token = params[5];
      console.log(params);
      console.log(uid);
      console.log(token);
      console.log({ ...values, uid, token });
      dispatch(reset_password_confirm({ ...values, uid, token }));
    },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(255, "Password cannot exceed 255 characters.")
        .required("Password is required."),
      re_new_password: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
  });
  return (
    <Container>
      <Card className="p-3 mt-5 Auth-card">
        <Form onSubmit={formik.handleSubmit}>
          <h3 className="Auth-form-title">Reset password</h3>

          <Form.Group className="mb-2">
            <Form.Label>Please enter new password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New password"
              name="new_password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Group>

          {formik.errors.password && formik.touched.password ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.password}
            </Alert>
          ) : null}

          <Form.Group className="mb-2">
            <Form.Label>Please confirm new password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              name="re_new_password"
              onChange={formik.handleChange}
              value={formik.values.re_password}
            />
          </Form.Group>

          {formik.errors.re_password && formik.touched.re_password ? (
            <Alert className="mt-2" variant="danger">
              {formik.errors.re_password}
            </Alert>
          ) : null}

          <Button variant="warning" type="submit" className="w-100 mb-2">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default ResetPasswordConfirm;
