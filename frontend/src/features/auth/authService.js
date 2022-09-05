import axios from "axios";

const API_URL = "http://localhost:8000";

const signup = async (user) => {
  const { name, email, password, re_password } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password, re_password });

  const res = await axios.post(`${API_URL}/auth/users/`, body, config);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (user) => {
  const { email, password } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  const res = await axios.post(`${API_URL}/auth/jwt/create/`, body, config);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const reset_password = (user) => {
  console.log(user);
  const { email } = user;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  const res = axios.post(`${API_URL}/auth/users/reset_password/`, body, config);
  return res.data;
};

const reset_password_confirm = (data) => {
  const { uid, token, new_password, re_new_password } = data;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  const res = axios.post(
    `${API_URL}/auth/users/reset_password_confirm/`,
    body,
    config
  );
  return res.data;
};

const verify = async (data) => {
  const { uid, token } = data;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  const res = await axios.post(
    `${API_URL}/auth/users/activation/`,
    body,
    config
  );

  return res.data;
};

const authService = {
  signup,
  login,
  verify,
  reset_password,
  reset_password_confirm,
};

export default authService;
