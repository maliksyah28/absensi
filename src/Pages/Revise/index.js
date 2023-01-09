import { Flex, } from '@chakra-ui/react';
import React, {useState, useRef, useEffect} from 'react';
import { MdBuildCircle } from "react-icons/md";
import { IconButton ,  useToast} from "@chakra-ui/react";

import Sidebar from '../../components/SideBar';
import TableData from '../../components/TableData';
import ModalRevise from '../../components/ModalRevisi';
import AlertDialogApp from '../../components/AlertDialogs';
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from '../../services/axios';
import moment from 'moment';
import AlertPass from '../../components/AlertPass';
export default function Revise() {
    let local = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(local.NIK);
    const toast = useToast();
    const [listAbsenUser,setListAbsenUser] = useState([])
    const fetchDataRevise = async () => {
        try {
            const getUser =await axiosInstance.get(`api/attendances/revise/${local.DepartmentId}`)
            setListAbsenUser(getUser.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect (()=> {
        fetchDataRevise()
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
            Header : "Reason",
            accessor : "reason"
        }, 
        {
            Header : "Response status",
            accessor : "responseStatus",
            Cell: (props) => { if(props.value ==2) { return "Approved"} else if(props.value ==3){return"Reject"} else { return null}}
        }, 
        {
            Header : "Action",
            Cell:({row: { original},
            }) => { 
               if (original.responseStatus == 1) { return ( <>  
                <AlertDialogApp idAbsent={original.id} fetch={fetchDataRevise} />
              </>)} else {return null}
              }
          
        }
    ]
    const columns = React.useMemo(columnFunction,[])
   if (local.RoleId !== 2 ) { return <Navigate to="/" replace />}  ;
    return (
        <Flex justifyContent="center">
        <Sidebar/>
            <Flex width="85%" direction="column">
            {local.defaultPassword ? (<><AlertPass/></>) : (null)}
                {/* <ModalForm /> */}
                <TableData  columns={columns} data={dataUser}/>
            </Flex>  
        </Flex>
            
    )
}