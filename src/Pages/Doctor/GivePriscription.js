import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function GivePriscription() {
  const [medicines, setMedicines] = useState([]);
  const [dosages, setDosages] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [diet, setDiet] = useState("");
  const location = useLocation();
  const handleAddMedicine = () => {
    console.log(location.state.id.id.id.id);
        const medicineName = document.getElementById("medicineName").value;
    const dosage = document.getElementById("dosage").value;
    const newMedicine = {
      name: medicineName,
    };
    const newDosage = {
      dosage: dosage,
    };
    setMedicines([...medicines, newMedicine]);
    setDosages([...dosages, newDosage]);
  };

  const handleDeleteMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
    setDosages(dosages.filter((_, i) => i !== index));
  };
  function priscriptionSubmit() {
console.log(location.state.id1);
    
    const token=location.state.id.id.id.token;
    axios
    .post(
      `http://localhost:8081/api/doctor/treatment`,
       {
        appointmentId:location.state.id1,
        patientName:location.state.name,
        doctorId:location.state.id.id.id.id,
        symptoms:symptoms,
        diagnosis:diagnosis,
        diet:diet
       },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    for (let i = 0; i < dosages.length; i++) {
        console.log(dosages[i]);
        axios
        .post(
          `http://localhost:8081/api/doctor/pres`,
           {
            appointmentId:location.state.id1,
            medicine:medicines[i].name,
            dosage:dosages[i].dosage
           },
          { headers: { Authorization: `Bearer ${token}` } }
        )
    }

   

  }
  return (
    <div className="container">
      <h1>KHYBER HOSPITAL</h1>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <h4>Doctor name:</h4>
        <h4>Patient name:</h4>
      </div>
      <hr
        style={{
          background: "lime",
          color: "lime",
          borderColor: "lime",
          height: "3px",
        }}
      />
      <div className="row">
        <div className="col-md-6">
          <h1>Treatment Details</h1>
          <div className="form-group">
            <label htmlFor="symptoms">Symptoms:</label>
            <input
              type="text"
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="form-control"
              placeholder="Enter symptoms"
              style={{ height: "150px", width: "100%" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="diagnosis">Diagnosis:</label>
            <input
              type="text"
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="form-control"
              placeholder="Enter diagnosis"
              style={{ height: "150px", width: "100%" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="diet">Diet:</label>
            <input
              type="text"
              id="diet"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="form-control"
              placeholder="Enter diet"
              style={{ height: "150px", width: "100%" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="pr-4">
            <h1>Prescription</h1>
            <label htmlFor="medicineName"></label>
            <input type="text" id="medicineName" placeholder="Enter Medicine" />

            <label htmlFor="dosage"></label>
            <input type="text" id="dosage" placeholder="Enter dosage" />

            <button className="btn btn-success" onClick={handleAddMedicine}>
              Add Medicine
            </button>

            <div className="py-4">
              <table className="table border shadow">
                <thead className="table-header">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Medicine</th>
                    <th scope="col">Dosage</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((medicine, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{medicine.name}</td>
                      <td>{dosages[index]?.dosage}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-lg btn-block"
                          onClick={() => handleDeleteMedicine(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-warning btn-lg btn-block"
        onClick={() => priscriptionSubmit()}
      >
        Submit priscription
      </button>
    </div>
  );
}
