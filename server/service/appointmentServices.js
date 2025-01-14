const Appointment = require("../models/appointmentModel");

class AppointmentService {
    static async createAppointment(appointmentData) {
        const newAppointment = new Appointment(appointmentData);
        const savedAppointment = await newAppointment.save();
        return savedAppointment;
    }
    static async getAppointments() {
        return Appointment.find();
    }
    static async getAppointment(patient_email) {

        const appointment = await Appointment.findOne({ patient_email });
        return appointment;
    }
    static async updateAppointment(patient_email, updateDetails) {
        try {
            const appointment = await Appointment.findOne({ patient_email });
            if (!appointment) {
                return null;
            }
            Object.assign(appointment, updateDetails);
            await appointment.save();
            return appointment;
        }
        catch (error) {
            throw new Error('Error updating patient details: ' + error.message);
        }
    }
    static async deleteAppointment(patient_email) {
        const appointment = await Appointment.findOneAndDelete({ patient_email });
        return appointment;
    }
};


module.exports = AppointmentService;
