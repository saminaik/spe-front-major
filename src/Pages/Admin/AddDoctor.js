import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function AddDoctor() {
  const location = useLocation();
  // console.log(location.state);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    timing: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = location.state.id.id.token;
      const response = await axios.post(
        "http://localhost:8081/api/admin/doctor",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="specialization">
          <Form.Label>Specialization:</Form.Label>
          <Form.Control
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="timing">
          <Form.Label>Timing:</Form.Label>
          <Form.Control
            type="text"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddDoctor;
