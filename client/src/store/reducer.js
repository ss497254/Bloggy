import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  blog: blogReducer,
});

export default reducer;
