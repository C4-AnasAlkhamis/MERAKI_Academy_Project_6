const initialState = {
  rates: [],
};
// =======================  //

const ratesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_RATEs":
      return { ...state, rates: payload };

    case "UPDATE_RATE":
      return {
        ...state,
        rates: state.rates.map((rate) => {
          if (rate.video_id === payload.video_id) {
            return payload;
          }
          return rate;
        }),
      };

    default:
      return state;
  }
};

export default ratesReducer;

// =======================  //

export const setRates = (rates) => {
  return { type: "SET_RATEs", payload: rates };
};
// =======================  //

export const updateRate = (newRate) => {
  return { type: "UPDATE_RATE", payload: newRate };
};
