import React from "react";
import {  Box, Button,Flex,Spacer} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/authSlice/authSlice";
export default function SideNav() {
    let local = JSON.parse(localStorage.getItem("userInfo"));
    const [open, setOpen] = useState(false);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const onLogoutClick = () => {
      dispatch(logout());
      localStorage.removeItem("userInfo");
      navigator("/login");
    };

    const Menus = [
        { title: "Home", src: "home.svg", link: "/" },
        { title: "History Absent", src: "rounded-form.svg", link: "/HistoryAbsence" },
        { title: "Management User", src: "management-user.svg", link: "/admin" },
        { title: "Management Department", src: "building-rounded.svg", link: "/ManageDept" },
    ];
    const MenusUserSPV = [
        { title: "Home", src: "home.svg", link: "/" },
        { title: "Profile", src: "profile.svg", link: "/profile" },
        { title: "History Absent", src: "rounded-form.svg", link: "/HistoryAbsence" },
        { title: "Revise", src: "pen.svg", link: "/Revise" },
    ];
    const MenusUserEmp = [
        { title: "Home", src: "home.svg", link: "/" },
        { title: "Profile", src: "profile.svg", link: "/profile" },
        { title: "History Absent", src: "rounded-form.svg", link: "/HistoryAbsence" },
    ]

    return (
        <div className="flex" >
            <div
                className={`${open ? "w-72" : "w-20"
                    } duration-300 h-screen p-5 pt-8 bg-[#0f60e8] relative justify-between`}
            >
                <img
                    src="left-arrow.png"
                    className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple  ${!open && "rotate-180"
                        }`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src="logo_berca1.png"
                        className={`cursor-pointer duration-500 `}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                      
                    </h1>
                </div>
                <ul className="pt-9">
                    {local.RoleId == 1 ? (<>{Menus.map((Menu, index) =>  (
                        // admin
                        <li
                            key={index}
                            onClick={() => navigator(Menu.link)}
                            className={`flex  rounded-md p-2 mt-10  cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                            ${Menu.link ? "mt-2" : "mt-2"} ${index === 0 && "bg-light-white"
                                } `}
                        >
                            <img src={`${Menu.src}`} className={'w-6'} />
                            <span className={`${!open && "hidden"} origin-left duration-200 font-bold`} >
                                {Menu.title}
                            </span>
                        </li>
                    ))}</>) : (
                        // spv
                        <>{local.RoleId == 2 ? ( 
                            <>{MenusUserSPV.map((Menu, index) =>  (
                        
                            <li
                                key={index}
                                onClick={() => navigator(Menu.link)}
                                className={`flex  rounded-md p-2 mt-10 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                                ${Menu.link ? "mt-2" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <img src={`${Menu.src}`} className={'w-6'} />
                                <span className={`${!open && "hidden"} origin-left duration-200 font-bold`} >
                                    {Menu.title}
                                </span>
                            </li>
                        ))}</>) : ( 
                            //Employee
                        <>{MenusUserEmp.map((Menu, index) =>  (
                        
                            <li
                                key={index}
                                onClick={() => navigator(Menu.link)}
                                className={`flex  rounded-md p-2 mt-10 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                                ${Menu.link ? "mt-2" : "mt-2"} ${index === 0 && "bg-light-white"
                                    } `}
                            >
                                <img src={`${Menu.src}`} className={'w-6'} />
                                <span className={`${!open && "hidden"} origin-left duration-200 font-bold`} >
                                    {Menu.title}
                                </span>
                            </li>
                        ))}</>)}</>
                   
                    )}
                    
                </ul>

               
            <Flex direction="column">
                <Box pt={19}> </Box>
                <Spacer/>
                <Box paddingTop={20}  ><Button
                
                variant="ghost"
                bgColor="whiteAlpha.300"
                color="white"
                width={"full"}
                // mb="7"
                _hover={{}}
                _active={{ color: "black" }}
                // paddingInline={"2"}
                onClick={onLogoutClick}
              >
                 <img
                        src="logout.svg"
                        className={'w-6 object-center ' }
                        // className={`cursor-pointer duration-500`}
                    />
                <span className={`${!open && "hidden"} origin-left duration-200 font-bold ml-5`} >
                                LogOut
                                </span>
              </Button></Box>
            
            </Flex>                                        
               
            </div>
        </div>
    );
}
