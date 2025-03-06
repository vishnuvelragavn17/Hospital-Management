import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./ExampleAppointment.css"


const ExampleAppointment = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from an API
    fetch('http://localhost:3000/api/v1/appointments')

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        setData(Array.isArray(responseData) ? responseData : []);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty array ensures this effect runs only once (on mount)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className='getappointments-title'>Appointment Details</h1>
      <button className="back-button-getappointments" onClick={() => navigate(-1)}>⬅ Back</button>

      <ul>
        <div className="getappointments-table-container">

          <table className="getappointments-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Appointment Date</th>
                <th>Doctor Name</th>
                <th>Patient Email</th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id}>
                  <td>{post._id}</td>
                  <td>{post.appointmentDate}</td>
                  <td>{post.doctor_name}</td>
                  <td>{post.patient_email}</td>
                  <td>{post.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </ul>
    </div>
  );
};

export default ExampleAppointment;
