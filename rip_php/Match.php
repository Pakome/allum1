<?php

class Match {

	private $errors = [];
	private $matches;
	private $colors;
	private $turn;
	private $AITurn;

	// If the player entered a wrong value equals 1 else equals 0
	private $input = 0;
	private $difficulty = "hard";

	public function __construct($matches = 11) {
		$this->matches = $matches;
		$this->colors = new AI();
	}

	public function __destruct() {
		
	}

	public function displayMatches() {
		for ($i = 0; $i < $this->matches; $i++) {
			echo "| ";
		}
		echo "\n";
	}

	public function askTurn() {
		$turn = readline("Your turn: \n$ ");
		$turn = filter_var($turn, FILTER_VALIDATE_INT);
		if (!is_int($turn)) {
			echo $this->colors->getColoredString("There was an error: invalid input (positive number expected).", "black", "red") . "\n";
			$this->input = 1;
			return false;
		} else if ($turn == 0) {
			echo $this->colors->getColoredString("There was an error: you have to atleast remove one match.", "black", "red") . "\n";
			$this->input = 1;
			return false;
		} else if ($turn >= $this->matches) {
			echo $this->colors->getColoredString("There was an error: not enough matches.", "black", "red") . "\n";
			$this->input = 1;
			return false;
		} else if ($turn > 3) {
			echo $this->colors->getColoredString("There was an error: you can only pick up between 1 and 3 matches.", "black", "red") . "\n";
			$this->input = 1;
			return false;
		}
		$this->turn = $turn;
		$this->input = 0;

		$this->matches = $this->matches - $this->turn;
		if ($this->matches == 1 && $this->difficulty == "easy") {
			echo $this->colors->getColoredString("Well done, you won, try with intermediate difficulty if you dare.", "black", "green") . "\n";
		} 
	}

	public function startGame() {
		
		while ($this->matches > 1) {

			if ($this->input === 0) {
				$this->displayMatches();
			}
			
			$this->askTurn();

			if ($this->input === 0) {
				$this->displayMatches();
			}

			if ($this->input === 0) $this->iaTurn();

		}
	}

	public function iaTurn() {
		if ($this->difficulty == "easy" && $this->matches > 1) {

			echo "AI is thinking . . .\n";
			sleep(1);
			if ($this->matches == 3) {
				$this->matches = $this->matches - rand(1, 2);
			} else if ($this->matches == 2) {
				$this->matches = $this->matches - 1;
			} else {
				$this->matches = $this->matches - rand(1, 3);
			}
			if ($this->matches == 1) {
				echo $this->colors->getColoredString("You lost, close one, try again.", "black", "green") . "\n";
			}
		} else if ($this->difficulty == "hard" && $this->matches > 1) {
			echo "AI is thinking really hard . . .\n";
			sleep(1);

			echo checkMultiple();

		}
		
	}

	function checkMutliple() {
		$one = $this->matches - 1;
		$two = $this->matches - 2;
		$three = $this->matches - 3;
		if ($one % 4 == 0) {
			return true;
		} else if ($two % 4 == 0) {
			return true;
		} else if ($three % 4 == 0) {
			return true;
		} else return false;
	}


}

?>