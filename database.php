<?php

$database = mysql_connect("localhost","root","root");
if (!$database)
  {
  die('Could not connect: ' . mysql_error());
  }

// Create db here.
// if (mysql_query("CREATE DATABASE scorekeeper",$database))
//   {
//   echo "Database created";
//   }
// else
//   {
//   echo "Error creating database: " . mysql_error();
//   }

// Create table here
mysql_select_db( "scorekeeper", $database );

$query = "CREATE TABLE Users
(
UID int NOT NULL AUTO_INCREMENT, 
PRIMARY KEY(UID),
username varchar(15) UNIQUE
)";

mysql_query( $query, $database );


?>