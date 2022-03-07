/** @format */

import { combineReducers, createStore } from "redux";
import loginReducer from "./login/index";
import videosReducer from "./video/index";

const reducers = combineReducers({
  loginReducer,
  videosReducer,
});

const store = createStore(reducers);

export default store;
