import { Box, Button, Flex, Icon, Image, Spacer, Text , useColorMode,} from "@chakra-ui/react";
import React from "react";
import {
  useRoutes,
  Link,
  Navigate,
  Redirect,
  useNavigate,
 
} from "react-router-dom";
import { logout } from "../../auth/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { HamburgerIcon, EditIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Sidebar() {
  let local = JSON.parse(localStorage.getItem("userInfo"));
  const { colorMode, toggleColorMode } = useColorMode();
  // console.log(local.RoleId);
  // const router = useRoutes();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      {local.RoleId == 1 ? ( // admin
        <>
        {/* bg="linear-gradient(0deg, rgba(250,225,221,1) 0%, rgba(15,96,232,1) 100%)" */}
          <Flex direction="column" height="100vh" width="15vw" bg="#2274A5" >
            <Box mx="auto" w="70%" >
              <Image src="logo_berca1.png" mt={6} alt="icon"  mb={6}/>
            </Box>
            <Box h="10" cursor="pointer" p="5" pt={2} textColor={"whiteAlpha.900"} fontSize={"large"} fontWeight={"semibold"}>
              <Flex>
              <Image mt={1} mr={2} width={6} height={6} color={"white"} src="home.svg" alt="inventory" />
                <Link to="/">Home</Link>  
              </Flex>
            </Box>
            <Box h="10" cursor="pointer" p="5" pt={4} textColor={"whiteAlpha.900"} fontSize={"large"} fontWeight={"semibold"}>
              <Flex >
              <Image mt={1} mr={2} width={6} height={6} src="rounded-form.svg" alt="inventory" />
                <Link to="/HistoryAbsence">History absence</Link>
              </Flex>
            </Box>
            <Box h="10" cursor="pointer" p="5"textColor={"whiteAlpha.900"}>
              <Flex>
              <Image mt={1} mr={2} width={4} height={4} src="management.svg" alt="inventory" />
                <Link to="/admin">Management User</Link>
              </Flex>
            </Box>
            <Box h="10" cursor="pointer" p="5" textColor={"whiteAlpha.900"}>
              <Flex>
              <Image mt={1} mr={2} width={4} height={4} src="company.svg" alt="inventory" />
                <Link to="/ManageDept">Management Dept</Link>
              </Flex>
            </Box>
            <Spacer/>

            <Flex
              direction="row"
              width="max-content"
              mx="auto"
              alignItems="center"
            >
              <Button onClick={toggleColorMode} m={2} paddingInline={"2"} mb={9}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
             

              <Button
                variant="outline"
                bgColor="whiteAlpha.300"
                color="white"
                mb="7"
                _hover={{}}
                _active={{ color: "black" }}
                paddingInline={"6"}
                onClick={onLogoutClick}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        // user
        <>
          <Flex alignItems={"left"} direction="column" height="100vh" width="15vw" bg="#2274A5">
            <Box mx="auto" w="70%">
              <Image src="logo_berca1.png" mt={6} alt="icon" mb={6} />
            </Box>
            <Box h="10" cursor="pointer" p="5" pt={2} textColor={"whiteAlpha.900"} fontSize={"large"} fontWeight={"semibold"}>
              <Flex>
              <Image mt={1} mr={2} width={6} height={6} color={"white"} src="home.svg" alt="inventory" />
                <Link to="/">Home</Link>  
              </Flex>
            </Box>
            <Box h="10" cursor="pointer" p="5" pt={4} textColor={"whiteAlpha.900"} fontSize={"large"} fontWeight={"semibold"}>
              <Flex >
              <Image mt={1} mr={2} width={6} height={6} src="rounded-form.svg" alt="inventory" />
                <Link to="/HistoryAbsence">History absence</Link>
              </Flex>
            </Box>
            <Box h="10" cursor="pointer" p="5" pt={6} textColor={"whiteAlpha.900"} fontSize={"large"} fontWeight={"semibold"}>
              <Flex>
              <Image mt={1} mr={2} width={6} height={6} src="profile.svg" alt="inventory" />
                <Link to="/Profile">Profile</Link>
              </Flex>
            </Box>

            

            {local.RoleId == 2 ? (
              <>
                {" "}
                <Box h="10" cursor="pointer" p="5" pt={6} textColor={"whiteAlpha.900"} fontSize={"large"} fontWeight={"semibold"}>
                  <Flex>
                  <Image mt={1} mr={2} width={6} height={6} src="pen.svg" alt="inventory" />
                    <Link to="/Revise">Request Revise</Link>
                  </Flex>
                </Box>
              </>
            ) : null}
             
            
            <Spacer />

            <Flex
              direction="row"
              
              width="max-content"
              mx="auto"
              alignItems="center"
            >
             <Button onClick={toggleColorMode} m={2} paddingInline={"2"} mb={9}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                variant="outline"
                bgColor="whiteAlpha.300"
                color="white"
                mb="7"
                _hover={{}}
                _active={{ color: "black" }}
                paddingInline={"6"}
                onClick={onLogoutClick}
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
}
