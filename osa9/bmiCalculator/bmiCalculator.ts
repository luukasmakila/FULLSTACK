import express from "express"

const app = express()

const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100
    const bmi: number = weight / Math.pow(heightInMeters, 2)
    if (bmi < 16.0) return "Underweight (Severe thinness)"
    if (bmi <= 16.9 && bmi >= 16.0) return "Underweight (Moderate thinness)"
    if (bmi <= 18.4 && bmi >= 17.0) return "Underweight (Mild thinness)"
    if (bmi <= 24.9 && bmi >= 18.5) return "Normal (healthy weight)"
    if (bmi <= 29.9 && bmi >= 25.0) return "Overweight (Pre-obese)"
    if (bmi <= 34.9 && bmi >= 30.0) return "Obese (Class I)"
    if (bmi <= 39.9 && bmi >= 35.0) return "Obese (Class II)"
    if (bmi >= 40.0) return "Obese (Class III)"
    else return ""
}

app.get("/bmi", (request, response) => {
    const {height, weight} = request.query

    const heightNumber: number = parseFloat(height as string)
    const weightNumber: number = parseFloat(weight as string)

    const result: string = calculateBmi(heightNumber, weightNumber)

    response.send({
        "weight": weight,
        "height": height,
        "bmi": result
    })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//const bmiArgs: string[] = process.argv.slice(2) // ignore run commands
//const height: number = parseFloat(bmiArgs[0])
//const weight: number = parseFloat(bmiArgs[1])

//console.log(calculateBmi(height, weight))
