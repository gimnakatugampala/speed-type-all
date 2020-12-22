const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// List of words for game
const words = [
    'Sigh',
    'Tense',
    'Airplane',
    'Ball',
    'Pies',
    'Juice',
    'Warlike',
    'Bad',
    'North',
    'Dependent',
    'Steer',
    'Silver',
    'Highfalutin',
    'Superficial',
    'Quince',
    'Eight',
    'Feeble',
    'Admit',
    'Drag',
    'Loving'
  ];
  
//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//Difficulty level
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Set difficulty level value to Dom
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


//Focus on text from start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime ,1000)

//Genrate random name 
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

//Add wrods to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//Upadte score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

//Update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        //endgame
        gameOver()
    }
}

//Game Over ,show screens 
function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran Out</h1>
        <p>Your final score is ${score}</p>
        <button onClick="location.reload()">Play Again</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

//event litenerers - typing
text.addEventListener('input',e =>{
    const insertText = e.target.value;

    if(insertText === randomWord){
        addWordToDOM();
        updateScore()

        //clear
        e.target.value = '';

       if(difficulty === 'hard'){
        time += 2;
       }else if(difficulty === 'medium'){
        time += 3;
       }else{
        time += 5;
       }

        updateTime();

    }
})

//settings
settingsBtn.addEventListener('click',() => settings.classList.toggle('hide'));

//settings form
settingsForm.addEventListener('change',e => {
    difficulty = e.target.value;

    localStorage.setItem('difficulty',difficulty)
})