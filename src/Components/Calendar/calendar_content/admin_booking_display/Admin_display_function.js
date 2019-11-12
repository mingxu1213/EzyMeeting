import React, {useState} from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import '../../style.css';

//This function could check every grid in the calendar, if there is a booking, display the booking. This grid is not clickable.
//Else, the admin can click the empty grid to add a booking to the calendar. A modal will pop up after clicking the empty grid
//for user to enter booking information.
export default function AdminDisplayBooking (props) {
  const availableTime = useSelector(state => state.getAvailableTime).split(",");
  const getSelect = useSelector(state => state.getSelect);
  const startID = useSelector(state => state.getStartID);
  const lastID = useSelector(state => state.getLastID);
  const mouseMoveDirection = useSelector(state => state.getMouseMoveDirection);
  const clickPurpose = useSelector(state => state.getClickPurpose);
  const dispatch = useDispatch();
  const id = props.id;
  const weekDayName = moment(id).format("ddd");
  const availableCheck = id => {
    const timeFormat = "HH:mm";
    const time = moment(id.split("T")[1], timeFormat);
    let status = "unavailable";
    let startTime = "";
    let endTime = "";
    availableTime.forEach(day => {
      if(weekDayName === day.substring(0,3)){
        if(day.length > 7 && day.length < 15){
          startTime = moment(day.substring(3).split("-")[0], timeFormat);
          endTime = moment(day.substring(3).split("-")[1], timeFormat);
          status = time.isBetween(startTime, endTime) || time.isSame(startTime) ? "available": "unavailable";
        }
        else if(day.length > 14){
          day.substring(3).split("&").forEach(timePeriod => {
            startTime = moment(timePeriod.substring(0,5), timeFormat);
            endTime = moment(timePeriod.substring(6), timeFormat);
            if(time.isBetween(startTime, endTime) || time.isSame(startTime)){
                status = "available"}});
        }
      }
    })
    return status;
  }
  const modifiedTime = (weekDayAvailableTime, startTime, endTime) => {
    let result;
    let timePeriod;
    if(clickPurpose === "available"){
      if(weekDayAvailableTime.length < 8){
        result = weekDayName+startTime.substring(0,5)+"-"+endTime.substring(0,5);
      }
      else if (weekDayAvailableTime.length === 14){
        if(moment(weekDayAvailableTime.substring(9), "HH:mm").isBefore(moment(startTime.substring(0,5), "HH:mm"))){
          result = weekDayAvailableTime+"&"+startTime.substring(0,5)+"-"+endTime.substring(0,5);
        }
        else{
          result = weekDayName+startTime.substring(0,5)+"-"+endTime.substring(0,5)+"&"+
                   weekDayAvailableTime.substring(3);
        }
      }
      else{
        if(moment(weekDayAvailableTime.substring(3,8), "HH:mm").isAfter(moment(endTime.substring(0,5), "HH:mm"))){
          result = weekDayName+startTime.substring(0,5)+"-"+endTime.substring(0,5)+"&"+
                   weekDayAvailableTime.substring(3);
        }
        else if(moment(weekDayAvailableTime.substring(weekDayAvailableTime.length-5), "HH:mm").isBefore(moment(startTime.substring(0,5), "HH:mm"))){
          result = weekDayAvailableTime+"&"+startTime.substring(0,5)+"-"+endTime.substring(0,5);
        }
        else{
          timePeriod = weekDayAvailableTime.substring(3).split("&");
          for(var i = 1; i<timePeriod.length; i++){
            if(moment(timePeriod[i-1].substring(6), "HH:mm").isBefore(moment(startTime.substring(0,5), "HH:mm")) &&
              moment(timePeriod[i].substring(0,5), "HH:mm").isAfter(moment(endTime.substring(0,5), "HH:mm"))){
                timePeriod[i] = startTime.substring(0,5)+"-"+endTime.substring(0,5)+"&"+timePeriod[i];
              }
          result = weekDayName + timePeriod.join("&");
        }
        }
        
      }
    }
    else{
      if(weekDayAvailableTime.length === 14){
        result = weekDayName+weekDayAvailableTime.substring(3,8)+"-"+startTime.substring(0,5)+
                               "&"+endTime.substring(0,5)+"-"+weekDayAvailableTime.substring(9);
      }
      else{
        timePeriod = weekDayAvailableTime.substring(3).split("&");
        for(var i = 0; i<timePeriod.length; i++){
          if(moment(timePeriod[i].substring(5), "HH:mm").isAfter(moment(endTime.substring(0,5), "HH:mm")) &&
            moment(timePeriod[i].substring(0,5), "HH:mm").isBefore(moment(startTime.substring(0,5), "HH:mm"))){
              timePeriod[i] = timePeriod[i].substring(0,5)+"-"+startTime.substring(0,5)+"&"+
                              endTime.substring(0,5)+"-"+timePeriod[i].substring(6);
            }
        result = weekDayName + timePeriod.join("&");
        }
      }
    }
    return result;
  }
  const updateAvailableTime = (startTime, endTime) => {
    let modification = "";
    switch(weekDayName){
      case "Mon":
        modification = modifiedTime(availableTime[0], startTime, endTime)+","+availableTime[1]+","+
                                    availableTime[2]+","+availableTime[3]+","+availableTime[4];
        break;
      case "Tue":
        modification = availableTime[0]+","+modifiedTime(availableTime[1], startTime, endTime)+","+
                       availableTime[2]+","+availableTime[3]+","+availableTime[4];
        break;
      case "Wed":
        modification = availableTime[0]+","+availableTime[1]+","+modifiedTime(availableTime[2], startTime, endTime)+
                       ","+availableTime[3]+","+availableTime[4];
        break;
      case "Thu":
        modification = availableTime[0]+","+availableTime[1]+","+availableTime[2]+","+
                       modifiedTime(availableTime[3], startTime, endTime)+","+availableTime[4];
        break;
      case "Fri":
        modification = availableTime[0]+","+availableTime[1]+","+availableTime[2]+","+availableTime[3]+
                       ","+modifiedTime(availableTime[4], startTime, endTime);
        break;
      default:
        break;
    }
    const submitInfo = props.docID + "%" + modification;
    fetch("http://localhost:5000/availabletimemodify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({submitInfo})
    })
    .then(window.location.href=`http://localhost:3000/mycalendar/${props.docID}`);
  }
  const setClassName = id => {
    if(clickPurpose === ""){
      document.getElementById(id).className === "available" ? 
        document.getElementById(id).className = "unavailable": 
        document.getElementById(id).className = "available";
    }
    else{
      if(document.getElementById(id).className === "unavailable"){
        document.getElementById(id).className = "available";
      }
      else{
        document.getElementById(id).className = "unavailable"
      }
    }
    
  }

  const handleMouseDown = id => {
    dispatch({type:"setStartID", id:id});
    dispatch({type:"setSelect", select: true});
    dispatch({type:"setClickPurpose", clickPurpose: document.getElementById(id).className === "available"?
                                                   "unavailable" : "available"});
    setClassName(id);
  }
  const handleMouseUp = id => {
    let startTime = "";
    let endTime = "";
    const format = "HH:mm:ss";
    const startGrid = moment(String(startID.split("T")[1].substring(0,8)), format);
    const endGrid = moment(String(id.split("T")[1].substring(0,8)), format);

    if(startGrid.isAfter(endGrid)){
      startTime = endGrid.format(format);
      endTime = startGrid.add(15, "minutes").format(format);
      console.log(startTime)
      console.log(endTime)
    }
    else{
      startTime = startGrid.format(format);
      endTime = endGrid.add(15, "minutes").format(format);
      console.log(startTime)
      console.log(endTime)
    }
    updateAvailableTime(startTime, endTime);
    
    dispatch({type:"setSelect", select: false});
    dispatch({type:"setStartID", id:"" });
    dispatch({type:"setLastID", lastLocation:""});
    dispatch({type:"setMouseMoveDirection", moveDirection:""});
    dispatch({type:"setClickPurpose", clickPurpose: ""});
  }
  const handleMouseOver = id => {
    dispatch({type:"setLastID", lastLocation:id});
    if(getSelect === true){
      if(id > lastID){
        if(mouseMoveDirection === "up"){
          setClassName(lastID);
        }
        dispatch({type:"setMouseMoveDirection", moveDirection:"down"});
      }
      else if (id < lastID){
        if(mouseMoveDirection === "down"){
          setClassName(lastID);
        }
        dispatch({type:"setMouseMoveDirection", moveDirection:"up"});
      }
      if(id !== startID){
        setClassName(id);
      }
    }
  }
  return (
    <td key={id}
      title={id.split("T")[1]}
      id={id}
      style={{ padding:"0px", fontSize:"11px", verticalAlign:"middle", height:"17px"}}
      className={availableCheck(id)}
      onMouseDown={() => handleMouseDown(id)}
      onMouseUp={() => handleMouseUp(id)}
        // alert(startID < id ? `From ${startID.split("T")[1]} to ${id.split("T")[1]} is set to unavaliable!`: 
        // `From ${id.split("T")[1]} to ${startID.split("T")[1]} is set to unavaliable!`)}}
      onMouseOver={() => handleMouseOver(id)}>
    </td> 
  ); 
} 


