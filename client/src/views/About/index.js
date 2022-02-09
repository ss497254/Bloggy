import React from "react";
import {
  Flex,
  Avatar,
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  Link,
  ListIcon,
  Code,
  Button,
  VStack,
} from "@chakra-ui/react";
import { SchoolIcon } from "../../assets/Icons";

import Typed from "react-typed";

function About() {
  return (
    <VStack p="4%" my="2%">
      <Flex
        direction={{ base: "column", lg: "row", md: "row" }}
        width="100%"
        justifyContent="flex-end"
      >
        <Box
          maxW={"320px"}
          w="100%"
          bg={useColorModeValue("gray.100", "gray.900")}
          shadow={"lg"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          mx={{ base: "auto", lg: "4%", md: "4%" }}
          mb={{ sm: "10%", base: "0%" }}
        >
          <Avatar size={"2xl"} src="#" alt="Saurabh" loading="eager" mb={4} />

          <Heading fontSize="md" fontWeight={400}>
            Saurabh Singh
          </Heading>
          <Text
            fontSize={"md"}
            fontWeight={200}
            color={useColorModeValue("gray.600", "gray.300")}
            mb={4}
          >
            Computer Science and Engineering Student
          </Text>

          <Stack
            align={"center"}
            justify={"center"}
            direction={"column"}
            textAlign={"left"}
            mt={6}
          >
            <Text
              fontSize="sm"
              fontWeight={400}
              color={"gray.500"}
              textTransform="uppercase"
            >
              Currently
            </Text>
            <List spacing={3} w={"full"}>
              <ListItem
                p={1}
                border={"solid 2px transparent"}
                rounded={"md"}
                cursor={"pointer"}
                _hover={{ color: "blue.400" }}
              >
                <Link
                  href="http://www.iitism.ac.in/"
                  target="_blank"
                  _hover={{ textDecoration: "none" }}
                  _focus={{ outline: "none" }}
                >
                  <Flex direction={"row"} align={"center"}>
                    <ListIcon w={4} h={4} as={SchoolIcon} />
                    <Flex
                      direction={"column"}
                      ml={4}
                      fontSize={{ sm: "sm", md: "0.9rem", lg: "0.9rem" }}
                    >
                      Indian Institute of Technology (ISM) Dhanbad
                    </Flex>
                  </Flex>
                </Link>
              </ListItem>
            </List>
            <Button
              as={Link}
              href="#"
              target="_blank"
              w={"full"}
              mt={8}
              bg={useColorModeValue("gray.300", "gray.700")}
              color={useColorModeValue("gray.800", "white")}
              rounded={"md"}
              _hover={{
                bg: useColorModeValue("gray.200", "gray.800"),
                textDecoration: "none",
              }}
              _focus={{ outline: "none" }}
            >
              Resume
            </Button>
          </Stack>
        </Box>
        <Box p={4} mr={4} w={"full"} maxW="800px">
          <Heading
            mb={6}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            color={useColorModeValue("brand.600", "gray.300")}
            lineHeight="shorter"
            textAlign={{ base: "inherit", md: "start" }}
          >
            Hey, I'm{" "}
            <Text
              display={"inline"}
              w="full"
              bgClip="text"
              bgGradient="linear(to-b, blue.200, blue.600)"
              fontWeight="extrabold"
            >
              Saurabh Singh
            </Text>
          </Heading>

          <Text
            pr={{ base: 0, md: 16 }}
            mb={4}
            fontSize={{ base: "md", md: "lg" }}
            color={useColorModeValue("brand.600", "gray.400")}
            letterSpacing="wider"
            textAlign={"start"}
            fontFamily={"body"}
          >
            I'm a software engineering student, specializing in building web
            applications. Intrested by Competitive programming and currently
            looking for a graduate internship opportunity.
            <br />
            <br />
            <Code animation="infinite" fontSize={"xl"}>
              <Typed
                strings={[
                  "I build things for the web.",
                  "I always try to learn new tech.",
                ]}
                typeSpeed={40}
                backSpeed={30}
                loop
              />
            </Code>
            <br />I code <Code colorScheme="blue"> simple</Code>
            {" and "}
            <Code colorScheme="green"> useful</Code> things and I{" "}
            <Code colorScheme="red"> love </Code> what I do.
            {/* <br />
            <Code colorScheme={"orange"}>gaming 🎮</Code> */}
          </Text>
        </Box>
      </Flex>
    </VStack>
  );
}

export default About;
