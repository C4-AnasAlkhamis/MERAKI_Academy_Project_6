import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
console.log(token);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const verifyUser = async (e) => {

  //     await axios
  //       .post("http://localhost:5000/login", {
  //         email,
  //         password,
  //       })
  //       .then((result) => {
  //         if (result) {
  //           localStorage.setItem("token", result.data.token);
  //           setEmail("");
  //           setPassword("");
  //           // if (jwt(result.data.token).role == 1) {
  //           //   localStorage.setItem("isAdmin", true);
  //           //   navigate(`/dashboard`);
  //           // } else {
  //           navigate(`/home`);
  //           // }
  //           // dispatch(logIn(result.data.token));
  //         }
  //       })
  //       .catch((err) => {
  //         // wrongLogin("Error happened while Login, please try again");
  //       });
  //   };

  return (
    <>
      <div className="container">hello</div>
    </>
  );
};

export default Home;
