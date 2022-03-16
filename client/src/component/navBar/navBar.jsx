import axios from "axios";
import { logOut } from "../../reducer/login/index";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { setVideos } from "../../reducer/video/index";
import codeUp from "./codeUp.ico";
const NavBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, name, img } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      name: state.loginReducer.name,
      img: state.loginReducer.img,
    };
  });
  const search = async (filter) => {
    try {
      const result = await axios.post(`http://localhost:5000/video/search`, {
        value: filter ? filter : value,
      });
      console.log(result);
      dispatch(setVideos(result.data.result));
    } catch (error) {
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              alt={codeUp}
              src={codeUp}
              style={{ margin: " 0 .5rem" }}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Code Up
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              {isLoggedIn ? <Nav.Link href="/channel">Channel</Nav.Link> : null}
              <NavDropdown title="Option" id="navbarScrollingDropdown">
                {!isLoggedIn ? (
                  <>
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="/register">
                      Register
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logOut());
                      localStorage.clear();
                    }}
                    href="/"
                  >
                    Logout
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              {isLoggedIn ? (
                <Container>
                  <Navbar.Brand>
                    <img
                      alt={name}
                      src={
                        img
                          ? img
                          : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                      }
                      style={{ margin: " 0 .5rem", borderRadius: "50%" }}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />
                    {name}
                  </Navbar.Brand>
                </Container>
              ) : null}
            </Nav>

            <Nav style={{ marginRight: "1rem" }}>
              <NavDropdown title="Filter" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={(e) => {
                    search("%JavaScript%");
                  }}
                >
                  javascript
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={(e) => {
                    search("%Node%");
                  }}
                >
                  Node js
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={(e) => {
                    search("%Css%");
                  }}
                >
                  Css
                </NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={(e) => {
                    search("%HTML%");
                  }}
                >
                  HTML
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="position-relative d-flex" right="20px">
              <FormControl
                onChange={(e) => {
                  setValue(`%${e.target.value}%`);
                }}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button
                onClick={() => {
                  search();
                }}
                variant="outline-dark"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
