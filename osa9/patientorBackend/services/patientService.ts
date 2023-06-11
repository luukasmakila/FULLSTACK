import patientData from "../data/patient"
import { NonSsnPatient } from "../types"

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