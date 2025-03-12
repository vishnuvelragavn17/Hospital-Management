import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetAppointmentPage.css"


function GetAppointmentPage() {
  const [patient_email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const fetchAppointmentInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/appointments/${patient_email}`); // Replace with actual API
      if (!response.ok) {
        throw new Error("Appointment not found");//error message will be throw if API Fails
      }
      const data = await response.json();// Convert the response to javascript object

      console.log("Fetched Data:", data);// log the data

      navigate("/getappointmentinfo", { state: { appointment: data } });// Navigate to next page.Its help to passes the fetched data to the new page

    } catch (err) {
      setError(err.message);//patient not found are API fail this message will be shown
    }
  };
  return (
    <div className="getappointment">
      <button className="back-button-getappointment" onClick={() => navigate(-1)}>⬅ Back</button>
      <form onSubmit={fetchAppointmentInfo}> {/* When the form is submitted the fecthPatientInfo will be runs*/}

        <input
          type="email"
          name="Email"
          placeholder="Enter Email"
          value={patient_email}/*bind the input field to email state */
          onChange={handleChange}/*Update when user types*/
          required
        />
        <button type="submit">Get</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );


}
export default GetAppointmentPage;












