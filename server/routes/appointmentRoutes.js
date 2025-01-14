const express = require("express");
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

//Appointment API

//appointment api
router.post('/appointments', appointmentController.postAppointment)

//get appointment api
router.get('/appointments', appointmentController.getAppointments)

//get appointment api by email
router.get('/appointments/:patient_email', appointmentController.getAppointment)

//update appointment api
router.put('/appointments/:patient_email', appointmentController.updateAppointment)

//delete appointment api
router.delete('/appointments/:patient_email', appointmentController.deleteAppointment)

module.exports = router;