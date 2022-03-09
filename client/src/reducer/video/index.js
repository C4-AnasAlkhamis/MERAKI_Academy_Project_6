const initialState = {
  videos: [],
  id: null,
};
// =======================  //

const videosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_VIDEOS":
      return { ...state, videos: payload };

    case "SET_ID":
      return { ...state, id: payload };

    case "ADD_VIDEO":
      return { ...state, videos: [...state.videos, payload] };

    case "UPDATE_VIDEO":
      return {
        ...state,
        items: state.videos.filter((video) => {
          return video.id !== payload;
        }),
      };

    case "DELETE_VIDEO":
      return {
        ...state,
        items: state.videos.map((video) => {
          if (video.id === payload.id) {
            return payload;
          }
          return video;
        }),
      };

    default:
      return state;
  }
};

export default videosReducer;

// =======================  //

export const setVideos = (videos) => {
  return { type: "SET_VIDEOS", payload: videos };
};
// =======================  //

export const setId = (id) => {
  return { type: "SET_ID", payload: id };
};
// =======================  //

export const addVideo = (newVideo) => {
  return { type: "ADD_VIDEO", payload: newVideo };
};
// =======================  //

export const updateVideo = (newVideo) => {
  return { type: "UPDATE_VIDEO", payload: newVideo };
};
// =======================  //

export const deleteVideo = (id) => {
  return { type: "DELETE_VIDEO", payload: id };
};
