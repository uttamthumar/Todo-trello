import { SET_DATA } from "../action.type";

// Reducer
const initialState = {
  data: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default todoReducer;
