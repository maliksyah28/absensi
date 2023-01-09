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
import axios from "axios";

function ModalDept(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // console.log(provinced);
  //   console.log(props);
  const { idUpdate, nama, spvNik, deptName, fetch } = props;

  console.log(idUpdate);

  // console.log(data);

  const [isEdit, setIsEdit] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [DeptName, setDeptName] = useState("");
  const [spvName, setSpvName] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [data, setData] = useState([]);

  const fetchSpvData = async () => {
    try {
      const getSpv = await axiosInstance.get("api/employees/employee");
      setSpvName(getSpv.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSpvData();
  }, []);
  const renderSpv = () => {
    return spvName.map((x) => (
      <option key={x.nik} value={x.nik}>
        {x.name}
      </option>
    ));
  };
  const onHandleSpv = (e) => {
    setSelectedName(e.target.value);
  };
  //post
  const onClickSave = async () => {
    try {
      const body = {
        DepartmentName: DeptName,
        SupervisorNIK: selectedName,
      };
      //   if (validator.isEmail(email)) {
      await axiosInstance.post("api/departments", body);
      onClose();
      window.location.reload();
      //   } else {
      //   emailValidation()
    } catch (error) {
      console.log(error);
    }
  };
  const onClickUpdate = async () => {
    try {
      const body = {
        Id: idUpdate,
        DepartmentName: DeptName,
        SupervisorNIK: selectedName,
      };
      await axiosInstance.put("api/departments", body);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  //   const tamuElement = useMemo(
  //     () =>
  //       data.map((element, index) => {
  //         const onDelete = () =>
  //           axios
  //             .put("https://localhost:44319/api/departments", {
  //               DepartmentName: DeptName,
  //               SupervisorNIK: selectedName,
  //             })
  //             .then(() => {
  //               toast({
  //                 title: "Data berhasil dihapus",
  //                 duration: 2000,
  //                 status: "success",
  //                 position: "top",
  //               });
  //               // fetchDataUser()
  //               fetch();
  //             });
  //         const onEdit = (data) => {
  //           setDeptName(data.departmentName);
  //         };

  //         return (
  //           <tr>
  //             <td>{index + 1}</td>
  //             <td>{element.departmentName}</td>
  //             <td>
  //               <Button
  //                 margin="10px"
  //                 colorScheme="blue"
  //                 onClick={() => onEdit(element)}
  //               >
  //                 EditIcon
  //               </Button>
  //             </td>
  //           </tr>
  //         );
  //       }),
  //     [data]
  //   );

  //update
  //   const onClickUpdate = async () => {
  //     try {
  //       const body = {
  //         NIK : idUpdate,
  //         Username : UserName,
  //         Password : Password,
  //         RoleId : RoleId,
  //         Name : name,
  //         email : email,
  //         BirthDate : BirthDate,
  //         Gender : Gender,
  //         Phone : handphone,
  //         Address : alamat,
  //         DepartmentId : DeptID
  //       }

  //         await axiosInstance.put("api/users",body)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
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

  //   const onChange = ({ target: { name, value } }) => {
  //     setDeptName(user => ({ ...user, [name]: value }));
  //   };

  return (
    <>
      {idUpdate ? (
        <>
          <Button m={4} onClick={onOpen}>
            update Department
          </Button>
        </>
      ) : (
        <>
          <Button m={4} onClick={onOpen}>
            Create Department
          </Button>
        </>
      )}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Department Name</FormLabel>
              {idUpdate ? (
                <>
                  {" "}
                  <Input
                    ref={initialRef}
                    placeholder="Department Name"
                    value={DeptName}
                    onChange={(event) => setDeptName(event.target.value)}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <Input
                    name="deptName"
                    ref={initialRef}
                    placeholder="Department Name"
                    value={deptName}
                    onChange={(e) => {
                      setDeptName({
                        ...deptName,
                        [e.target.name]: [e.target.value],
                      });
                    }}
                  />
                </>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>List Name</FormLabel>
              <Select
                name="name"
                _focusVisible
                fontSize={{ base: "13", md: "14" }}
                fontWeight={500}
                placeholder="List Name"
                variant="filled"
                onChange={onHandleSpv}
              >
                {renderSpv()}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {idUpdate ? (
              <>
                {" "}
                <Button colorScheme="blue" mr={3} onClick={onClickUpdate}>
                  update
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={onClickSave}>
                  Save
                </Button>
              </>
            )}

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalDept;
