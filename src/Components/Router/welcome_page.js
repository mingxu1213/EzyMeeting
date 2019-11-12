import React from 'react';
import {Jumbotron, Button, UncontrolledCarousel} from 'reactstrap';
import admin_interface from '../../images/admin_interface.jpg';
import meeting_modification from '../../images/meeting_modification.jpg';
import client_interface from '../../images/client_interface.jpg';
import share_link from '../../images/share_link.jpg';


//Get the authorized sign in link from server.
const SignIn = () => {
  fetch("http://localhost:5000/")
    .then(res => res.text())
    .then(data => window.location = data);
}
const item = [
  {
    src:admin_interface,
    caption: '1',
    header: "Admin interface"
  },
  {
    src:client_interface,
    caption: '2',
    header: "Client interface"
  },
  {
    src:share_link,
    caption: '3',
    header: "Share link with clients"
  },
  {
    src:meeting_modification,
    caption: '4',
    header: "Modify avaliable time"
  }
]
const Carousel = () => <UncontrolledCarousel items={item} />;

//This is the main application interface. The authorized sign in link is fetch from the server. After signing in, application routes
//to the admin interface. From this page, admin is able to edit their settings.
export default function Welcome() {
  return(
    <div className="background">
      <Jumbotron>
        <h1 className="display-5">Welcome to EzyMeeting!</h1>
        <p className="lead">This application is designed to allow clients to book appointments.
          The available time slots are automatically limitd to configured consultation hours but
          only for those times that are free in a linked Outlook calendar. Successful bookings will
          appear automatically in the Outlook calendar.
        </p>
        <hr className="my-2"/>
        <p>Please click the button to sign in you Microsoft account.</p>
        <p className="lead">
          <Button onClick={() => SignIn()} color="primary">Sign in</Button>
        </p>
      </Jumbotron>
      <Carousel />
    </div>
  );
}