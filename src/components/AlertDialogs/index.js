import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,Button
  } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axios";

export default  function AlertDialogApp({idAbsent,fetch}) {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
   
    
    const onApproveClick = async ()=> {
        try {
           const body = {
            Id : idAbsent,
            ResponseStatus :2
           } 
           const resApporove = await axiosInstance.post('api/attendances/response',body)
           console.log(resApporove);
           onClose()
           fetch()
        } catch (error) {
            console.log(error);
        }
    }
    const onRejectClick = async ()=> {
        try {
            const body ={
            Id : idAbsent,
            ResponseStatus :3
            }
            const resReject = await axiosInstance.post('api/attendances/response',body)
           console.log(resReject);
           onClose()
           fetch()
        } catch (error) {
            console.log(error);
        }
    }


    return (
      <>
        <Button colorScheme="yellow" onClick={() => setIsOpen(true)}>
          Respond
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Apakah Pengajuan Revisi ?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onRejectClick}>
                  Reject
                </Button>
                <Button colorScheme="facebook" onClick={onApproveClick} ml={3}>
                  Approve
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }