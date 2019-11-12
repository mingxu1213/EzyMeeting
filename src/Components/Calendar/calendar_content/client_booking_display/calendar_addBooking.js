import React, {useState} from 'react';
import moment from 'moment';
import {Button, Col, Row, Form, FormGroup, Label, Input} from 'reactstrap';

//This is the add booking to microsoft calendar function.
//The information added by the user will be sent to the server, then the server will send the request to Microsoft server
//to add the booking.
//If the user is admin, user can browse all meeting subject.
//If the user is client, the user can only select the subject from navbar. User can not modify the default subject in modal window.
export default function AddBooking(props){
  const availableSubjects = props.availableSubjects;
  const eventEndTime = moment(props.id).add(15, "m").format("YYYY-MM-DDTHH:mm:ss");
  //The format of event js.
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState("");

  //Handel change functions, get all user informations.
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handleIDChange = e => {
    setId(e.target.value);
  }
  const handleSubjectChange = e => {
    setSubject(e.target.value);
  }
  const handleNotesChange = e => {
    setNotes(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    let eventInfo = [];
    eventInfo.push(subject, notes, props.id, eventEndTime, email, id, props.docID);
    //Send the user info to server.
    fetch("http://localhost:5000/addbooking", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({eventInfo})
      })
      .then(window.history.go(0));
  }

  return(
    <Form id="bookingInfo" onSubmit={handleSubmit}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input type="email" id="Email" placeholder="studentID@qut.edu.au"
                    onChange={handleEmailChange}/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="studentID">Student ID</Label>
            <Input type="text" id="studentID" placeholder="your student ID"
                    onChange={handleIDChange}/>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <FormGroup>
          <Label for="subject">Select Service</Label>
          <Input type="select" id="subject" onChange={handleSubjectChange}>
            <option value="">-----------Options----------</option>
            {availableSubjects.split(",").map(subject => 
              <option key={subject} value={subject}>{subject}</option>
            )}
          </Input>
        </FormGroup>
      </Row>
      <Row form>
        <Label for="notes">Special Requests</Label>
        <Input type="textarea" id="notes" onChange={handleNotesChange}/>
      </Row>
      <Button type="submit" hidden></Button>
    </Form>
  )
}