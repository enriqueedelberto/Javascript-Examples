document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');

    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;
    let invaderId = 0;


    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    //dra the alien invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

    //draw the shooter
    squares[currentShooterIndex].classList.add('shooter');

    //Move the shooter along a line
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter');

        switch (e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) {
                    currentShooterIndex -= 1;
                }
                break;
            case 39:
                if (currentShooterIndex % width < width - 1) {
                    currentShooterIndex += 1;
                }
                break;

        }

        squares[currentShooterIndex].classList.add('shooter');
    }

    document.addEventListener('keydown', moveShooter);


    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;

        } else if (direction === width) {
            direction = leftEdge ? 1 : -1;
        }

        for (let index = 0; index <= alienInvaders.length - 1; index++) {
            squares[alienInvaders[index]].classList.remove('invader');
        }

        for (let index = 0; index <= alienInvaders.length - 1; index++) {
            alienInvaders[index] += direction;

        }

        for (let index = 0; index <= alienInvaders.length - 1; index++) {
            if (!alienInvadersTakenDown.includes(index)) {
                squares[alienInvaders[index]].classList.add('invader');
            }

        }

        //decide a game over
        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.textContent = 'Game over';
            squares[currentInvaderIndex].classList.add('boom');
            clearInterval(invaderId);
        }
        for (let index = 0; index <= alienInvaders.length - 1; index++) {
            if (alienInvaders[index] > (squares.length - (width - 1))) {
                resultDisplay.textContent = 'Game over';
                clearInterval(invaderId);
            }
        }

        //decide a win
        if (alienInvadersTakenDown.length === alienInvaders.length) {
            resultDisplay.textContent = "You Win!";
            clearInterval(invaderId);
        }

    }

    invaderId = setInterval(moveInvaders, 500);


    function shoot(e) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;

        //move the laser form the shooter to the alien invader
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser');
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add('laser');

            if (squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser');
                squares[currentLaserIndex].classList.remove('invader');
                squares[currentLaserIndex].classList.add('boom');

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250);
                clearInterval(laserId);

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTakenDown);
                result++;

                resultDisplay.textContent = result;

            }

            if (currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);

            }
        }


        switch (e.keyCode) {
            //Space key
            case 32:
                laserId = setInterval(moveLaser, 100);
                break;
            default:
                break;
        }


    }

    document.addEventListener('keyup', shoot);



});