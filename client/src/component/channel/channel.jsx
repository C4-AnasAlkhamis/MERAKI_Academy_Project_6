import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./channel.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";
import { setVideos, setId } from "../../reducer/video/index";
import {
  Navbar,
  Row,
  Col,
  Ratio,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,
  Form,
  Card,
} from "react-bootstrap";

const Channel = () => {
  const [image, setImage] = useState();
  const [percentage, setPercentage] = useState(0);
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  // -------------------------------------------------

  const uploadImage = async (image) => {
    const option = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        let PercentageMath = Math.floor((loaded * 100) / total);
        setPercentage(PercentageMath);
      },
    };
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "fzupywns");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/how-to-tube/upload`,
        formData,
        option
      )
      .then((res) => {
        console.log(res);
        setImage(res.data.secure_url);
        setPercentage(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // -------------------------------------------------
  const getAllVideoByChannelId = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/channel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      dispatch(setVideos(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  const opts = {
    height: "220",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  useEffect(() => {
    getAllVideoByChannelId();
  }, []);
  return (
    <>
      <br />

      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#">channel name</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Drag & Drop</Form.Label>
                  <Form.Control onChange={(e) => {}} type="file" />
                </Form.Group>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* ---------------------------------- */}
      <Row style={{ padding: "3rem 1rem" }} xs={1} md={3} className="g-4">
        {videos.map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body style={{ height: "300px" }}>
                {_.video.includes("youtube") ? (
                  <YouTube
                    videoId="KsaXLHOrqPI"
                    onPlay={(e) => {
                      e.target.mute();
                    }}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                ) : (
                  <div style={{ height: "300", width: "100%" }}>
                    <Ratio aspectRatio="16x9">
                      <iframe src={_.video} frameborder="0"></iframe>
                    </Ratio>
                  </div>
                )}

                {/* <Card.Img
                variant="top"
                width="200px"
                height="200px"
                src={_.video}
              /> */}
              </Card.Body>
              <Card.Body style={{ height: "200px" }}>
                <Card.Title>{_.title}</Card.Title>
                <Card.Text>{_.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Channel;
