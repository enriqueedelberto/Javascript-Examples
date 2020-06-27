document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#current-player');

    let currentPlayer = 1;

    for (var i = 0, len = squares.length; i < len; i++)

        (function(index) {
        //Add an onclick to each square in your grid
        squares[i].onclick = function() {
            //If the square below your current square is  taken, you can go ontop of it 
            if (squares[index + 7].classList.contains('taken')) {
                if (currentPlayer == 1) {
                    squares[index].classList.add('taken');
                    squares[index].classList.add('player-one');
                    //Change the player
                    currentPlayer = 2;
                    displayCurrentPlayer.innerHTML = currentPlayer;
                } else if (currentPlayer == 2) {
                    squares[index].classList.add('taken');
                    squares[index].classList.add('player-two');

                    //Change the player
                    currentPlayer = 1;
                    displayCurrentPlayer.innerHTML = currentPlayer;

                }

                // //If the square below your current square is not  taken, you can't go ontop of it  
            } else {
                alert('I cant go there');
            }
        };
    })(i);

    function checkBoard() {
        const winningArrays = [
            [0, 1, 2, 3],
            [20, 10, 20, 30],

        ];

        for (let y = 0; y < winningArrays.length; y++) {
            const square1 = squares[winningArrays[y][0]];
            const square2 = squares[winningArrays[y][1]];
            const square3 = squares[winningArrays[y][2]];
            const square4 = squares[winningArrays[y][3]];

            //now check those arrays to see if they all have the class of player-one
            if (
                square1.classList.contains("player-one") &&
                square2.classList.contains("player-one") &&
                square3.classList.contains("player-one") &&
                square4.classList.contains("player-one")
            ) {
                //if they do, player-one is passed as the winner

                result.innerHTML = "Player One Wins!";
            } else if (
                square1.classList.contains("player-two") &&
                square2.classList.contains("player-two") &&
                square3.classList.contains("player-two") &&
                square4.classList.contains("player-two")
            ) {
                //if they do, player-two is passed as the winner

                result.innerHTML = "Player Two Wins!";
            }
        }
    }


    //add and eventListener to each square that will triggere the checkBoard function on click
    squares.forEach(square => square.addEventListener('click', checkBoard));



});