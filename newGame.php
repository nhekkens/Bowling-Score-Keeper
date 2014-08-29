<!DOCTYPE html>
<html>

<head>
  <title>Score Keeper</title>
</head>
<body>

<a href="index.php">Back</a>

<?php
require('database.php');

$scores = implode(" ", $_POST['scores']);

$uid = $_POST['UID'];

echo $uid;

echo $scores

$query="INSERT INTO Games ( 
	scores,
	UID ) 
VALUES (
	'$scores',
	'$UID')";

if (!mysql_query( $query, $database ))
  {
  die('There was an error: ' . mysql_error());
  }
echo $_POST[username] . " added";


error_log(print_r($_REQUEST, true));
error_log('test');
?>


</body>
</html>
