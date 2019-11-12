import React, { useState } from 'react';
import CalendarFrame from './calendar_frame';
import { Button, Container, Row, Col } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.css';


//This is the layout of the application interface.
//There are three parts: current week button, calendar body, next week button.
//Two button could let user to choose current week or next week.
//Calendar body will display the calendar information and can be clicked by user to make booking.
export default function Body(props) {
  const [nextWeek, setNextWeek] = useState(false);
    //change to next week interface function
  const changeToNextWeek = () => {
    setNextWeek(true);
  }
    //change to current week interface function
  const changeToCurrentWeek = () => {
    setNextWeek(false);
  }

  return (
    <Container fluid>
      <Row>
        {props.user === "admin" ? null :
          <Col xs="0">
            <Button 
              size="sm" 
              style={{ width: "60px", height:"100%" }}
              outline color="primary" 
              onClick={() => changeToCurrentWeek()}>
              <i style={{fontSize:"100px"}} className="fas fa-caret-left mr-3 "></i>Current Week
            </Button>
          </Col>}
        <Col fluid='true'>
          <CalendarFrame
            nextWeek={nextWeek} 
            docID={props.docID} 
            user={props.user}
            bookingSlots = {props.bookingSlots}/>
        </Col>
        {props.user === "admin" ? null :
          <Col xs="0">
            <Button 
              size="sm" 
              style={{ width: "60px", height:"100%" }} 
              outline color="primary" 
              onClick={() => changeToNextWeek()}>
              <i style={{fontSize:"100px"}} className="fas fa-caret-right ml-3 "></i>Next Week</Button>
          </Col>}
    </Row>
  </Container>
  )
}