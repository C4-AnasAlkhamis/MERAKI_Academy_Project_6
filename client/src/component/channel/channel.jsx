import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./channel.css";
import YouTube from "react-youtube";
import { useSelector, useDispatch } from "react-redux";
import { setVideos } from "../../reducer/video/index";
import { setUserName, setUserImage } from "../../reducer/login/index";
import { format } from "timeago.js";

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
import DeleteVideos from "../deleteVideo/DeleteVideo";

const Channel = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [percentage, setPercentage] = useState(0);
  const [newUserName, setNewUserName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos, name, img, channel } = useSelector(
    (state) => {
      return {
        videos: state.videosReducer.videos,
        channel: state.videosReducer.channel,
        isLoggedIn: state.loginReducer.isLoggedIn,
        token: state.loginReducer.token,
        name: state.loginReducer.name,
        img: state.loginReducer.img,
      };
    }
  );
  const updateVideos = async (image) => {
    await axios
      .put(
        "http://localhost:5000/video/all",
        {
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        getAllVideoByChannelId();
      })
      .catch((err) => {});
  };
  const updateUser = async (image) => {
    //   POST -> /user
    await axios
      .put(
        "http://localhost:5000/register",
        {
          user_name: newUserName.toLowerCase(),
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
        if (newUserName) {
          localStorage.setItem("user_name", newUserName);
          dispatch(setUserName(newUserName));
        }
        if (image) {
          localStorage.setItem("image", image);
          dispatch(setUserImage(image));
          updateVideos(image);
        }

        setUserName("");
        setEmail("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // -------------------------------------------------

  const uploadImage = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      updateUser();
    } else {
      const option = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let PercentageMath = Math.floor((loaded * 100) / total);
          setPercentage(PercentageMath);
        },
      };
      const formData = new FormData();

      formData.append("file", imageUrl);
      formData.append("upload_preset", "fzupywns");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/how-to-tube/upload`,
          formData,
          option
        )
        .then((res) => {
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
      if (result.data.result) {
        dispatch(setVideos(result.data.result));
      }
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
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/channel")}
          >
            {channel && channel.title}
          </Navbar.Brand>
          <Container>
            {channel ? (
              <>
                <Nav
                  className=" my-2 my-lg-0"
                  style={{ maxHeight: "100px", margin: "0 1rem" }}
                >
                  <Nav.Link href="/add-video">Update Video</Nav.Link>
                </Nav>
                <Nav
                  className="my-2 my-lg-0"
                  style={{ maxHeight: "100px", margin: "0 1rem" }}
                >
                  <Nav.Link href="/add-list">Add List</Nav.Link>
                </Nav>
              </>
            ) : null}
            {!channel ? (
              <Nav
                className="my-2 my-lg-0"
                style={{ maxHeight: "100px", margin: "0 1rem" }}
              >
                <Nav.Link href="/add-channel">Create Channel</Nav.Link>
              </Nav>
            ) : null}
          </Container>
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
                      setNewUserName(e.target.value);
                    }}
                    disabled={percentage ? true : false}
                    autoComplete="off"
                    value={newUserName}
                    type="text"
                    placeholder="User Name"
                  />
                </Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={percentage ? true : false}
                  value={email}
                  autoComplete="off"
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Drag & Drop Image</Form.Label>
                <Form.Control
                  disabled={percentage ? true : false}
                  onChange={(e) => {
                    setImageUrl(e.target.files[0]);
                  }}
                  type="file"
                />
              </Form.Group>

              <Button
                disabled={percentage ? true : false}
                onClick={uploadImage}
                variant="outline-primary"
              >
                Submit
              </Button>
              <div className="d-grid gap-2 d-md-block">
                <span>{percentage ? `Uploading ${percentage} %` : null}</span>
              </div>
            </Form>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/* ---------------------------------- */}
      <Row style={{ padding: "3rem 1rem" }} xs={1} md={3} className="g-4">
        {videos.map((_, idx) => (
          <Col key={idx}>
            <Card>
              <DeleteVideos id={_.id} />
              <Card.Body style={{ height: "300px" }}>
                {_.video.includes("youtube") ? (
                  <YouTube
                    videoId={_.video.match(/(?<==)\w*/)[0]}
                    onPlay={(e) => {
                      e.target.mute();
                    }}
                    opts={opts}
                    onReady={videoOnReady}
                  />
                ) : (
                  <div style={{ height: "300", width: "100%" }}>
                    <Ratio aspectRatio="16x9">
                      <iframe src={_.video} frameBorder="0"></iframe>
                    </Ratio>
                  </div>
                )}

                <Card.Body
                  style={{
                    paddingLeft: "0",
                  }}
                >
                  <img
                    style={{
                      marginRight: ".5rem",
                      borderRadius: "50%",
                    }}
                    alt={_.user_name}
                    src={
                      _.image
                        ? _.image
                        : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                    }
                    width="30"
                    height="30"
                  />
                  {_.user_name}
                </Card.Body>
              </Card.Body>
              <Card.Body style={{ height: "200px" }}>
                <Card.Title>{_.title}</Card.Title>
                <Card.Text>{_.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  {format(_.dt.match(/\W*\S*(?=T)/)[0])}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Channel;
