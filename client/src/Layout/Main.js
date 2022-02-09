import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Main(props) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}

export default Main;
