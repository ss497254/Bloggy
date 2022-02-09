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

export const SubmitBlog = (blogData, toast, callback) => (dispatch) => {
  console.log(blogData);
  axios
    .post("/blogs", blogData)
    .then((res) => {
      callback(res.data.blog.id);
      toast({
        title: "Submitted Succefully",
        description: "Blog has been submitted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      console.log("err", err);
      callback(undefined, err);
      toast({
        title: "Failed to Submit",
        description: "Unable to Submit. Please Try Again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
