<?php

require_once('Match.php');
require_once('IA.php');

// Initiate classes
$match = new Match();
$IA = new AI();

$number = 16;

if ($number % 4 == 0) {
	echo "true" . $number % 4;
} else {
	echo "false" . $number % 4;
}

// Start a new game
// $match->startGame();

?>