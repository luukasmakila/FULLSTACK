import express from "express";
import { getPatients, addPatient } from "./services/patientService";
import diagnosesData  from "./data/diagnoses";
import { Diagnose } from "./types";

const app = express();
app.use(express.json());

const PORT = 3001

// Enable CORS for all routes
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get("/api/ping", (_req, res) => {
    console.log("pinged");
    res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
    const diagnoses: Diagnose[] = diagnosesData;
    res.json(diagnoses);
});

app.get("/api/patients", (_req, res) => {
    res.json(getPatients());
});

app.post("/api/patients", (req, res) => {
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;
    const newPatient = addPatient(name, ssn, dateOfBirth, occupation, gender)
    res.json(newPatient)
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
