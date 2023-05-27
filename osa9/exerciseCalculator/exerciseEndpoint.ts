import express from "express";
import { calculateExercises } from "./exerciseCalculator";

const PORT = 3002;

const app = express();
app.use(express.json())

app.post("/exercises", (req, res) => {
    const params = req.body;

    const exerciseCount = params.daily_exercises;
    const target = params.target;

    // Validate params
    if (!exerciseCount || !target) {
        return res.send({
            "error": "params missing"
        });
    };

    if (!Array.isArray(exerciseCount) || !exerciseCount.every((item) => typeof item === "number")) {
        return res.send({
            "error": "malformatted parameters"
        });
    };

    const targetIsNumber = typeof target === "number"
    if (!targetIsNumber) {
        return res.send({
            "error": "malformatted parameters"
        });
    };

    const result = calculateExercises(exerciseCount, target);
    return res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
