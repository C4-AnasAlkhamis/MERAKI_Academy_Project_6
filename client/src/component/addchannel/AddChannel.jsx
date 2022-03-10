import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addChannel.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

const AddChannel = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const createNewChannel = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `http://localhost:5000/channel`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      {" "}
      <Form
        className="center"
        style={{ height: "auto" }}
        onSubmit={createNewChannel}
      >
        <div style={{ width: "80%", margin: "2rem auto" }}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Create new channel</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              autoComplete="off"
              value={title}
              type="text"
              placeholder="channel Name"
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

export default AddChannel;
