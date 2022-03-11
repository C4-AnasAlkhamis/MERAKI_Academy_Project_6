import axios from "axios";
import React, { useState } from "react";

import "./addList.css";

import { useSelector } from "react-redux";

import { Form, Button } from "react-bootstrap";
const AddList = () => {
  const [list, setList] = useState("");
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
        `http://localhost:5000/list`,
        { list },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      setList("");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
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
