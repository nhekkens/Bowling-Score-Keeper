// Taken from the internet ( no need to reinvent the wheel )
$.urlParam = function(name){
		var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
		return results[1] || 0;
}
$.fn.removeText = function() {
    for (var i=this.length-1; i>=0; --i) removeText(this[i]);
};
function removeText(node) {
    if (!node) return;
    for (var i=node.childNodes.length-1; i>=0; --i) {
        var childNode = node.childNodes[i];
        if (childNode.nodeType === 3) node.removeChild(childNode);
        else if (childNode.nodeType === 1) removeText(childNode);
    }
}

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
	uid = $.urlParam('uid'),
	frameTable = '<div class="frame-count"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div></div><div class="score-count"><div id="frame1" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame2" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame3" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame4" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame5" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame6" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame7" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame8" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame9" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="score"></div></div><div id="frame10" class="frame"><div class="roll1"></div><div class="roll2"></div><div class="roll3"></div><div class="score"></div></div></div>';

	console.log(uid);


var playerScored = function( score ) {

	ballRoll++;
	throwNumber++;

	var targetID = 'frame' + frame,
		targetClass = 'roll' + ballRoll;


	if ( throwNumber <= throwLimit ) {

		// its more acurate here
		console.log( ' ');
		console.log( '******************* THROW ' + throwNumber + '/' + throwLimit + ' ******************');
		console.log( 'Frame: ' + frame + ' Roll: ' + ballRoll);
		console.log( 'You Hit ' + score + '  pins!');

		totalScore.push( score );

		// are we on throw one?
		if ( ballRoll === 1 ) {

			if ( frame ===  11 ) {
				// add score to table
				$('#frame10 div.roll3').html(score);
			}

			// did we throw a strike?
			if ( score === 10 ) {

				// add score to table
				$('#' + targetID + ' div.' + targetClass).html('X');

				// add score to table
				$('#' + targetID + ' div.roll2').html(0);

				if ( frame ===  10 ) {
					throwLimit = 21;
				}

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

				if ( frame ===  10 ) {
					throwLimit = 21;
				}

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
		var resetButton = ['<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Play again" onclick="resetGame();" value="0">Start Over</button><button id="saveButton" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Save Game" onclick="saveGame();" value="0">Save</button>'];

		$('#input').html(resetButton);
	}

	scoreArray();


	lastFrame = frame;
	lastScore = score;

	console.log( 'Total Score: ' + totalScore );


};

var resetGame = function(){

	throwLimit = 20;
	throwNumber = 0;
	totalScore = [];

	// get 11 new pins
	addPins(11);

	$('#scoreboard').removeText();

}

var saveGame = function(){

	var tosend = '{ "scores": ' + JSON.stringify(totalScore) + '}',
			readySend = JSON.parse(tosend);
	console.log(readySend);

	$('#saveButton').hide();

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
