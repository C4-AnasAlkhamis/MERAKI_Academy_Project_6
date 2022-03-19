import axios from "axios";
import React, { useState } from "react";


import { useSelector } from "react-redux";

import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const AddList = () => {
  const navigate = useNavigate();

  const [list, setList] = useState("");
  const [show, setShow] = useState(false);

  const { token } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const createNewList = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `https://backend6khamis.herokuapp.com/list`,
        { list },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setList("");
      setShow(true);
    } catch (err) {
      if (err.response.statusText === "Forbidden") {
        navigate("/login");
      }
    }
  };
  return (
    <>
      <Alert
        style={{
          width: "60%",
          margin: "0 auto",
        }}
        show={show}
        variant="success"
      >
        <Alert.Heading>List Created successfully!</Alert.Heading>

        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
      <Form
        className="center"
        style={{ height: "auto" }}
        onSubmit={createNewList}
      >
        <div style={{ width: "80%", margin: "2rem auto" }}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Create new Video lists</Form.Label>
            <Form.Control
              onChange={(e) => {
                setList(e.target.value);
              }}
              required
              autoComplete="off"
              value={list}
              type="text"
              placeholder="list Name"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddList;
