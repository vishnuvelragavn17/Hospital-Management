import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAppointmentPage.css"; 

const CreateAppointmentPage = () => {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    doctorName: "",
    patientEmail: "",
    appointmentStatus: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="createappointment-container">
      <button className="createappointment-backbutton" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="createappointment-header">Create Appointment Info</h2>
      
      <form className="createappointment-form" onSubmit={handleSubmit}>
        {/* Appointment Date Field */}
        <div className="createappointment-field">
          <label className={formData.appointmentDate ? "filled" : ""}>
            Appointment Date
          </label>
          <input
            type="date"
            name="appointmentDate"
            className="createappointment-input"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Doctor Name Field */}
        <div className="createappointment-field">
          <label className={formData.doctorName ? "filled" : ""}>
            Doctor Name
          </label>
          <input
            type="text"
            name="doctorName"
            className="createappointment-input"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Patient Email Field */}
        <div className="createappointment-field">
          <label className={formData.patientEmail ? "filled" : ""}>
            Patient Email
          </label>
          <input
            type="email"
            name="patientEmail"
            className="createappointment-input"
            value={formData.patientEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* Appointment Status Dropdown */}
        <div className="createappointment-field">
          <label className={formData.appointmentStatus ? "filled" : ""}>
            Appointment Status
          </label>
          <select
            name="appointmentStatus"
            className="createappointment-select"
            value={formData.appointmentStatus}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Appointment Status
            </option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="createappointment-button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateAppointmentPage;
