// Types

export type Diagnose = {
    code: string,
    name: string,
    latin?: string
}

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}

export type NonSsnPatient = Omit<Patient, "ssn">;

export type Gender = "male" | "female" | "other"
