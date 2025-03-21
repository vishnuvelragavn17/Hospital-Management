const mongoose = require('mongoose');

//creating the appointmnetSchema

const appointmentSchema = new mongoose.Schema({
  appointmentDate: { type: String, required: true, unique: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  doctor_name: { type: String, required: true, unique: true, match: /^[a-zA-Z\s]+$/ },
  patient_email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

//export the module schema

module.exports = mongoose.model('Appointment', appointmentSchema);