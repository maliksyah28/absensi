import React, { useEffect, useMemo, useState } from "react";
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
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

import axiosInstance from "../../services/axios";
import validator from "validator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function ModalForm({ idUpdate, nama, address }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // console.log(provinced);
  // console.log(nama);
  const data = [];
  data.push(nama);
  // console.log(data);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [NIK, setNIK] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [RoleId, setRoleId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [Gender, setGender] = useState("");
  const [handphone, setHandphone] = useState("");
  const [alamat, setAlamat] = useState("");
  const [DeptID, setDeptId] = useState("");
  const [message, setMessage] = useState("");

  const [listDept, setListDept] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  

  const handleChangeName = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const fetchDeptData = async () => {
    try {
      const getDept = await axiosInstance.get("api/departments");
      setListDept(getDept.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDeptData();
  }, []);
  // console.log(listDept);
  const renderDept = () => {
    return listDept.map((x) => (
      <option key={x.id} value={x.id}>
        {x.departmentName}
      </option>
    ));
  };
  const onHandleDept = (e) => {
    setSelectedDept(e.target.value);
  };

  //post
  const onClickSave = async () => {
    try {
      const body = {
        // Username: UserName,
        // Password: Password,
        Name: name,
        email: email,
        BirthDate: moment(BirthDate).format("L"),
        Gender: Gender,
        Phone: handphone,
        Address: alamat,
        DepartmentId: selectedDept,
      };
      await axiosInstance.post("api/users", body);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //update
  const onClickUpdate = async () => {
    try {
      const body = {
        NIK: idUpdate,
        // Username: UserName,
        // Password: Password,
        // RoleId: RoleId,
        Name: name,
        email: email,
        BirthDate: BirthDate,
        Gender: Gender,
        Phone: handphone,
        Address: alamat,
        DepartmentId: selectedDept,
      };

      await axiosInstance.put("api/users", body);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  // const onClickUpdate = useMemo(()=> data.map((x,i) => {
  //   const onEdit = async () =>{ try {
  //     const body = {
  //             NIK : idUpdate,
  //             Username : UserName,
  //             Password : Password,
  //             RoleId : RoleId,
  //             Name : setName(x),
  //             email : email,
  //             BirthDate : BirthDate,
  //             Gender : Gender,
  //             Phone : handphone,
  //             Address : alamat,
  //             DepartmentId : DeptID
  //           }
  //     await axiosInstance.put('api/users',body)
  //   } catch (error) {
  //     console.log(error);
  //   }} }),[] )

  return (
    <>
      {!idUpdate ? ( // Regist User
        <>
          <Button onClick={onOpen} margin={"20px"}>
            New User
          </Button>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size={"xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Formulir Pegawai</ModalHeader>
              <ModalCloseButton />
              <Flex justifyContent={"space-around"}>
                <ModalBody>
                  <SimpleGrid columns={2} spacingX="40px" spacingY="30px">
                    {/* <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder="UserName"
                        value={UserName}
                        onChange={(event) => setUserName(event.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input
                        placeholder="Password"
                        type={"password"}
                        value={Password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </FormControl> */}
                    <FormControl mt={4}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        placeholder="Select Gender"
                        value={Gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <option value={0}>Laki-Laki</option>
                        <option value={1}>Wanita</option>
                      </Select>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>BirthDate</FormLabel>
                      {/* <Input placeholder="Birth Date" value={BirthDate} onChange={(event) => setBirthDate(event.target.value)}/> */}
                      <DatePicker
                        selected={BirthDate}
                        onChange={(e) => setBirthDate(e)}
                        placeholderText={"Birth Date"}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>No Handphone</FormLabel>
                      <Input
                        placeholder="NO HP"
                        value={handphone}
                        onChange={(event) => setHandphone(event.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="Alamat"
                        value={alamat}
                        onChange={(event) => setAlamat(event.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Department ID</FormLabel>
                      <Select
                        placeholder="Department Id"
                        value={selectedDept}
                        onChange={onHandleDept}
                      >
                        {renderDept()}
                      </Select>
                    </FormControl>
                  </SimpleGrid>
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
        </> // update user
      ) : (
        <>
          <Button onClick={onOpen} margin={"20px"}>
            update User
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size={"xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Formulir Pegawai</ModalHeader>
              <ModalCloseButton />
              <Flex justifyContent={"space-around"}>
                <ModalBody pb={6}>
                  <SimpleGrid columns={2} spacingX="40px" spacingY="30px">
                    {/* <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder="UserName"
                        value={UserName}
                        onChange={(event) => setUserName(event.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input
                        placeholder="Password"
                        type={"password"}
                        value={Password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </FormControl> */}
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="Name"
                        value={name}
                        name="nama"
                        variant="filled"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        placeholder="Select Gender"
                        value={Gender}
                        onChange={(event) => setGender(event.target.value)}
                      >
                        <option value={0}>Laki-Laki</option>
                        <option value={1}>Wanita</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                    <FormLabel>BirthDate</FormLabel>
                      {/* <Input placeholder="Birth Date" value={BirthDate} onChange={(event) => setBirthDate(event.target.value)}/> */}
                      <DatePicker
                        selected={BirthDate}
                        onChange={(e) => setBirthDate(e)}
                        placeholderText={"Birth Date"}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>No Handphone</FormLabel>
                      <Input
                        placeholder="NO HP"
                        value={handphone}
                        onChange={(event) => setHandphone(event.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="Alamat"
                        value={alamat}
                        onChange={(event) => setAlamat(event.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Department ID</FormLabel>
                      <Select
                        placeholder="Department Id"
                        value={selectedDept}
                        onChange={onHandleDept}
                      >
                        {renderDept()}
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </ModalBody>
              </Flex>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClickUpdate}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
export default ModalForm;
