import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verify } from "../features/auth/authSlice";

function Activate() {
  const { isError, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activated, setActivated] = useState(false);

  //activate on render
  useEffect(() => {
    const params = location.pathname.split("/");
    const uid = params[2];
    const token = params[3];
    dispatch(verify({ uid, token }));
  }, []);

  //checking if acc was already activated
  useEffect(() => {
    if (isError && message === "Request failed with status code 403") {
      setActivated(true);
    }
  }, [isError, message]);

  return (
    <Container>
      {activated ? (
        <Card className="p-3 mt-5">
          <Card.Body>
            <Card.Title>Your account has already been activated</Card.Title>
            <Card.Text>No need to activate it again</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card className="p-3 mt-5">
          <Card.Body>
            <Card.Title>You account was successfully activated</Card.Title>
            <Card.Text>You can now start using your account.</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Go to homepage
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Activate;
