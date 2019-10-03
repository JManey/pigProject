/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//create variables
var scores, roundScore, activePlayer, gamePlaying, previousRoll, maxScore;

//run init function
init();

//roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
            //1. we need random number
        var dice = Math.floor((Math.random() * 6) + 1);
        //2. display result with correct dice image
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice +'.png';
        //save dice roll to previous roll to reset on 6's in a row
        if(dice === 6) {
            previousRoll += dice;
        }

        //3. update the round score IF the rolled number was not a 1
        if(dice !== 1 && previousRoll !== 12) {
             //add to score
             roundScore += dice;
             document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if(previousRoll === 12 && dice === 6) {
            //reset score to zero after rolling double 6's
            alert('oh no you rolled 6 twice in a row');
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else //next player
             nextPlayer();
        
    }    
});
    



document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
            //add current score to player's global score
        scores[activePlayer] += roundScore;
        //update UI with score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check if player won the game, apply winner css class if won
        if(scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //change player
            nextPlayer();
        }
    }

});

//function to change player
function nextPlayer() {
     //next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     //set roundScore back to 0
     roundScore = 0;
      //set previous roll to 0
      previousRoll = 0;
     //reset current score to 0 if you roll a 1
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';
     //show who active play is
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
     //remove dice after rolling a 1
     document.querySelector('.dice').style.display = 'none';
     //set previous roll to 0
     previousRoll = 0;
 }

 //add event listener for new game
 document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    //set scores to 0
    scores = [0 , 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousRoll = 0;
    //hide dice
    document.querySelector('.dice').style.display = 'none';

//use get element by id
//set all scores to zero
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

//prompt user for winning score
maxScore = prompt('Please enter the score you would like to end the game at', 100);

}






