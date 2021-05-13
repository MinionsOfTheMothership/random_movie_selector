// Basic Variables //

let container = document.getElementById('container');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let questionIndex = 0;
let totalScore = 0;
let genreId = 0;
let comedy = 35;
let horror = 27;
let sci_fi = 878;
let action = 28;
let drama = 18;
let animation = 16;
let romance = 10749;
let fantasy = 14

// API Movie Genre Index ID #s //

let comedy = 35;
let horror = 27;
let sci_fi = 878;
let action = 28;
let drama = 18;
let animation = 16;
let romance = 10749;
let fantasy = 14


// Functions //

function getQuestion() {
  let currentQuestion = questions[questionIndex];
  question.textContent = currentQuestion.questionText;
  question.className = "question"
  answer.innerHTML = " ";
  currentQuestion.options.forEach(option => {
    let answerBtn = document.createElement("button"); //turn button into div, give class attribute 
    answerBtn.textContent = option.choice;
    answerBtn.className = `choiceImg ${option.choice.toLowerCase()}`;
    answerBtn.setAttribute("value", option.choice);
    answer.appendChild(answerBtn);
    answerBtn.addEventListener("click", () => addToScore(option.score)
    );
  });
};

function addToScore(choicePoints) {
    questionIndex++;
    totalScore = totalScore + choicePoints;
     if (questionIndex < questions.length) {
    getQuestion();
  } else {
    console.log(totalScore);
    console.log(genreId)
    moviePick();
  }
}


function moviePick() {
  // get highest score
  if (totalScore <= 20) {
    genreId = comedy
    console.log(genreId)
  }
  if (totalScore > 21 && totalScore <= 30) {
    genreId = horror
    console.log(genreId)
  }
  if (totalScore > 31 && totalScore <= 40) {
    genreId = sci_fi
    console.log(genreId)
  } 
  if (totalScore > 41 && totalScore <= 50) {
    genreId = action
    console.log(genreId)
  }
  if (totalScore > 51 && totalScore <= 60) {
    genreId = drama
  }
  if (totalScore > 61 && totalScore <= 70) {
    genreId = animation
  } 
  if (totalScore > 71 && totalScore <= 80) {
    genreId = romance
  }
  if (totalScore > 81 && totalScore <= 90) {
    genreId = fantasy
  }

  if (totalScore > 51 && totalScore <= 60) {
    genreId = drama
  }
  
  if (totalScore > 61 && totalScore <= 70) {
    genreId = animation
  } 
  
  if (totalScore > 71 && totalScore <= 80) {
    genreId = romance
  }

  if (totalScore > 81 && totalScore <= 90) {
    genreId = fantasy
  }


  getApi()

};

// function init() {
//   quizInfo.style.display = 'block';
//   questionAreaEl.style.display = 'none';
//   questionText.style.display = 'none';
//   form.style.display = 'none';
// }

// Begins the quiz by loading the first question and possible answers and starting the timer//
function startQuiz() {
  quizInfo.style.display = 'none';
  questionAreaEl.style.display = 'block';
  questionText.style.display = 'block';
  getQuestion();
  startTimer();
  if (startBtn.style.display === 'none') {
    startBtn.style.display = 'block';
  } else {
    startBtn.style.display = 'none';
  }
}

function getRandom(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

function getApi() {

  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = `https://api.themoviedb.org/3/discover/movie?api_key=38c9799f0d7e920347b58e9b9ccfea34&with_genres=${genreId}`;

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      let randomMovie = getRandom(data.results);
      let movieName = document.createElement('h1');
      movieName.textContent = `The movie that the Mothership has chosen is: ${randomMovie.title}`;
      movieName.className = "movieName"
      container.appendChild(movieName);
      let moviePoster = document.createElement('img');
      moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${randomMovie['poster_path']}`);
      container.appendChild(moviePoster);
      moviePoster.className = "movieImg"

      // need to add classes to movie title & img //

      console.log(randomMovie);
    })
};

startBtn.addEventListener('click', getQuestion);
