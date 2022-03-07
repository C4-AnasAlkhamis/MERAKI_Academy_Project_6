import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logIn } from "../../reducer/login/index";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          setEmail("");
          setPassword("");

          navigate(`/home`);
          dispatch(logIn(result.data.token));
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="login_box">
        <div className="group1">
          <form onSubmit={verifyUser} className="form">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="off"
              value={email}
              type="email"
              placeholder="Email"
            />

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input_name"
              required
              autoComplete="off"
              value={password}
              type="password"
              placeholder="Password"
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
