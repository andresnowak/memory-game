/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {
  /**
* @description This function starts the game and calls openCard() and restart() to make the game function
* @param {1} listOfCards
* @param {2} shufledListOfCards
*/
  var listOfCards = $('.deck').find('li');
  var shufledListOfCards = shuffle(listOfCards);

  listOfCards.remove();
  $('.deck').append(shufledListOfCards);

  openCard();
  restart();
  timer;
}

$(startGame);

function openCard() {
  /**
* @description this function opens a card when it is clicked
* @param {1} it counts how many cards have been clicked
* @param {2} it creates a list of the cards that have been clicked
*/
  var count = 0;
  var cardsClicked = [];
  $('.card').on('click', function() {
    $(this).addClass('show open');
    count += 1;
    cardsClicked.push($(this));
    $(this).off('click')

    if (count === 2) {
      matchCards(cardsClicked);
      count = 0;
      cardsClicked = [];
      addMove();
    }
  });
}

function closeCard(cardsClicked) {
  /**
* @description this function closes the cards that have been opened and didnt match
*/
  cardsClicked.forEach(function(card) {
    $('.card').toggleClass("open", false);
    $('.card').toggleClass("show", false);
  });
}

var countOfHowManyIncorrectMatches = 0;//count of how many times the cards didnt match
var countOfHowManyCorrectMatches = 0;//counts how many matches have happened

function matchCards(cardsClicked) {
  /**
* @description it compares the two cards that have been opened to see if they match
* @param {1} card1NameOfClass
* @param {2} card2NameOfClass
*/
  var card1NameOfClass = cardsClicked[0].children('i');
  var card2NameOfClass = cardsClicked[1].children('i');

  if (card1NameOfClass.attr('class') === card2NameOfClass.attr('class')) {
    cardsClicked.forEach(function(card) {
      card.addClass('match');
    });
    countOfHowManyCorrectMatches += 1;
    endGame(countOfHowManyCorrectMatches, countOfHowManyIncorrectMatches);
  } else {
    $('.card').off('click');

    setTimeout(function() {
      closeCard(cardsClicked);
      openCard();
    }, 1500);

    countOfHowManyIncorrectMatches += 1;
    emptyStar(countOfHowManyIncorrectMatches);
  }
}

function addMove() {
  /**
* @description it counts how many moves have happened
* @param {1} numberOfMoves
* @param {2} stars
+ @param {3} starsIcons
*/
  var numberOfMoves = 0;
  var numberOfMoves = parseInt($('.moves').text()) + 1;
  $('.moves').text(numberOfMoves);
}

function emptyStar(countOfIncorrectMatches) {
  /**
* @description it will empty a star when called
* @param {1} stars
* @param {2} starsIcons
*/
  var stars = $('.stars').children();
  var starsIcons = [stars.find('i')];

  switch (countOfIncorrectMatches) {
    case 16:
      $('#3').addClass('empty');
      break;
    case 24:
      $('#2').addClass('empty');
      break;
  }
}

function endGame(countOfCorrectMatches, countOfIncorrectMatches) {
  /**
* @description it will call End_page.html when called so the user can see the amount of moves and stars it had when the user won
* @param {1} moves
*/
  if (countOfCorrectMatches === 8) {
    moves = $(".moves").text();
    minutes = $("#minutes").text();
    seconds = $("#seconds").text();

    clearInterval(timer);

    window.location.replace("End_game_page.html");
    document.cookie = "moves=" + moves + ";expires=" + new Date(Date.now() + 60) + ";";
    document.cookie = "minutes=" + minutes + ";expires=" + new Date(Date.now() + 60) + ";";
    document.cookie = "seconds=" + seconds + ";expires=" + new Date(Date.now() + 60) + ";";

    if (countOfIncorrectMatches >= 16 && countOfIncorrectMatches < 24) {
      document.cookie = "stars=2;expires=" + new Date(Date.now() + 60) + ";";
    } else if (countOfIncorrectMatches >= 24) {
      document.cookie = "stars=1;expires=" + new Date(Date.now() + 60) + ";";
    } else {
      document.cookie = "stars=3;expires=" + new Date(Date.now() + 60) + ";";
    }
  }
}

function restart() {
  /**
* @description when the restart symboll is clicked this function will restart the game
* @param {1} repeat
*/
  var repeat = $('.fa-repeat');
  repeat.click(function() {
    window.location.replace("Home_Page.html");
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element..
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var sec = 0;

function pad ( val ) { return val > 9 ? val : "0" + val; }

 var timer = setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);
