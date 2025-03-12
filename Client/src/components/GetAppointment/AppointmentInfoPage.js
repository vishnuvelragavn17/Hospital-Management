import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AppointemntInfoPage.css"


export default function AppointmentInfoPages() {
  const location = useLocation();//gets the data that we passed when navigating to this page
  const navigate = useNavigate();//alows to navigate to another page
  const appointmentData = useMemo(() => location.state?.appointment.data || {}, [location.state?.appointment.data]);

  console.log("Appointment Date:", appointmentData)
  const [formData, setFormData] = useState({ ...appointmentData });//...patientDate copies the patient detail into formData
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData({ ...appointmentData });
  }, [appointmentData]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/appointments/${formData.patient_email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to update appointment.");
      }

      const updatedData = await response.json();
      setFormData(updatedData.data); // Ensure updated data is reflected
      alert("Appointment information updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      alert(`Error updating appointment: ${error.message}`);
    }
  };


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/appointments/${formData.patient_email}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to delete appointment.");
      }

      alert("Appointment deleted successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      alert(`Error deleting appointment: ${error.message}`);
    }
  };
  return (
    <div className="getappointmentinfo">
      <h2 className="getappointmentinfo-center-text">Appointment Information</h2>
      <button className="back-button-getappointmentinfo" onClick={() => navigate(-1)}>⬅ Back</button>
      <form className="getappointmentinfo-form">
        <div className="getappointmentinfo-form-group">
          <label className="getappointmentinfo-label">Appointment Date:</label>
          <input className="getappointmentinfo-input" type="text" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} readOnly={!isEditing} />

          <label className="getappointmentinfo-label">Doctor Name:</label>
          <input className="getappointmentinfo-input" type="text" name="doctor_name" value={formData.doctor_name} onChange={handleChange} readOnly={!isEditing} />

          <label className="getappointmentinfo-label">Patient Email:</label>
          <input className="getappointmentinfo-input" type="email" name="patient_email" value={formData.patient_email} onChange={handleChange} readOnly />
          <label className="getappointmentinfo-label">Status:</label>
          <select className="getappointmentinfo-input" name="status" value={formData.status} onChange={handleChange} disabled={!isEditing}>
            <option value="" disabled>Select status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="getappointmentinfo-button-group">
          {isEditing ? (
            <button type="button" onClick={handleUpdate}>Save</button>
          ) : (
            <button className="getappointmentinfo-button" type="button" onClick={() => setIsEditing(true)}>Edit</button>
          )}

          <button type="button" className="getappointmentinfo-delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );

}

