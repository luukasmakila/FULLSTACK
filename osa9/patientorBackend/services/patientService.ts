import { v1 as uuid } from 'uuid'
import patientData from "../data/patient"
import { NonSsnPatient, Gender, Patient } from "../types"

export const getPatients = (): NonSsnPatient[] => {
    const patients: NonSsnPatient[] = patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    return patients
};

export const addPatient = (
    name: string, ssn: string, dateOfBirth: string, occupation: string, gender: Gender
    ): Patient => {

    const newPatient = {
        id: uuid(),
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender
    };

    patientData.push(newPatient);
    return newPatient;
};