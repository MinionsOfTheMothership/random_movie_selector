// let currentQuestion = 0;
// let score = [];
// let selectedAnswersData = [];
// const totalQuestions = questions.length;


// const container = document.querySelector('.choice-container');
// const questionEl = document.querySelector('.question');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
let choiceContainer = document.getElementById('choice-container');
let container = document.getElementById('container');
// const result = document.querySelector('.result');

/* Above taken from Code Quiz assignment - might come in handy, will go back to that code for certain features if needed */



function init() {
  choiceContainer.style.display = 'none';
  container.style.display = 'none'    
  }




function startQuiz() {
  choiceContainer.style.display = 'block';
  // show choices
  // when choice is clicked points are added and next choices are displayed


}

function addPoint() {

}

function getRandom(arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


function getApi() {

  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=38c9799f0d7e920347b58e9b9ccfea34&with_genres=14';

  fetch("https://api.themoviedb.org/3/discover/movie?api_key=38c9799f0d7e920347b58e9b9ccfea34&with_genres=14")
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


getApi(); 



startBtn.addEventListener('click', startQuiz);
option1.addEventListener('click', addPoint);
option2.addEventListener('click', addPoint);
option3.addEventListener('click', addPoint);
option4.addEventListener('click', addPoint);

init();