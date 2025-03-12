import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./ExampleComponent.css"

const ExampleComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from an API
    fetch('http://localhost:3000/api/v1/patients')

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        setData(responseData.data);
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
      <h1 className='getpatients-title'>Patient Details</h1>
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <ul>
        <div className="getpatients-table-container">
          <table className="getpatients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th>Phone No:</th>
                <th>Medical History</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id}>
                  <td>{post._id}</td>
                  <td>{post.First_name}</td>
                  <td>{post.Last_name}</td>
                  <td>{post.email}</td>
                  <td>{post.age}</td>
                  <td>{post.address}</td>
                  <td>{post.emergency_contact}</td>
                  <td>{post.medical_history}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ul>
    </div>
  );
};

export default ExampleComponent;
