import React from "react";
import { Link } from "react-router-dom";

import {
  AspectRatio,
  Box,
  Heading,
  Flex,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "../../assets/Icons";
import UserIcon from "../../assets/Images/user-icon.png";
import Card from "../Card/Card";

const PostTags = (props) => {
  return (
    <div spacing={2}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} m={1} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </div>
  );
};

export const PostAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.userImage || UserIcon}
        fit="cover"
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export default function Post({ data }) {
  if (data._id) data.to = "/blogs/" + data._id;

  return (
    <Box display="flex" flexDirection="column" marginBottom="5px">
      <Card
        w="100%"
        boxShadow={"md"}
        _hover={{ shadow: "2xl" }}
        bg={useColorModeValue("white", "rgb(0, 30, 55)")}
        borderColor={useColorModeValue("gray.400", "rgb(0 63 102)")}
        borderRadius={{ base: "5px", lg: "10px", md: "10px" }}
      >
        <Box
          display="flex"
          flexDirection={{ sm: "column", lg: "row", md: "row" }}
          w="100%"
        >
          <Box
            display="flex"
            flex={{ base: 0.9, sm: 1 }}
            flexDirection="column"
            justifyContent="center"
            my={{ base: "1.5%", lg: "2%" }}
            mx={{ base: "0%", lg: "1.5%", md: "1%" }}
            w="100%"
          >
            <Box width={{ base: "85%", sm: "100%" }} marginBottom="5%">
              <Link to={data.to || "#"}>
                <Box
                  w="100%"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                >
                  <AspectRatio
                    maxH="500px"
                    ratio={{ lg: 4 / 3, md: 4 / 3, sm: 1 / 1 }}
                  >
                    <Image
                      borderRadius={{ base: "5px", lg: "8px", md: "8px" }}
                      src={data?.BannerURL}
                      alt="Image"
                      transition="0.3s ease-in-out"
                      objectFit="contain"
                      _hover={{
                        transform: {
                          lg: "scale(1.04)",
                          md: "scale(1.03)",
                          sm: "scale(1.02)",
                        },
                      }}
                    />
                  </AspectRatio>
                </Box>
              </Link>
            </Box>
            <PostTags tags={data?.Tags} />
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            my={{ base: "1%", lg: "2%" }}
            mx={{ base: "1%", lg: "1.5%" }}
          >
            <Heading fontSize="xl">
              <Link to={data.to || "#"}>
                <Text
                  textDecoration="none"
                  _hover={{ textDecoration: "underline" }}
                  fontWeight={500}
                >
                  {data?.Heading || "Heading"}
                </Text>
              </Link>
            </Heading>
            <Flex
              h="100%"
              direction="column"
              justify="space-between"
              marginTop="2"
            >
              <div>
                <Text
                  as="p"
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="0.95rem"
                >
                  {data?.Description || "Description"}
                </Text>

                <Link to={data.to || "#"}>
                  <Text
                    color="blue.500"
                    fontSize="1rem"
                    fontWeight="500"
                    w="fit-content"
                    display="flex"
                    flexDirection="row"
                    gap="5px"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Read More {"  "}
                    <Box pt={{ sm: "0px", lg: "3px", md: "2px" }}>
                      <ArrowForwardIcon color={{ a: "#3182ce", b: "blue" }} />
                    </Box>
                  </Text>
                </Link>
              </div>
              <PostAuthor
                name={data?.Author || "user"}
                date={new Date("2021-04-06T19:01:27Z")}
                userImage={
                  data?.userImage ||
                  "https://avatars.githubusercontent.com/u/73827307"
                }
              />
            </Flex>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
