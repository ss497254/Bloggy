import { connect } from "react-redux";
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/themeMain.js";
import Error from "./components/Error";
import Loading from "./components/Loading";
import NavigationScroll from "./Layout/NavigationScroll";
import { fetchUser } from "./store/actions/authActions";
import RouteGuard from "./utils/routeGuard";

const Main = lazy(() => import("./Layout/Main"));
const About = lazy(() => import("./views/About"));
const Blogs = lazy(() => import("./views/Blogs"));
const Contact = lazy(() => import("./views/Contact"));
const Profile = lazy(() => import("./views/Profile"));
const CreateBlog = lazy(() => import("./views/Create-Blog"));
const BlogDetails = lazy(() => import("./views/BlogDetails"));
const SignIn = lazy(() => import("./views/Auth/SignIn"));
const SignUp = lazy(() => import("./views/Auth/SignUp"));
const ForgetPassword = lazy(() => import("./views/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./views/Auth/ResetPassword"));

const App = ({ fetchUser }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, []);

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <NavigationScroll>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <Main>
                  <Blogs />
                </Main>
              }
            />
            <Route
              path="/top"
              element={
                <Main>
                  <Blogs />
                </Main>
              }
            />
            <Route
              path="/create-blog"
              element={
                <Main>
                  <CreateBlog />
                </Main>
              }
            />
            <Route
              path="/about"
              element={
                <Main>
                  <About />
                </Main>
              }
            />
            <Route
              path="/contact"
              element={
                <Main>
                  <Contact />
                </Main>
              }
            />
            <Route
              path="/about"
              element={
                <Main>
                  <About />
                </Main>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <Main>
                  <BlogDetails />
                </Main>
              }
            />
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Main>
                    <Profile />
                  </Main>
                </RouteGuard>
              }
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </NavigationScroll>
    </ChakraProvider>
  );
};

export default connect(null, { fetchUser })(App);
