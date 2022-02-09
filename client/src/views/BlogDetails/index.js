import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  useColorModeValue,
  Text,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "../../API";

import LoadingBlog from "../../components/Loading/LoadingBlog";
// import { EditIcon } from "../../assets/Icons";

const PostTags = (props) => {
  return (
    <Flex>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} m={1} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </Flex>
  );
};

const BlogDetails = () => {
  const toast = useToast();
  const Blog_id = useLocation().pathname.split("/")[2];
  const [Blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get("/blogs/" + Blog_id)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
        setBlog(demo);
        toast({
          title: "Blog Not Found. 404",
          description: "Sorry, Current Blog is Deleted or Moved ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);

  return (
    <Box
      w="100%"
      h="100%"
      bgColor={useColorModeValue("white", "inherit")}
      minH="calc(100vh - 68px)"
    >
      {Blog == "" ? (
        <LoadingBlog />
      ) : (
        <VStack
          maxW="800px"
          mx="auto"
          color={useColorModeValue("gray.800", "gray.900")}
          px={{ base: 0, sm: "20px" }}
        >
          <Box
            w="100%"
            py={5}
            mb="2rem"
            mt={{ sm: "1rem", md: "1.5rem", lg: "2rem" }}
          >
            <Box py={6}>
              <Heading
                as="h1"
                size="xl"
                color={useColorModeValue("gray.900", "gray.200")}
              >
                {Blog?.Heading}
              </Heading>
              <Heading
                as="h2"
                fontWeight="normal"
                size="sm"
                my={2}
                fontStyle="italic"
                color={useColorModeValue("gray.800", "gray.300")}
              >
                {Blog?.SubHeading}
              </Heading>
              <PostTags tags={Blog?.Tags || []} />
              <Box my={6}>
                <Flex align="center">
                  <Flex align="center" justify="between">
                    <Box h={10} w={10} bgColor="#f2f2f2" rounded="full">
                      <Image
                        h={10}
                        w={10}
                        fit="cover"
                        rounded="full"
                        src="https://source.unsplash.com/random/48x48"
                        alt="Avatar"
                      />
                    </Box>
                    <Flex align="flex-start" direction="column">
                      <Link mx={3} fontWeight="bold" color="rgb(0, 127, 255)">
                        {Blog?.Author}
                      </Link>
                      <chakra.span
                        mx={3}
                        fontSize="sm"
                        color={useColorModeValue("gray.600", "gray.400")}
                      >
                        {new Date(Blog?.CreatedAt).toLocaleDateString()}
                      </chakra.span>
                    </Flex>
                  </Flex>

                  <Spacer />
                  {/* <Button colorScheme="blue" mr={3} onClick={Edit}>
                  <EditIcon />
                </Button> */}
                </Flex>
              </Box>
              <Image w="100%" src={Blog?.BannerURL} alt={Blog?.Tags} />
              <Text
                mt="4%"
                fontSize={{ base: "1.25rem", sm: "1rem" }}
                fontWeight="600"
                color={useColorModeValue("gray.800", "gray.100")}
              >
                {Blog?.Description}
              </Text>
              <Divider my={2} />
              <Box color={useColorModeValue("black", "white")}>
                {parse(Blog.Content)}
              </Box>
              {/* <Flex align="center" p={2}>
              <Button colorScheme="blue" variant="outline">
              </Button>
              <Spacer />
              <Flex align="center" justify="between">
                <Text fontSize={"md"}>800 views</Text>
                </Flex>
                END
              </Flex> */}
            </Box>
            <Divider my={2} />
          </Box>
        </VStack>
      )}
    </Box>
  );
};

const demo = {
  Heading: "Add A Firebase Backend To Your Flutter App Fast!",
  SubHeading: "This is a demo blog",
  Tags: ["Demo"],
  Description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting\
    industry. Lorem Ipsum has been the industry's standard dummy text\
    ever since the 1500s, when an unknown printer took a galley of\
    type and scrambled it to make a type specimen book. Lorem Ipsum is\
    simply dummy",
  BannerURL: "https://loremflickr.com/1280/720",
  Author: "Saurabh Singh",
  CreatedAt: "2021-04-06T19:01:27Z",
  Content:
    "Whenever I work with Firebase, I always seem to run into small issues that can be very annoying (yet simple) to solve. When I tried to connect my Flutter application to a Firebase backend for one of my personal projects, I ran into some small issues that set me back some time. Because of this, I decided to write a simple and straightforward article showing you how to connect your Flutter application to a firebase backend for both IOS and Android. After this tutorial, you will be all set to add authentication, cloud Firestore, or any other Firebase feature you might want. Whenever I work with Firebase, I always seem to run into small issues that can be very annoying (yet simple) to solve. When I tried to connect my Flutter application to a Firebase backend for one of my personal projects, I ran into some small issues that set me back some time. Because of this, I decided to write a simple and straightforward article showing you how to connect your Flutter application to a firebase backend for both IOS and Android. After this tutorial, you will be all set to add authentication, cloud Firestore, or any other Firebase feature you might want.",
};

export default BlogDetails;
