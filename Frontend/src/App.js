import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import ContactsTable from './ContactsTable';
import axios from 'axios';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = () => {
    axios.get('http://localhost:5000/contacts')
      .then(response => {
        setContacts(response.data); 
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  };

  useEffect(() => {
    fetchContacts();  
  }, []); 

  return (
    <Router> 
      <div>
        
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/contacts">Contacts</Link> 
        </nav>

        <Routes>
          <Route path="/" element={<ContactForm fetchContacts={fetchContacts} />} />  
          <Route path="/contacts" element={<ContactsTable contacts={contacts} fetchContacts={fetchContacts} />} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
