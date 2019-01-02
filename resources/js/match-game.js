// Fisher Yates shuffle algorithm implementation from:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

$(document).ready(function(){
  MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'))
})

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var unplacedValues = [];
  for (var i = 1; i <= 8; i++) {
    unplacedValues.push(i, i);
  };
  return shuffleArray(unplacedValues);
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.flippedCards = [];
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ]
  $game.empty();
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>')
    $card.data({
      value: cardValues[i],
      flipped: false,
      color: colors[cardValues[i] - 1]
    });
    $game.append($card);
  };

  $('#game .card').click(function() {
    MatchGame.flipCard($(this), $game);
  })
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('flipped') === true) {
    return;
  } else {
    $card.css("background-color", $card.data('color'));
    $card.text($card.data('value'));
    $card.data('flipped', true);
  }
  var cards = $game.flippedCards
  cards.push($card);
  if (cards.length === 2) {
    cards.forEach((flippedCard) => {
      if (cards[0].data('value') === cards[1].data('value')) {
        flippedCard.css({
          "background-color": "rgb(153, 153, 153)",
          "color": "rgb(204, 204, 204)"
        });
      } else {
        setTimeout(function() {
          flippedCard.css("background-color", "rgb(32, 64, 86)");
          flippedCard.text('');
          flippedCard.data('flipped', false);
        }, 500);
      }
    });
    $game.flippedCards = [];
  };
};
