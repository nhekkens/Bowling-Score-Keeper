<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title>Score Keeper</title>
	<link type="text/css" rel="stylesheet" href="style.css" />
</head>


<body>

<div id="home" class="container">
	<div class="row">

		<div class="center-block">

		<div id="positional" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">

			<div class="panel panel-primary">
	  		<div class="panel-heading">
					<h1>Welcome to the Hekkens test.</h1>
				</div>
			  <div class="panel-body">

					<!-- New users can create a user with this form -->
					<h2>New User?</h2>
					<form action="newUser.php" method="post">
						<div class="">
							<div class="input-group">
								<input type="text" name="username" class="form-control">
								<span class="input-group-btn">
									<input class="btn btn-primary" type="submit">Go!</input>
								</span>
							</div>
						</div>
					</form>

					<h2>New Game?</h2>

					<div class="btn-group">
						<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
							Users <span class="caret"></span>
						</button>
						<ul class="dropdown-menu" role="menu">
							<?php
								require('database.php');
								$users = mysql_query("SELECT * FROM Users");
								while($user = mysql_fetch_array($users))
									{
									echo '<li><a href="playGame.php?uid=' . $user['UID'] . '">' . $user['username'] . '</a></li>';
									}
							?>
						</ul>
					</div>
			  </div>
			</div>
		</div>
	</div>
</div>



<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/main.js"></script>
</body>
</html>
