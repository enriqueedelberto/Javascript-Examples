const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;
let currentTime = timeLeft.textContent;

let hitPosition = null;

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole');
    });

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');


    //assign the id of the randomposition to hitPosition for us to use later
    hitPosition = randomPosition.id;

}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id === hitPosition) {
            result += 1;
            score.textContent = result;
        }
    });
});

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

function counterDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime === 0) {
        clearInterval(timerId);
        alert('Game Over ! Your final score is ' + result);
    }

}

let timerId = setInterval(counterDown, 1000);