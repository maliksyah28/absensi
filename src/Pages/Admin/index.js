import { Flex, } from '@chakra-ui/react';
import React, {useState, useRef, useEffect} from 'react';
import { MdBuildCircle } from "react-icons/md";
import { IconButton ,  useToast} from "@chakra-ui/react";

import Sidebar from '../../components/SideBar';
import TableData from '../../components/TableData';
import ModalForm from '../../components/ModalForm';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../services/axios';
import moment from 'moment';
export default function Admin() {
    
    const toast = useToast();
    const [listUser,setListUser] = useState([])
    const fetchDataUser = async () => {
        try {
            const getUser =await axiosInstance.get('api/users')
            setListUser(getUser.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(listUser);
    useEffect (()=> {
        fetchDataUser()
    },[])

   

    const dataUser = React.useMemo(() => [...listUser],[listUser])
    const columnFunction = () => [
        {
            Header : "NIK",
            accessor : "nik"
        },
        {
            Header : "Username",
            accessor : "username",
        },
        {
            Header : "Role",
            accessor : "roleName"
        },
        {
            Header : "Name",
            accessor : "name"
        },
        {
            Header : "Email",
            accessor : "email"
        },
        {
            Header : "Gender",
            accessor : "gender"
        },
        {
            Header : "Birth Date",
            accessor : "birthDate",
            Cell: (props) => moment(props.value).add(1, 'months').format('dddd, MMMM Do YYYY'),
        },
        {
            Header : "No. Phone",
            accessor : "phone"
        },
        {
            Header : "Address",
            accessor : "address"
        },
        {
            Header : "Department",
            accessor : "departmentName"
        },
        {
            Header : "Action",
            Cell:({row: { original},
            }) => { 
               {
              return ( <>  
              <IconButton icon={MdBuildCircle} color="Black" onClick={() => deleteButt(original.nik)}>
                tess
              </IconButton>
              <ModalForm idUpdate={original.nik}/>
              
            </>)} }
          
          }

    ]
    const columns = React.useMemo(columnFunction,[])
    const deleteButt = async (id)=> {
        try {
            const delRes = await axiosInstance.delete(`api/users/${id}`);
            fetchDataUser()
        } catch (error) {
          console.log(error);
        }
    }
    
    //get localstorage datas
    let local = JSON.parse(localStorage.getItem('userInfo'))
    console.log(local.RoleId);
    if (local.RoleId !== 1 ) { return <Navigate to="/" replace />}  ;
    return (
        <Flex justifyContent="center">
        <Sidebar/>
            <Flex width="85%" direction="column">
                <ModalForm />
                <TableData  columns={columns} data={dataUser}/>
            </Flex>  
        </Flex>
            
    )
}