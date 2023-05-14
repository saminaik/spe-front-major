import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
export default function ApproveAppoinment() {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = location.state.id.id.token;
      const url = `http://localhost:8081/api/doctor/appointments/${location.state.id.id.id}`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(result.status);
      if (result.status === 200) {
        if (Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          setUsers([]);
        }
      } else {
        location.history.goBack();
      }
    } catch (error) {
      console.error(error);
      location.history.goBack();
    }
  };
  
  function approve(id) {
    const token = location.state.id.id.token;
    // console.log("sfjksakjfnaskjnfkajsnfkjansdjkf")
    console.log(token);
    axios
      .post(
        `http://localhost:8081/api/doctor/appoinmentApprove/${id}/APPROVED`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      .then((response) => {
        console.log("Request sent:", response.config.data);
        console.log(response.data);

        loadUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function cancel(id) {
    const token = location.state.id.id.token;
    // console.log("sfjksakjfnaskjnfkajsnfkjansdjkf")
    console.log(token);
    axios
      .post(
        `http://localhost:8081/api/doctor/appoinmentApprove/${id}/CANCELED`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      .then((response) => {
        console.log("Request sent:", response.config.data);
        console.log(response.data);

        loadUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h1>Appointment List</h1>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <></>
              <th scope="col">Registration NUmber</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Stauts</th>

              <th scope="col">Action</th>
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
                <td>{user.status}</td>

                <td>
                  <Button
                    className="btn btn-warning btn-lg btn-block"
                    onClick={() => approve(user.id)}
                  >
                    Approve Appointment
                  </Button>
                </td>
                <td>
                  <Button
                    className="btn btn-danger btn-lg btn-block"
                    onClick={() => cancel(user.id)}
                  >
                    Cancel Appointment
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
