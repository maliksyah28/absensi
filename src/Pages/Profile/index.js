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
export default function Profile() {
    let local = JSON.parse(localStorage.getItem('userInfo'))
    console.log(local.NIK);
    const toast = useToast();
    const [listAbsenUser,setListAbsenUser] = useState([])
    const fetchDataUser = async () => {
        try {
            const getUser =await axiosInstance.get(`api/attendances/${local.NIK}`)
            setListAbsenUser(getUser.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect (()=> {
        fetchDataUser()
    },[])
    console.log(listAbsenUser);

   

    const dataUser = React.useMemo(() => [...listAbsenUser],[listAbsenUser])
    const columnFunction = () => [
        {
            Header : "NIK",
            accessor : "nik"
        },
    
        {
            Header : "Name",
            accessor : "name"
        },
        {
            Header : "Department",
            accessor : "departmentName"
        }, 
        {
            Header : "Date",
            accessor : "date",
            Cell: (props) => moment(props.value).add('month').format("dddd, MMMM Do YYYY,")
        },
        {
            Header : "Check In",
            accessor : "checkIn",
            Cell: (props) => moment(props.value).add('days').format("ddd, hA"),
        },
        {
            Header : "Check Out",
            accessor : "checkOut",
            Cell: (props) => moment(props.value).add('days').format("ddd, hA"),
        },
    ]
    const columns = React.useMemo(columnFunction,[])
    // const deleteButt = async (id)=> {
    //     try {
    //         const delRes = await axiosInstance.delete(`api/users/${id}`);
    //         fetchDataUser()
    //     } catch (error) {
    //       console.log(error);
    //     }
    // }
    
    //get localstorage datas
    // let local = JSON.parse(localStorage.getItem('userInfo'))
    // // console.log(local.RoleId);
    // if (local.RoleId !== 1 ) { return <Navigate to="/" replace />}  ;
    return (
        <Flex justifyContent="center">
        <Sidebar/>
            <Flex width="85%" direction="column">
                {/* <ModalForm /> */}
                <TableData  columns={columns} data={dataUser}/>
            </Flex>  
        </Flex>
            
    )
}