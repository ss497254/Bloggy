import React from "react";
import { Link } from "react-router-dom";

import { Box, Flex, Text, useColorModeValue, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "../../assets/Icons";

function Error() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100vh"
      bg={useColorModeValue("white", "gray.900")}
    >
      <Box
        maxW={{ lg: "550px", md: "400px", sm: "80%" }}
        maxH="550px"
        bg={useColorModeValue("green.100", "green.500")}
        p="25px"
        borderRadius="10px"
      >
        <Flex justifyContent="center" alignItems="center" direction="column">
          <Text
            color={useColorModeValue("gray.800", "white")}
            fontSize={32}
            my={5}
            textAlign="center"
          >
            Ooops! 😅
          </Text>
          <Text
            color={useColorModeValue("gray.800", "white")}
            fontSize={28}
            mb={10}
            fontWeight="700"
            textAlign="center"
          >
            Page Not Found
          </Text>
          <Text
            fontSize={20}
            color={useColorModeValue("blue.700", "green.100")}
            textAlign="center"
          >
            This page was not found. You may have mistyped the address or the
            page may have moved.
          </Text>
          <Button
            as="a"
            my={10}
            rightIcon={<ArrowForwardIcon />}
            colorScheme="green"
            borderRadius="50px"
            // alignItems="center"
            color={useColorModeValue("white", "black")}
            p="16px"
            w="80%"
            mx="auto"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Error;
