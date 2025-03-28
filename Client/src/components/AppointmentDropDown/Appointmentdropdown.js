import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointmentdropdown.css"

const AppointmentActions = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const navigate = useNavigate();

  const handleAction = () => {
    if (selectedAction) {
      // Navigate to the appropriate page based on the selected action
      switch (selectedAction) {
        case "Create Appointment":
          navigate("/createappointment");
          break;

        case "Get Appointment":
          navigate("/getappointment");
          break;
        case "Get Appointments":
          navigate("/getappointments");
          break;
        default:
          break;
      }
      //   //Get the option values
      //   //check the option and navigate according to that
    };
  }
  return (
    <div className="appointment-wrapper">
    <div className="appointment-container">
      <h2 className="appointment-header">Appointment</h2>
      <div className="appointment-card">
      <select
        className="appointment-dropdown"
        value={selectedAction}
        onChange={(e) => setSelectedAction(e.target.value)}
      >
        <option value="" disabled>
          Select Action
        </option>
        <option value="Create Appointment">Create Appointment</option>
        <option value="Get Appointment">Get Appointment</option>
        <option value="Get Appointments">Get Appointments</option>

          </select>
          
      <button className="appointment-button" onClick={handleAction} disabled={!selectedAction}>
        Click
      </button>
        <p id="result"></p>
        </div>
      </div>
      </div>
  );
};

export default AppointmentActions;





