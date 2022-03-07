import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./component/navBar/navBar";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
// import { useSelector } from "react-redux";
const App = () => {
  // const { token, isLoggedIn } = useSelector((state) => {
  //   return {
  //     token: state.loginReducer.token,
  //     isLoggedIn: state.loginReducer.isLoggedIn,
  //   };
  // });
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="home" element={<Home/>} />
      </Routes>
    </div>
  );
};

export default App;
