import React from "react";
import { Form } from "react-bootstrap";



const DeleteVideo = () => {
  return (
    <div>
      <Form.Select size="sm">
        <option>Option</option>
        <option value={1}>Delete</option>
        <option value={2}>update</option>
      </Form.Select>
    </div>
  );
};

export default DeleteVideo;
