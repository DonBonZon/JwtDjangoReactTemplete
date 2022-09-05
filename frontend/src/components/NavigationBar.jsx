import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function NavigationBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loggedInLinks = () => (
    <Nav.Link onClick={() => dispatch(logout())}>
      <FaSignOutAlt className="me-1 " />
      Logout
    </Nav.Link>
  );

  const unLoggedLinks = () => (
    <>
      <Nav.Link as={Link} to="/login">
        <FaSignInAlt className="me-1" />
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        <FaUser className="me-1" />
        Sign Up
      </Nav.Link>
    </>
  );
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Template
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FaHome className="me-1 " />
              Home
            </Nav.Link>
            {user ? loggedInLinks() : unLoggedLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
