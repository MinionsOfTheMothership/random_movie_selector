let container = document.getElementById('container');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let questionIndex = 0;
let totalScore = 0;
let genreId = 0;

function getQuestion() {
  let currentQuestion = questions[questionIndex];
  question.textContent = currentQuestion.questionText;
  answer.innerHTML = " ";
  currentQuestion.options.forEach(option => {
    let answerBtn = document.createElement("button"); //turn button into div, give class attribute 
    answerBtn.textContent = option.choice;
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
    alert("nice");
    console.log(totalScore);
  }
}

function moviePick() {
  // get highest score
  if (totalScore < 20) {
    genreId = comedy
  }

  if (totalScore < 123) {
    genreId = horror
  }
  if (totalScore > 124 && totalScore < 500) {
    genreId = romance
  } 
  
  if (totalScore > 500 && totalScore > 1000) {
    genreId = action
  }

  getApi()

};

function init() {
  quizInfo.style.display = 'block';
  questionAreaEl.style.display = 'none';
  questionText.style.display = 'none';
  form.style.display = 'none';
}

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
      movieName.textContent = randomMovie.title;
      container.appendChild(movieName);
      let moviePoster = document.createElement('img');
      moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${randomMovie['poster_path']}`);
      container.appendChild(moviePoster);


      console.log(randomMovie);
    })
};

startBtn.addEventListener('click', getQuestion);
