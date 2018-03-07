/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 var deck = $('.deck');
 var card = $('.card');

function startGame() {
  var listOfCards = $('.deck').find('li');
  var shufledListOfCards = shuffle(listOfCards);

  listOfCards.remove();
  deck.append(shufledListOfCards);

  openCard();
}

$(startGame);

function openCard() {
  card.on('click', function(){
    $(this).addClass('show open');
  });
}

function closeCard() {
      card.toggleClass("open", false);
      card.toggleClass("show", false);
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
