
      // when the page is loaded, load the locally stored 'score'
      let score = JSON.parse(localStorage.getItem('score')) || { // default operator works the same as below
        wins: 0,
        losses: 0,
        ties: 0
      };
      
      
      updateScoreElement();

    // initialise score object if it does not exist locally
    // if (!score) {
    //   score = {
    //     wins: 0,
    //     losses: 0,
    //     ties: 0
    //   };
    // }

    function updateScoreElement() {
      // displays the score in the <p> tag
      document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }

    function pickComputerMove() {
      const randNum = Math.random();
      let computerMove = '';

      if (randNum >= 0 && randNum < 1 / 3) {
        computerMove = 'rock';
      } 
      else if(randNum >= 1/3 && randNum < 2/3) {
        computerMove = 'paper';
      }
      else if(randNum >= 2/3 && randNum < 1) {
        computerMove = 'scissors';
      }

      return computerMove;
    }

    let isAutoPlaying = false;
    let intervalID; // in order to stop an Interval, you need to store the intervalid

    // const autoPlay = () => { // can be written as an arrow function but cannot be hoisted

    // };

    function autoPlay() {
      if (!isAutoPlaying) {
        intervalID = setInterval(() => { // store the intervalid (remember functions are also values)
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
      }
      else {
        clearInterval(intervalID); // to stop the interval, pass in the intervalid 
        isAutoPlaying = false;
      }

    }

    // it is not possible to simply pass in a function for an event listener as it will execute that function 
    // and return a value, which the event listener cant use, hence create a null ref exception
    // it is required to create a new function instead
    document.querySelector('.js-rock-button').addEventListener('click', () => {
      playGame('rock');
    });

    document.querySelector('.js-paper-button').addEventListener('click', () => {
      playGame('paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', () => {
      playGame('scissors');
    });

    // check whenever the player inputs on a keyboard
    document.body.addEventListener('keydown', (event) => { // event is returned by the eventhandler
      if (event.key === 'a') {
        playGame('rock');
      }
      else if (event.key === 's') {
        playGame('paper');
      }
      else if (event.key === 'd') {
        playGame('scissors');
      }
    });


    function playGame(playerMove) {
      const computerMove = pickComputerMove();

      let result = '';

      if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You Lose';
        } 
        else if (computerMove === 'paper') {
          result = 'You Win';
        }
        else if (computerMove === 'scissors') {
          result = `It's a tie`;
        }
      }

      else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You Win';
        } 
        else if (computerMove === 'paper') {
          result = `It's a tie`;
        }
        else if (computerMove === 'scissors') {
          result = 'You Lose';
        }
      }
      
      else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = `It's a tie`;
        } 
        else if (computerMove === 'paper') {
          result = 'You Lose';
        }
        else if (computerMove === 'scissors') {
          result = 'You Win';
        }
      }

      if (result === 'You Win') {
        score.wins += 1;
      }
      else if (result === 'You Lose') {
        score.losses += 1;
      }
      else if (result === `It's a tie`) {
        score.ties += 1;
      }

      // localStorage is a JS object that is used to store STRINGS locally
      // JSON.stringify is used to convert the JS object type into a string to be stored locally
      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();
      //document.querySelector('.js-moves').innerHTML = `You picked ${playerMove}. CPU picked ${computerMove}.`;

      document.querySelector('.js-moves').innerHTML = `
      You picked
      <img src="images/${playerMove}-emoji.png" class="move-icon" />
      CPU picked
      <img src="images/${computerMove}-emoji.png" class="move-icon" />
        `;
    }