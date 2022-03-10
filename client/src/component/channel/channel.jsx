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
  Form,
  Card,
  Button,
} from "react-bootstrap";

const Channel = () => {
  const [image, setImage] = useState();
  const [percentage, setPercentage] = useState(0);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos, name } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      name: state.loginReducer.name,
    };
  });
  const updateUser = async (image) => {
    //   POST -> /user
    await axios
      .put(
        "http://localhost:5000/register",
        {
          user_name: userName.toLowerCase(),
          email: email.toLowerCase(),
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setUserName("");
        setEmail("");
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // -------------------------------------------------

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!image) {
      updateUser();
    } else {
      const option = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let PercentageMath = Math.floor((loaded * 100) / total);
          setPercentage(PercentageMath);
          console.log(PercentageMath);
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
          updateUser(res.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <Navbar.Brand>
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Update Profile
              </Offcanvas.Title>
            </Offcanvas.Header>
            {/* ---------------- */}
            <Form
              style={{
                width: "80%",
                margin: "2vh auto",
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    value={userName}
                    type="text"
                    placeholder="User Name"
                  />
                </Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  required
                  autoComplete="off"
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Drag & Drop</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  type="file"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button onClick={uploadImage} variant="outline-primary">
                Submit
              </Button>
            </Form>
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
