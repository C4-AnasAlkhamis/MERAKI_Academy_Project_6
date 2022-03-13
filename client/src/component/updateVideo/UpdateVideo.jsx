import { Form, Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

const UpdateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={""} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateVideo;
