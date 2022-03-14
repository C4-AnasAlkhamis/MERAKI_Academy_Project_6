import { Form, Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateVideo } from "../../reducer/video/index";
const UpdateVideo = ({ obj }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
    };
  });
  const updateVideoById = async () => {
    console.log(obj);
    try {
      const result = await axios.put(
        `http://localhost:5000/video/${obj.id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        updateVideo({
          id: obj.id,
          user_id: obj.user_id,
          user_name: obj.user_name,
          channel_id: obj.channel_id,
          list_id: obj.list_id,
          title: title ? title : obj.title,
          description: description ? description : obj.description,
          video: obj.video,
          image: obj.image,
          dt: obj.dt,
          is_deleted: obj.is_deleted,
        })
      );
      console.log(result);
      setTitle("");
      setDescription("");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Enter title"
              value={title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              type="text"
              placeholder="Enter Description"
              value={description}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={updateVideoById} variant="primary">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateVideo;
