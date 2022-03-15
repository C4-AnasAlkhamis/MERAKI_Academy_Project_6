import axios from "axios";
import React, { useState } from "react";
import "./addVideo.css";
import { useSelector } from "react-redux";

import { Spinner, Button, Alert } from "react-bootstrap";
const AddVideo = () => {
  const [file, setFile] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [select, setSelect] = useState("1");
  const [videoUrl, setVideoUrl] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [show, setShow] = useState(false);
  const { token, user_name, image, channel } = useSelector((state) => {
    return {
      channel: state.videosReducer.channel,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_name: state.loginReducer.name,
      image: state.loginReducer.img,
    };
  });
  // ------------------------------
  const uploadVideo = async (video) => {
    try {
      await axios.post(
        `http://localhost:5000/video`,
        { user_name, channel_id: channel.id, title, description, video, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShow(true);

      setTitle("");
      setDescription("");
      setVideoUrl("");
      setPercentage(0);
    } catch (err) {}
  };
  // ------------------------------

  const uploadCloud = async (e) => {
    e.preventDefault();
    if (!file) {
      uploadVideo(videoUrl);
    } else {
      const option = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let PercentageMath = Math.floor((loaded * 100) / total);
          setPercentage(PercentageMath);
        },
      };
      const formData = new FormData();

      formData.append("file", videoUrl);
      formData.append("upload_preset", "fzupywns");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/how-to-tube/upload`,
          formData,
          option
        )
        .then((res) => {
          uploadVideo(res.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Alert
        style={{
          width: "80%",
          margin: "0 auto",
        }}
        show={show}
        variant="success"
      >
        <Alert.Heading>Video uploaded successfully!</Alert.Heading>

        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
      <div
        style={{
          width: "80%",
        }}
        className="input-group mb-3 center"
      >
        <form
          style={{
            width: "80%",
            margin: "10% auto",
          }}
          className="row g-3"
          onSubmit={(e) => {
            uploadCloud(e);
          }}
        >
          <input
            disabled={percentage ? true : false}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
            required
            autoComplete="off"
            value={title}
            type="text"
            placeholder="title"
          />

          <textarea
            disabled={percentage ? true : false}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="form-control"
            required
            autoComplete="off"
            value={description}
            type="text"
            placeholder="description"
          />
          <select
            disabled={percentage ? true : false}
            onChange={(e) => setSelect(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="1">YouTube Link</option>
            <option value="2">Upload Video</option>
          </select>
          {select === "1" ? (
            <input
              disabled={percentage ? true : false}
              onChange={(e) => {
                setVideoUrl(e.target.value);
              }}
              required
              className="form-control"
              autoComplete="off"
              value={videoUrl}
              type="text"
              placeholder="youtube link"
            />
          ) : null}

          {select === "2" ? (
            <>
              <label className="form-label" htmlFor="image">
                Drag & Drop video
              </label>
              <input
                required
                disabled={percentage ? true : false}
                onChange={(e) => {
                  setVideoUrl(e.target.files[0]);
                  setFile(!file);
                }}
                className="form-control"
                autoComplete="off"
                type="file"
                placeholder="video"
                name="video"
              />
            </>
          ) : null}

          <div className="d-grid gap-2 d-md-block">
            <button
              disabled={percentage ? true : false}
              type="submit"
              className="btn btn-lg btn-primary"
            >
              upload
            </button>
          </div>
          <div className="d-grid gap-2 d-md-block">
            {percentage ? (
              <Button variant="light" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span>{`Uploading  ${percentage} %`}</span>
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
