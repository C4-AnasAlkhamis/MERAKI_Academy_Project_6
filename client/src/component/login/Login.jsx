import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
// import { logIn, isAdmin } from "../../reducer/login/index";
// import { useDispatch } from "react-redux";

const Login = () => {
  // const dispatch = useDispatch();
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
          // if (jwt(result.data.token).role == 1) {
          //   localStorage.setItem("isAdmin", true);
          //   navigate(`/dashboard`);
          // } else {
          navigate(`/home`);
          // }
          // dispatch(logIn(result.data.token));
        }
      })
      .catch((err) => {
        // wrongLogin("Error happened while Login, please try again");
      });
  };

  return (
    <>
      <div className="login_box">
        <div className="group1">
          <div className="regImg1">
            {/* <img className="image" src={login} /> */}
          </div>
          <form onSubmit={verifyUser}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
