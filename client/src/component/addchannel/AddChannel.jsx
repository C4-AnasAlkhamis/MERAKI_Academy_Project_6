import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { setChannel } from "../../reducer/video/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddChannel = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const { token } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const createNewChannel = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `https://backend6khamis.herokuapp.com/channel`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem(
        "channel",
        JSON.stringify({ title: title, id: result.data.result.insertId })
      );
      dispatch(setChannel({ title: title, id: result.data.result.insertId }));
      setTitle("");
      navigate("/channel");
    } catch (err) {
    if (err.response.statusText === "Forbidden") {
        navigate("/login");
      }
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
