import { useColorModeValue } from "@chakra-ui/react";

export const bgAdmin = {
  styles: {
    global: () => ({
      body: {
        bgColor: useColorModeValue("#f4f4f4", "rgb(0, 30, 60)"),
        bgSize: "cover",
        bgPosition: "center center",
      },
    }),
  },
};
