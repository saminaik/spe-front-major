import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
export default function PatientPrescription() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state.id1);
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    useEffect(() => {
      loadUsers();
    }, []);
  
    const loadUsers = async () => {
         // console.log(location.state.id1);
         // console.log(location.state.id.id.id);
      try {
          const id1=location.state.id1;
         
          const url = `http://localhost:8081/api/patients/getpres/${id1}`;
        const result = await axios.get(url, { headers: {"Authorization" : `Bearer ${location.state.id.id.id.token}`} })
        console.log(result);
        setUsers(result.data);
      } catch (error) {
     console.error(error);
      }
      try {
        const id1=location.state.id1;
       
        const url1 = `http://localhost:8081/api/patients/gettreat/${id1}`;
      const result1 = await axios.get(url1, { headers: {"Authorization" : `Bearer ${location.state.id.id.id.token}`} })
      console.log("meow");
      console.log(result1.data);
      setUsers1(result1.data);
   
    } catch (error) {
   console.error(error);
    }
    }
    return (
    
    <div className='container'>
        <h1>Treatment Details</h1>
    <div className='py-4'>        <table className='table border shadow'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <></>
                    <th scope="col">patientName</th>
                    <th scope="col">symptoms</th>
                    <th scope="col">diagnosis</th>
                    <th scope="col">diet</th>
                </tr>
            </thead>
            <tbody>
                {
                    users1.map((user1,index)=>(
                        
                        <tr>
                            <th scope="row" key={index}>{index+1}</th> 
                            <td>{user1.patientName}</td>
                            <td>{user1.symptoms}</td>
                            <td>{user1.diagnosis}</td>
                            <td>{user1.diet}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <h1> Prescription</h1>
        <table className='table border shadow'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <></>
                    <th scope="col">Medicine</th>
                    <th scope="col">Dosage</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index)=>(
                        
                        <tr>
                            <th scope="row" key={index}>{index+1}</th>
                            
                            <td>{user.medicine}</td>
                            <td>{user.dosage}</td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
</div>

  )
}
