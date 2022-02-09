import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { EyeOpenIcon, EyeOffIcon } from "../../assets/Icons";
import { SignUpUser } from "../../store/actions/authActions";

function SignUp({ authenticated, isLoading, SignUpUser }) {
  const toast = useToast();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated]);

  const handleSubmit = () => {
    if (isLoading) {
      return toast({
        title: "Signing up Please Wait.",
        description: "We are currently processing your request.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    SignUpUser({ FirstName, LastName, Email, Password }, toast);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="FirstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="LastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="Password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
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
                {isLoading ? <Spinner /> : "Sign Up"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} href="/sign-in">
                  Login
                </Link>
              </Text>
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

export default connect(mapStateToProps, { SignUpUser })(SignUp);
