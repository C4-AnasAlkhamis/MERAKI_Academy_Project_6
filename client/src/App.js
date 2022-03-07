import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./component/navBar/navBar";
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
      <Routes></Routes>
    </div>
  );
};

export default App;
