//The game will need to keep score for the number of rounds entered-
//  in a score box.
//Every round will need to:
//  1. generate a round box that will contain choice buttons.
//  2. once a button is clicked, compute the round.
//  3. remove the buttons and display the round summary and
//       update the score.

// these two lines are needed when the script is in the html file.
// when loaded in the head of the html as a separate file, the document doesn't
// exist yet and you will get a null error for playButton.
// const playButton = document.querySelector('#goPlayButton');
// playButton.onclick = goPlay;

// computer picks a random whole number 1, 2, or 3
function computerPlay(){
  const numChoices = 3;
  let choice =  Math.floor(Math.random() *numChoices);
  let message = '';

  switch(choice) {
    case 0:
      message = 'scissors';
      break;
    case 1:
      message = 'rock';
      break;
    case 2:
      message = 'paper';
      break;
    default:
      message = 'Something went wrong with computerPlay!';
  }
  return message;
}

function playRound(playerChoice, computerChoice) {
  let pc = playerChoice.toString().trim().toLowerCase();
  let cc = computerChoice.toString().trim().toLowerCase();
  let message = '';
  let win = 'You Win! ' + pc + ' beats ' + cc + '. ';
  let lose = 'You Lose! ' + cc + ' beats ' + pc + '. ';
  let tie = 'Tie! You both chose ' + pc + '. ';

  if (pc === 'rock') {
    switch (cc) {
      case 'scissors':
        message = win;
        break;
      case 'paper':
        message = lose;
        break;
      case 'rock':
        message = tie;
        break;
      default:
        message = 'Something went wrong! 2';
    }
  } else if (pc === 'scissors') {
    switch (cc) {
      case 'scissors':
        message = tie;
        break;
      case 'paper':
        message = win;
        break;
      case 'rock':
        message = lose;
        break;
      default:
        message = 'Something went wrong! 3';
    }
  }  else if (pc === 'paper') {
    switch (cc) {
      case 'scissors':
        message = lose;
        break;
      case 'paper':
        message = tie;
        break;
      case 'rock':
        message = win;
        break;
      default:
        message = 'Something went wrong! 4';
    }
  } else {
    message = 'Something went wrong. Did you choose scissors, rock,'
      + ' or paper?'
  }

  return message;
}

function playerWin(roundResult) {
  return roundResult.charAt(4).toLowerCase() == 'w';
}

function scoreReached(playerScore, compScore, bestOf) {
  //if both scores smaller than bestOf the score is not reached.
  return !(playerScore < bestOf && compScore < bestOf);
}

function roundStart(round){

  let rockButton = document.createElement('button');
  rockButton.innerHTML = 'Rock';
  rockButton.id = 'rock';

  let paperButton = document.createElement('button');
  paperButton.innerHTML = 'Paper';
  paperButton.id = 'paper';

  let scissorsButton = document.createElement('button');
  scissorsButton.innerHTML = 'Scissors';
  scissorsButton.id = 'scissors';

  let roundLiInitial = document.createElement('li');
  roundLiInitial.id = round;
  roundLiInitial.appendChild(rockButton);
  roundLiInitial.appendChild(paperButton);
  roundLiInitial.appendChild(scissorsButton);

  // testing how it looks
  let gameContainer = document.querySelector('#gameContainer');
  let gameList = document.createElement('ul');
  gameList.id = 'gameList';
  gameList.appendChild(roundLiInitial);

  return roundLiInitial;

}

function roundEnd(){

}

function rockPaperScissors(numRounds){
  let nr = numRounds.toString().trim().toLowerCase();
  let round = '';
  let roundResult = '';
  // this is round + roundResult at the end of a round.
  let roundSummary = '';
  // need 3 buttons with onclick listeners at the start of a round.
  //   - this has been put in the roundStart function.
  // these get deleted once one is clicked and the round summary is
  // printed where they were originally.
  //   - this has been put in the roundEnd function.
  // each round and the final summary will be a new <li> in a <ul>
  let roundLi = '';
  let promptMessage = '';
  let playerChoice = '';
  let playerScore = 0;
  let compScore = 0;
  let scoreMessage = ''
    let bestOf = Math.ceil(nr / 2);
  let gameOver = false;
  //this is used to start building the game summary once the game ends.
  let message = 'Best of ' + nr + ', first to ' + bestOf + ' wins!';

  for (let i = 0 ; i < nr && !gameOver; i++) {
    round = 'Round ' + (i + 1) + ': ';
    roundLi = roundStart(round);

    if (i < 1) {
      promptMessage = round + 'Please choose rock, paper, or '
        + 'scissors. ';
    }else {
      promptMessage = round + scoreMessage;
    }

    playerChoice = prompt(promptMessage, '');
    roundResult = playRound(playerChoice, computerPlay());
    playerWin(roundResult) ? playerScore++ : compScore++;
    scoreMessage = 'player: ' + playerScore + ' and '
      + 'computer: ' + compScore + '.';
    roundSummary = round + roundResult;
    message += roundSummary;
    gameOver = scoreReached(playerScore, compScore, bestOf);
  }

  return message + scoreMessage;
}

// uses regex to detect whether a given input is a number
function isNumber(valueIn){
  let regex = /^[0-9]+$/; //regex pattern for integers
  if (!regex.exec(valueIn)) {
    return false;
  } else {
    return true;
  }
}

//this should be all that is needed to get the input and hand it to
// the rockPaperScissors function, or correct the user if necessary.
function goPlay () {

  let roundSelectorValue = document.querySelector('#roundSelector').value;
  //console.log(roundSelector);
  if (roundSelectorValue === 'pick a number of rounds'){
    alert('please pick a number from the dropdown for the rounds.');
  }
  else if (roundSelectorValue === 'other') {
    // this will need some doing to get the 'other' option working.
    let message = ''
      let promptMessage = 'How many Rounds of Rock Paper Scissors?'
      let nr = prompt(promptMessage, '').toString().trim().toLowerCase();
    if (!isNumber(nr)) {
      message = 'Please enter a whole number for the rounds.';
      lastGameSummary.textContent = message;
      return;
    }

    let bestOf = Math.ceil(nr / 2);
    let confirmMessage = 'You want a best of ' + nr + ' rounds? That'
      + ' means whoever wins ' + bestOf + ' first is the '
      + 'victor. Ties go to the computer. Enter '
      + '"Yes" or "No" ';
    let correct = prompt(confirmMessage, '').toLowerCase().trim();

    if (correct.charAt(0) === 'y') {
      message = rockPaperScissors(nr);
    } else if (correct.charAt(0) == 'n') {
      message = 'Oh okay then.';
    } else {
      message = 'Make sure you enter "Yes" or "No" ';
    }
  } else{
    rockPaperScissors(roundSelectorValue)
      return;
  }
  //if somehow you end up here, get out. what are you doing???
  return;
}

