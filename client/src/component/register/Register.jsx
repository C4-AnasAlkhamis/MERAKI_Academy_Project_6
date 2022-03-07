import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import logo from "../../image/cones.jpg";
const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [done, setDone] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    //   POST -> /user
    if (!userName || !email || !password || !repeatPassword) {
      // wrongRegister("please fill in all inputs");
    } else if (repeatPassword === password) {
      await axios
        .post("http://localhost:5000/register", {
          user_name: userName.toLowerCase(),
          email: email.toLowerCase(),
          password,
          role_id: 2,
        })
        .then((result) => {
          setUserName("");
          setRepeatPassword("");
          setEmail("");
          setPassword("");
          setDone(true);
          navigate("/login");
        })
        .catch((err) => {
          // wrongRegister("The Email already exists");
        });
    } else {
      // wrongRegister("The password should be the same in the repeat password");
    }
  };
  return (
    <div className="register">
      <div className="group">
        <div className="regImg">{/* <img src={logo} alt="logo" /> */}</div>
        <form onSubmit={createUser}>
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
            autoComplete="off"
            value={userName}
            type="text"
            placeholder="UserName"
          />

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
            required
            autoComplete="off"
            value={password}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
            required
            autoComplete="off"
            value={repeatPassword}
            type="Password"
            placeholder="Confirm"
          />
          <button>Register</button>
          <span
            style={{
              color: `${done ? "#24dc3a" : "#dc2424"}`,
              textShadow: `1px 0 1px  ${done ? "#24dc3a" : "#dc2424"}`,
            }}
          ></span>
        </form>
      </div>
    </div>
  );
};

export default Register;
//