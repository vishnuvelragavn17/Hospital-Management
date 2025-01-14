const Patient = require('../models/patientModel');

class PatientService {
    static async createPatient(pateintData) {
        const newPatient = new Patient(pateintData);
        const savedPatient = await newPatient.save();
        return savedPatient;
    }
    static async getPatients() {
        return Patient.find();

    }
    static async getPatient(email) {

        const patient = await Patient.findOne({ email });
        return patient;
    }
    static async updatePatient(email, updateDetails) {
        try {
            const patient = await Patient.findOne({ email });
            if (!patient) {
                return null;
            }
            Object.assign(patient, updateDetails);
            await patient.save();
            return patient;
        }
        catch (error) {
            throw new Error('Error updating patient details: ' + error.message);
        }
    }
    static async deletePatient(email) {
        const patient = await Patient.findOneAndDelete({ email });
        return patient;
    }
}
//{ email }//object parameter
//(email)// variable parameter


module.exports = PatientService;


