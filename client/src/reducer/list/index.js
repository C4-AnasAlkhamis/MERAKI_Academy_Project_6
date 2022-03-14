const initialState = {
  lists: [],
};
// =======================  //
const listsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_LISTS":
      return { ...state, lists: payload };

    case "ADD_LIST":
      return { ...state, lists: [...state.lists, payload] };

    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => {
          return list.id !== payload;
        }),
      };

    case "UPDATE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === payload.id) {
            return payload;
          }
          return list;
        }),
      };

    default:
      return state;
  }
};

export default listsReducer;

// =======================  //
export const setLists = (lists) => {
  return { type: "SET_LISTS", payload: lists };
};
// =======================  //

export const addList = (newList) => {
  return { type: "ADD_LIST", payload: newList };
};
// =======================  //

export const updateList = (newList) => {
  return { type: "DELETE_LIST", payload: newList };
};
// =======================  //

export const deleteList = (id) => {
  return { type: "UPDATE_LIST", payload: id };
};
