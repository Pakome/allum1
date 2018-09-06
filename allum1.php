<?php

require_once('Match.php');
require_once('IA.php');

$match = new Match();
$IA = new IA();

$match->displayMatches();
$match->askTurn();



?>