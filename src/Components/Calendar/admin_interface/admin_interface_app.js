import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import MainContent from '../calendar_content/main_content';
import AdminNav from '../navbar/admin/admin_navbar';
import '../style.css';

//Admin interface. There are two parts, the navbar and the calendar body which could visualize 
//the admin calendar information.
//The MainContent component will check the user ID. If the user is admin will have admin's function.
//If the user is client, the user can only access client's function. In this component the user is admin.
export default function App(props) {
  return(
    <div >
      <Container fluid className="background">
        <Row>
          <Col>
            <AdminNav docID={props.docID}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <MainContent docID={props.docID} user={"admin"}/>
          </Col>
        </Row>
      </Container>
    </div>  
  );
}