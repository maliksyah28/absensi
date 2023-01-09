import { Flex } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { MdBuildCircle } from "react-icons/md";
import { IconButton, useToast } from "@chakra-ui/react";

import Sidebar from "../../components/SideBar";
import TableData from "../../components/TableData";
import ModalForm from "../../components/ModalForm";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/axios";
import moment from "moment";
import ModalDept from "../../components/ModalForm/ModalDept";
export default function ManageDept() {
  const toast = useToast();
  const [listUser, setListUser] = useState([]);
  const fetchDataUser = async () => {
    try {
      const getUser = await axiosInstance.get("api/departments");
      setListUser(getUser.data.data);
    } catch (error) {
      console.log(error);
    }
  };
    console.log(listUser);
  useEffect(() => {
    fetchDataUser();
  }, []);

  const dataUser = React.useMemo(() => [...listUser], [listUser]);
  const columnFunction = () => [
    {
      Header: "ID Department",
      accessor: "id",
    },
    {
      Header: "Department Name",
      accessor: "departmentName",
    },
    {
      Header: "Supervisor Department",
      accessor: "supervisorName",
    },

    {
      Header: "Action",
      Cell: ({ row: { original } }) => {
        {
          return (
            <>
              <ModalDept
                idUpdate={original.id}
                nama={original.supervisorName}
                spvNik={original.supervisorNIK}
                deptName={original.departmentName}
                fetch={fetchDataUser}
              />
            </>
          );
        }
      },
    },
  ];
  const columns = React.useMemo(columnFunction, []);

  //get localstorage datas
  let local = JSON.parse(localStorage.getItem("userInfo"));
  //   console.log(local.RoleId);
  if (local.RoleId !== 1) {
    return <Navigate to="/" replace />;
  }
  return (
    <Flex justifyContent="center">
      <Sidebar />
      <Flex width="85%" direction="column">
        <ModalDept />
        <TableData columns={columns} data={dataUser} />
      </Flex>
    </Flex>
  );
}
