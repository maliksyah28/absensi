import { Box, Button, Flex, Icon, Image, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { useRoutes,  Link  } from 'react-router-dom';

import { HamburgerIcon, EditIcon } from '@chakra-ui/icons';

export default function Sidebar() {
  let local = JSON.parse(localStorage.getItem('userInfo'))
  console.log(local.RoleId);
  // const router = useRoutes();


  return (
    <>
    {local.RoleId == 1 ? (<>
      <Flex direction="column" height="100vh" width="15vw" bg="twitter.500">
      <Box mx="auto" w="70%">
        <Image src="berca.png" mt={6} alt="icon" />
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="5"
      >
        <Flex justifyContent="center">
          <Link to="/">Home</Link>
        </Flex>
      </Box>
      <Spacer/>
     

      <Flex
        direction="column"
        width="max-content"
        mx="auto"
        alignItems="center"
      >
        <Button
          variant="outline"
          bgColor="twitter"
          color="white"
          mb="10"
          _hover={{}}
          _active={{ color: 'black' }}
          paddingInline={'10'}
          // onClick={() => signOut()}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
    </>) : (<>
      <Flex direction="column" height="100vh" width="15vw" bg="twitter.500">
      <Box mx="auto" w="70%">
        <Image src="berca.png" mt={6} alt="icon" />
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="5"
      >
        <Flex justifyContent="center">
          <Link to="/">Home</Link>
        </Flex>
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="5"
      >
        <Flex justifyContent="center">
          <Link to="/profile">profile</Link>
        </Flex>
      </Box>
      <Spacer/>
     

      <Flex
        direction="column"
        width="max-content"
        mx="auto"
        alignItems="center"
      >
        <Button
          variant="outline"
          bgColor="twitter"
          color="white"
          mb="10"
          _hover={{}}
          _active={{ color: 'black' }}
          paddingInline={'10'}
          // onClick={() => signOut()}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
    </>)}
         
    </>
   
  );
}





















