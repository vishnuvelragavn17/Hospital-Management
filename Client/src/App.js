import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PatientActions from "./components/PatientDropDown/PatientdropDown";
import CreatePatientPage from "./components/CreatePatient/CreatePatientPage";
import GetPatientPage from "./components/GetPatient/GetPatientPage";
import PatientInfoPage from "./components/GetPatient/PatientInfoPage";
import AppointmentActions from "./components/AppointmentDropDown/Appointmentdropdown";
import CreateAppointmentPage from "./components/CreateAppointment/CreateAppointmentPage";
import GetAppointmentPage from "./components/GetAppointment/GetAppointmentPage";
import AppointmentInfoPages from "./components/GetAppointment/AppointmentInfoPage";
import ExampleComponent from "./components/GetPatients/ExampleComponent";
import ExampleAppointment from "./components/GetAppointments/ExampleAppointment";
import TwoButton from "./components/Button/TwoButton";




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TwoButton/>}/>
        </Routes>
        <Routes>
          <Route path="/patient" element={<PatientActions />} />
          <Route path="/createpatient" element={<CreatePatientPage />} />
          <Route path="/getpatient" element={<GetPatientPage />} />
          <Route path="/getpatients" element={<ExampleComponent />} />
          <Route path="/getinfo" element={<PatientInfoPage />} />
          <Route path="/home" element={<PatientActions />} />

        </Routes>
        <Routes>
          <Route path="/appointment" element={<AppointmentActions />} />
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
