import { v1 as uuid } from 'uuid';
import patientData from "../data/patient";
import { NonSsnPatient, Patient, NewPatient, Gender } from "../types";

const isString = (value: unknown): value is string => {
    return typeof value === "string";
};

const isGender = (value: string): value is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(value);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("incorrect or missing name");
    };
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("incorrect or missing ssn");
    };
    return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error("incorrect or missing date of birth");
    };
    return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("incorrect or missing occupation");
    };
    return occupation;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("incorrect or missing gender");
    };
    return gender;
};

export const getPatients = (): NonSsnPatient[] => {
    const patients: NonSsnPatient[] = patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
    return patients;
};

const toNewPatient = (object: unknown): NewPatient => {
    if ( !object || typeof object !== "object") {
        throw new Error("incorrect or missing data")
    };

    if ("name" in object && "ssn" in object && "dateOfBirth" in object && "occupation" in object && "gender" in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            ssn: parseSsn(object.ssn),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender)
        };
        return newPatient;
    };

    throw new Error("incorrect data: some fields are missing");
};

export const addPatient = ( entry: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...toNewPatient(entry)
    };

    patientData.push(newPatient);
    return newPatient;
};
