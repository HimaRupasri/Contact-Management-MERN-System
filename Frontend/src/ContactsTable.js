import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, Button, TableSortLabel, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, TextField, FormHelperText } from '@mui/material';
import axios from 'axios';
import './ContactsTable.css';

const ContactsTable = ({ contacts, fetchContacts }) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/contacts/${id}`)
      .then(response => {
        fetchContacts(); 
      })
      .catch(error => {
        console.error('Error deleting contact:', error);
      });
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedContact(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedContact({ ...selectedContact, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedContact.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (/\d/.test(selectedContact.firstName)) {
      newErrors.firstName = 'First name cannot contain numbers';
    }

    if (!selectedContact.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (/\d/.test(selectedContact.lastName)) {
      newErrors.lastName = 'Last name cannot contain numbers';
    }

    if (!selectedContact.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(selectedContact.email)) {
      newErrors.email = 'Email must be a valid Gmail address';
    }

    if (!selectedContact.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(selectedContact.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    if (!selectedContact.company) {
      newErrors.company = 'Company is required';
    }

    if (!selectedContact.jobTitle) {
      newErrors.jobTitle = 'Job title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = () => {
    if (validateForm()) {
      axios.put(`http://localhost:5000/contacts/${selectedContact._id}`, selectedContact)
        .then(response => {
          fetchContacts(); 
          handleCloseEditDialog();
        })
        .catch(error => {
          console.error('Error updating contact:', error);
        });
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (orderBy === 'firstName') {
      return sortDirection === 'asc' 
        ? a.firstName.localeCompare(b.firstName) 
        : b.firstName.localeCompare(a.firstName);
    }
    return 0;
  });

  const paginatedContacts = sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <TableContainer component={Card} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'firstName'}
                  direction={sortDirection}
                  onClick={() => handleSortRequest('firstName')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedContacts.map(contact => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(contact)} color="primary">Edit</Button>
                  <Button onClick={() => handleDelete(contact._id)} color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={selectedContact?.firstName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={selectedContact?.lastName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            value={selectedContact?.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={selectedContact?.phoneNumber || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            label="Company"
            name="company"
            value={selectedContact?.company || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.company}
            helperText={errors.company}
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={selectedContact?.jobTitle || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.jobTitle}
            helperText={errors.jobTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="default">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactsTable;
