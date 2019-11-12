import React, {useState, useEffect} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, Input} from 'reactstrap';
import {useDispatch} from 'react-redux';  
import '@fortawesome/fontawesome-free/css/all.css';


const SubjectModification = props => {
  const [subjects, setSubjects] = useState(props.subjectList === null ? "" : props.subjectList);
  const [inputSubject, setInputSubject] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch({type:"setMeetingType", meetingType: subjects});
    const submitInfo = props.docID + "%" + subjects;
    fetch("http://localhost:5000/subjectsmodify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({submitInfo})
      })
  }
  const handleChange = e => {
    setInputSubject(e.target.value);
  }
  return (
    <Form id="meetingSubjects" onSubmit={handleSubmit}>
      <Row form>
        {subjects === "" ? 
          <div>
            <h3>Meeting subject list is empty!</h3>
            <br/><br/>
            Please add your first meeting subject.
            <Input type="text" onChange={handleChange}/>
            <Button 
              size="sm" 
              color="info"
              onClick={() => setSubjects(subjects + inputSubject + ",")}>Add subject
            </Button>
          </div>
          :<div>
            <h3 style={{width: "50vw"}}>Current subject list</h3>
            {subjects.split(",").map(item => {
              if(item !== ""){
                return(
                  <Row key={item}>
                    <Col md={6}>{item}</Col>
                    <Col md={6}>
                      <i className="fas fa-times-circle mr-3" 
                         onClick={() => setSubjects(subjects.replace(item+",", ""))}></i>
                    </Col>
                  </Row>
                )
              }
            })}
            <br/><br/>
            <Input type="text" onChange={handleChange}/>
            <Button 
              size="sm" 
              color="info"
              onClick={() => subjects.split(",").includes(inputSubject) ? null : setSubjects(subjects + inputSubject + ",")}>Add subject
            </Button>
          </div>}
      </Row>
    </Form>
  )
}

export default function MeetingSubjects(props){
  const docID = props.docID;
  const dispatch = useDispatch();
  const [subjectList, setSubjectList] = useState([]);
  useEffect(() => {
    fetchAvailableTime();
  }, []);
  //Get the calendar information from server
  const fetchAvailableTime = async () => {
    await fetch("http://localhost:5000/subjectsinfo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({docID})
      })
      .then(res => res.json())
      .then(data => {
        setSubjectList(data[0].meeting_subject);
        dispatch({type:"setMeetingType", meetingType:data[0].meeting_subject});
      });
  }
  const [modal, setModal] = useState(false);
  const modalToggle = () => {
    setModal(!modal);
  }
  return(
    <div>
      <Button size="sm" color="warning" onClick={() => modalToggle()}>Meeting Subjects Modification</Button>
      <Modal isOpen={modal} toggle={modalToggle} size="lg">
        <ModalHeader toggle={() => modalToggle()}>Meeting Subjects</ModalHeader>
        <ModalBody><SubjectModification subjectList={subjectList} docID={docID} dispatch={dispatch}/></ModalBody>
        <ModalFooter>
        <Button color="danger" onClick={() => modalToggle()}>Close</Button>
        <Button form='meetingSubjects' type="submit" color="success" onClick={() => {window.location.href=`http://localhost:3000/mycalendar/${docID}`}}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}