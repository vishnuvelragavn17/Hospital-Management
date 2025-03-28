import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PatientInfoPage.css"

export default function PatientInfoPage() {
  const location = useLocation();//gets the data that we passed when navigating to this page
  const navigate = useNavigate();//alows to navigate to another page
  // const patientData = location.state?.patient.data || {}; // Extract patient data
  const patientData = useMemo(() => location.state?.patient.data || {}, [location.state?.patient.data]);
  // Store editable data
  const [formData, setFormData] = useState({ ...patientData });//...patientDate copies the patient detail into formData
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode // default false which is readonly

  useEffect(() => {
    setFormData({ ...patientData });
  }, [patientData]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Patient Info
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/patients/${formData.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to update patient.");
      }

      const updatedData = await response.json();
      setFormData(updatedData.data); // Ensure updated data is reflected
      alert("Patient information updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      alert(`Error updating patient: ${error.message}`);
    }
  };

  // Delete Patient
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/patients/${formData.email}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to delete patient.");
      }

      alert("Patient deleted successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      alert(`Error deleting patient: ${error.message}`);
    }
  };

  return (
    <div className="getpatientinfo">
      <div className="getpatientinfo-form-container">
        <h2 className="getpatientinfo-center-text">Patient Information</h2>
        <button className="back-button-getpatientinfo" onClick={() => navigate(-1)}>⬅ Back</button>
        <form className="getpatientinfo-form">
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">First Name:</label>
            <input className="getpatientinfo-input" type="text" name="First_name" value={formData.First_name} onChange={handleChange} readOnly />
          </div>
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">Last Name:</label>
            <input className="getpatientinfo-input" type="text" name="Last_name" value={formData.Last_name} onChange={handleChange} readOnly />
          </div>
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">Email:</label>
            <input className="getpatientinfo-input" type="email" name="email" value={formData.email} onChange={handleChange} readOnly />
          </div>
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">Age:</label>
            <input className="getpatientinfo-input" type="number" name="age" value={formData.age} onChange={handleChange} readOnly />
          </div>
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">Address:</label>
            <input className="getpatientinfo-input" type="text" name="address" value={formData.address} onChange={handleChange} readOnly={!isEditing} />
          </div>
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">PhoneNo:</label>
            <input className="getpatientinfo-input" type="number" name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} readOnly={!isEditing} />
          </div>
          <div className="getpatientinfo-form-group">
            <label className="getpatientinfo-label">Medical History:</label>
            <input className="getpatientinfo-input" type="text" name="medical_history" value={formData.medical_history} onChange={handleChange} readOnly={!isEditing} />
          </div>
          <div className="getpatientinfo-button-group">
            {isEditing ? (
              <button type="button" onClick={handleUpdate}>Save</button>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}


