import { Form, Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateVideo } from "../../reducer/video/index";
const UpdateVideo = ({ obj, setValue }) => {
  const [list_id, setList_id] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setValue("0");
  };

  const dispatch = useDispatch();
  const { token, lists } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      lists: state.listsReducer.lists,
    };
  });
  const updateVideoById = async () => {
    try {
      await axios.put(
        `http://localhost:5000/video/${obj.id}`,
        { title, description, list_id },
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
          list_id: list_id ? list_id : obj.list_id,
          title: title ? title : obj.title,
          description: description ? description : obj.description,
          video: obj.video,
          image: obj.image,
          dt: obj.dt,
          is_deleted: obj.is_deleted,
        })
      );
      setTitle("");
      setDescription("");
      handleClose();
    } catch (error) {}
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true}>
      <Modal.Header closeButton>
        <Modal.Title>Update on video information</Modal.Title>
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
        <Form.Group className="mb-3">
          <Form.Label>Add video to a list</Form.Label>
          <Form.Select
            onChange={(e) => {
              setList_id(e.target.value);
            }}
          >
            <option>pick a list</option>
            {lists ? (
              lists.map((list) => {
                return (
                  <option key={list.id} value={list.id}>
                    {list.list}
                  </option>
                );
              })
            ) : (
              <option>No list</option>
            )}
          </Form.Select>
        </Form.Group>
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
