import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./component/navBar/navBar";
import Login from "./component/login/Login";
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
      </Routes>
    </div>
  );
};

export default App;
