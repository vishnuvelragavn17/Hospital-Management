const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/mydb', { //database name
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

const patientSchema= new mongoose.Schema({
  First_name: { type: String, required: true,match:/^[a-zA-Z\s]+$/},
  Last_name: { type: String, required: true,match:/^[a-zA-Z\s]+$/},
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/},
  age: { type: String, required: true, },
  address: { type: String, required: true, unique: true },
  medical_history: {type:String},
  emergency_contact: { type: String, match:/^[1-9]\d{9}$/},
  createdAt:{ type: Date, default: Date.now }
});

// Create the Model
const Patient = mongoose.model('Patient', patientSchema);



// Define the Schema
const appointmentSchema= new mongoose.Schema({
  appointmentDate: { type: String, required: true, unique: true, match:/^\d{4}-\d{2}-\d{2}$/ },
  doctor_name: { type: String, required: true, unique: true,match:/^[a-zA-Z\s]+$/},
  patient_email : { type: String, required: true, unique: true,match:/^\S+@\S+\.\S+$/},
  status:{type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending'},
  createdAt: { type: Date, default: Date.now }
});

// Create the Model
const Appointment = mongoose.model('Appointment ', appointmentSchema);
 
// Create a user
app.post('/patients', async(req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    
    res.status(400).json({ message: error.message });
  }
});
  //get api
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients from the database
    res.status(200).json(patients); // Send the patients data as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

app.get('/patients/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Fetch patient details from the database
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update Patient Details by Email
app.put('/patients/:email', async (req, res) => {
  const { email } = req.params;
  const updatedData = req.body;

  try {
    // Find patient by email and update their details
    const updatedPatient = await Patient.findOneAndUpdate(
      { email }, // Filter
      updatedData, // Updated data
      { new: true, runValidators: true } // Options: return the updated document and validate fields
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/patients/:email', async (req, res) => {
  const { email } = req.params; // Extract the email from the request URL

  try {
    // Find and delete the patient by email
    const deletedPatient = await Patient.findOneAndDelete({ email });

    if (!deletedPatient) {
      // If no patient is found with the given email, return a 404 error
      return res.status(404).json({ error: "Patient not found" });
    }

    // Send a success response with the deleted patient's data
    res.status(200).json({
      message: "Patient deleted successfully",
      deletedPatient,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

//appointment api

app.post('/appointments', async(req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment .save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    
    res.status(400).json({ message: error.message });
  }
});

app.get('/appointments', async (req, res) => {
  try {
    const appointments= await Appointment.find(); 
    res.status(200).json(appointments); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

app.get('/appointments/:patient_email', async (req, res) => {
  const { patient_email } = req.params;

  try {
   
    const appointment = await Appointment.findOne({ patient_email });

    if (!appointment ) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
  
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/appointments/:patient_email', async (req, res) => {
  const { patient_email } = req.params;
  const updatedData = req.body;

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { patient_email }, 
      updatedData, 
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.delete('/appointments/:patient_email', async (req, res) => {
  const { patient_email } = req.params; 
  try {
    const deletedAppointment = await Appointment.findOneAndDelete({ patient_email });

    if (!deletedAppointment) {
     
      return res.status(404).json({ error: "Appointment not found" });
    }

    
    res.status(200).json({
      message: "Appointment deleted successfully",
      deletedAppointment,
    });
  } catch (error) {
 
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at <http://localhost:3000/>");
});



/*let patients = [
  {
    First_name: "Sam",
    Last_name: "Will",
    email: "Sam@gmail.com",
    age: 25,
    address: "No.128.Wall street,london",
    medical_history: "Leg Pain",
    emergency_contact: 123456789,
    createdAt: "11.12.2024"
  },
  {
    First_name: "Jhon",
    Last_name: "Deo",
    email: "Jhon@gmail.com",
    age: 30,
    address: "No.128.Cross road street,France",
    medical_history: "None",
    emergency_contact: 2456137892,
    createdAt: "07.12.2024"
  }
];*/
