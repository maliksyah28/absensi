import { Flex, } from '@chakra-ui/react';
import React, {useState, useRef, useEffect} from 'react';
import { MdBuildCircle } from "react-icons/md";
import { IconButton ,  useToast} from "@chakra-ui/react";

import Sidebar from '../../components/SideBar';

import TableData from '../../components/TableData';
import ModalRevise from '../../components/ModalRevisi';
import AlertPass from '../../components/AlertPass';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../services/axios';
import moment from 'moment';
import SideNav from '../../components/SideBar/SideNav';


export default function Profile() {
    let local = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(local.NIK);
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
    // console.log(listAbsenUser);

   

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
            Cell: (props) => props.value ? moment(props.value).add('days').format("LT") : "Absent"
            
        },
        {
            Header : "Check Out",
            accessor : "checkOut",
            Cell: (props) => props.value ? moment(props.value).add('days').format("LT") : "Absent"
        },
        {
            Header : "Revise CheckIN",
            accessor : "reviseCheckIn",
            Cell: (props) => props.value ? moment(props.value).add('days').format("LT") : null
        },
        {
            Header : "Revise CheckOut",
            accessor : "reviseCheckOut",
            Cell: (props) => props.value ? moment(props.value).add('days').format("LT") : null
        },
        {
            Header : "Action",
            Cell:({row: { original},
            }) => { 
               {
              return ( <>  
              <ModalRevise idAbsent={original.id} fetch={fetchDataUser}/>
            </>)} }
          
        },
        {
            Header : "Response Request",
            accessor : "responseStatus",
            Cell: (props) => { if(props.value ==2) { return "Approved"} else if(props.value ==3){return"Rejected"} else if (props.value == 1){return "On Progress"} else { return null}}
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
        <Flex>
        {/* <Sidebar/> */}
        <SideNav/>
        {/* <SimpleBar/> */}
            <Flex width="95%" direction="column">
                {local.defaultPassword ? (<><AlertPass/></>) : (null)}
                {/* <ModalForm /> */}
                <TableData  columns={columns} data={dataUser}/>
            </Flex>  
        </Flex>
            
    )
}