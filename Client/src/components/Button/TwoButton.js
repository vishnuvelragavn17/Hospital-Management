import React from "react";
import { useNavigate } from "react-router-dom";
import "./TwoButton.css"

export default function TwoButton() {
    const navigate = useNavigate();
    const handleActionPatient = () => {
        navigate("/patient");
    }
    const handleActionAppointment = () => {
        navigate("/appointment");
    }
    return (
        <div className="patientAppointment">
            {/* Primary Button */}
            <button className="patientButton" onClick={handleActionPatient}>
                Patient
            </button>

            {/* Secondary Button */}
            <button className="appointmentButton" onClick={handleActionAppointment}>
                Appointment
            </button>
        </div>
    );
}

