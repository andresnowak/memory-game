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
}

$(startGame);

function openCard() {
  //when called it will open the cards
  var count = 0; //to count how many cards have been clicked
  var cardsClicked = [];
  $('.card').on('click', function(){
    $(this).addClass('show open');
    count += 1;
    cardsClicked.push($(this));

    if (count === 2){
      matchCards(cardsClicked);
      count = 0;
      cardsClicked = [];
      addMove();
    }
  });
}

function closeCard(cardsClicked) {
  //when called it will remove the clases so it closes
  cardsClicked.forEach(function (card){
    $('.card').toggleClass("open", false);
    $('.card').toggleClass("show", false);
  });
}

var countOfHowManyIncorrectMatches = 0;
function matchCards(cardsClicked) {
  //it will see if the cards match
  var card1NameOfClass = cardsClicked[0].children('i');
  var card2NameOfClass = cardsClicked[1].children('i');

  if (card1NameOfClass.attr('class') === card2NameOfClass.attr('class')){
    cardsClicked.forEach(function (card){
      card.addClass('match');
    });
  }
  else {
    $('.card').off('click');

    setTimeout(function(){
     closeCard(cardsClicked);
     openCard();
    }, 2000);

      countOfHowManyIncorrectMatches+=1;
      emptyStar(countOfHowManyIncorrectMatches);
  }
}

function addMove() {
  var numberOfMoves = 0;
  var numberOfMoves = parseInt($('.moves').text()) + 1;
  $('.moves').text(numberOfMoves);
}

function emptyStar(count) {
  var stars = $('.stars').children();
  var starsIcons = [stars.find('i')];

  switch (count) {
    case 3:
      $('#3').addClass('empty');
      break;
    case 8:
      $('#2').addClass('empty');
      break;
    case 12:
      $('#1').addClass('empty');
      break;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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
