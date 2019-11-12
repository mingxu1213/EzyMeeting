import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export default function ShareLink (props) {
  const [modal, setModal] = useState(false);
  const modalToggle = () => {
    setModal(!modal);
  }
  const shareLink = `http://localhost:3000/client/${props.docID}`;
  const copyLink = link => {
    navigator.clipboard.writeText(link);
    alert("Successful copied to clipboard");
  }
  return(
    <div>
      <Button 
        size="sm" 
        color="info" 
        onClick={() => modalToggle()}>share</Button>
      <Modal isOpen={modal} toggle={modalToggle} size="lg">
          <ModalHeader toggle={() => modalToggle()}>Share this link with your clients:</ModalHeader>
          <ModalBody>
            <div style={{fontSize:"10px"}}>{shareLink}</div>
            <p></p>
            <div style={{fontSize:'15px'}}>Click the 'Copy' button and share the link with your clients.</div>
          </ModalBody>
          <ModalFooter>
          <Button 
            color="success" 
            onClick={() => {modalToggle(); copyLink(shareLink)}}>Copy</Button>
          <Button 
            color="danger" 
            onClick={() => modalToggle()}>Cancel</Button>
          </ModalFooter>
      </Modal>
    </div>
  );
}