const calculateBmi = (height: number, weight: number) => {
    const heightInMeters: number = height / 100
    const bmi: number = weight / Math.pow(heightInMeters, 2)
    if (bmi < 24.9 && bmi > 18.5) return "Normal (healthy weight)"
}

console.log(calculateBmi(180, 74))
