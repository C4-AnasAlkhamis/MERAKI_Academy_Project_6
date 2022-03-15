import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteVideo } from "../../reducer/video/index";
import Alert from "../alert/Alert";

const DeleteVideos = ({ id, setValue }) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setValue("0");
  };
  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const deleteVideoById = async () => {
    try {
      await axios.put(
        `http://localhost:5000/video/delete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(deleteVideo(id));
      handleClose();
    } catch (err) {
      setMessage("Unauthorized to delete");
      message && setAlert(true);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
        {alert ? <Alert message={message} /> : null}

        <Modal.Header closeButton>
          <Modal.Title>Delete video</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this video</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={deleteVideoById} variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteVideos;
