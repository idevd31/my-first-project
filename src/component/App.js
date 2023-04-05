import React, { useState, useEffect } from "react";
import { uuid } from 'uuidv4';
import "./App.css";
import Header from './Header';
import Addcontact from "./Addcontact";
import Contactlist from "./Contactlist";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setcontacts] = useState([]);


  const addcontactHandler = (contact) => {
    console.log(contact);
    setcontacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removecontactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
  }

  useEffect(() => {
    const retrivecontacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrivecontacts) setcontacts(retrivecontacts);
  }, [])


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Header />
      <Addcontact addcontactHandler={addcontactHandler} />
      <Contactlist contacts={contacts} getContactId={removecontactHandler} />
    </div>
  )
}
export default App;