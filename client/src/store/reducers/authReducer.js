import * as actionTypes from "../actions/types";
export const initialState = {
  authenticated: false,
  user: {},
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: !!action.payload.id,
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        authenticated: true,
      };
    case actionTypes.CLEAR_AUTH:
      return {
        ...state,
        authenticated: false,
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
