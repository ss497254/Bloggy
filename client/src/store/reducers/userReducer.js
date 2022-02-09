import * as actionTypes from "../actions/types";
export const initialState = {
  submitStatus: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BLOG_SUBMIT_STATUS:
      return {
        ...state,
        submitStatus: action.payload,
      };
    case actionTypes.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
