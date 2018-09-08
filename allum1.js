// Declare variables
matches = 11;
turn = 0;
AITurn = 0;
// If the player entered a wrong value equals 1 else equals 0
input = 0;
difficulty = "easy";
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Functions
function displayMatches() {
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("| ")
	}
	process.stdout.write("\n")
}

function readlineJS() {
	while (matches > 1) {
		rl.question("Your turn:\n$ ", (answer) => {
		    rl.close();
		    askTurn(answer);
		});
	}	
}

function askTurn(answer) {
	if (input === 0) {
		displayMatches();
	}
	answer = Number.parseInt(answer);
	if (answer === 0) {
		console.log("There was an error: you have to atleast remove one match.");
		input = 1;
		return false;
	} else if (!Number.isInteger(answer) || Math.sign(answer) !== 1) {
	    console.log("There was an error: invalid input (positive number expected).");
	    input = 1;
	    return false;
	} else if (answer >= matches) {
		console.log("There was an error: not enough matches.");
		input = 1;
		return false;
	} else if (answer > 3) {
		console.log("There was an error: you can only pick up between 1 and 3 matches.");
		input = 1;
		return false;
	}

	turn = answer;
	input = 0;
	matches = matches - answer;

	if (matches === 1) {
		if (difficulty === "easy") {
			console.log("Well done, you won, try intermediate difficulty if you dare.");
		} else if (difficulty === "intermediate") {
			console.log("Well done, you won, try hard difficulty if you dare, it won't be that easy.")
		} else if (difficulty === "hard") {
			console.log("Welcome home master.");
		}
	}
	if (input === 0) {
		displayMatches();
		iaTurn();
	}
}

function iaTurn() {
	if (difficulty === "easy" && matches > 1) {
		console.log("AI is thinking . . .");
		setTimeout(function() {
			if (matches === 3) {
				matches = matches - rand(1, 2);
			} else if (matches === 2) {
				matches = matches - 1;
			} else {
				matches = matches - rand(1, 3);
			}
			if (matches === 1) {
				console.log("You lost. Close one, try again.");
			}
		}, 1000);
	} else if (difficulty === "intermediate" && matches > 1) {
		console.log("AI is thinking . . .");
	} else if (difficulty === "hard" && matches > 1) {
		console.log("AI is thinking . . .");
	}
}

readlineJS();


	// public function iaTurn() {
	// 	if ($this->difficulty == "easy" && $this->matches > 1) {

	// 		echo "AI is thinking . . .\n";
	// 		sleep(1);
	// 		if ($this->matches == 3) {
	// 			$this->matches = $this->matches - rand(1, 2);
	// 		} else if ($this->matches == 2) {
	// 			$this->matches = $this->matches - 1;
	// 		} else {
	// 			$this->matches = $this->matches - rand(1, 3);
	// 		}
	// 		if ($this->matches == 1) {
	// 			echo $this->colors->getColoredString("You lost, close one, try again.", "black", "green") . "\n";
	// 		}
	// 	} else if ($this->difficulty == "hard" && $this->matches > 1) {
	// 		echo "AI is thinking really hard . . .\n";
	// 		sleep(1);

	// 		echo checkMultiple();

	// 	}
		
	// }

	// function checkMutliple() {
	// 	$one = $this->matches - 1;
	// 	$two = $this->matches - 2;
	// 	$three = $this->matches - 3;
	// 	if ($one % 4 == 0) {
	// 		return true;
	// 	} else if ($two % 4 == 0) {
	// 		return true;
	// 	} else if ($three % 4 == 0) {
	// 		return true;
	// 	} else return false;
	// }
