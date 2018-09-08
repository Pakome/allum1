// Declare variables
matches = 11;
turn = 0;
AITurn = 0;
// If the player entered a wrong value equals 1 else equals 0
input = 0;
difficulty = "easy";

// Functions
function displayMatches() {
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("| ");
	}
	process.stdout.write("\n");
}

async function readlineJS() {
	displayMatches();
	while (matches > 1) {
		var result = await resolveAfterReply();
		askTurn(result);
		wasteMyTime = await takeYourTime();
	}
}

function resolveAfterReply() {
    return new Promise(resolve => {
    	const readline = require('readline');
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
    	rl.question("Your turn:\n$ ", async function(answer) {
			rl.close();
			resolve(answer);
        });
    });
}

function askTurn(answer) {
	if (input === 1) {
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

	if (input === 0) {
		displayMatches();
		iaTurn();
	}

	if (matches === 1) {
		if (difficulty === "easy") {
			console.log("Well done, you won, try intermediate difficulty.");
		} else if (difficulty === "intermediate") {
			console.log("Well done, you won, try hard difficulty if you dare, it won't be that easy.")
		} else if (difficulty === "hard") {
			console.log("Welcome home master.");
		}
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
			displayMatches();
			if (matches === 1) {
				console.log("You lost. Close one, try again.");
			}
		}, 1000);
	} else if (difficulty === "intermediate" && matches > 1) {
		console.log("AI is thinking . . .");
	} else if (difficulty === "hard" && matches > 1) {
		console.log("AI is thinking really hard . . .");
		checkMultiple();
	}
}

function checkMultiple() {
	if ((matches -1) % 4 === 0) {
		return "one";
	} else if ((matches - 2) % 4 === 0) {
		return "two";
	} else if ((matches - 3) % 4 === 0) {
		return "three";
	} else {
		return false;
	}
}

// Return a random number between [min, max]
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// Stop the execution for 1 second
function takeYourTime() {
    return new Promise(resolve => {
    	setTimeout(function() { 
			resolve();
		}, 1001);
    });
}

readlineJS();