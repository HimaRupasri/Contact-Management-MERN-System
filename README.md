******************_-------------------------------------------------------CONTACT MANAGEMENT-------------------------------------------------------_******************

Contact Management feature helps users of the system to keep a track of important contact information of customers / clients. It lets users add, view, update, and delete contact details all in one place. This makes it easy for users to find and manage information, which is especially helpful in a business setting where keeping track of relationships is key.

_Use Cases:_

Adding a New Contact: Users should be able to add a contact with essential details like name, email, phone number, company and job title. This allows users to add new customers.\
Viewing Contacts: A table view should list all contacts, with sorting and pagination options to make large contact lists easier to browse. This lets users efficiently locate any contact's information.\
Editing Contact Information: Users can update contact details when information changes, such as a new phone number or company. Keeping data current ensures effective communication and reliable records.\
Deleting a Contact: Users may need to remove outdated or duplicate entries, helping them keep their contact list clean and relevant.


**-----SetUp Instructions-----**

**FrontEnd**

**1.Install Node.js**
-Go to the official Node.js website. \
-Click the LTS version to download the .msi installer for Windows.\
-Once the .msi installer is downloaded, locate and double-click the file to begin the installation process.\
-verify installation using "node -v" command.

**2. Install create-react-app**\
-To install create-react-app globally run "npm install -g create-react-app"

**3. Create React application**\
-Create contact management application by using the command "npx create-react-app Frontend"\
-navigate to the project folder using "cd Frontend"\
-Run "npm start" to start the frontend applicaion.

**4. Install Packages**\
-Install Required Dependencies.\
---npm install react-router-dom\
---npm install axios\
---npm install @mui/material @emotion/react @emotion/styled\
-These commands will create a package.json file where all these dependencies are present. (You can see them in the package.json file inside the Frontend directory.)


**BackEnd**

**1. Install Node.js**
-Ensure Node.js is installed by running "node -v"

**2. SetUp directory structure**
-Create Backend directory and navigate to it using "cd Backend"\
-Run "npm init -y" to initialize the project. This will create a package.json file in the Backend directory\
-create server.js and .env files inside Backend directory

**3. Install dependencies**
-Use the following command "npm install express cors body-parser mongoose dotenv"

**4. Run the server**
-Type "node server.js" in the terminal


**DataBase**

-Use any database of your choice\
-Here I have used MongoDB\
-If you also use MongoDB make sure you download and install MongoDB shell\
-To test the data in the database use the type mongoosh in the terminal\
-To see the data stored run the following commands:\
&emsp;--use contactdb\
&emsp;--db.contacts.find()


**-----DataBase Schema-----**

name: {\
  &emsp;type: String,\
  &emsp;required: true,\
  &emsp;trim: true,\
},\
email: {\
  &emsp;type: String,\
  &emsp;required: true,\
  &emsp;unique: true,\
  &emsp;trim: true,\
  &emsp;match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],\
},\
phone: {\
  &emsp;type: String,\
  &emsp;required: true,\
  &emsp;unique: true,\
  &emsp;match: [/^\d{10}$/, 'Please enter a valid phone number'],\
},\
company: {\
  &emsp;type: String,\
  &emsp;required: true,\
  &emsp;trim: true,\
},\
jobTitle: {\
  &emsp;type: String,\
  &emsp;required: true,\
  &emsp;trim: true,\
}



**-----Entire Project Directory Structure-----**

erino-sde-assignment/\
├── backend/\
│&emsp;   ├── server.js\
│&emsp;   ├── .env\
│&emsp;   ├── package.json\
├── contact-management/\
│&emsp;   ├── src/\
│&emsp;   │&emsp;   ├── app.js\
│&emsp;   │&emsp;   ├── app.css\
│&emsp;   │&emsp;   ├── contactform.js\
│&emsp;   │&emsp;   ├── contactform.css\
│&emsp;   │&emsp;   ├── contactstable.js\
│&emsp;   │&emsp;   ├── contacttable.css\
│&emsp;   │&emsp;   ├── package.json\
│&emsp;   ├── package.json\
├── package.json





****-----How to run the application-----****

**Step-1**\
-Navigate to "./Backend" path\
-Run "node server.js" to start the server
-To check the server connection follow the link "http://localhost:5000/"\
-It will display an empty page
![image](https://github.com/user-attachments/assets/3f7b610e-b0d4-4d01-921d-e6350412daeb)

**Step-2:**\
-Navigate to "./Frontend\ path
-Run the "npm start" command\
-This will display the following page\
![image](https://github.com/user-attachments/assets/1b9f5698-5740-45c3-bfa6-7eee90720a0f)

**Step-3**\
-After adding contact details if you want to check your details or update or delete them, click on the contacts link\
-It will now display all the contacts contained with edit and delete buttons in sorted order of their first name\
-It will be seen as
![image](https://github.com/user-attachments/assets/a36cb709-b989-46d0-b2d1-3c40fd62efa9)

**Step-4**\
-When you click on edit button for a particular contact detail then it is displayed as
![image](https://github.com/user-attachments/assets/f27d45a3-0a6d-4216-a94d-aed5dabdc983)

**Step-5**\
-When you click on delete button then the particular contact will deleted by calling the delete api.\

**Step-6**\
-When you want to see the contact details using get api then follow the link "http://localhost:5000/contacts"
-Then it will display as
![image](https://github.com/user-attachments/assets/710c061e-a4ed-44ca-b13c-356ddd58af54)
