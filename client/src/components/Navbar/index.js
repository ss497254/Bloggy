import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { logoutUser } from "../../store/actions/authActions";

function Navbar({ authenticated, logoutUser }) {
  const [a, seta] = useState(true);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (!a) navigate("/sign-in");
  }, [a]);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.900")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/" style={{ margin: "0 4% 0 6%" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={"#ff5e00"}
              fontSize="24px"
              fontWeight={300}
            >
              BLOGGY
            </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10} my="auto">
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            onClick={toggleColorMode}
            borderRadius={5}
            mx={{ lg: 2, sm: 0, md: 2 }}
            bg={useColorModeValue("gray.200", "gray.600")}
            _hover={{
              bg: useColorModeValue("gray.300", "gray.400"),
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Link
            to={authenticated ? "/profile" : "/sign-in"}
            style={{ margin: 0 }}
          >
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"md"}
              fontWeight={500}
              color={"white"}
              bg={"orange"}
              _hover={{
                bg: useColorModeValue("#ff5100", "#ff5100"),
              }}
              borderRadius={5}
              borderColor="gray"
              onClick={() => {
                if (pathname === "/profile") {
                  logoutUser();
                  seta(false);
                }
              }}
            >
              {authenticated
                ? pathname === "/profile"
                  ? "Log Out"
                  : "Profile"
                : "Sign In"}
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav parentToggle={onToggle} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.800", "gray.200");
  const linkHoverColor = useColorModeValue("#ff5e00", "#ff5e00");
  const popoverContentBgColor = useColorModeValue("white", "gray.700");

  return (
    <Stack direction={"row"} spacing={{ md: 2, lg: 8 }}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link to={navItem.to ?? "#"}>
                <Text
                  p={2}
                  to={navItem.to ?? "#"}
                  fontSize={"15px"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "underline",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Text>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                mt={1.5}
                bg={popoverContentBgColor}
                p={6}
                rounded={"md"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, to, subLabel }) => {
  return (
    <Link
      to={to}
      role={"group"}
      display={"block"}
      p={2}
      mx={10}
      rounded={"md"}
      _hover={{
        bg: useColorModeValue("orange.50", "gray.900"),
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "#ff5e00" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text
            fontSize={"sm"}
            _hover={{
              bg: useColorModeValue("orange.50", "gray.900"),
            }}
          >
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"#ff5e00"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ parentToggle }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.900")}
      display={{ md: "none" }}
      borderBottom="0.5px solid #777"
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          parentToggle={parentToggle}
        />
      ))}
      <MobileNavItem
        key={"Profile"}
        parentToggle={parentToggle}
        {...{ to: "/profile", label: "Profile" }}
      />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, to, parentToggle }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack onClick={children ? onToggle : parentToggle} mt={"0px !important"}>
      <Flex
        p={5}
        as={Link}
        to={!children ? to ?? "#" : "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        mt={0}
        borderTop="0.5px solid #777"
      >
        <Text
          fontWeight={600}
          m={0}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all 0.25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{ marginTop: "-20px !important" }}
      >
        <Stack
          mx={8}
          mb={4}
          pl={8}
          borderLeft={2}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.300", "gray.700")}
          align={"start"}
          onClick={() => {
            onToggle(), parentToggle();
          }}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} to={child.to} style={{ width: "100%" }}>
                <Box my={3}>{child.label}</Box>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Blogs",
    to: "/",
    children: [
      {
        label: "Top",
        subLabel: "Top Blogs to inspire you",
        to: "/top",
      },
      {
        label: "Latest",
        subLabel: "Latest Blogs",
        to: "/",
      },
    ],
  },
  {
    label: "Create Blog",
    to: "/create-blog",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
