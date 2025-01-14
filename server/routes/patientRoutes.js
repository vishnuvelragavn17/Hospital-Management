const express = require("express");
const patientController = require('../controllers/patientController');
const router = express.Router();

//post api
router.post('/patients', patientController.postPatient)

//get api
router.get('/patients', patientController.getPatients)

//get api by email
router.get('/patients/:email', patientController.getPatient)

// Update Patient Details by Email
router.put('/patients/:email', patientController.updatePatient)

// Delete Patient Details by Email delete api
router.delete('/patients/:email', patientController.deletePatient)

module.exports = router;