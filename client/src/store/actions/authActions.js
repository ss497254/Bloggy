import axios, { setAuthToken } from "../../API";
import * as actionTypes from "./types";

export const SignInUser = (userData, toast) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post("sign-in", userData)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      dispatch(setUser(user));
      dispatch(setLoading(false));
      toast({
        title: "Sign in Succefully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(setLoading(false));
      toast({
        title: "Failed to Sign in",
        description: "Please Try Again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};

export const SignUpUser = (userData, toast) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post("/sign-up", userData)
    .then((res) => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      dispatch(setUser(user));
      dispatch(setLoading(false));
      toast({
        title: "Sign up Succefully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(setLoading(false));
      toast({
        title: "Failed to Sign up",
        description: "Please Try Again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};

export const fetchUser = (token) => (dispatch) => {
  axios
    .post(
      "/fetch-user",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => {
      setAuthToken(token);
      dispatch(setUser(res.data.user));
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  setAuthToken(false);
  dispatch(setUser({}));
};

export const setUser = (data) => {
  return {
    type: actionTypes.SET_USER,
    payload: data,
  };
};

export const setLoading = (value) => {
  return {
    type: actionTypes.SET_LOADING,
    payload: value,
  };
};
