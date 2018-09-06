<?php

class Match {

	private $errors = [];
	private $matches;
	private $colors;
	private $turn;

	public function __construct($matches = 11) {
		$this->matches = $matches;
		$this->colors = new IA();
	}

	public function __destruct() {
		// var_dump($this->errors);
		// die;
		foreach ($this->errors as $error) {
			echo $this->colors->getColoredString("There was an error: $error.", "black", "red") . "\n";
		}
	}

	// public function askMatches() {
	// 	$matches = readline("$ ");
	// }

	public function displayMatches() {
		for ($i = 0; $i < $this->matches; $i++) {
			echo "| ";
		}
		echo "\n";
	}

	public function askTurn() {
		$turn = readline("Your turn: \n$ ");
		$turn = ($turn = filter_var($turn, FILTER_VALIDATE_INT));
		if (!is_int($turn)) {
			$this->errors[] = "invalid input (positive number expected)";
			return false;
		} else if ($turn == 0) {
			$this->errors[] = "you have to atleast remove one match";
			return false;
		} else if ($turn > $this->matches) {
			$this->errors[] = "not enough matches";
			return false;
		}
		$this->turn = $turn;

		$this->deleteMatch();
	}

	public function deleteMatch() {
		echo "deleted match";
		echo $this->turn;
	}

}

?>