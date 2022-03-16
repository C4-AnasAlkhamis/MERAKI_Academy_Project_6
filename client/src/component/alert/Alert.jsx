import React, { useEffect, useState } from "react";
import { Alert, Heading } from "react-bootstrap";

const Alerts = ({ message }) => {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <div>
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{message}</p>
          </Alert>
        </div>
      ) : null}
    </>
  );
};

export default Alerts;
