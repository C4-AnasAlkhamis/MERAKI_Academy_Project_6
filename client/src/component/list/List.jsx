import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLists } from "../../reducer/list/index";
import { setVideos } from "../../reducer/video/index";
import { NavDropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, lists } = useSelector((state) => {
    return {
      lists: state.listsReducer.lists,
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  //   ========================= //
  //   this function gets all list by user id
  const getAllListByUserId = async () => {
    try {
      const result = await axios.get(`https://backend6khamis.herokuapp.com/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setLists(result.data.result));
    } catch (err) {
      if (err.response.statusText === "Forbidden") {
        navigate("/login");
      }
    }
  };

  //   ========================= //
  //   this function gets all videos by list id
  const getAllVideosByListId = async (id) => {
    try {
      const result = await axios.get(`https://backend6khamis.herokuapp.com/list/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setVideos(result.data.result));
    } catch (err) {
      if (err.response.statusText === "Forbidden") {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getAllListByUserId();
  }, []);
  return (
    <>
      <NavDropdown title="Video List" id="navbarScrollingDropdown">
        <>
          {lists.length > 0 ? (
            lists.map((list) => {
              return (
                <NavDropdown.Item
                  onClick={() => {
                    getAllVideosByListId(list.id);
                  }}
                  value={list.id}
                  key={list.id}
                >
                  {list.list}
                </NavDropdown.Item>
              );
            })
          ) : (
            <NavDropdown.Item>No Video List</NavDropdown.Item>
          )}
        </>
      </NavDropdown>
    </>
  );
};

export default List;
