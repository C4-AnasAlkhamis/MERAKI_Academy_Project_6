import axios from "axios";
import React, { useState } from "react";
import "./addVideo.css";
import { useSelector } from "react-redux";

const AddVideo = () => {
  const [channel_id, setChannel_id] = useState(1);
  const [file, setFile] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [select, setSelect] = useState("1");
  const [videoUrl, setVideoUrl] = useState("");
  const [percentage, setPercentage] = useState(0);
  const { token, user_name, image } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
      user_name: state.loginReducer.name,
      image: state.loginReducer.image,
    };
  });
  // ------------------------------
  const uploadVideo = async (video) => {
    try {
      await axios.post(
        `http://localhost:5000/video`,
        { user_name, channel_id, title, description, video, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setPercentage(0);
    } catch (error) {
      console.log(error.response);
    }
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
          console.log(res);
          uploadVideo(res.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
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
            onChange={(e) => setSelect(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="1">YouTube Link</option>
            <option value="2">Upload Video</option>
          </select>
          {select === "1" ? (
            <input
              onChange={(e) => {
                setVideoUrl(e.target.value);
              }}
              // required
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
                onChange={(e) => {
                  setVideoUrl(e.target.files[0]);
                  setFile(!file);
                }}
                className="form-control"
                required
                autoComplete="off"
                type="file"
                placeholder="video"
                name="video"
              />
            </>
          ) : null}

          <div className="d-grid gap-2 d-md-block">
            <button type="submit" className="btn btn-lg btn-primary">
              upload
            </button>
          </div>
          <div className="d-grid gap-2 d-md-block">
            <span>{percentage ? `Uploading ${percentage} %` : null}</span>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVideo;
