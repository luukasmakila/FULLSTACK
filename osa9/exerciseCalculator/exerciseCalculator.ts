interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (exerciseHours: number[], targetHours: number): Result => {
    const numberOfDays: number = exerciseHours.length;
    const numberOfTrainingDays: number = exerciseHours.filter(x => x > 0).length;
    const averageTime: number = exerciseHours.reduce((sum, curr) => sum + curr, 0) / numberOfDays;
    const success: boolean = averageTime >= targetHours;

    // calculate the rating value
    const targetThird: number = targetHours / 3;

    let rating = 0;
    if (averageTime < targetThird) rating = 1;
    if (averageTime > targetThird && averageTime < targetThird * 3) rating = 2;
    if (averageTime >= targetThird *3) rating = 3;

    // add rating description
    let ratingDescription = "";
    if (rating === 1) ratingDescription = "Not good at all, dsicipline my friend";
    if (rating === 2) ratingDescription = "Decent, but not gonna make it";
    if (rating === 3) ratingDescription = "You're gonna make it";

    return {
        periodLength: numberOfDays,
        trainingDays: numberOfTrainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetHours,
        average: averageTime
    };
};

//const exerciseArgs: string[] = process.argv.slice(2); // ignore run commands

//const arrString = exerciseArgs[0].replace(/[[\]]/g, '');
//const exerciesHours: number[] = arrString.split(",").map(Number).filter(n => !isNaN(n));

//const target: number = parseFloat(exerciseArgs[1]);


//console.log(calculateExercises(exerciesHours, target));
