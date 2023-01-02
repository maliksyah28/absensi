import logo from '../../logo.svg';
import '../../App.css';
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
  Box
} from '@chakra-ui/react';


import React, {useState, useRef, useEffect} from 'react';
import QRCode from 'qrcode';
import {QrReader}  from 'react-qr-reader';
import axiosInstance from '../../services/axios';

export default function Home() {
  const [text, setText] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');

  const qrRef = useRef(null);

  const [data, setData] = useState('');
  const [message,setMessage]= useState('')
  console.log(message);

  const absenceProsess = async () => {
    try {
        const resAbsen = await axiosInstance.get(`api/attendances/scan/${data}`) 
        console.log(resAbsen);
    } catch (error) {
      console.log(error);
    }
  }
//   useEffect (()=> {
//     absenceProsess()
// },[])

  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }


  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    console.log(result);
    if (result){
      
        setScanResultWebCam(result);
    }
   }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={12}  align={'center'} justify={'center'} >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
              content: "''",
              width: 'full',
              height: useBreakpointValue({ base: '20%', md: '30%' }),
              position: 'absolute',
              bottom: 1,
              left: 0,
              bg: 'blue.400',
              zIndex: -1,
            }}>
            BERCA
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
            Absent Daily
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            The project board is an exclusive absence. It's
            erfect for employee, agencies, and moonlighters.
          </Text>
        </Stack>
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
      <Box>
      <QrReader
        onResult={async (result, error) => {
          try {
            if (!!result) {
              setData(result?.text);
              const res = await axiosInstance.get(`api/attendances/scan/${result.text}`) 
              setMessage(res.data.message)
            }
          } catch (error) {
            console.info(error);
          }
        }}
      // style={{ width: '320', position:"static" }}
      // size={320}
        containerStyle={{ width:400}} />
      <p>{message}</p>
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
);
}


