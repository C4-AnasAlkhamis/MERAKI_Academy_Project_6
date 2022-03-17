const initialState = {
  rates: [],
};
// =======================  //

const ratesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_RATEs":
      return { ...state, rates: payload };

    default:
      return state;
  }
};

export default ratesReducer;

// =======================  //

export const setRates = (rates) => {
  return { type: "SET_RATEs", payload: rates };
};
