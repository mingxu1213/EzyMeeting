import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import MainContent from '../calendar_content/main_content';
import ClientNav from '../navbar/client/client_navbar';
import '../style.css';

export default function App(props) {
  return(
    <div >
      <Container fluid className="background">
        <Row>
          <Col>
            <ClientNav docID={props.docID}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <MainContent bookingSlots={props.bookingSlots} docID={props.docID} user={"client"}/>
          </Col>
        </Row>
      </Container>
    </div>  
  );
}