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
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import { setVideos } from "../../reducer/video/index";
const NavBar = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { isLoggedIn, name, img } = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      name: state.loginReducer.name,
      img: state.loginReducer.img,
    };
  });
  const search = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/video/search`, {
        value,
      });
      console.log(result);
      dispatch(setVideos(result.data.result));
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">How To</Navbar.Brand>
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
            {showFilter ? (
              <Nav style={{ marginRight: "1rem" }}>
                <NavDropdown title="Filter" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    last hour
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item href="#action/3.2">
                    this day
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item href="#action/3.3">
                    this month
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : null}
            <Form className="d-flex">
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
                  setShowFilter(true);
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
