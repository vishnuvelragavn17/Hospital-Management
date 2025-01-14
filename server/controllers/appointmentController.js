const AppointmentService = require('../service/appointmentServices');


//Creating Postappointment Method using async function

async function postAppointment(req, res) {
  try {
    const appointment = await AppointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};

//Creating getAppointments Method using async function

async function getAppointments(req, res) {
  try {
    const appointments = await AppointmentService.getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Creating getAppointment Method using async function

async function getAppointment(req, res) {

  try {
    if (!req.params || !req.params.patient_email) {
      return res.status(400).json({ message: 'Invalid request body. "email" is required.' });
    }
    const patient_email = req.params.patient_email;

    const appointment = await AppointmentService.getAppointment(patient_email);

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({
      message: 'Appointment retrieved successfully',
      data: appointment,
    });


  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Creating updateAppointments Method using async function

async function updateAppointment(req, res) {
  try {
    if (!req.params || !req.params.patient_email) {
      return res.status(400).json({ message: 'Invalid request body. "email" is required.' });
    }
    const patient_email = req.params.patient_email;
    const updateDetails = req.body;

    const updatedappointment = await AppointmentService.updateAppointment(patient_email, updateDetails);

    if (!updatedappointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({
      message: 'Appointment details updated successfully',
      data: updatedappointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Creating deleteAppointments Method using async function

async function deleteAppointment(req, res) {
  try {
    if (!req.params || !req.params.patient_email) {
      return res.status(400).json({ message: 'Invalid request body. "email" is required.' });
    }
    const patient_email = req.params.patient_email;

    const deletedAppointment = await AppointmentService.deleteAppointment(patient_email);

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
};

//export the async function

module.exports = {
  postAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment
};
