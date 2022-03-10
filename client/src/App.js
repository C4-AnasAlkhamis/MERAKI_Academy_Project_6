import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import NavBar from "./component/navBar/navBar";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
import Channel from "./component/channel/channel";
import AddVideo from "./component/addVedio/AddVideo";
import AddList from "./component/addList/AddList";
import AddChannel from "./component/addchannel/AddChannel";
import Video from "./component/video/Video";

import { useSelector } from "react-redux";
import { useEffect } from "react";
const App = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-video" element={<AddVideo />} />
        <Route path="/add-channel" element={<AddChannel />} />
        <Route path="/add-list" element={<AddList />} />
        <Route path="/video" element={<Video />} />

        <Route path="/channel" element={<Channel />} />
      </Routes>
    </div>
  );
};

export default App;
