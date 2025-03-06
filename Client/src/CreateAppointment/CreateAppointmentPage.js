import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAppointmentPage.module.css"; // ✅ Importing CSS Module

function CreateAppointmentPage() {
  const [inputValue, setInputValue] = useState({
    AppointmentDate: "",
    DoctorName: "",
    PatientEmail: "",
    Status: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    alert("Form Submitted");
    const formattedData = {
      appointmentDate: inputValue.AppointmentDate,
      doctor_name: inputValue.DoctorName,
      patient_email: inputValue.PatientEmail,
      status: inputValue.Status

    }
    try {
      const response = await fetch("http://localhost:3000/api/v1/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData)
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Response:", result);
        alert("Form Submitted Successfully!");
      } else {
        console.error("Error Response:", result);
        alert(`Error: ${result.message || "Something went wrong!"}`);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      alert("An error occurred while submitting the form.");
    }

  };

  const isFormValid =
    inputValue.AppointmentDate &&
    inputValue.DoctorName &&
    inputValue.PatientEmail &&
    inputValue.Status;

  return (
    <div className={styles.container}> {/* ✅ Scoped styles */}
      <h2 className={styles.centerText}>Create Appointment Info</h2>
      <button className={styles.backbuttoncreasteappointment} onClick={() => navigate(-1)}>⬅ Back</button>
      <form className={styles.form} onSubmit={handlesubmit}>
        <input
          type="text"
          name="AppointmentDate"
          placeholder="Appointment Date"
          value={inputValue.AppointmentDate}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="DoctorName"
          placeholder="Doctor Name"
          value={inputValue.DoctorName}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="email"
          name="PatientEmail"
          placeholder="Patient Email"
          value={inputValue.PatientEmail}
          onChange={handleChange}
          className={styles.input}
        />

        <select
          name="Status"
          value={inputValue.Status || "pending"}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>

        <button type="submit" disabled={!isFormValid} className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateAppointmentPage;
