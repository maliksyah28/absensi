import { Flex } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { MdBuildCircle } from "react-icons/md";
import {
  IconButton,
  useToast,
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  SimpleGrid,
  FormControl,FormLabel,Input
} from "@chakra-ui/react";

import Sidebar from "../../components/SideBar";

import AlertPass from "../../components/AlertPass";
import { Link, Navigate,useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/axios";
import moment from "moment";
import { logout } from "../../auth/authSlice/authSlice";
import SideNav from "../../components/SideBar/SideNav";


export default function UserProfile() {
  let local = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(local.NIK);
  const toast = useToast();
  const [listDataUser, setListDataUser] = useState([]);
  const fetchDataUser = async () => {
    try {
      const getUser = await axiosInstance.get(`api/users/${local.NIK}`);
      setListDataUser(getUser.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataUser();
  }, []);
//   console.log(listDataUser);
const [password,setPassword] = useState('')
const passHandleChange = (event) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
const changePass = async () => {
    try {
        const body = {
            NIK : listDataUser.nik,
            Password : password
        }
        const res = await axiosInstance.put('api/users/update-password',body)
        console.log(res);
            dispatch(logout());
            localStorage.removeItem("userInfo");
            navigate("/login");
    } catch (error) {
        console.log(error);
    }
}
 

  //get localstorage datas
  // let local = JSON.parse(localStorage.getItem('userInfo'))
  // // console.log(local.RoleId);
  // if (local.RoleId !== 1 ) { return <Navigate to="/" replace />}  ;
  return (
    <Flex >
      {/* <Sidebar /> */}
      <SideNav/>
      <Flex width="95%" direction="column">
        {local.defaultPassword ? (
          <>
            <AlertPass />
          </>
        ) : null}
        
        <Center py={6}>
          <Box
            // maxW={"320px"}
            w={"75%"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"xl"}
              src={"/Default_pfp.svg.png"}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {listDataUser.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              `@{listDataUser.username}`
            </Text>
            <Flex justifyContent={"space-around"}>
              <SimpleGrid columns={2} spacingX="40px" spacingY="30px">
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  BirthDate : {moment(listDataUser.birthDate).format('dddd, MMMM Do YYYY')} 
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  Email : {listDataUser.email}
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  NIK : {listDataUser.nik}
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  Address : {listDataUser.address}
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  Department : {listDataUser.departmentName}
                </Badge>
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue("gray.50", "gray.800")}
                  fontWeight={"400"}
                >
                  Role : {listDataUser.roleName}
                </Badge>
                <FormControl  id="password" >
              <FormLabel >Change Password</FormLabel>
              <Input
                textColor={"blackAlpha.900"}
                variant={"filled"}
                type="password"
                value={password}
                placeholder={"PASSWORD"}
                onChange={passHandleChange}
              />
            </FormControl>
              <Button
                mt={8}
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={changePass}
              >
                Change Password
              </Button>
              </SimpleGrid>
            </Flex>
          </Box>
        </Center>
      </Flex>
    </Flex>
  );
}
