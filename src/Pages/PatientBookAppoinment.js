import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { useLocation, navigate } from 'react-router-dom';

export default function PatientBookAppointment() {
  const location = useLocation();
  console.log("hello");
  console.log(location.state.id.id.id);
  const patientId = location.state;

  const token=location.state.id.id.token;
  console.log(token)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8081/api/admin/doctors", { headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} });
      const updatedUsers = result.data.map(user => ({ ...user, selectedDate: '' }));
      setUsers(updatedUsers);
      
    } catch (error) {
   console.error(error);
    }
  };
  
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], selectedDate: value };
    setUsers(updatedUsers);
  };

  const handleAppointmentBooking = (user, patientId) => {
    // Check if the selectedDate is not empty
    if (!user.selectedDate) {
      return;
    }
    console.log(location.state.id.id.id);
    // Send a POST request to the API with the required data
    axios.post('http://localhost:8081/api/patients/appointments', {
      doctorId: user.id,
      patient_id: location.state.id.id.id,
      date: user.selectedDate,
      patient_name: location.state.id.id.firstName
  }, {
      headers: {"Authorization" : `Bearer ${location.state.id.id.token}`}
  })
  
    .then(response => {
      console.log(response.data); // Handle the response from the API as required
    })
    .catch(error => {
      console.log(user.selectedDate);
      console.log(user.id);
      console.error(error); // Handle any errors that occurred during the request
    });
  }

 

  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Specialization</th>
              <th scope="col">Timing</th>
              <th scope="col">Date for of Consultation</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.specialization}</td>
                <td>{user.timing}</td>
                <td>
                  <Form.Label>Registration Date:</Form.Label>
                  <Form.Control type="datetime-local" name="registrationDate" value={user.selectedDate} onChange={(event) => handleChange(event, index)} step="1" />

                </td>
                <td>
                  <Button
                    className='btn btn-primary mx-2'
                    disabled={!user.selectedDate}
                    onClick={() => handleAppointmentBooking(user)}
                  >
                    Book Appointment
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
