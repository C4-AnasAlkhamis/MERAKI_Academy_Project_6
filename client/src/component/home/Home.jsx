import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import YouTube from "react-youtube";
import { setVideos } from "../../reducer/video/index";
import { useSelector, useDispatch } from "react-redux";
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
    height: "390",
    width: "640",
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
      const result = await axios.get(`http://localhost:5000/video`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
      dispatch(setVideos(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };
  const getFilteredItems = async (value) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/video/search`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        // setIsFilter(true);
        // dispatch(setItems(res.data.items));
        // setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        // return setMessage(error.response.data.message);
      }
      // setMessage("Error happened while Get Data, please try again");
    }
  };
  useEffect(() => {
    getAllVideos();
  }, []);
  // setSearch(`%${e.target.value}%`);

  return (
    <>
      <div className="container">
        <div className="row">
          {videos.map((video, index) => {
            console.log(video);
            return (
              <div key={index} className="card col" style={{ width: "18rem" }}>
                <img src={video.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{video.user_name}</li>
                  <li className="list-group-item">{video.channel_id}</li>
                  <li className="list-group-item">{video.list_id}</li>
                </ul>
                <div className="card-body">
                  <a href="#" className="card-link">
                    Card link
                  </a>
                  <a href="#" className="card-link">
                    Another link
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
