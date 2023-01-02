import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Flex
} from "@chakra-ui/react";

import axiosInstance from "../../services/axios";
import validator from "validator";

function ModalForm(idUpdate) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // console.log(provinced);
  console.log(idUpdate);


  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [NIK, setNIK] = useState("")
  const [UserName, setUserName] = useState("")
  const [Password, setPassword] = useState("")
  const [RoleId, setRoleId] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [BirthDate, setBirthDate] = useState("")
  const [Gender,setGender] = useState('')
  const [handphone,setHandphone] = useState("")
  const [alamat, setAlamat] = useState("")
  const [DeptID, setDeptId] = useState("")
  const [message, setMessage] = useState("");

 
  const emailValidation = () => {
    const regEx= /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2-8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      setMessage("email valid")
    } else if (!regEx.test(email) && email !== "") {
      setMessage("email not valid")
    } else {
      setMessage("")
    }
  }
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

 //post
  const onClickSave = async () => {
    try {
      const body = {
        NIK : NIK,
        Username : UserName, 
        Password : Password,
        RoleId : RoleId,
        Name : name,
        email : email,
        BirthDate : BirthDate,
        Gender : Gender,
        Phone : handphone,
        Address : alamat,
        DepartmentId : DeptID
      }

    //   if (validator.isEmail(email)) {
        await axiosInstance.post("api/users",body)
        window.location.reload();  
    //   } else {    
    //   emailValidation()
    } catch (error) {
      console.log(error); 
    }
  };
  //update
  const onClickUpdate = async () => {
    try {
      const body = {
        NIK : NIK,
        Username : UserName, 
        Password : Password,
        RoleId : RoleId,
        Name : name,
        email : email,
        BirthDate : BirthDate,
        Gender : Gender,
        Phone : handphone,
        Address : alamat,
        DepartmentId : DeptID}
        await axiosInstance.put("api/users",body)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     {!idUpdate.idUpdate ? (<><Button onClick={onOpen} margin={"20px"}>
        New User
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulir Pegawai</ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"space-around"}> 
          <ModalBody pb={6}>

            <FormControl>
            <FormLabel>NIK</FormLabel>
            <Input placeholder="NIK" value={NIK} onChange={(event) => setNIK(event.target.value)} />
            </FormControl>
            
            <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="UserName" value={UserName} onChange={(event) => setUserName(event.target.value)} />
            </FormControl>
    
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" value={Password} onChange={(event) => setPassword(event.target.value)} />
            </FormControl>
  
            <FormControl>
            <FormLabel>Role ID</FormLabel>
            <Select placeholder='Select ROLE' value={RoleId} onChange={(event) => setRoleId(event.target.value)}>
                <option value={2}>Supervisor</option>
                <option value={3}>Employee</option>
            </Select>
            
          
            </FormControl>
  
            <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email"  value={email} onChange={(event) => setEmail(event.target.value)}/>
            </FormControl>
  
            <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select placeholder='Select Gender' value={Gender} onChange={(event) => setGender(event.target.value)}>
                <option value={0}>Laki-Laki</option>
                <option value={1}>Wanita</option>
            </Select>
           
            </FormControl>
  
            <FormControl>
            <FormLabel>BirthDate</FormLabel>
            <Input placeholder="Birth Date" value={BirthDate} onChange={(event) => setBirthDate(event.target.value)}/>
            </FormControl>
            
            <FormControl>
            <FormLabel>No Handphone</FormLabel>
            <Input placeholder="NO HP" value={handphone} onChange={(event) => setHandphone(event.target.value)}  />
            </FormControl>
            
            <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Alamat" value={alamat} onChange={(event) => setAlamat(event.target.value)}/>
            </FormControl>
  
            <FormControl>
            <FormLabel>Department ID</FormLabel>
            <Select placeholder="Department Id" value={DeptID} onChange={(event) => setDeptId(event.target.value)}>
                <option value={2}>Human Resource</option>
                <option value={1}>Resource Application Services</option>
            </Select>
        
            </FormControl>
            </ModalBody>
            </Flex>
         
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     </>) : (<> <Button onClick={onOpen} margin={"20px"}>
        update User
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulir Pegawai</ModalHeader>
          <ModalCloseButton />
          <Flex justifyContent={"space-around"}> 
          <ModalBody pb={6}>

            <FormControl>
            <FormLabel>NIK</FormLabel>
            <Input placeholder="NIK" value={NIK} onChange={(event) => setNIK(event.target.value)} disabled />
            </FormControl>
            
            <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="UserName" value={UserName} onChange={(event) => setUserName(event.target.value)} />
            </FormControl>
    
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" value={Password} onChange={(event) => setPassword(event.target.value)} />
            </FormControl>
  
            <FormControl>
            <FormLabel>Role ID</FormLabel>
            <Select placeholder='Select ROLE' value={RoleId} onChange={(event) => setRoleId(event.target.value)}>
                <option value={2}>Supervisor</option>
                <option value={3}>Employee</option>
            </Select>
            
          
            </FormControl>
  
            <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email"  value={email} onChange={(event) => setEmail(event.target.value)}/>
            </FormControl>
  
            <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select placeholder='Select Gender' value={Gender} onChange={(event) => setGender(event.target.value)}>
                <option value={0}>Laki-Laki</option>
                <option value={1}>Wanita</option>
            </Select>
           
            </FormControl>
  
            <FormControl>
            <FormLabel>BirthDate</FormLabel>
            <Input placeholder="Birth Date" value={BirthDate} onChange={(event) => setBirthDate(event.target.value)}/>
            </FormControl>
            
            <FormControl>
            <FormLabel>No Handphone</FormLabel>
            <Input placeholder="NO HP" value={handphone} onChange={(event) => setHandphone(event.target.value)}  />
            </FormControl>
            
            <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Alamat" value={alamat} onChange={(event) => setAlamat(event.target.value)}/>
            </FormControl>
  
            <FormControl>
            <FormLabel>Department ID</FormLabel>
            <Select placeholder="Department Id" value={DeptID} onChange={(event) => setDeptId(event.target.value)}>
                <option value={2}>Human Resource</option>
                <option value={1}>Resource Application Services</option>
            </Select>
        
            </FormControl>
            </ModalBody>
            </Flex>
         
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickUpdate}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>)}
      
    </>
  );
}
export default ModalForm;
