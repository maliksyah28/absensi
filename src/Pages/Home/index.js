import logo from "../../logo.svg";
import "../../App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  GridItem,
  Grid,
  Box,
  useToast,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";

import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";
import axiosInstance from "../../services/axios";
import { Link, Navigate } from "react-router-dom";

export default function Home() {
  const [text, setText] = useState("");
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

 

  const qrRef = useRef(null);
  let local = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(local.Token);

  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  // console.log(message);
  const [inputAbsent,setInputAbsent] =useState("")


  const absenceProsess = async () => {
    try {
      const resAbsen = await axiosInstance.get(`api/attendances/scan/${inputAbsent}`);
      
                        return toast({
                          title: `Hi ${resAbsen.data.data.name} ${resAbsen.data.message}`,
                          status: 'success',
                          position: 'top',
                          duration: 3000,
                          isClosable: true,
                        });
    } catch (error) {
      console.log(error);
      return toast({
        title: `NIK Tidak Dikenal`,
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  //   useEffect (()=> {
  //     absenceProsess()
  // },[])

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    console.log(result);
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <>
      {local?.Token ? (
        <>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} bgGradient="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(24,96,105,0.8575805322128851) 49%, rgba(0,212,255,1) 100%)">
            <Flex p={12} align={"center"} justify={"center"}>
              <Stack spacing={6} w={"full"} maxW={"lg"}>
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  <Text
                  textColor={"whiteAlpha.900"}
                    as={"span"}
                    position={"relative"}
                    _after={{
                      content: "''",
                      width: "full",
                      // height: useBreakpointValue({ base: '20%', md: '30%' }),
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "blue.400",
                      zIndex: -1,
                    }}
                  >
                    BERCA
                  </Text>
                  <br />{" "}
                  <Text color={"blue.500"} as={"span"}>
                    Absent Daily
                  </Text>{" "}
                  <Box h="10" cursor="pointer" p="5"></Box>
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }}  as={"i"} color={"whiteAlpha.900"} fontWeight={"semibold"}>
                  The project board is an exclusive absence. It's erfect for
                  employee, agencies, and moonlighters.
                </Text>
                <Button size={"md"} w={"20"}> <Link to="/HistoryAbsence">DashBoard</Link></Button>
                
              </Stack>
            </Flex>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Box>
                <QrReader
                  onResult={async (result, error) => {
                    try {
                      if (!!result) {
                        setData(result?.text);
                        const res = await axiosInstance.get(`api/attendances/scan/${result.text}`);
                        return toast({
                          title: `Hi ${res.data.data.name}, ${res.data.message}`,
                          status: 'success',
                          position: 'top',
                          duration: 3000,
                          isClosable: true,
                        });
                      }
                    } catch (error) {
                      console.info(error);
                      return toast({
                        title: `QR Code Tidak Dikenal`,
                        status: 'error',
                        position: 'top',
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                  // style={{ width: '320', position:"static" }}
                  // size={320}
                  containerStyle={{ width: 400 }}
                />
                <Text fontSize={{ base: "md", lg: "lg" }}  as={"i"} color={"whiteAlpha.900"} fontWeight={"semibold"}>
                  Forgot Bring Your QR,you can Input your NIK
                </Text>
                <FormControl mt={2}>
                      {/* <FormLabel textColor={"whiteAlpha.900"}>NIK</FormLabel> */}
                      <Input
                        placeholder="NIK"
                        value={inputAbsent}
                        variant={"outline"}
                        onChange={(event) => setInputAbsent(event.target.value)}
                      />
                      <Button colorScheme="blue" mt={3} onClick={absenceProsess}>
                  Submit
                </Button>
                    </FormControl>
              </Box>
            </Flex>
            {/* <GridItem xl={4} lg={4} md={6} sm={12} xs={12} />
                  <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
          </Stack>
        </>
      ) : (
        <>
          <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} bgGradient="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(24,96,105,0.8575805322128851) 49%, rgba(0,212,255,1) 100%)">
            <Flex p={12} align={"center"} justify={"center"}>
              <Stack spacing={6} w={"full"} maxW={"lg"}>
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  <Text
                    textColor={"whiteAlpha.900"}
                    as={"span"}
                    position={"relative"}
                    _after={{
                      content: "''",
                      width: "full",
                      // height: useBreakpointValue({ base: '20%', md: '30%' }),
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "blue.400",
                      zIndex: -1,
                    }}
                  >
                    BERCA
                  </Text>
                  <br />{" "}
                  <Text color={"blue.500"} as={"span"}>
                    Absent Daily
                  </Text>{" "}
                  <Box h="10" cursor="pointer" p="5"></Box>
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} as={"i"} color={"whiteAlpha.900"} fontWeight={"semibold"}>
                  The project board is an exclusive absence. It's erfect for
                  employee, agencies, and moonlighters.
                </Text>
                <Button size={"md"} w={"20"}> <Link to="/login">Login</Link></Button>
               
              </Stack>
            </Flex>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Box rounded={"lg"}>
                <QrReader
                  onResult={async (result, error) =>  {
                    try {
                      if (!!result) {
                        setData(result?.text);
                        const res = await axiosInstance.get(
                          `api/attendances/scan/${result.text}`);
                        console.log(res);
                        return toast({
                          title: `Hi ${res.data.data.name}, ${res.data.message}`,
                          status: 'success',
                          position: 'top',
                          duration: 3000,
                          isClosable: true,
                        });
                      }
                    } catch (error) {
                      console.info(error);
                      return toast({
                        title: `QR Code Tidak Dikenal`,
                        status: 'error',
                        position: 'top',
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                  containerStyle={{ width: 400  }}
                />
                 <Text fontSize={{ base: "md", lg: "lg" }}   as={"i"} color={"whiteAlpha.900"} fontWeight={"semibold"}>
                  Forgot Bring Your QR,you can input your NIK
                </Text>
                <FormControl textColor={"whiteAlpha.900"}>
                      {/* <FormLabel textColor={"whiteAlpha.900"}>NIK</FormLabel> */}
                      <Input
                      mt={3}
                        placeholder="NIK"
                        value={inputAbsent}
                        onChange={(event) => setInputAbsent(event.target.value)}
                      />
                      <Button colorScheme="blue" mt={3} onClick={absenceProsess}>Submit</Button>
                    </FormControl>
              
              </Box>
            </Flex>
            {/* <GridItem xl={4} lg={4} md={6} sm={12} xs={12} />
                  <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
          </Stack>
        </>
      )}
    </>
  );
}
