// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const mappedArray = moviesArray.map((movie) => movie.director);
  return mappedArray;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) return 0;
  const filteredArray = moviesArray.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  );
  if (filteredArray.length === 0) return 0;
  return filteredArray.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;
  const totalScore = moviesArray.reduce((acc, movie) => {
    if (typeof movie.score !== 'number') return acc + 0;
    return acc + movie.score;
  }, 0);
  const avgScore = totalScore / moviesArray.length;
  return Number(avgScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaArray = moviesArray.filter((movie) =>
    movie.genre.includes('Drama')
  );
  if (dramaArray.length === 0) return 0;
  const totalScore = dramaArray.reduce((acc, movie) => {
    return acc + movie.score;
  }, 0);
  const avgScore = totalScore / dramaArray.length;
  return Number(avgScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let orderedArray = JSON.parse(JSON.stringify(moviesArray));
  orderedArray.sort((a, b) => {
    if (a.year === b.year) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
    }
    return a.year - b.year;
  });
  return orderedArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let orderedArray = moviesArray.map((movie) => movie.title);
  orderedArray.sort();
  return orderedArray.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let copyArray = JSON.parse(JSON.stringify(moviesArray));
  let newArray = copyArray.map((movie) => {
    let time = movie.duration.toString();
    movie.duration =
      Number(time.slice(0, time.indexOf('h'))) * 60 +
      Number(time.slice(time.indexOf(' '), time.indexOf('m')));
    return movie;
  });
  return newArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;
  let yearArray = moviesArray.map((movie) => movie.year);
  let uniqueYears = yearArray.filter(
    (year, i, self) => self.indexOf(year) === i
  );
  let result = { year: 0, avgScore: 0 };
  let total = 0;
  let moviesCount = 0;
  let avg = 0;
  for (let i = 0; i < uniqueYears.length; i++) {
    for (let j = 0; j < moviesArray.length; j++) {
      if (moviesArray[j].year === uniqueYears[i]) {
        total += moviesArray[j].score;
        moviesCount++;
      }
    }
    avg = total / moviesCount;
    if (avg.toFixed(1) > result.avgScore) {
      result.year = uniqueYears[i];
      result.avgScore = avg.toFixed(1);
    } else if (
      avg.toFixed(1) === result.avgScore &&
      uniqueYears[i] < result.year
    ) {
      result.year = uniqueYears[i];
    }
    total = moviesCount = 0;
  }
  return `The best year was ${result.year} with an average score of ${Number(
    result.avgScore
  )}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
