// =====================
// Professor Zorp Academy
// =====================

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const categoryEl = document.getElementById("category");
const dialogueEl = document.getElementById("dialogue");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const messageEl = document.getElementById("message");

let score = 0;
let lives = 3;
let timer = 120;
let currentQuestion = null;
let gameStarted = false;
let countdown;

// Funny responses
const funnyCorrect = [
    "Professor Zorp spilled a taco in celebration!",
    "Excellent! The robot chickens are impressed.",
    "You saved a timeline!",
    "A quantum taco approves."
];

const funnyWrong = [
    "Oops! A hamster just became mayor of Mars.",
    "The taco reactor sneezed.",
    "Incorrect! A robot cried pixel tears.",
    "The space goats are disappointed."
];

const questions = [

{
category:"Math",
question:"What is 12 × 8 ?",
answers:["96","88","108","92"],
correct:0
},

{
category:"Science",
question:"What planet is known as the Red Planet?",
answers:["Earth","Mars","Jupiter","Saturn"],
correct:1
},

{
category:"Language",
question:"Which word is a verb?",
answers:["Jump","Blue","Happy","Chair"],
correct:0
},

{
category:"Logic",
question:"If all bloops are zips and all zips are flarps, are all bloops flarps?",
answers:["Yes","No","Maybe","Impossible"],
correct:0
},

{
category:"History",
question:"Which ancient civilization built the pyramids?",
answers:["Romans","Egyptians","Vikings","Aztecs"],
correct:1
},

{
category:"Math",
question:"25 + 17 = ?",
answers:["42","41","39","45"],
correct:0
},

{
category:"Science",
question:"Water freezes at what temperature (C)?",
answers:["10","100","0","50"],
correct:2
},

{
category:"Language",
question:"Choose the synonym of 'happy'.",
answers:["Sad","Joyful","Angry","Tiny"],
correct:1
},

{
category:"Logic",
question:"What comes next? 2,4,8,16...",
answers:["20","18","32","24"],
correct:2
},

{
category:"History",
question:"Who was the first U.S. President?",
answers:[
"Abraham Lincoln",
"George Washington",
"John Adams",
"Jefferson"
],
correct:1
}

];

function playBeep(freq, duration){

    const audio = new AudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.frequency.value = freq;
    oscillator.start();

    gain.gain.setValueAtTime(0.1, audio.currentTime);

    oscillator.stop(audio.currentTime + duration);
}

function randomQuestion(){
    return questions[Math.floor(Math.random()*questions.length)];
}

function loadQuestion(){

    currentQuestion = randomQuestion();

    categoryEl.textContent =
        "Category: " + currentQuestion.category;

    questionEl.textContent =
        currentQuestion.question;

    answersEl.innerHTML = "";

    currentQuestion.answers.forEach((answer,index)=>{

        const btn = document.createElement("button");

        btn.classList.add("answer-btn");

        btn.textContent = answer;

        btn.addEventListener("click",()=>checkAnswer(index,btn));

        answersEl.appendChild(btn);
    });

    nextBtn.disabled = true;
}

function checkAnswer(index,btn){

    const buttons =
    document.querySelectorAll(".answer-btn");

    buttons.forEach(b=>b.disabled=true);

    if(index === currentQuestion.correct){

        score += 10;
        scoreEl.textContent = score;

        btn.classList.add("correct");

        dialogueEl.textContent =
        funnyCorrect[
            Math.floor(Math.random()*funnyCorrect.length)
        ];

        playBeep(800,0.2);

    }else{

        lives--;

        livesEl.textContent = lives;

        btn.classList.add("wrong");

        buttons[currentQuestion.correct]
        .classList.add("correct");

        dialogueEl.textContent =
        funnyWrong[
            Math.floor(Math.random()*funnyWrong.length)
        ];

        playBeep(250,0.3);
    }

    nextBtn.disabled = false;

    if(lives <= 0){
        gameOver(false);
    }
}

function startGame(){

    if(gameStarted) return;

    gameStarted = true;

    score = 0;
    lives = 3;
    timer = 120;

    scoreEl.textContent = score;
    livesEl.textContent = lives;
    timerEl.textContent = timer;

    messageEl.textContent = "";

    loadQuestion();

    countdown = setInterval(()=>{

        timer--;

        timerEl.textContent = timer;

        if(timer <= 0){

            gameOver(true);
        }

    },1000);
}

function gameOver(timeFinished){

    clearInterval(countdown);

    gameStarted = false;

    answersEl.innerHTML = "";

    if(timeFinished){

        if(score >= 100){

            messageEl.innerHTML =
            "🏆 Galactic Genius! Score: " + score;
        }else{

            messageEl.innerHTML =
            "🚀 Mission Complete! Score: " + score;
        }

    }else{

        messageEl.innerHTML =
        "💀 Mission Failed! Final Score: " + score;
    }

    categoryEl.textContent = "Game Over";

    questionEl.textContent =
    "Press Start Mission to play again.";

    startBtn.disabled = false;
}

startBtn.addEventListener("click",()=>{

    startBtn.disabled = true;
    startGame();
});

nextBtn.addEventListener("click",()=>{

    loadQuestion();
});