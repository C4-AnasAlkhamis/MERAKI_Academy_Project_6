import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setVideos } from "../../reducer/video/index";

const DeleteVideo = ({ id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const deleteVideo = async () => {
    try {
      const result = axios.put(`http://localhost:5000/video/delete/${id}`, {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form.Select
        onChange={(e) => {
          if (e.target.value === "1") {
            handleShow();
          }
        }}
        size="sm"
      >
        <option>Option</option>
        <option value="1">Delete</option>

        <option value="2">update</option>
      </Form.Select>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteVideo;
