import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Col, Row, Form, FormGroup, Label, Input, CustomInput} from 'reactstrap';
import {useDispatch} from 'react-redux';       

//This function let the admin to modify the avaliable days which could let client to make a booking.
//In the modal, the days with booking will be displayed as "checked".
//Admin could modify the avaliable status of the check boxes.
const DaysModification = props => {
  //Current available days and time for each type of meetings. Information from data base.
  const availableDays = props.availableTimeInfo.split(",");
  const [monAvailable, setMonAvailable] = useState(availableDays[0] === "Monnull" ? false: true);
  const [tueAvailable, setTueAvailable] = useState(availableDays[1] === "Tuenull" ? false: true);
  const [wedAvailable, setWedAvailable] = useState(availableDays[2] === "Wednull" ? false: true);
  const [thuAvailable, setThuAvailable] = useState(availableDays[3] === "Thunull" ? false: true);
  const [friAvailable, setFriAvailable] = useState(availableDays[4] === "Frinull" ? false: true);
  //Meeting start and end time for saving.
  const [monStart, setMonStart] = useState(monAvailable ? availableDays[0].substring(3, 8) : "09:00");
  const [tueStart, setTueStart] = useState(tueAvailable ? availableDays[1].substring(3, 8) : "09:00");
  const [wedStart, setWedStart] = useState(wedAvailable ? availableDays[2].substring(3, 8) : "09:00");
  const [thuStart, setThuStart] = useState(thuAvailable ? availableDays[3].substring(3, 8) : "09:00");
  const [friStart, setFriStart] = useState(friAvailable ? availableDays[4].substring(3, 8) : "09:00");
  const [monEnd, setMonEnd] = useState(monAvailable ? availableDays[0].substring(availableDays[0].length-5) : "17:00");
  const [tueEnd, setTueEnd] = useState(tueAvailable ? availableDays[1].substring(availableDays[1].length-5) : "17:00");
  const [wedEnd, setWedEnd] = useState(wedAvailable ? availableDays[2].substring(availableDays[2].length-5) : "17:00");
  const [thuEnd, setThuEnd] = useState(thuAvailable ? availableDays[3].substring(availableDays[3].length-5) : "17:00");
  const [friEnd, setFriEnd] = useState(friAvailable ? availableDays[4].substring(availableDays[4].length-5) : "17:00");

  //Handel change functions, get all user informations.
  const handleMonStartTime = e => {
    setMonStart(e.target.value);
  }
  const handleTueStartTime = e => {
    setTueStart(e.target.value);
  }
  const handleWedStartTime = e => {
    setWedStart(e.target.value);
  }
  const handleThuStartTime = e => {
    setThuStart(e.target.value);
  }
  const handleFriStartTime = e => {
    setFriStart(e.target.value);
  }
  const handleMonEndTime = e => {
    setMonEnd(e.target.value);
  }
  const handleTueEndTime = e => {
    setTueEnd(e.target.value);
  }
  const handleWedEndTime = e => {
    setWedEnd(e.target.value);
  }
  const handleThuEndTime = e => {
    setThuEnd(e.target.value);
  }
  const handleFriEndTime = e => {
    setFriEnd(e.target.value);
  }


  //The information need to be submitted to the database.
  const handleSubmit = e => {
    e.preventDefault();
    // const modification = `Mon${monAvailable? monStart+"-"+monEnd: "null"},`+
    //                      `Tue${tueAvailable? tueStart+"-"+tueEnd: "null"},`+
    //                      `Wed${wedAvailable? wedStart+"-"+wedEnd: "null"},`+
    //                      `Thu${thuAvailable? thuStart+"-"+thuEnd: "null"},`+
    //                      `Fri${friAvailable? friStart+"-"+friEnd: "null"}`;
    const updateInfo = (weekdaysInfo, startTime, endTime) => {
      let result = "";
      if(weekdaysInfo.length > 7){
        result = weekdaysInfo.replace(weekdaysInfo.substring(3,8), startTime).replace(weekdaysInfo.substring(weekdaysInfo.length-5), endTime).substring(3);
        
      }
      else{
        result = startTime+"-"+endTime;
      }
      return result;
    }
    const modification = `Mon${monAvailable? updateInfo(availableDays[0], monStart, monEnd): "null"},`+
                         `Tue${tueAvailable? updateInfo(availableDays[1], tueStart, tueEnd): "null"},`+
                         `Wed${wedAvailable? updateInfo(availableDays[2], wedStart, wedEnd): "null"},`+
                         `Thu${thuAvailable? updateInfo(availableDays[3], thuStart, thuEnd): "null"},`+
                         `Fri${friAvailable? updateInfo(availableDays[4], friStart, friEnd): "null"}`;
    const submitInfo = props.docID + "%" + modification;

    props.dispatch({type:"setAvailableTime", availableTime:modification});

    fetch("http://localhost:5000/availabletimemodify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({submitInfo})
      })
  }

  return (
    <Form id="availableTimeChange" onSubmit={handleSubmit}>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="availableDaysInfo">Days</Label>
            <div style={{marginTop:"5px"}}>
              <CustomInput
                          type="switch" 
                          id="Mon" 
                          label="Monday" 
                          checked={monAvailable}
                          onChange={() => setMonAvailable(!monAvailable)}/>
            </div>
            <div style={{marginTop:"15px"}}>
              <CustomInput 
                          type="switch" 
                          id="Tue" 
                          label="Tuesday" 
                          checked={tueAvailable}
                          onChange={() => setTueAvailable(!tueAvailable)}/>
            </div>
            <div style={{marginTop:"15px"}}>
              <CustomInput 
                          type="switch" 
                          id="Wed" 
                          label="Wednesday" 
                          checked={wedAvailable}
                          onChange={() => setWedAvailable(!wedAvailable)}/>
            </div>
            <div style={{marginTop:"15px"}}>
              <CustomInput
                          type="switch" 
                          id="Thu" 
                          label="Thursday" 
                          checked={thuAvailable}
                          onChange={() => setThuAvailable(!thuAvailable)}/>
            </div>
            <div style={{marginTop:"15px"}}>
              <CustomInput 
                          type="switch" 
                          id="Fri" 
                          label="Friday" 
                          checked={friAvailable}
                          onChange={() => setFriAvailable(!friAvailable)}/>
            </div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="startTimePeriod">Select the start time</Label>
            <Input 
                  type="time" 
                  id="MonStartTime"
                  step="900" 
                  defaultValue= {monStart} min="09:00" max="16:45"
                  disabled={monAvailable ? false : true}
                  onChange={handleMonStartTime}></Input>
            <Input 
                  type="time" 
                  id="TueStartTime"
                  step="900" 
                  defaultValue={tueStart} min="09:00" max="16:45"
                  disabled={tueAvailable ? false : true}
                  onChange={handleTueStartTime}></Input>
            <Input 
                  type="time" 
                  id="WedStartTime"
                  step="900" 
                  defaultValue={wedStart} min="09:00" max="16:45"
                  disabled={wedAvailable ? false : true}
                  onChange={handleWedStartTime}></Input>
            <Input 
                  type="time" 
                  id="ThuStartTime"
                  step="900" 
                  defaultValue={thuStart} min="09:00" max="16:45"
                  disabled={thuAvailable ? false : true}
                  onChange={handleThuStartTime}></Input>
            <Input 
                  type="time" 
                  id="FriStartTime"
                  step="900" 
                  defaultValue={friStart} min="09:00" max="16:45"
                  disabled={friAvailable ? false : true}
                  onChange={handleFriStartTime}></Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="endTimePeriod">Select the end time</Label>
            <Input 
                  type="time" 
                  id="MonEndTime"
                  step="900" 
                  defaultValue={monEnd} min="09:15" max="17:00"
                  disabled={monAvailable ? false : true}
                  onChange={handleMonEndTime}></Input>
            <Input 
                  type="time" 
                  id="TueEndTime"
                  step="900" 
                  defaultValue={tueEnd} min="09:15" max="17:00"
                  disabled={tueAvailable ? false : true}
                  onChange={handleTueEndTime}></Input>
            <Input 
                  type="time" 
                  id="WedEndTime"
                  step="900" 
                  defaultValue={wedEnd} min="09:15" max="17:00"
                  disabled={wedAvailable ? false : true}
                  onChange={handleWedEndTime}></Input>
            <Input 
                  type="time" 
                  id="ThuEndTime"
                  step="900" 
                  defaultValue={thuEnd} min="09:15" max="17:00"
                  disabled={thuAvailable ? false : true}
                  onChange={handleThuEndTime}></Input>
            <Input 
                  type="time" 
                  id="FriEndTime"
                  step="900" 
                  defaultValue={friEnd} min="09:15" max="17:00"
                  disabled={friAvailable ? false : true}
                  onChange={handleFriEndTime}></Input>
          </FormGroup>
        </Col>  
      </Row>
      <Button type="submit" hidden></Button>
    </Form>
  )
}

export default function AvailableDaysModification(props){
  const docID = props.docID;
  const dispatch = useDispatch();
  const [availableTimeInfo, setAvailableTimeInfo] = useState([]);
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
        dispatch({type:"setAvailableTime", availableTime:data[0].available_time});
      });
  }
  const [modal, setModal] = useState(false);
  const modalToggle = () => {
    setModal(!modal);
  }
  return(
    <div>
      <Button size="sm" color="warning" onClick={() => modalToggle()}>Available Days Modification</Button>
      <Modal isOpen={modal} toggle={modalToggle} size="lg">
        <ModalHeader toggle={() => modalToggle()}>Available Days Modification</ModalHeader>
        <ModalBody><DaysModification availableTimeInfo={availableTimeInfo} docID={docID} dispatch={dispatch}/></ModalBody>
        <ModalFooter>
        <Button color="danger" onClick={() => modalToggle()}>Close</Button>
        <Button form='availableTimeChange' 
                type="submit" 
                color="success" 
                onClick={() => {window.location.href=`http://localhost:3000/mycalendar/${docID}`}}>Submit</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}