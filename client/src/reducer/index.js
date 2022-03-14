/** @format */

import { combineReducers, createStore } from "redux";
import loginReducer from "./login/index";
import videosReducer from "./video/index";
import listsReducer from "./list/index";

const reducers = combineReducers({
  loginReducer,
  videosReducer,
  listsReducer,
});

const store = createStore(reducers);

export default store;
