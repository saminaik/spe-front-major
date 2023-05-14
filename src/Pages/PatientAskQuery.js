
// import React, { useEffect, useState } from 'react'
// import axios from "axios";
// import { useLocation, navigate } from 'react-router-dom';
// export default function PatientAskQuery() {


//   return (
//     <div>
//         <div class="mb-3">
//             <label for="exampleFormControlInput1" class="form-label">Subject</label>
//             <input  class="form-control" id="exampleFormControlInput1" placeholder="Type your subject"></input>
//         </div>
//         <div class="mb-3">
//             <label for="exampleFormControlTextarea1" class="form-label">Write your query</label>
//             <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//         </div>
//         <div>
//             <input class="btn btn-primary" type="submit" value="Submit"></input>
//         </div>
//     </div>
   
    
//   )
// }
import Swal from 'sweetalert2'
import React, { useState } from "react";
import axios from "axios";
import {useLocation, useNavigate} from 'react-router-dom';

const PatientAskQuery = () => {
    const location = useLocation();
   
   // console.log(location.state.id.id.token);
  const [patientId, setPatientId] = useState("");
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
        patinet_id: location.state.id.id.id,
      query: query,
      subject: subject
    };
   
    try { console.log("hello");
         console.log(data);
      const response = await axios.post("http://localhost:8081/api/patients/add-query", data,{ headers: {"Authorization" : `Bearer ${location.state.id.id.token}`} });
     console.log(response.status);
     if(response.status===200){
        Swal.fire(
            'Query!',
            'Submitted!'
        
          )
     }
    } catch (error) {
        
        console.log("hi");
        
        console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    
      {/* <div>
        <label htmlFor="query">Query:</label>
        <input type="text" id="query" name="query" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>

      <div>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </div> */}
      <div class="mb-3">
             <label for="exampleFormControlInput1" class="form-label">Subject</label>
             <input  class="form-control" id="exampleFormControlInput1" placeholder="Type your subject" onChange={(event) => setSubject(event.target.value)}></input>
         </div>
      <div class="mb-3"> 
      <label for="exampleFormControlTextarea1" class="form-label">Write your query</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={query} onChange={(event) => setQuery(event.target.value)}></textarea>
         </div>
         <button type="submit">Submit</button>
    </form>
  );
};

export default PatientAskQuery;
