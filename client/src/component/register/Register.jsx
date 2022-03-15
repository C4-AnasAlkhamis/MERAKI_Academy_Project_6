import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Alerts from "../alert/Alert";
const Register = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    //   POST -> /user

    if (repeatPassword === password) {
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
          navigate("/login");
        })
        .catch((err) => {
          if (err.response.status == 409) {
            setMessage("The Email already Exist");
            message && setAlert(true);
          } else {
            setMessage("server error");
            message && setAlert(true);
          }
        });
    } else {
      setMessage(
        "The field under password must have a matching field of confirm"
      );
      message && setAlert(true);
    }
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };
  return (
    <>
      {alert ? <Alerts alert={alert} message={message} /> : null}

      <div className="center">
        <Form
          style={{
            width: "80%",
            margin: "6vh auto",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
                autoComplete="off"
                value={userName}
                type="text"
                placeholder="User Name"
              />
            </Form.Group>
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm</Form.Label>
            <Form.Control
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              required
              autoComplete="off"
              value={repeatPassword}
              type="password"
              placeholder="Confirm"
            />
          </Form.Group>

          <Button onClick={createUser} variant="outline-primary">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
//
