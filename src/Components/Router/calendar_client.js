import React, {useState, useEffect} from 'react';
import ClientInterface from '../Calendar/client_interface/client_interface_app';



export default function Display({match}){
  useEffect(() => {
    fetchToken();
  }, []);
  const name = match.params.name;
  const [bookingSlots, setBookingSlots] = useState([]);
  //Get the calendar information from server
  const fetchToken = async () => {
    await fetch("http://localhost:5000/calendarinfo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name})
      })
      .then(res => res.json())
      .then(data => {
        setBookingSlots(data);
      });
  }
  return(
    <div>
      <ClientInterface bookingSlots={bookingSlots} docID={name}/>
    </div>
  )
}
