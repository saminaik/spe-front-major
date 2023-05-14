
import './App.css';

import DoctorList from './components/DoctorList';

import PatientRegistration from './Pages/PatientRegister';
import PatientDashboard from './Pages/PatientDashboard';
import DoctorDashboard from './Pages/Doctor/DoctorDashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import PatientBookAppointment from './Pages/PatientBookAppoinment';
import Login from './Pages/Login';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientSeeAppointment from './Pages/PatientSeeAppointment';
import PatientAskQuery from './Pages/PatientAskQuery';
import GetPatients from './Pages/Admin/GetPatients';
import GetDoctors from './Pages/Admin/GetDoctors';
import AddDoctor from './Pages/Admin/AddDoctor';
import RemoveTheDoctor from './Pages/Admin/RemoveTheDoctor';
import ApproveAppointments from './Pages/Doctor/ApproveAppointments';
import ReplyQuery from './Pages/Admin/ReplyQuery';
import SeePatients from './Pages/Doctor/SeePatients';
import GivePriscription from './Pages/Doctor/GivePriscription';
import SeePriscription from './Pages/SeePriscription';
import PatientPrescription from './Pages/PatientPrescription';
import PatientQuiries from './Pages/PatientQuiries';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/patientRegistration" element={<PatientRegistration/>}/>

          <Route exact path="/patientDashboard" element={<PatientDashboard/>}/>
          <Route exact path="/doctorDashboard" element={<DoctorDashboard/>}/>
          <Route exact path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route exact path="/patientBookAppointment" element={<PatientBookAppointment/>}/>
          <Route exact path="/patientSeeAppointment" element={<PatientSeeAppointment/>}/>
          <Route exact path="/patientAskQuery" element={<PatientAskQuery/>}/>
          <Route exact path="/getPatient" element={<GetPatients></GetPatients>}/>
          <Route exact path="/getDoctors" element={<GetDoctors/>}/>
          <Route exact path="/addDoctors" element={<AddDoctor/>}/>
          <Route exact path="/removeDoctors" element={<RemoveTheDoctor/>}/>
          <Route exact path="/approveAppoinments" element={<ApproveAppointments/>}/>
          <Route exact path="/replyQuery" element={<ReplyQuery/>}/>
          <Route exact path="/precription" element={<SeePatients/>}/>
          <Route exact path="/pris" element={<GivePriscription/>}/>
          <Route exact path="/seePris" element={<SeePriscription/>}/>
          <Route exact path="/seePatientPrescription" element={<PatientPrescription/>}/>
          <Route exact path="/seequery" element={<PatientQuiries/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
