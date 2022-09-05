import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Activate from "./containers/Activate";
import Layout from "./containers/Layout/Layout";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact path="/reset_passwor" element={<ResetPassword />} />
            <Route
              exact
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route exact path="/activate/:uid/:token" element={<Activate />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
