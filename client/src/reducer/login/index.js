const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  isLoggedIn: !localStorage.getItem("token") ? false : true,
  name: localStorage.getItem("user_name"),
  img: localStorage.getItem("image"),
};
// =======================  //

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return { ...state, token: payload, isLoggedIn: true };
    case "LOG_OUT":
      return { ...state, token: null, isLoggedIn: false };
    case "SET_NAME":
      return { ...state, name: payload };
    case "SET_IMAGE":
      return { ...state, img: payload };
    default:
      return state;
  }
};
export default loginReducer;

// =======================  //
export const logIn = (token) => {
  return { type: "LOG_IN", payload: token };
};
// =======================  //
export const setUserName = (name) => {
  return { type: "SET_NAME", payload: name };
};
// =======================  //
export const setUserImage = (img) => {
  return { type: "SET_IMAGE", payload: img };
};
// =======================  //

export const logOut = () => {
  return { type: "LOG_OUT" };
};
