import React, {useState} from 'react';
import AddBooking from './calendar_addBooking';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import moment from 'moment';
import '../../style.css';

export default function ClientDisplayBooking (props) {
  const docID = props.docID;
  const id = props.id;
  const availableTimeInfo = props.availableTimeInfo.split(",");
  const subjects = props.subjects;
  let existingBooking = "";
  props.bookingSlots.forEach(event => {
    if(event.dateTime.split(".0000000")[0] === props.id){
      existingBooking = "booked";
    }
  });
  const availableCheck = id => {
    const timeFormat = "HH:mm";
    const weekDayName = moment(id).format("ddd");
    const time = moment(id.split("T")[1], timeFormat);
    let status = "client-unavailable";
    let startTime = "";
    let endTime = "";
    availableTimeInfo.forEach(day => {
      if(weekDayName === day.substring(0,3) && existingBooking === ""){
        if(day.length > 7 && day.length < 15){
          startTime = moment(day.substring(3).split("-")[0], timeFormat);
          endTime = moment(day.substring(3).split("-")[1], timeFormat);
          status = time.isBetween(startTime, endTime) || time.isSame(startTime) ? "available": "client-unavailable";
        }
        else if(day.length > 14){
          day.substring(3).split("&").forEach(timePeriod => {
            startTime = moment(timePeriod.substring(0,5), timeFormat);
            endTime = moment(timePeriod.substring(6), timeFormat);
            if(time.isBetween(startTime, endTime) || time.isSame(startTime) && existingBooking === ""){
                status = "available"}});
        }
      }
    })
    return status;
    }

  const [modal, setModal] = useState(false);
  const modalToggle = availableCheck => {
    if(availableCheck !== "client-unavailable"){
      setModal(!modal);
    }
  }
  return (
    <td key={id}
      title={id.split("T")[1]}
      id={id}
      style={{ padding:"0px", fontSize:"11px", verticalAlign:"middle", height:"17px"}}
      className={availableCheck(id)}        
      onClick={() => modalToggle(availableCheck(id))}
      >
      <Modal isOpen={modal} toggle={modalToggle} size="lg">
        <ModalHeader toggle={() => modalToggle()}>Booking Information</ModalHeader>
        <ModalBody><AddBooking id={id} docID={docID} availableSubjects={subjects}/></ModalBody>
        <ModalFooter>
        <Button color="danger" onClick={() => modalToggle()}>Cancel</Button>
        <Button form='bookingInfo' type="submit" color="success" onClick={() => modalToggle()}>Submit</Button>
        </ModalFooter>
      </Modal>      
    </td>
  ); 
} 

