import axios from "../../API";
import * as actionTypes from "./types";
import { setLoading, setUser } from "./authActions";

export const updateUserCred = (userData) => (dispatch) => {
  console.log(userData);
  dispatch(setLoading(true));
  axios
    .patch("/update-usercred", userData)
    .then((res) => {
      const { user } = res.data;
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(setLoading(false));
    });
};

export const updateUserInfo = (userData) => (dispatch) => {
  console.log(userData);
  dispatch(setLoading(true));
  axios
    .patch("/update-userinfo", userData)
    .then((res) => {
      const { user } = res.data;
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log("err", err);
      dispatch(setLoading(false));
    });
};

export const SubmitBlog = (blogData, callback) => (dispatch) => {
  console.log(blogData);
  axios
    .post("/blogs", blogData)
    .then((res) => {
      dispatch(SubmitStatus({ verdict: "Submitted" }));
      callback(res.data.id);
    })
    .catch((err) => {
      dispatch(SubmitStatus({ verdict: "Failed" }));
      console.log("err", err);
      callback(undefined, err);
    });
};

export const EditBlog = (blogData, callback) => (dispatch) => {
  console.log(blogData);
  axios
    .post("/blogs", blogData)
    .then((res) => {
      console.log(res.data);
      callback(res.data.id);
    })
    .catch((err) => {
      console.log("err", err);
      callback(undefined, err);
    });
};

export const SubmitStatus = (data) => {
  return {
    type: actionTypes.SET_BLOG_SUBMIT_STATUS,
    payload: data,
  };
};
