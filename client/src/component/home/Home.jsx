import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import YouTube from "react-youtube";
import { setVideos } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Ratio } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, videos } = useSelector((state) => {
    return {
      videos: state.videosReducer.videos,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoOnReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const getAllVideos = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/video`);
      console.log(result);
      dispatch(setVideos(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <>
      <Row style={{ padding: "3rem 1rem" }} xs={1} md={3} className="g-4">
        {videos.map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Body style={{ height: "300px" }}>
                <YouTube
                  videoId="KsaXLHOrqPI"
                  onPlay={(e) => {
                    console.log(e);

                    e.target.mute();
                  }}
                  opts={opts}
                  onReady={videoOnReady}
                />
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

      {/* <div
            onClick={() => navigate("/login")}
            key={videos[0].id}
            className="video"
          >
            <YouTube
              videoId="KsaXLHOrqPI" // defaults -> null
              // id="KsaXLHOrqPI" // defaults -> null
              // className={string} // defaults -> null
              // containerClassName={string} // defaults -> ''
              // title={string} // defaults -> null
              onPlay={(e) => {
                console.log(e);
                // navigate("/login");
                e.target.mute();
                e.target.stopVideo();
              }} // defaults -> noop
              opts={opts} // defaults -> {}
              onReady={videoOnReady} // defaults -> noop

              // onPause={func} // defaults -> noop
              // onEnd={func} // defaults -> noop
              // onError={func} // defaults -> noop
              // onStateChange={func} // defaults -> noop
              // onPlaybackRateChange={func} // defaults -> noop
              // onPlaybackQualityChange={func} // defaults -> noop
            />

            <div className="video_info">
              <span>{videos[0].user_id}</span>
              <span>{videos[0].channel_id}</span>
              <span>{videos[0].title}</span>
              <span>{videos[0].description}</span>
            </div>
          </div> */}
    </>
  );
};

export default Home;
