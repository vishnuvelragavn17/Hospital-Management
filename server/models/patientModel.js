const mongoose = require('mongoose');

//creating the patientSchema

const patientSchema = new mongoose.Schema({
    First_name: { type: String, required: true, match: /^[a-zA-Z\s]+$/ },
    Last_name: { type: String, required: true, match: /^[a-zA-Z\s]+$/ },
    email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    age: { type: String, required: true, },
    address: { type: String, required: true, },
    medical_history: { type: String },
    emergency_contact: { type: String, match: /^[1-9]\d{9}$/ },
    createdAt: { type: Date, default: Date.now }
});

//export the module schema

module.exports = mongoose.model('Patient', patientSchema);







