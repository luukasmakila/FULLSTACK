import express from "express";
import { calculateBmi } from "../bmiCalculator/bmiCalculator";

const app = express();

app.get("/bmi", (request, response) => {
    const {height, weight} = request.query;

    if (!height || !weight) {
        return response.status(400).send({
            "error": "malformatted parameters"
        });
    }

    const heightNumber: number = parseFloat(height as string);
    const weightNumber: number = parseFloat(weight as string);

    if (isNaN(heightNumber) || isNaN(weightNumber)) {
        return response.status(400).send({
            "error": "Height and weight must be numbers"
        });
    }

    const result: string = calculateBmi(heightNumber, weightNumber);

    return response.send({
        "weight": weight,
        "height": height,
        "bmi": result
    });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
