import React, {useState} from 'react';
import {Button, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse,NavLink} from 'reactstrap';
import ShareLink from './sharelink';
import AdminAvailableDays from './admin_available';
import AdminMeetingSubjects from './admin_subjects';

//This is the share application link function. Admin can use this function to let the clients interact with the calendar.
//Main admin navbar functions. Including: 1. Modifying which days are available for clients to make a booking.
//                                        2. Modifying the available booking period for each type of meetings.
//                                        3. Share the application link with clients.
//                                        4. Log out function.
export default function AdminNavbar(props) {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const navToggle = () => {
    setNavIsOpen(!navIsOpen);
  }
  return(
    <Navbar color="primary" dark expand="md" style={{paddingTop:"0", paddingBottom:"0"}}>
      <NavbarBrand href="/">QUT</NavbarBrand>
      <NavbarToggler onClick={() => navToggle()} className="mr-2"/>
      <Collapse isOpen={navIsOpen} navbar>
        <Nav className="mr-auto" navbar> 
          {/* <NavItem>
            <NavLink><AvailableDaysModification docID={props.docID}/></NavLink>
          </NavItem>
          <NavItem>
            <NavLink><MeetingInfoModification docID={props.docID}/></NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink><AdminAvailableDays docID={props.docID} /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink><AdminMeetingSubjects docID={props.docID} /></NavLink>
          </NavItem>
        </Nav>
        <Nav className="justify-content-end" navbar>
          <NavItem>
            <NavLink><ShareLink docID={props.docID}/></NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button size="sm" onClick={() => {window.location.href = "http://localhost:3000/"}}>Sign Out</Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}