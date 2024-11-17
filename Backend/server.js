const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/contacts', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
  try {
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });
    await newContact.save();
    res.status(201).send(newContact);
  } catch (err) {
    res.status(400).send('Error adding contact');
  }
});

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (err) {
    res.status(500).send('Error fetching contacts');
  }
});

app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(updatedContact);
  } catch (err) {
    res.status(400).send('Error updating contact');
  }
});

app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).send('Contact deleted');
  } catch (err) {
    res.status(400).send('Error deleting contact');
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
