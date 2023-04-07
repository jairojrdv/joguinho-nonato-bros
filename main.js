const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
let score = document.querySelector(".score");
let gameOver = document.querySelector(".game-over");
let finalScore = document.querySelector(".final-score");

let interval = null;
let marioScore = 0;
let startTime = null;
let isGameOver = true;

let scoreCounter = () => {
  const currentTime = new Date().getTime();
  const elapsedTimeInSeconds = Math.round((currentTime - startTime) / 1000);
  score.innerHTML = `Score <b>${elapsedTimeInSeconds}</b> seconds`;
}

const jump = () => {
  if (isGameOver) {
    return;
  }
  
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

const startGame = () => {
  pipe.style.animation = 'pipe-animation 2s linear infinite';
  clouds.style.animation = 'clouds-animation 20s linear infinite';
  isGameOver = false;
  marioScore = 0;
  startTime = new Date().getTime();
  scoreCounter();
  interval = setInterval(() => {
    marioScore++;
    scoreCounter();
  }, 1000);
}

const endGame = () => {
    clearInterval(interval);
    interval = null;
    isGameOver = true;
  
    // Para fixar a posição do pipe
    const pipePosition = pipe.getBoundingClientRect().left;
    pipe.style.left = `${pipePosition}px`;
    
    pipe.style.animation = 'none';
    mario.style.animation = 'none';
    mario.src = './imgs/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    finalScore.textContent = `${marioScore} seconds`;
    gameOver.classList.add("show");
  }

const initialize = () => {
  pipe.style.animation = 'none';
  clouds.style.animation = 'none';
  pipe.style.right = '0px';
  score.innerHTML = `Score <b>0</b> seconds`;
}

initialize();

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && isGameOver) {
    startGame();
  }
  jump();
});

const loop = setInterval(() => {
  if (isGameOver) {
    return;
  }
  
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    endGame();
  }
}, 10);
