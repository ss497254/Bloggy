import { useEffect, useState, useRef } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import parse from "html-react-parser";
import {
  Box,
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Spinner,
  Textarea,
  VStack,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SubmitBlog } from "../../store/actions/userActions";
import "./style.css";

function CreateBlog({ authenticated, SubmitBlog, submitStatus, user }) {
  const toast = useToast();
  const [ToastShown, setToastShown] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [BlogHeading, setBlogHeading] = useState("");
  const [SubHeading, setSubHeading] = useState("");
  const [BannerURL, setBannerURL] = useState("");
  const [Tags, setTags] = useState([]);
  const [Description, setDescription] = useState("");
  const [Content, setContent] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editorRef = useRef(null);
  const btnRef = useRef();

  useEffect(() => {
    if (!authenticated)
      toast({
        title: "You are not Signed In.",
        description: "Please Sign In to Submit Your Blog",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
  }, []);

  const handleSubmit = () => {
    if (!Loading && authenticated) {
      setLoading(true);
      SubmitBlog(
        {
          Heading: BlogHeading,
          SubHeading,
          BannerURL,
          Tags: Tags.slice(0, 4),
          Description,
          Content: editorRef.current.getContent(),
          Author: `${user.FirstName} ${user.LastName}`,
          AuthorId: user.id,
          CreatedAt: Date.now(),
        },
        () => {
          setLoading(false);
        }
      );
    }
  };

  const ClearForm = () => {
    setBlogHeading("");
    setSubHeading("");
    setBannerURL("");
    setTags([]);
    setDescription("");
    setContent("");
    setBlogHeading("");
    setBlogHeading("");
  };

  useEffect(() => {
    if (submitStatus.verdict && !ToastShown) {
      if (submitStatus.verdict == "Submitted") {
        toast({
          title: "Submitted Succefully",
          description: "Blog has been submitted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        ClearForm();
      } else {
        toast({
          title: "Failed to Submit",
          description: "Unable to Submit. Please Try Again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setToastShown(true);
    }
  }, [submitStatus]);

  return (
    <Box w="full" h="full">
      <Box
        borderRadius="lg"
        w={{ sm: "90vw", md: "80vw", lg: "70vw" }}
        my={{ sm: 8, lg: 12, md: 10 }}
        mx={{ sm: "5vw", lg: "15vw", md: "10vw" }}
        p={{ sm: 8, lg: 16, md: 12 }}
        marginRight={12}
        bgColor={useColorModeValue("white", "#0a1929")}
        border="1px"
        borderColor={useColorModeValue("gray.300", "gray.600")}
        color="#0B0E3F"
        boxShadow="2xl"
      >
        <Heading
          color={useColorModeValue("black", "white")}
          textAlign="center"
          mb={10}
        >
          Create Your Blog
        </Heading>
        <VStack spacing={5} color={useColorModeValue("black", "white")}>
          <FormControl isRequired>
            <FormLabel>Heading</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <Input
                type="text"
                size="md"
                borderRadius="2"
                autoComplete="off"
                value={BlogHeading}
                onChange={(e) => setBlogHeading(e.target.value)}
              />
            </InputGroup>
            <FormHelperText color={useColorModeValue("gray.500", "gray.300")}>
              Should be Less than 30 Words
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Sub-Heading</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <Input
                type="text"
                size="md"
                borderRadius="2"
                autoComplete="off"
                value={SubHeading}
                onChange={(e) => setSubHeading(e.target.value)}
              />
            </InputGroup>
            <FormHelperText color={useColorModeValue("gray.500", "gray.300")}>
              Should be Less than 30 Words
            </FormHelperText>
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Banner Link</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <Input
                type="text"
                size="md"
                autoComplete="off"
                borderRadius="2"
                value={BannerURL}
                onChange={(e) => setBannerURL(e.target.value)}
              />
            </InputGroup>
            <FormHelperText
              color={useColorModeValue("gray.500", "gray.300")}
            ></FormHelperText>
          </FormControl>
          <FormControl id="name">
            <FormLabel>{"Tags"}</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <TagsInput
                value={Tags}
                onChange={(tags) => {
                  setTags(tags);
                }}
              />
            </InputGroup>
            <FormHelperText color={useColorModeValue("gray.500", "gray.300")}>
              Upto 4 Tags are allowed
            </FormHelperText>
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              autoComplete="off"
              borderColor="gray.300"
              borderRadius="2"
              placeholder="Short description for Display page"
              value={Description}
              resize="vertical"
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormHelperText color={useColorModeValue("gray.500", "gray.300")}>
              Should be Less than 100 Words
            </FormHelperText>
          </FormControl>
          <FormControl id="name" isRequired>
            <Flex w="100%" justify="space-between" my={2}>
              <FormLabel pt={1}>Content</FormLabel>
              <Button
                variant="solid"
                colorScheme="blue"
                _hover={{}}
                onClick={onOpen}
                size="sm"
                borderRadius="md"
              >
                Show Preview
              </Button>
            </Flex>

            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              apiKey="o03ndzi3hjtxzs8y214htlklm99to1l1pssb0dfjgrfsqz4q"
              init={{
                height: 500,
                menubar: false,
                plugins:
                  "print preview paste importcss searchreplace \
                  autolink autosave save directionality code \
                  visualblocks visualchars fullscreen image \
                  link media template codesample table charmap \
                  hr pagebreak nonbreaking anchor toc insertdatetime \
                  advlist lists wordcount imagetools textpattern \
                  noneditable help charmap quickbars emoticons",
                menubar: "file edit view insert format tools table help",
                toolbar:
                  "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                toolbar_mode: "sliding",
                toolbar_sticky: true,
                image_caption: true,
                image_advtab: true,
                autosave_interval: "10s",
                contextmenu: "code link image imagetools table",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              value={Content}
              onEditorChange={(newContent) => setContent(newContent)}
            />
          </FormControl>
          <Modal
            onClose={onClose}
            finalFocusRef={btnRef}
            isOpen={isOpen}
            scrollBehavior={"inside"}
            size={"4xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Preview</ModalHeader>
              <ModalCloseButton />
              <ModalBody px={{ sm: 8, md: 12, lg: 16 }}>
                {parse(Content)}
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Flex
            justify="center"
            w="full"
            gap={{ sm: 8, md: 12, lg: 16 }}
            pt={{ sm: 2, md: 4, lg: 6 }}
          >
            <Button
              variant="solid"
              w={{ sm: "140px", md: "150px", lg: "200px" }}
              _hover={{}}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              ref={btnRef}
              w={{ sm: "140px", md: "150px", lg: "200px" }}
              _hover={{}}
              onClick={handleSubmit}
              _disabled={{
                bg: authenticated ? "green.500" : "green.200",
              }}
              disabled={Loading || !authenticated}
            >
              {Loading ? <Spinner /> : "Submit"}
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    submitStatus: state.user.submitStatus,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { SubmitBlog })(CreateBlog);
