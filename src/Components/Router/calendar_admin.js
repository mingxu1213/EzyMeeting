import React, {useState, useEffect} from 'react';
import AdminInterface from '../Calendar/admin_interface/admin_interface_app';

//Get the admin calendar infromation from server. {match} is the table name of admin's information in database.

export default function Display({match}){
  const name = match.params.name;
  return(
    <div>
      <AdminInterface docID={name}/>
    </div>
  )
}
