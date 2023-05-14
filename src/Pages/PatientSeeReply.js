import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
export default function PatientSeeReply() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // console.log(location.state.id.id.id);
    try {
      const token = location.state.id.id.token;
      console.log(location.state.id.id.id);
      const url = `http://localhost:8081/api/doctor/appointments/${location.state.id.id.id}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log("result");
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  function givePriscription(id1,patient_name) {
    console.log("heloooooo");
    
    navigate("/pris", {
      state: {
        id: location.state,
        name:patient_name,
        id1: id1,
      },
    });
  }

  return (
    <div className="container">
      <h1>Patient List</h1>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <></>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.id}</td>
                <td>{user.patient_name}</td>
                <td>{user.date}</td>

                <td>
                  <Button
                    className="btn btn-dark btn-lg btn-block"
                    onClick={() => givePriscription(user.id,user.patient_name)}
                  >
                    Give priscription
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
