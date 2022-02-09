import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  // AvatarBadge,
  // IconButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  updateUserCred,
  updateUserInfo,
} from "../../store/actions/userActions";

function UserProfileEdit({
  authenticated,
  isLoading,
  updateUserInfo,
  updateUserCred,
}) {
  const toast = useToast();
  const [Bio, setBio] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "You are not Signed In.",
        description: "Please Sign In",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setTimeout(() => navigate("/sign-in"), 1000);
    }
  }, []);

  const handleUpdateInfo = () => {
    if (isLoading) return;
    updateUserInfo({ Bio });
    setBio("");
  };

  const handleUpdateCred = () => {
    if (isLoading) return;
    if (Password === ConfirmPassword) {
      updateUserCred({ Email, Password });
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      toast({
        title: "Password do not match.",
        description: "Confirm Password doesn't matches with Password",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={{ lg: "lg", md: "lg", sm: "sm" }}
        p={6}
        my={{ base: 4, lg: 14, md: 8, sm: 0 }}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
          my={{ sm: 5, lg: 0, md: 0 }}
        >
          Edit User Profile
        </Heading>
        <FormControl id="userName">
          <FormLabel>Profile Picture</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                src="https://avatars.githubusercontent.com/u/73827307"
              ></Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="name">
          <FormLabel>Bio</FormLabel>
          <Textarea
            borderColor="gray.300"
            _hover={{
              borderRadius: "gray.300",
            }}
            placeholder="Bio"
            minH="150px"
            value={Bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </FormControl>
        <Box bg="secondary.card" rounded="lg" marginBottom="2rem" my={20}>
          <Stack>
            <Button
              colorScheme="blue"
              variant="solid"
              borderRadius="5px"
              onClick={handleUpdateInfo}
            >
              Update
            </Button>
          </Stack>
        </Box>
        <Divider />
        <Box bg="secondary.card" rounded="lg" marginBottom="2rem" my={20}>
          <Stack spacing={0} my="2rem">
            <Heading as="h4" size="md">
              Update Credentials
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Email Verification Required
            </Text>
          </Stack>
          <Stack spacing={4} marginBottom="1rem">
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="Password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm_password" isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
          <Stack spacing={6}>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              onClick={handleUpdateCred}
            >
              Update
            </Button>
          </Stack>
        </Box>
        <Divider />
        <Box bg="secondary.card" rounded="lg" marginBottom="2rem" my={20}>
          <Stack spacing={0} my="2rem">
            <Heading as="h4" size="md">
              Danger zone
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Delete your account and data
            </Text>
          </Stack>
          <Stack spacing={4} marginBottom="1rem">
            <Button colorScheme="red" borderRadius="5px">
              Delete your account
            </Button>
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

export default connect(mapStateToProps, { updateUserCred, updateUserInfo })(
  UserProfileEdit
);
