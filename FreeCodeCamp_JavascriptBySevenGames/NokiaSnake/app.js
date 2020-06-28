document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const RIGHT_DIRECCION_KEY = 39;
    const UP_DIRECCION_KEY = 38;
    const LEFT_DIRECCION_KEY = 37;
    const DOWN_DIRECCION_KEY = 40;


    const width = 10;
    let currentIndex = 0; //so first div in our grid
    let appleIndex = 0; //so first div in our grid//so first div in our grid

    let currentSnake = [2, 0, 1]; // so the div in our grid being 2 (or the head),  and 0 being the end (TAIL, with all 1's)
    //being the body for now onn)

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));

        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();

        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutComes, intervalTime);
    }

    //fuctnion that deals with all the ovoe outcomes of the snake
    function moveOutComes() {
        //Deals with snake border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if the snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake right wall
            (currentSnake[0] % width === 0 && direction === -1) || //If snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //If snake hits top wall
            squares[currentSnake[0] + direction].classList.contains('snakes')
        ) {
            return clearInterval(interval); //this will clear the interval if any of 
        }

        const tail = currentSnake.pop(); //remove the last item of the array and shows it
        squares[tail].classList.remove('snake'); //removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction); //gives direction to the  head of the array

        //Deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime + speed;
            interval = setInterval(moveOutComes, intervalTime);

        }

        squares[currentSnake[0]].classList.add('snake');

    }

    //genearte new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains('snake')); //making sure 


        squares[appleIndex].classList.add('apple');
    }


    //assing fucntion to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake'); //we are removing the class of snake form all the squares

        if (e.keyCode === RIGHT_DIRECCION_KEY) {
            direction = 1; //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === UP_DIRECCION_KEY) {
            direction = -width; //if we press up arrow, the snake will go to back ten divs, appearing to go up
        } else if (e.keyCode === LEFT_DIRECCION_KEY) {
            direction = -1;
        } else if (e.keyCode === DOWN_DIRECCION_KEY) {
            direction = +width; ///if we press down, the the snake head will instantly appear in the div ten divs from where you are now
        }

    }


    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);


});