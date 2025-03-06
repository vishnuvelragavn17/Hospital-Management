import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PatientActions from "./PatientdropDown";
import CreatePatientPage from "./CreatePatientPage";
import GetPatientPage from "./GetPatientPage";
import PatientInfoPage from "./PatientInfoPage";
import AppointmentActions from "./Appointmentdropdown";
import CreateAppointmentPage from "./CreateAppointmentPage";
import GetAppointmentPage from "./GetAppointmentPage";
import AppointmentInfoPages from "./AppointmentInfoPage";
import ExampleComponent from "./ExampleComponent";
import ExampleAppointment from "./ExampleAppointment";




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientActions />} />
          <Route path="/createpatient" element={<CreatePatientPage />} />
          <Route path="/getpatient" element={<GetPatientPage />} />
          <Route path="/getpatients" element={<ExampleComponent />} />
          <Route path="/getinfo" element={<PatientInfoPage />} />
          <Route path="/home" element={<PatientActions />} />

        </Routes>
        <Routes>
          <Route path="/" element={<AppointmentActions />} />
          <Route path="/createappointment" element={<CreateAppointmentPage />} />
          <Route path="/getappointment" element={<GetAppointmentPage />} />
          <Route path="/getappointmentinfo" element={<AppointmentInfoPages />} />
          <Route path="/getappointments" element={<ExampleAppointment />} />

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;


// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "start": "node server.js"
// },