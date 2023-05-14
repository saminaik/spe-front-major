import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
export default function GetPatients() {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // console.log(location.state.id.id.id);
    try {
      const token = location.state.id.id.token;
      console.log(token);
      const url = `http://localhost:8081/api/admin/patients`;
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("result");
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>List of patients</h1>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <></>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>

                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
