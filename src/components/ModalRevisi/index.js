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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axiosInstance from "../../services/axios";
function ModalRevise({ idAbsent, fetch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [handleDateInChange, setHandleDateInChange] = useState("");
  const [handleDateOutChange, setHandleDateOutChange] = useState("");
  const [reason, setReason] = useState("");
  // console.log(handleDateInChange);
  // console.log(moment(handleDateOutChange).format("LT"));

  const onClickRevise = async () => {
    try {
      const body = {
        Id: idAbsent,
        CheckIn: moment(handleDateInChange).format("LT"),
        CheckOut: moment(handleDateOutChange).format("LT"),
        Reason: reason,
      };
      const resRevise = await axiosInstance.post(
        `api/attendances/revise`,
        body
      );
      onClose();
      fetch();
      // console.log(resRevise);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme={"yellow"}>Revise</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Revise Absent</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Reason</FormLabel>
              <Input
                placeholder="Reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Check IN</FormLabel>
              {/* <Input placeholder='Last name' /> */}
              <DatePicker
                selected={handleDateInChange}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="HH:mm"
                timeIntervals={15}
                onChange={(e) => setHandleDateInChange(e)}
                placeholderText={"00:00"}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Check Out</FormLabel>
              {/* <Input placeholder='Last name' /> */}
              <DatePicker
                selected={handleDateOutChange}
                showTimeSelect
                showTimeSelectOnly
                dateFormat="HH:mm"
                timeIntervals={15}
                onChange={(e) => setHandleDateOutChange(e)}
                placeholderText={"00:00"}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickRevise}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalRevise;
