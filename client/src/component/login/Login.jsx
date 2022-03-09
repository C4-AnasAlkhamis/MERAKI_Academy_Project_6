import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logIn } from "../../reducer/login/index";
import { useDispatch } from "react-redux";
import { FloatingLabel, Form, Button } from "react-bootstrap";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = async () => {
    await axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        if (result) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user_name", result.data.name);
          setEmail("");
          setPassword("");
          dispatch(logIn(result.data.token));
          navigate(`/home`);
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
          autoComplete="off"
          type="email"
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          autoComplete="off"
          value={password}
          type="password"
          placeholder="Password"
        />
      </FloatingLabel>
      <Button onClick={verifyUser} variant="outline-success">
        Login
      </Button>
      {/* <div className="login_box">
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
      </div> */}
    </>
  );
};

export default Login;
