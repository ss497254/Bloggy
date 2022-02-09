import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SignInUser } from "../../store/actions/authActions";

function SignIn({ authenticated, isLoading, SignInUser }) {
  const toast = useToast();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);

  const handleSubmit = () => {
    if (isLoading) {
      return toast({
        title: "Signing in Please Wait.",
        description: "We are currently processing your request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    SignInUser({ Email, Password }, toast);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} mb="5">
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link
                  color={"blue.400"}
                  href="/forget-password"
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
                _disabled={{
                  bg: "blue.500",
                }}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Sign in"}
              </Button>
              <Stack>
                <Text align={"center"}>
                  New User ?{" "}
                  <Link
                    color={"blue.400"}
                    href="/sign-up"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps, { SignInUser })(SignIn);
