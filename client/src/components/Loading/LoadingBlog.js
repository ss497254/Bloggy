import { Spinner, Flex, VStack } from "@chakra-ui/react";
import Typed from "react-typed";

export default function LoadingBlog() {
  return (
    <Flex justify="center" alignItems="center" w="100%" minH="95vh">
      <VStack>
        <Spinner
          thickness="5px"
          speed="0.8s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <div
          style={{
            width: "200px",
            height: "200px",
            textAlign: "center",
            padding: 10,
          }}
        >
          Loading
          <Typed
            strings={[".", "..", "...", "..", "."]}
            typeSpeed={5}
            backSpeed={5}
            loop
            cursorChar=""
          />
        </div>
      </VStack>
    </Flex>
  );
}
