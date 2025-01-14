const PatientService = require('../service/patientService')

//creating the postPatient Method using async function

async function postPatient(req, res) {
  try {
    const patient = await PatientService.createPatient(req.body);
    res.status(201).json(patient);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//creating the getPatients Method using async function

async function getPatients(req, res) {
  try {
    // Call the service to get all patients
    const patients = await PatientService.getPatients();

    // Check if patients exist
    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    // Respond with all patients' details
    res.status(200).json({
      message: 'Patients retrieved successfully',
      data: patients,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in getAllPatients:', error.message);
    res.status(500).json({
      message: 'An error occurred while retrieving patients',
      error: error.message,
    });
  }
}

//creating the getPatient Method using async function

async function getPatient(req, res) {
  try {
    if (!req.params || !req.params.email) {
      return res.status(400).json({ message: 'Invalid request body. "email" is required.' });
    }
    const email = req.params.email;

    const patient = await PatientService.getPatient(email);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({
      message: 'Patients retrieved successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//creating the updatePatient Method using async function

async function updatePatient(req, res) {
  try {
    if (!req.params || !req.params.email) {
      return res.status(400).json({ message: 'Invalid request body. "email" is required.' });
    }
    const email = req.params.email;
    const updateDetails = req.body;

    const updatedpatient = await PatientService.updatePatient(email, updateDetails);

    if (!updatedpatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({
      message: 'Patient details updated successfully',
      data: updatedpatient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//creating the deletePatient Method using async function

async function deletePatient(req, res) {
  try {
    if (!req.params || !req.params.email) {
      return res.status(400).json({ message: 'Invalid request body. "email" is required.' });
    }
    const email = req.params.email;

    const patient = await PatientService.deletePatient(email);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({
      message: 'Patients Details Deleted successfully',
      data: patient,
    });


  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

//export the function method

module.exports = {
  postPatient, getPatients, getPatient, updatePatient, deletePatient
};
