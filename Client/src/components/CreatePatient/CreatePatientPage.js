import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePatientPage.css";

function CreatePatientPage() {
  const [inputValue, setInputValue] = useState({
    Firstname: "", LastName: "", Email: "", Age: "", PhoneNo: "", Address: "", MedicalHistory: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(inputValue.PhoneNo)) {
      alert("Invalid phone number!");
      return;
    }

    const formattedData = {
      First_name: inputValue.Firstname,
      Last_name: inputValue.LastName,
      email: inputValue.Email,
      age: inputValue.Age,
      emergency_contact: inputValue.PhoneNo,
      address: inputValue.Address,
      medical_history: inputValue.MedicalHistory
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Form Submitted Successfully!");
      } else {
        alert(`Error: ${result.message || "Something went wrong!"}`);
      }

    } catch (error) {
      alert("An error occurred while submitting the form.");
    }

    setInputValue({ Firstname: "", LastName: "", Email: "", Age: "", PhoneNo: "", Address: "", MedicalHistory: "" });
  };

  const isFormValid = Object.values(inputValue).every(value => value.trim() !== "");

  return (
    <div className="createpatient-container">
      <h2 className="createpatient-title">Create Patient Info</h2>
      <button className="back-button-createpateint" onClick={() => navigate(-1)}>⬅ Back</button>
      <form className="createpatient-form" onSubmit={handleSubmit}>
        <input className="createpatient-input" type="text" name="Firstname" placeholder="Firstname" value={inputValue.Firstname} onChange={handleChange} />
        <input className="createpatient-input" type="text" name="LastName" placeholder="LastName" value={inputValue.LastName} onChange={handleChange} />
        <input className="createpatient-input" type="email" name="Email" placeholder="Email" value={inputValue.Email} onChange={handleChange} />
        <input className="createpatient-input" type="number" name="Age" placeholder="Age" value={inputValue.Age} onChange={handleChange} />
        <input className="createpatient-input" type="tel" name="PhoneNo" placeholder="PhoneNo" value={inputValue.PhoneNo} onChange={handleChange} pattern="[0-9]*" />
        <input className="createpatient-input" type="text" name="Address" placeholder="Address" value={inputValue.Address} onChange={handleChange} />
        <input className="createpatient-input" type="text" name="MedicalHistory" placeholder="MedicalHistory" value={inputValue.MedicalHistory} onChange={handleChange} />
        <button className="createpatient-button" type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}

export default CreatePatientPage;
