import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';
import AdminBookingDisplay from './admin_booking_display/Admin_display_function';
import ClientBookingDisplay from './client_booking_display/client_display_function';
import '../style.css';

//Get the date of every weekdays.This value can be used as the key and id identifiers.
//The senarios that days in different weeks are different are considered.
const getDate = (index, firstdayOfWeek, daysInMonth, nextWeek) => {
  //The month of the current week.
  const firstMMofWeek = Number(moment().startOf("Week").format("M"));
  //Year of current week
  const firstYYofWeek = Number(moment().startOf("Week").format("YYYY"));
  const weekdayIndex = (nextWeek ? (index + 7) : index);
  let year = null;
  let month = null;
  let date = null;
  //Check if date + index > days in the current month
  if ((firstdayOfWeek + weekdayIndex) > daysInMonth) {
    date = (firstdayOfWeek + weekdayIndex) % daysInMonth;
    if (firstMMofWeek === 12) {
      month = 1;
      year = firstYYofWeek + 1;
    }
    else {
      month = firstMMofWeek + 1;
      year = firstYYofWeek;
    }
  }
  else {
    year = firstYYofWeek;
    month = firstMMofWeek;
    date = firstdayOfWeek + weekdayIndex;
  }
  //Return the date
  return moment(`${year}`.toString() + "-" + `${month}`.toString() + "-" + `${date}`.toString(), "YYYY-MM-DD").format("YYYY-MM-DD");
}

//This is the component to build the calendar frame.
export default function CalendarFrame(props) {
  const docID = props.docID;
  const [availableTimeInfo, setAvailableTimeInfo] = useState("");
  const [subjects, setSubjects] = useState("")
  useEffect(() => {
    fetchAvailableTime();
  }, []);
  //Get the calendar information from server
  const fetchAvailableTime = async () => {
    await fetch("http://localhost:5000/availabletimeinfo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({docID})
      })
      .then(res => res.json())
      .then(data => {
        setAvailableTimeInfo(data[0].available_time);
        setSubjects(data[0].meeting_subject);
      });
  }
  const days = [" ","Mon", "Tue", "Wed", "Thu", "Fri"];
  //Generate time period title. From 9:00 to 17:00, the gap is 15 minutes.
  let times = [];
  for (var i = 9; i < 17; i++) {
    for (var j = 0; j < 60; j += 15) {
      times.push(("0" + i).slice(-2) + ":" + ("0" + j).slice(-2));
    }
  }
  //Generate the date of weekdays from Mondy to Friday.
  const daysInMonth = moment(moment().startOf("Week")).daysInMonth();
  const firstdayOfWeek = Number(moment().startOf("Week").format("D"));
  //Check if the displayed week is current week or next week.
  //If it is next week, first date of the week is updated.
  const firstDate = (props.nextWeek ? (firstdayOfWeek + 7) % daysInMonth : firstdayOfWeek);
  let dateOfWeekdays = [];
  const weekdays = [1, 2, 3, 4, 5];
  
  return (
    <Table bordered>
      <tbody>
        {/* Table horizontal axis head: Mondy to Friday */}
        <tr>
          {days.map((weekdays, index) => {
            // Highlighted the current date.
            const currentDay = (firstDate + index === Number(moment().format("D"))) ? "day current-day" : null;
            const blankth = (index === 0 ? "blankth": null);
            const thClass = currentDay + " " + blankth;
            const date = getDate(index, firstdayOfWeek, daysInMonth, props.nextWeek);
            dateOfWeekdays.push(date);
            return (
              <th key={date} className={thClass}>
                {weekdays}
                {weekdays === " " || props.user === "admin" ? " " : <span style={{ fontSize: "10px", marginLeft: "10px" }}>{date}</span>}
              </th>
            )
          })}
        </tr>
        {/* Table longitudinal axis. */}
        {times.map((eachTimePeriod, index) => {
          const eventStartTime = "T" + eachTimePeriod + ":00";
          return (
            <tr key={eachTimePeriod} >
              {/* Table longitudinal axis head */}
              {index % 2 === 0 ? <th rowSpan="2" style={{ padding:"0px", fontSize:"11px"}}>{
                eachTimePeriod.slice(-2) === "00" || eachTimePeriod.slice(-2) === "30" ? eachTimePeriod: null
              }</th> : null}
              
              {/* Table grids. */}
              {weekdays.map(index => {
                const identifier = dateOfWeekdays[index] + eventStartTime;
                if(props.user === "admin"){
                  return (
                    <AdminBookingDisplay 
                      key={identifier} 
                      id={identifier} 
                      docID={docID}/>
                  );
                }
                else{
                  return (
                    <ClientBookingDisplay 
                      key={identifier} 
                      bookingSlots={props.bookingSlots} 
                      id={identifier} 
                      docID={docID} 
                      availableTimeInfo={availableTimeInfo}
                      subjects={subjects}/>
                  );
                }
              })}
            </tr>)
        })}
      </tbody>
    </Table>
  )
}

