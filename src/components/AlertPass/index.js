import { Alert, AlertIcon, useToast, Spacer, Button } from '@chakra-ui/react';
import { useState } from 'react';


function AlertPass(props) {
  const [isResendProcess, setisResendProcess] = useState(false);

  const toast = useToast();

//   const onResendEmailClick = async () => {
//     setisResendProcess(true);

//     const body = {
//       email: props.user.email,
//       userId: props.user.userId,
//     };

//     const res = await axiosInstance.post('/users/verification', body);

//     toast({
//       description: res.data.message,
//       position: 'top',
//       status: 'success',
//       duration: 3000,
//       isClosable: true,
//     });

//     setisResendProcess(false);
//   };
  return (
    <>
      <Alert status="warning" zIndex="overlay" top="0" left="0" right="0">
        <AlertIcon />
        Your Password Still Default, clik Here for update new password
        <Spacer />
        <Button
          isLoading={isResendProcess}
          loadingText="Mengirim"
          variant={'solid'}
          colorScheme="twitter"
        //   onClick={onResendEmailClick}
        >
          Click
        </Button>
      </Alert>
    </>
  );
}

export default AlertPass;

