import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import {  Navigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { login,logout } from '../../auth/authSlice/authSlice';
  import { useState } from 'react';
  import axiosInstance from '../../services/axios';
  export default function Login() {
    // let local = JSON.parse(localStorage.getItem('userInfo'))
    // if (local.Token == false) { return <Navigate to="/" replace />}
  
    const [Uname,setUname] = useState('')
    const [password,setPassword] = useState('')
    const [RoleLogin,setRoleLogin] = useState('')
    console.log(RoleLogin);

    const dispatch =useDispatch()

    const userNameHandleChange = (event) => {
      setUname(event.target.value)
    }
    const passHandleChange = (event) => {
      setPassword(event.target.value)
    }

    const loginClick = async () => {
      try {
        const body ={
          Username : Uname,
          Password : password
        }
        const res = await axiosInstance.post('api/login',body)
        console.log(res);
        const user = res.data.data
        setRoleLogin(res.data.data.roleId)
       
        const action = login(user)
        dispatch(action)
       const userInfo = {NIK : user.nik, Username : user.username, RoleId : user.roleId, Token : user.token }
        const strUser = JSON.stringify(userInfo)
        localStorage.setItem("userInfo",strUser)

        
      } catch (error) {
        console.log(error);
      }
    }
    // if (RoleLogin == 1) {
    //   return <Navigate to="/admin" replace />
    // } 
    // <Navigate to="/" replace />
    // // console.log(local.RoleId);
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="text" value={Uname} onChange={userNameHandleChange} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={passHandleChange} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={loginClick}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}