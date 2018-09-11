// Declare variables
matches = 11;
turn = 0;
AITurn = 0;
// If the player entered a wrong value equals 1 else equals 0
input = 0;
difficulty = 0;

// Functions
function displayMatches() {
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("\033[31m..... \033[0m");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("\033[31m..... \033[0m");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("\033[31m..... \033[0m");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|   | ");
	}
	process.stdout.write("\n");
	for ($i = 0; $i < matches; $i++) {
		process.stdout.write("|___| ");
	}
	process.stdout.write("\n");
}

async function readlineJS() {
	difficulty = await resolveAfterReply("Choose your difficulty: easy, intermediate or hard\n");
	if (difficulty === "easy" || difficulty === "intermediate" || difficulty === "hard") {
		displayMatches();
		while (matches > 1) {
			var result = await resolveAfterReply("Your turn:\n$ ");
			askTurn(result, difficulty);
			wasteMyTime = await takeYourTime();
		}
	} else { 
		console.log("Difficulty '" + difficulty + "' is not known");
		return;
	}
	var restart = await resolveAfterReply("Press enter to keep playing, type quit to exit ");
	if (restart === "quit" || restart === "q") {
		return;
	} else {
		matches = 11;
		readlineJS();
	}
}

function resolveAfterReply(ask) {
    return new Promise(resolve => {
    	const readline = require('readline');
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
    	rl.question(ask, async function(answer) {
			rl.close();
			resolve(answer);
        });
    });
}

function askTurn(answer, difficulty) {
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
		iaTurn(difficulty);
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

function iaTurn(difficulty) {
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
		setTimeout(function() {
			if ((matches - 2) % 4 === 0) {
				matches = matches - 1;
			} else if ((matches - 3) % 4 === 0) {
				matches = matches - 2;
			} else if ((matches - 4) % 4 === 0) {
				matches = matches - 3;
			} else {
				matches = matches - rand(1, 3);
			}
			displayMatches();
			if (matches === 1) {
				console.log("You lost. Close one, try again.");
			}
		}, 1000);
	} else if (difficulty === "hard" && matches > 1) {
		console.log("AI is thinking really hard . . .");
		setTimeout(function() {
			if ((matches - 2) % 4 === 0) {
				matches = matches - 1;
			} else if ((matches - 3) % 4 === 0) {
				matches = matches - 2;
			} else if ((matches - 4) % 4 === 0) {
				matches = matches - 3;
			} else {
				matches = matches - 1;
			}
			displayMatches();
			if (matches === 1) {
				console.log("You lost. Close one, try again.");
			}
		}, 1000);
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
