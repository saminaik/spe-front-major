import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
function PatientRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    registrationDate: '',
    password: '',
    phoneNumber: '',
    address: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/v1/auth/patient/register', formData);
      console.log(response.data);
      if(response.status===200){
        Swal.fire(
            'Registered!',
            'Successfully!'
        
          )
          window.history.back();
     }
    } catch (error) {
      Swal.fire(
        'user already exist!'
        
    
      )
      console.error(error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (<div style={{ width: '50%', margin: '0 auto' }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>

    

      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number:</Form.Label>
        <Form.Control type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address:</Form.Label>
        <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
      </Form.Group>
    
      <Button variant="primary" type="submit" >Register</Button>
    </Form></div>
  );
}

export default PatientRegistration;
