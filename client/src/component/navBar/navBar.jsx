import { Link } from "react-router-dom";
import "./navbar.css";
// import { logOut } from "../../reducer/login/index";
// import { useSelector, useDispatch } from "react-redux";
const NavBar = () => {
  // const dispatch = useDispatch();
  // const { isLoggedIn, token } = useSelector((state) => {
  //   return {
  //     isLoggedIn: state.loginReducer.isLoggedIn,
  //     token: state.loginReducer.token,
  //   };
  // });

  return (
    <>
      <div className="navbar">
        <div className="links">
          <>
            <ul>
              <li>
                <Link to="/home">HOME</Link>
              </li>
              <li>
                <Link to="/register">REGISTER</Link>
              </li>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            </ul>
          </>
        </div>
      </div>
    </>
  );
};

export default NavBar;
