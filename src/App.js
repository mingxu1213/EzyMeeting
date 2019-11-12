import React from 'react';
import Welcome from './Components/Router/welcome_page';
import CalendarAdmin from './Components/Router/calendar_admin';
import CalendarClient from './Components/Router/calendar_client';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


//This is the front-end router function.
//1. Default path="/" is the main interface of the application. Admin needs to sign in the Microsoft account here.
//2. path="/mycalendar/:name" is the admin interface after signning in.
//3. path="/client/:name" is the client interface when open the link shared by the admin.
function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Welcome} />
        <Route path="/mycalendar/:name" exact component={CalendarAdmin} />
        <Route path="/client/:name" exact component={CalendarClient} />
      </Router>
    </div>
  );
}

export default App;
