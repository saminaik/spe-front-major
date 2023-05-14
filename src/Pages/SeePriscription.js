
import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';

export default function SeePriscription() {
    const location = useLocation();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
        console.log("hello");
       // console.log(location.state.id.id.id);
    try {
        const id=location.state.id.id.id;
        console.log(id);
        const url = `http://localhost:8081/api/patients/see/appointments/approve/${id}`;
      const result = await axios.get(url, { headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} })
      console.log("hello");
      setUsers(result.data);
    } catch (error) {
   console.error(error);
    }
  }

  function seePriscrp(id1)
  {
    navigate("/seePatientPrescription", { state: { id: location.state,
    id1:id1 } });
  }
  return (
    <div className='container'>
        <div className='py-4'>
            <table className='table border shadow'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <></>

                        <th scope="col">Date</th>
                        <th scope="col">Registration Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>(
                            
                            <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                
                                <td>{user.date}</td>
                                <td>{user.id}</td>
                                <td><button
                          className="btn btn-dark btn-lg btn-block"
                          onClick={() => seePriscrp(user.id)}
                        >
                          See priscription
                        </button></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>

  )
}
