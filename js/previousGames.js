$( document ).ready(function() {

  // add new frame and fill it with the correct data
  var buildFrame = function( prevScoresStrArray, scoreFrames, index ) {

    var frame = '<div id="prevFrame-' + index + '" class="result-table"><div class="frame-count"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div></div><div class="score-count"><div  class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="score"></div></div><div class="frame"><div class="roll roll1"></div><div class="roll roll2"></div><div class="roll roll3"></div><div class="score"></div></div></div></div>';

    $('#previousFrames').append(frame);

    // add scores
    $('#prevFrame-' + index + ' .roll').each(function( index ) {
      $( this ).prepend( prevScoresStrArray[index] ) ;
    });
    $('#prevFrame-' + index + ' .frame').each(function( index ) {
      $( this ).append( scoreFrames[index] ) ;
    });
  }

  // loop through the gamescores and call buildframe for each
  $('li.gameScore').each( function( index ) {

    var prevScoresStr = $(this).text(),
        prevScoresStrArray = prevScoresStr.split(" ").map(Number);

    var score = 0,
        ball=0,
        scoreFrame=1,
        scoreFrames=[],
        cur;

    for (var i=0, l=prevScoresStrArray.length; i<l; i++ ) {
      score += (cur = prevScoresStrArray[i])
          + ((!ball && frame<10 && cur==10 && prevScoresStrArray[i+2]) || 0)
          + (scoreFrame<10 && (((ball ? prevScoresStrArray[i-1] : 0) + cur) == 10) ? prevScoresStrArray[i+1] || 0 : 0);
      ball = ball || (cur==10) ? 0 : 1;
      ball || (scoreFrame<10 ? scoreFrames.push(score) && scoreFrame++ : scoreFrames[9] = score);
    }
    console.log('The Scores so far are: ' , scoreFrames);

    buildFrame( prevScoresStrArray, scoreFrames, index);

  });
});
