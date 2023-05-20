interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exerciseHours: number[], targetHours: number): Result => {
    const numberOfDays: number = exerciseHours.length
    const numberOfTrainingDays: number = exerciseHours.filter(x => x > 0).length
    const averageTime: number = exerciseHours.reduce((sum, curr) => sum + curr, 0) / numberOfDays
    const success: boolean = averageTime >= targetHours

    // calculate the rating value
    const targetThird: number = targetHours / 3

    let rating: number = 0
    if (averageTime < targetThird) rating = 1
    if (averageTime > targetThird && averageTime < targetThird * 3) rating = 2
    if (averageTime >= targetThird *3) rating = 3

    // add rating description
    let ratingDescription: string = ""
    if (rating === 1) ratingDescription = "Not good at all, dsicipline my friend"
    if (rating === 2) ratingDescription = "Decent, but not gonna make it"
    if (rating === 3) ratingDescription = "You're gonna make it"

    return {
        periodLength: numberOfDays,
        trainingDays: numberOfTrainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: averageTime
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
