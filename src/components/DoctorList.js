import React, { useState, useEffect } from 'react';
import Table  from 'react-bootstrap/Table';
function DoctorList() {
  const [doctors, setDoctors] = useState([]);
    
  useEffect(() => {
    async function fetchDoctors() {
        console.log("hinsdjanjfksdkjfj");
      const response = await fetch('http://localhost:8080/api/admin/doctors');
      const data = await response.json();
      console.log('Data:', data);
      setDoctors(data);
    }
    fetchDoctors();
  }, []);

  return (
    <>
      {/* <h2>Doctor List</h2>
      <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Specialization</th>

                
                </tr>
                </thead>
                {
        doctors.map((o, index) => {
            return(
                <tbody key={index}>
                <tr>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.specialization}</td>   
                </tr>
                </tbody>
            )
        })
    } */}

  <table className='table table-dark'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Specialization</th>
          
        </tr>
      </thead>
    <tbody>
    {doctors.map((o, index) =>(
      <tr key={index}>
                
      <td>{o.id}</td>
      <td>{o.name}</td>
      <td>{o.specialization}</td>   
  </tr>
    ))}
    </tbody>
    </table>
      
    

    </>
  );
}

export default DoctorList;
