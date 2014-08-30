<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Score Keeper</title>
  <link type="text/css" rel="stylesheet" href="style.css" />
</head>

<body>
  <div id="playGame" class="container">
    <div class="row">

      <div class="center-block">

      <div id="positional" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

        <div class="panel mTop panel-primary">
          <div class="panel-heading">
            <h1>New Game</h1>
          </div>
          <div class="panel-body">

            <p>Select </p>

            <div id="input">
              <button id="btn0" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="No pins knocked down" onclick="playerScored(0);" value="0">0</button>
              <button id="btn1" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="1 pin knocked down" onclick="playerScored(1);" value="1">1</button>
              <button id="btn2" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="2 pins knocked down" onclick="playerScored(2);" value="2">2</button>
              <button id="btn3" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="3 pins knocked down" onclick="playerScored(3);" value="3">3</button>
              <button id="btn4" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="4 pins knocked down" onclick="playerScored(4);" value="4">4</button>
              <button id="btn5" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="5 pins knocked down" onclick="playerScored(5);" value="5">5</button>
              <button id="btn6" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="6 pins knocked down" onclick="playerScored(6);" value="6">6</button>
              <button id="btn7" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="7 pins knocked down" onclick="playerScored(7);" value="7">7</button>
              <button id="btn8" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="8 pins knocked down" onclick="playerScored(8);" value="8">8</button>
              <button id="btn9" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="9 pins knocked down" onclick="playerScored(9);" value="9">9</button>
              <button id="btn10" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="10 pins knocked down" onclick="playerScored(10);" value="10">10</button>
            </div>

            <div id="results" class="result-table">
              <div class="frame-count">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
              </div>
              <div id="scoreboard" class="score-count">
                <div id="frame1" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame2" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame3" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame4" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame5" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame6" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame7" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame8" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame9" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="score"></div>
                </div>
                <div id="frame10" class="frame">
                  <div class="roll1"></div><div class="roll2"></div><div class="roll3"></div><div class="score"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel panel-primary">
          <div class="panel-heading">
            <h1>Previous Games</h1>
          </div>
          <div class="panel-body">

            <div id="previousFrames">

            </div>

          </div>
        </div>

        <a href="index.php" class="goback btn btn-primary btn-lg active" role="button">Change User</a>
      </div>
    </div>
  </div>

  <ul id="gamescores">
    <?php
      $uid = $_GET['uid'];


      require('database.php');
      $games = mysql_query("SELECT * FROM Games WHERE UID = $uid");
      while($game = mysql_fetch_array($games))
        {
        echo '<li class="gameScore">' . $game['scores'] . '</li>';
        }
    ?>
  </ul>

  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <!-- <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script> -->
  <script src="/js/main.js"></script>
  <script src="/js/previousGames.js"></script>
</body>
</html>
