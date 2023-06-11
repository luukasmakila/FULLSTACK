import express from "express";
import diagnosesData  from "./data/diagnoses";
import patientData from "./data/patient";
import { Diagnose, NonSsnPatient } from "./types";

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
    const patients: NonSsnPatient[] = patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));

    res.json(patients)
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
