const nonato = document.querySelector('.nonato');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const restartButton = document.querySelector('.restart-button');
const backGroundSound = document.getElementById('background-music');
const perdeuSound = document.getElementById('perdeu-music');
let score = document.querySelector(".score");
let gameOver = document.querySelector(".game-over");
let finalScore = document.querySelector(".final-score");

let interval = null;
let nonatoScore = 0;
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

    
    nonato.classList.add('jump');
    nonato.src = './imgs/salto-d.png';
    nonato.style.width = '140px';

    setTimeout(() => {
        nonato.classList.remove('jump');
        nonato.src = './imgs/corre-d.gif';
    }, 500);
}

const startGame = () => {
    pipe.style.animation = 'pipe-animation 1.6s linear infinite';
    clouds.style.animation = 'clouds-animation 20s linear infinite';
    isGameOver = false;
    nonatoScore = 0;
    startTime = new Date().getTime();
    scoreCounter();
    backGroundSound.play()
    interval = setInterval(() => {
        nonatoScore++;
        scoreCounter();
    }, 1000);

    // Esconde o conteúdo da classe "start"
    const startDiv = document.querySelector('.start');
    startDiv.style.display = 'none';
}


const endGame = () => {
    clearInterval(interval);
    interval = null;

    // Para fixar a posição do pipe
    const pipePosition = pipe.getBoundingClientRect().left;
    pipe.style.left = `${pipePosition}px`;

    perdeuSound.addEventListener('ended', function () {
        perdeuSound.pause();
    });
    perdeuSound.play();
    setTimeout(function () {
        perdeuSound.pause();
        perdeuSound.currentTime = 0;
    }, 3000);
    backGroundSound.pause();
    pipe.style.animation = 'none';
    nonato.style.animation = 'none';
    nonato.src = './imgs/perdende.gif';
    nonato.style.width = '150px';
    nonato.style.marginLeft = '50px';
    finalScore.textContent = `${nonatoScore} seconds`;
    gameOver.classList.add("show");
}



const initialize = () => {
    pipe.style.animation = 'none';
    clouds.style.animation = 'none';
    pipe.style.right = '0px';
    score.innerHTML = `Score <b>0</b> seconds`;

    // Adiciona event listener para o botão "start" com o mouse
    const startButton = document.querySelector('.start button');
    startButton.addEventListener('click', () => {
        startGame();
    });

    // Adiciona event listener para o botão "start" em dispositivos móveis
    startButton.addEventListener('touchstart', () => {
        startGame();
    });
}

initialize();

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && isGameOver) {
        startGame();
    } else if (event.key === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', (event) => {
    if (isGameOver) {
        startGame();
    } else {
        jump();
    }
});

backGroundSound.play();


const loop = setInterval(() => {
    if (isGameOver) {
        return;
    }

    const pipePosition = pipe.offsetLeft;
    const nonatoPosition = +window.getComputedStyle(nonato).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && nonatoPosition < 80) {
        endGame();
    }
}, 10);