// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PatientdropDown.css";

// const PatientActions = () => {
//   const [selectedAction, setSelectedAction] = useState("");
//   const navigate = useNavigate();

//   const handleAction = () => {
//     if (selectedAction) {
//       // Navigate to the appropriate page based on the selected action
//       switch (selectedAction) {
//         case "Create Patient":
//           navigate("/createpatient");
//           break;
//         case "Get Patient":
//           navigate("/getpatient");
//           break;
//         case "Get Patients":
//           navigate("/getpatients");
//           break;
//         default:
//           break;
//       }
//       //Get the option values
//       //check the option and navigate according to that
//     };
//   }
//   return (
//     <div className="container-patientdropdown">
//       <h2 className="header-patientdropdown">Patient</h2>
//       <select
//         className="dropdown-patientdropdown"
//         value={selectedAction}
//         onChange={(e) => setSelectedAction(e.target.value)}
//       >
//         <option value="" disabled>
//           Select Action
//         </option>
//         <option value="Create Patient">Create Patient</option>
//         <option value="Get Patient">Get Patient</option>
//         <option value="Get Patients">Get Patients</option>
//         {/* <option value="Update Patient">Update Patient</option>
//         <option value="Delete Patient">Delete Patient</option> */}
//       </select>
//       <button className="action-button-patientdropdown" onClick={handleAction} disabled={!selectedAction}>
//         Click
//       </button>
//       <p id="result"></p>
//     </div>
//   );
// };

// export default PatientActions;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientdropDown.css";

const PatientActions = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const navigate = useNavigate();

  const handleAction = () => {
    if (selectedAction) {
      // Navigate to the appropriate page based on the selected action
      switch (selectedAction) {
        case "Create Patient":
          navigate("/createpatient");
          break;
        case "Get Patient":
          navigate("/getpatient");
          break;
        case "Get Patients":
          navigate("/getpatients");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-container">
        <h2 className="patient-header">Patient</h2>
        <div className="patient-card">
          <select
            className="patient-dropdown"
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            <option value="" disabled>
              Select Action
            </option>
            <option value="Create Patient">Create Patient</option>
            <option value="Get Patient">Get Patient</option>
            <option value="Get Patients">Get Patients</option>
          </select>
          <button
            className="patient-button"
            onClick={handleAction}
            disabled={!selectedAction}
          >
            Click
          </button>
          <p id="result"></p>
        </div>
      </div>
    </div>
  );
};

export default PatientActions;
