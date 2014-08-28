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

$query="INSERT INTO Games ( scores ) VALUES ('$scores')";

if (!mysql_query( $query, $database ))
  {
  die('There was an error: ' . mysql_error());
  }
echo $_POST[username] . " added";

?>


</body>
</html>
