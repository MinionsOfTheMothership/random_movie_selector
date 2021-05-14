let container = document.getElementById('container');
let question = document.getElementById('question');
let answer = document.getElementById('answer');
let movieChoice = document.getElementById('movieChoice');
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

function startQuiz() {
  quizInfo.style.display = 'none';
  questionAreaEl.style.display = 'block';
  questionText.style.display = 'block';
}

function getQuestion() {
  document.getElementById('startBtn').style.display="none";
  let currentQuestion = questions[questionIndex];
  question.textContent = currentQuestion.questionText;
  question.className = "question"
  answer.innerHTML = " ";
  currentQuestion.options.forEach(option => {
    let answerBtn = document.createElement("button"); 
    answerBtn.textContent = option.choice;
    answerBtn.className = `choiceImg ${option.choice.toLowerCase()}`;
    answerBtn.setAttribute("value", option.choice);
    answer.appendChild(answerBtn);
    answerBtn.addEventListener("click", () => addToScore(option.score));
  });
};

function addToScore(choicePoints) {
    questionIndex++;
    totalScore = totalScore + choicePoints;
     if (questionIndex < questions.length) {
    getQuestion();
  } else {
    moviePick();
    hideQuiz();
  }
}

function moviePick() {
  if (totalScore <= 20) {
    genreId = comedy
  }
  if (totalScore > 21 && totalScore <= 30) {
    genreId = horror
  }
  if (totalScore > 31 && totalScore <= 40) {
    genreId = sci_fi
  } 
  if (totalScore > 41 && totalScore <= 50) {
    genreId = action
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

function hideQuiz() {
  document.getElementById('container').style.display="none";
  document.getElementById('movieChoice').style.display="block";
};


function startQuiz() {
  quizInfo.style.display = 'none';
  questionAreaEl.style.display = 'block';
  questionText.style.display = 'block';
  getQuestion();
  startTimer();
}


function getRandom(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

function getApi() {

  var requestUrl = `https://api.themoviedb.org/3/discover/movie?api_key=38c9799f0d7e920347b58e9b9ccfea34&with_genres=${genreId}`;

  fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      let randomMovie = getRandom(data.results);
      let movieChoiceIntro = document.createElement('h1');
      movieChoiceIntro.textContent = "The movie that the Mothership has chosen is:"
      movieChoice.appendChild(movieChoiceIntro);
      let movieName = document.createElement('h1');
      movieName.textContent = `${randomMovie.title}`;
      movieName.className = "movieName"
      movieChoice.appendChild(movieName);
      let movieDesc = document.createElement('h2');
      movieDesc.textContent = `${randomMovie.overview}`
      movieDesc.className = "movieDesc"
      movieChoice.appendChild(movieDesc);
      console.log(randomMovie);
      let moviePoster = document.createElement('img');
      moviePoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${randomMovie['poster_path']}`);
      movieChoice.appendChild(moviePoster);
      moviePoster.className = "movieImg"
    })
};

startBtn.addEventListener('click', getQuestion);
