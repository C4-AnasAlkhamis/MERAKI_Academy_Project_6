import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./component/navBar/navBar";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
import Profile from "./component/profile/Profile";
import AddVideo from "./component/addVedio/AddVideo";
import AddList from "./component/addList/AddList";
import AddChannel from "./component/addchannel/AddChannel";

import { useSelector } from "react-redux";
const App = () => {
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
        <Route path="/home" element={<Home />} />
        <Route path="/add-video" element={<AddVideo />} />
        <Route path="/add-channel" element={<AddChannel />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
