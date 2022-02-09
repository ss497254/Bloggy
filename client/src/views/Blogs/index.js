import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  // Box,
  Heading,
  VStack,
} from "@chakra-ui/react";
import axios from "../../API";
import Blog from "../../components/Post";
import LoadingBlog from "../../components/Loading/LoadingBlog";

const Blogs = () => {
  const toast = useToast();
  const [blogs, setblogs] = useState([]);
  const Topic = useLocation().pathname.split("/")[1];

  useEffect(() => {
    axios
      .get("blogs/", { Topic })
      .then((res) => {
        setblogs(res.data);
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Unable to Load Blogs.",
          description: "Sorry, Server is unavailable",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setblogs([...demo]);
      });
  }, []);

  return (
    <>
      {blogs.length == 0 ? (
        <LoadingBlog />
      ) : (
        <VStack
          width={{ base: "100%", lg: "75%" }}
          p={{ base: "8", lg: "12" }}
          m="0"
          spacing={{ base: "8", lg: "12" }}
          mb="5%"
          minH="100vh"
        >
          <Heading as="h1" mb="3%" textAlign="center">
            {Topic ? "Top Blogs" : "Latest Blogs"}
          </Heading>
          {blogs.map((blog, index) => (
            <Blog data={blog} key={index} />
          ))}
        </VStack>
      )}
    </>
  );
};

let demo = [
  {
    to: "/blogs/demo",
    Heading: "Hello my name is saurabh singh. How are you?",
    SubHeading: "This is a demo blog",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting\
      industry. Lorem Ipsum has been the industry's standard dummy text\
      ever since the 1500s, when an unknown printer took a galley of\
      type and scrambled it to make a type specimen book. Lorem Ipsum is\
      simply dummy",
    BannerURL:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=600&q=80",
    Author: "Saurabh Singh",
    Tags: ["Engineering", "Demo", "learn"],
  },
];
export default Blogs;
