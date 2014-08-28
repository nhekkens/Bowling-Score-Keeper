
var count = 1,
	frame = 1,
	lastFrame = 0,
	nextPins = null,
	strikeBonus = 0,
	spareBonus = 0,
	lastScore = 0,
	totalScore = [];


var playerScored = function( score ) {

	var targetID = 'frame' + frame,
		targetClass = 'roll' + count;

	totalScore.push( score );

	 $('input[name="' + targetID  + targetClass + ' "]').val(score);
	
	// are we at the end?
	if ( frame === 11 ) {

		if ( count === 1 ) {
			// did we throw a strike?
			if ( score === 10 ) {

				$('#frame10 div.roll3').html('X');

				$('#input').html();

				scoreArray();
			} 
			// not a strike
			else {

				$('#frame10 div.roll3').html(score);

				$('#input').html();

				scoreArray();
			}
		} else {
			addFormData();
			return;
		}
	}

	// are we on throw one?
	if ( count === 1 && frame <= 10 ) {

		// did we throw a strike?
		if ( score === 10 ) {

			$('#' + targetID + ' div.' + targetClass).html('X');

			$('#' + targetID + ' div.roll2').html(0);

			// totalScore.push( 0 );

			// Add strike bonus
			strikeBonus = 1;

			// go to next frame
			frame++;

			// start new throws
			count = 0;

			// get 11 new pins 
			addPins(11);
		} 
		// not a strike
		else {

			$('#' + targetID + ' div.' + targetClass).html(score);

			// find the correct amount of pins to add
			nextPins = 11 - score;

			// add correct amount of pins
			addPins(nextPins);
		}
	} 
	// are we throw two?
	if ( count === 2 && frame <= 10 ) {

		// did we get a spare?
		if ( score + lastScore === 10 ) {

			$('#' + targetID + ' div.roll2').html('/');

			// add spare bonus
			spareBonus = 1;
		}

		// not a spare
		else {
			
			$('#' + targetID + ' div.' + targetClass).html(score);
		}

		// go to next frame
		frame++;

		// start new throws
		count = 0;

		// get 11 new pins 
		addPins(11);
	}

	

	scoreArray();


	lastFrame = frame;
	lastScore = score;
	count++;
	console.log( 'Throw: ' + count );
	console.log( 'Frame Count: ' + frame );
	console.log( 'Strike Bonus: ' + strikeBonus );
	console.log( 'Spare Bonus: ' + spareBonus );
	console.log( 'Total Score: ' + totalScore );


};

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
        console.log('the scores are : ' , scoreFrames);

        // add scores
        $( ".score" ).each(function( index ) {
		  $( this ).html( scoreFrames[index] ) ;
		});

        console.log(scoreFrames[2]);
        return scoreFrames;
    }

var addFormData = function(){
        
        .$.each( totalScore, function(index, val) {
        	 /* iterate through array or object */
        });
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
	console.log('pins added.');
}
