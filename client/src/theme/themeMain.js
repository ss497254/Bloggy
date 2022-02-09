import { extendTheme } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { bgAdmin } from "./bgMain";
import { breakpoints } from "./foundations/breakpoints";
import { CardComponent } from "./additions/card/Card";
import { CardBodyComponent } from "./additions/card/CardBody";
import { CardHeaderComponent } from "./additions/card/CardHeader";
// import { mode } from "@chakra-ui/theme-tools";

export default extendTheme(
  { breakpoints },
  bgAdmin,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent
);
