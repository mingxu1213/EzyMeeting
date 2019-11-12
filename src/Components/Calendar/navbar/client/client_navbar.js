import React from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import '../../style.css';


export default function ClientNavbar(props) {
  return(
    <Navbar color="primary" dark expand="md" style={{paddingTop:"0", paddingBottom:"0"}}>
      <NavbarBrand href="/">QUT</NavbarBrand>
    </Navbar>
  )
}