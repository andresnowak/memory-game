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
  var listOfCards = $('.deck').find('li');
  var shufledListOfCards = shuffle(listOfCards);

  listOfCards.remove();
  $('.deck').append(shufledListOfCards);

  openCard();
  restart();
}

$(startGame);

function openCard() {
  //when called it will open the cards
  var count = 0; //to count how many cards have been clicked
  var cardsClicked = [];
  $('.card').on('click', function() {
    $(this).addClass('show open');
    count += 1;
    cardsClicked.push($(this));

    if (count === 2) {
      matchCards(cardsClicked);
      count = 0;
      cardsClicked = [];
      addMove();
    }
  });
}

function closeCard(cardsClicked) {
  //when called it will remove the clases so it closes
  cardsClicked.forEach(function(card) {
    $('.card').toggleClass("open", false);
    $('.card').toggleClass("show", false);
  });
}

var countOfHowManyIncorrectMatches = 0;
var countOfHowManyCorrectMatches = 0;

function matchCards(cardsClicked) {
  //it will see if the cards match
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
  var numberOfMoves = 0;
  var numberOfMoves = parseInt($('.moves').text()) + 1;
  $('.moves').text(numberOfMoves);
}

function emptyStar(countOfIncorrectMatches) {
  var stars = $('.stars').children();
  var starsIcons = [stars.find('i')];

  switch (countOfIncorrectMatches) {
    case 10:
      $('#3').addClass('empty');
      break;
    case 16:
      $('#2').addClass('empty');
      break;
    case 22:
      $('#1').addClass('empty');
      break;
  }
}

function endGame(countOfCorrectMatches, countOfIncorrectMatches) {
  moves = $(".moves").text();
  localStorage.setItem('moves', moves);

  if (countOfCorrectMatches === 8) {
  window.location.replace("End_game_page.html");

    if (countOfIncorrectMatches >= 10 && countOfIncorrectMatches < 16) {
      localStorage.setItem('stars','2');
    } else if (countOfIncorrectMatches >= 16 && countOfIncorrectMatches < 22) {
      localStorage.setItem('stars', '1');
    } else if (countOfIncorrectMatches >= 22) {
      localStorage.setItem('stars', '0');
    } else {
      localStorage.setItem('stars', '3');
    }
  }
}

function restart() {
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
