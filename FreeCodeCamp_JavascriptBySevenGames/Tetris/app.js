document.addEventListener('DOMContentLoaded', () => {
    const RIGHT_DIRECCION_KEY = 39;
    const UP_DIRECCION_KEY = 38;
    const LEFT_DIRECCION_KEY = 37;
    const DOWN_DIRECCION_KEY = 40;
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.querySelector(".score-display");
    const linesDisplay = document.querySelector(".line-display");
    const displaySquares = document.querySelectorAll(".previous-grid div");
    let squares = Array.from(grid.querySelectorAll("div"));
    const startBtn = document.querySelector("button");
    const width = 10;
    const height = 20;
    let currentPosition = 4;
    let nextRandom = 0;
    let timerId;
    let currentIndex = 0;
    let score = 0;
    let lines = 0;



    //assign functions to keycodes
    function control(e) {
        if (e.keyCode === RIGHT_DIRECCION_KEY) {
            moveRight();
        } else if (e.keyCode === UP_DIRECCION_KEY) {
            rotate();
        } else if (e.keyCode === LEFT_DIRECCION_KEY) {
            moveLeft();
        } else if (e.keyCode === DOWN_DIRECCION_KEY) {
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    //The tetrominos
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    //Randomly select Tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let currentRotation = 0;
    let current = theTetrominoes[random][currentRotation];

    //Move the Tetrominoes down
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add("block");
        });
    }

    //Undraw a shape
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("block");
        });
    }

    //move down shape
    function moveDown() {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }



    //move left and prevent collisions with shpaes moving left
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) {
            currentPosition += 1;
        }

        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            currentPosition -= 1;
        }
        draw();
    }

    //move left and prevent collisions with shpaes moving left
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) {
            currentPosition -= 1;

        }

        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            currentPosition += 1;
        }
        draw();
    }

    //Rotate Tetromino
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }

        current = theTetrominoes[random][currentRotation];
        draw();
    }

    //show the previous terominoes is displaySquares
    const displayWidth = 4;
    const displayIndex = 0;

    const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTeromino 
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTeromino 
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //tTeromino 
        [0, 1, displayWidth, displayWidth + 1], //oTeromino 
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTeromino 
    ];

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove("block");
        });

        smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add("block");
        });
    }

    //freeze the shape
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains("block3") ||
                squares[currentPosition + index + width].classList.contains("block2"))) {
            current.forEach(index => squares[index + currentPosition].classList.add("block2"));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            gameOver();
            addScore();
        }
    }

    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();

        }
    });

    //Game Over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            scoreDisplay.innerHTML = "End";
            clearInterval(timerId);
        }
    }

    function addScore() {
        for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3, currentIndex + 4, currentIndex + 5, currentIndex + 6, currentIndex + 7,
                currentIndex + 8, currentIndex + 9,
            ];
            if (row.every(index => squares[index].classList.contains("block2"))) {
                score += 10;
                lines += 1;
                scoreDisplay.innerHTML = score;
                linesDisplay.innerHTML = lines;
                row.forEach(index => {
                    squares[index].classList.remove("block2") || squares[index].classList.remove("block")
                });

                //splice array
                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));

            }

        }
    }



});