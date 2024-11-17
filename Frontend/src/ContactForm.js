import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = ({ fetchContacts }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    setError("");
    setSuccessMessage("");

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.company ||
      !formData.jobTitle
    ) {
      setError("All fields are required.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(formData.email)) {
      setError("Email should be a valid Gmail address.");
      return false;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(formData.firstName)) {
      setError("First name should not contain numbers.");
      return false;
    }
    if (!namePattern.test(formData.lastName)) {
      setError("Last name should not contain numbers.");
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      setError("Phone number should be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/contacts", formData);
      fetchContacts();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        jobTitle: "",
      });
      setSuccessMessage("Contact added successfully!");
    } catch (err) {
      setError("Failed to add contact.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
        />
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
        />
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default ContactForm;


