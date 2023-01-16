import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../auth/authSlice/authSlice";
import { useState } from "react";
import axiosInstance from "../../services/axios";
export default function Login() {
  // let local = JSON.parse(localStorage.getItem('userInfo'))
  // if (local.Token == false) { return <Navigate to="/" replace />}
  const toast = useToast();
  const navigate = useNavigate();
  const [Uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [RoleLogin, setRoleLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isError = Uname === ''
  const isError1 = password === ''
  
  const dispatch = useDispatch();

  const userNameHandleChange = (event) => {
    setUname(event.target.value);
  };
  const passHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const loginClick = async () => {
    try {
      const body = {
        Username: Uname,
        Password: password,
      };
      const res = await axiosInstance.post("api/login", body);

      const user = res.data.data;
      console.log(user);
      setRoleLogin(res.data.data.Token);

      const action = login(user);
      dispatch(action);
      const userInfo = {
        NIK: user.nik,
        Username: user.username,
        RoleId: user.roleId,
        Token: user.token,
        DepartmentId: user.departmentId,
        defaultPassword: user.defaultPassword
      };
      const strUser = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", strUser);
      // if (res.error) {
      //   setErrorMessage("")
      // }
      navigate("/HistoryAbsence");
    } catch (error) {
      console.log(error);
      // return toast({
      //   title: "Account Not Found",
      //   status: "error",
      //   position: "top",
      //   duration: 3000,
      //   isClosable: true,
      // });
    }
  };
  const userRole = useSelector((state) => state.auth.Token);
  console.log(userRole);

  // console.log(local.RoleId);
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Berca Sign in</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to see all of your absence ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          p={8}
          bgGradient="linear-gradient(230deg, rgba(2,0,36,1) 0%, rgba(42,186,200,0.989233193277311) 49%, rgba(0,212,255,1) 100%)"
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={isError}>
              <FormLabel textColor={"whiteAlpha.900"}>Email address</FormLabel>
              <Input
                fontWeight={"semibold"}
                type="text"
                variant={"filled"}
                value={Uname}
                onChange={userNameHandleChange}
              
              /> {!isError ? (
                <> </>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" textColor={"whiteAlpha.900"} isInvalid={isError1}>
              <FormLabel >Password</FormLabel>
              <Input
                textColor={"blackAlpha.900"}
                variant={"filled"}
                type="password"
                value={password}
                onChange={passHandleChange}
                required
              />{!isError1 ? (
                <> </>
              ) : (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Text color={"red.400"} fontSize={"lg"} fontWeight={"semibold"}>
                {errorMessage}
              </Text>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox textColor={"whiteAlpha.900"}>Remember me</Checkbox>
                <Button size={"xs"} w={"20"}> <Link to="/">Absence</Link></Button>
                {/* <Link to="/">Absence</Link> */}
              </Stack>
              <Button
                bg={"blue.400"}
                color={"aliceblue"}
                _hover={{
                  bg: "blue.800",
                }}
                onClick={loginClick}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
