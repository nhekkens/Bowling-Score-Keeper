
var ballRoll = 0,
	throwNumber = 0,
	throwLimit = 20,
	frame = 1,
	lastFrame = 0,
	nextPins = null,
	strikeBonus = 0,
	spareBonus = 0,
	lastScore = 0,
	totalScore = [],
	uid = 1;


var playerScored = function( score ) {

	ballRoll++;
	throwNumber++;

	var targetID = 'frame' + frame,
		targetClass = 'roll' + ballRoll;

	// its more acurate here
	console.log( ' ');
	console.log( '******************* THROW ' + throwNumber + '/' + throwLimit + ' ******************');
	console.log( 'Frame: ' + frame + ' Roll: ' + ballRoll);
	console.log( 'You Hit ' + score + '  pins!');

	if ( throwNumber <= throwLimit ) {

		totalScore.push( score );

		// are we on throw one?
		if ( ballRoll === 1 ) {

			// did we throw a strike?
			if ( score === 10 ) {

				// add score to table
				$('#' + targetID + ' div.' + targetClass).html('X');

				// add score to table
				$('#' + targetID + ' div.roll2').html(0);

				// totalScore.push( 0 );

				// Add strike bonus
				// strikeBonus = 1;f

				// go to next frame
				frame++;

				// start new throws
				ballRoll = 0;

				// get 11 new pins
				addPins(11);
			}
			// not a strike
			else {

				// add score to table
				$('#' + targetID + ' div.' + targetClass).html(score);

				// find the correct amount of pins to add
				nextPins = 11 - score;

				// add correct amount of pins
				addPins(nextPins);
			}
		}
		// are we throw two?
		if ( ballRoll === 2 ) {

			// did we get a spare?
			if ( score + lastScore === 10 ) {

				// add score to table
				$('#' + targetID + ' div.roll2').html('/');

			}

			// not a spare
			else {

				// add score to table
				$('#' + targetID + ' div.' + targetClass).html(score);
			}

			// go to next frame
			frame++;

			// start new throws
			ballRoll = 0;

			// get 11 new pins
			addPins(11);
		}

	}
	// over throwlimit
	else
	{
		var resetButton = ['<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Play again" onclick="resetGame();" value="0">Start Over</button><button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Play again" onclick="saveGame();" value="0">Save</button>'];

		$('#input').html(resetButton);
	}

	scoreArray();


	lastFrame = frame;
	lastScore = score;

	// console.log( 'Throw: ' + ballRoll );
	// console.log( 'Frame: ' + frame + 'Roll: ' + ballRoll);
	// console.log( 'Throws: ' + throwNumber + '/' + throwLimit );
	// console.log( 'Spare Bonus: ' + spareBonus );
	console.log( 'Total Score: ' + totalScore );


};

var resetGame = function(){

	throwLimit = 20;
	throwNumber = 0;
	totalScore = [];

	// get 11 new pins
	addPins(11);

}

var saveGame = function(){

	var tosend = '{ "scores": ' + JSON.stringify(totalScore) + '}',
			readySend = JSON.parse(tosend);
	console.log(readySend);
	


	var jsonData = '{ "scores": ' + JSON.stringify(totalScore) + ', "UID": ' + uid + ' }',
		readyToSend = JSON.parse(jsonData);
	
			
	console.log(readyToSend);

	$.ajax({
	  type: "POST",
	  url: '/newGame.php',
	  data: readyToSend,
	  success: function( data ) {
			console.log( data );
			alert('Saved');
		},
	  dataType: 'json'
	});

}

var scoreArray = function(){
  var score = 0,
  	ball=0,
  	scoreFrame=1,
  	scoreFrames=[],
  	cur;

  // i took this from google
  for (var i=0, l=totalScore.length; i<l; i++ ) {
  	score += (cur = totalScore[i])
      	+ ((!ball && frame<10 && cur==10 && totalScore[i+2]) || 0)
      	+ (scoreFrame<10 && (((ball ? totalScore[i-1] : 0) + cur) == 10) ? totalScore[i+1] || 0 : 0);
  	ball = ball || (cur==10) ? 0 : 1;
  	ball || (scoreFrame<10 ? scoreFrames.push(score) && scoreFrame++ : scoreFrames[9] = score);
  }
  console.log('The Scores so far are: ' , scoreFrames);

  // add scores
  $( ".score" ).each(function( index ) {
	  $( this ).html( scoreFrames[index] ) ;
	});


  return scoreFrames;
}

var addPins = function( pins ) {
	var index;
	var text = '';
	var buttons = ['<button id="btn0" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="No pins knocked down" onclick="playerScored(0);" value="0">0</button>',
					  '<button id="btn1" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="1 pin knocked down" onclick="playerScored(1);" value="1">1</button>',
					  '<button id="btn2" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="2 pins knocked down" onclick="playerScored(2);" value="2">2</button>',
					  '<button id="btn3" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="3 pins knocked down" onclick="playerScored(3);" value="3">3</button>',
					  '<button id="btn4" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="4 pins knocked down" onclick="playerScored(4);" value="4">4</button>',
					  '<button id="btn5" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="5 pins knocked down" onclick="playerScored(5);" value="5">5</button>',
					  '<button id="btn6" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="6 pins knocked down" onclick="playerScored(6);" value="6">6</button>',
					  '<button id="btn7" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="7 pins knocked down" onclick="playerScored(7);" value="7">7</button>',
					  '<button id="btn8" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="8 pins knocked down" onclick="playerScored(8);" value="8">8</button>',
					  '<button id="btn9" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="9 pins knocked down" onclick="playerScored(9);" value="9">9</button>',
					  '<button id="btn10" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="10 pins knocked down" onclick="playerScored(10);" value="10">10</button>'];
	for (index = 0; index < pins; index++) {
	    text +=  buttons[index];
	}
	$('#input').html(text);
	// console.log('pins added.');
}
