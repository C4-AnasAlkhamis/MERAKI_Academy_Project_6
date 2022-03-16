import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { logIn, setUserName, setUserImage } from "../../reducer/login/index";
import { setChannel } from "../../reducer/video/index";
import Alerts from "../alert/Alert";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  // ----------------------------------------
  const getChannel = async (token) => {
    try {
      const result = await axios.get(
        "http://localhost:5000/channel/my-channel",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.result[0]) {
        localStorage.setItem("channel", JSON.stringify(result.data.result[0]));
        dispatch(setChannel(result.data.result[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ----------------------------------------

  const verifyUser = async () => {
    await axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        dispatch(setUserName(result.data.name));
        dispatch(
          setUserImage(
            result.data.image != null
              ? result.data.image
              : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          )
        );
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user_name", result.data.name);
        localStorage.setItem(
          "image",
          result.data.image != null
            ? result.data.image
            : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        );
        getChannel(result.data.token);
        setEmail("");
        setPassword("");
        dispatch(logIn(result.data.token));
        navigate(`/`);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        message && setAlert(true);
      });
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  return (
    <>
      {alert ? <Alerts message={message} /> : null}
      <div className="center">
        <Form
          style={{
            width: "80%",
            margin: "10% auto",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
              autoComplete="off"
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
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
          </Form.Group>
          <Button onClick={verifyUser} variant="outline-primary">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
