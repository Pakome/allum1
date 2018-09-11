/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.concurrent.ThreadLocalRandom;

/**
 *
 * @author maxime
 */
public class Allum1Class {

	// Declare the number of matches for the game.
	public int matches = 11;
    // Set the difficulty
    public String difficulty = "easy";

    public static void main(String[] args){

    	// Initiate the class and keep playing until there is only one match left.
        Allum1Class allum1 = new Allum1Class();

        // Welcome the user and let him exit.
    	System.out.print("Welcome on Allum1 press enter to continue or enter 'quit' to exit ");
    	String welcome = System.console().readLine();
    	System.out.print(welcome);
    	if (welcome.equals("quit") || welcome.equals("q")) {
    		return;
    	}

    	// Pick the gamemode.
    	System.out.print("Choose your difficulty: 'easy', 'intermediate' or 'hard'\n");
    	String gameMode = System.console().readLine();
    	if (gameMode.equals("easy") || gameMode.equals("intermediate") || gameMode.equals("hard")) {
    		allum1.difficulty = gameMode;
	        allum1.displayMatches();
	        while (allum1.matches > 1) {
	        	allum1.askTurn();
	    	}
    	} else {
    		System.out.print("Unknow difficulty '" + gameMode + "'.\n");
    	}

    }

    // Display the current number of match(es);
    public void displayMatches(){
    	for (int i = 0; i < this.matches; i++){
            System.out.print("\033[31m..... \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[31m..... \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[31m..... \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|   | \033[0m");
        }
        System.out.print("\n");
        for (int i = 0; i < this.matches; i++){
            System.out.print("\033[36m|___| \033[0m");
        }
        System.out.print("\n");
    }

    // Sanitize the input of the user and play his turn.
    public void askTurn(){

    	// Read the user input
    	System.out.print("Your turn:\n $ ");
    	String input = System.console().readLine();

    	// Verify if there is any errors and let the player know.
    	try {
    		int turn = Integer.parseInt(input);
    		if (turn == 0) {
    			System.out.print("There was an error: you have to atleast remove one match.\n");
    			return;
    		} else if (turn > 3) {
    			System.out.print("There was an error: you can only pick up between 1 and 3 matches.\n");
    			return;
    		} else if (turn < 1) {
    			System.out.print("There was an error: invalid input (positive number expected).\n");
    			return;
    		}

    		// If there was no errors play the move of the user and let him see the new number of matches.
    		this.matches = this.matches - turn;
    		this.displayMatches();

    		// Verify if the user won with the last turn.
 			if (this.matches == 1 && this.difficulty.equals("easy")) {
 				System.out.print("Well done, you won, try intermediate difficulty.\n");
 			} else if (this.matches == 1 && this.difficulty.equals("intermediate")) {
 				System.out.print("Well done, you won, try hard difficulty if you dare. It won't be that easy.\n");
 			} else if (this.matches == 1 && this.difficulty.equals("hard")) {
 				System.out.print("Welcome home master.\n");
 			}

 			// Start the iaTurn
 			this.iaTurn();

    	} catch (NumberFormatException e) {
    		System.out.print("There was an error: invalid input (positive number expected).\n");
    		return;
    	}   
    }

    // Script turn
    public void iaTurn() {

    	// Algorithm for the easy mode
    	if (this.difficulty.equals("easy") && this.matches > 1) {

    		// Make it looks like the ai is preparing his next move.
    		System.out.print("AI is thinking . . .\n");
			try {
				Thread.sleep(1000);
			} catch(InterruptedException ex) {
				Thread.currentThread().interrupt();
			}

			// Pick up a random number between 1 and 3 and plays it.
    		if (this.matches == 2) {
    			this.matches = this.matches - 1;
    		} else if (this.matches == 3) {
    			this.matches = this.matches - this.rand(1, 2);
    		} else {
    			this.matches = this.matches - this.rand(1, 3);
    		}
    		this.displayMatches();
    		if (this.matches == 1) {
    			System.out.print("You lost. Close one, try again.");
    		}

    	// Algorithm for the intermediate mode.
    	} else if (this.difficulty.equals("intermediate") && this.matches > 1) {

    		// Make it looks like the ai is preparing his next move.
    		System.out.print("AI is thinking . . .\n");
			try {
				Thread.sleep(1000);
			} catch(InterruptedException ex) {
				Thread.currentThread().interrupt();
			}

			// Verify if it can leave a multiple of 4 + 1 to win.
    		if ((this.matches - 2) % 4 == 0) {
    			this.matches = this.matches - 1;
    		} else if ((this.matches - 3) % 4 == 0) {
    			this.matches = this.matches - 2;
    		} else if ((this.matches - 4) % 4 == 0) {
    			this.matches = this.matches - 3;
    		// If it can't, play a random number between 1 and 3.
    		} else {
    			this.matches = this.matches - this.rand(1, 3);
    		}
    		this.displayMatches();
    		if (this.matches == 1) {
    			System.out.print("You lost. Close one, try again.");
    		}

    	// Algorithm for the hard mode.
    	} else if (this.difficulty.equals("hard") && this.matches > 1) {

    		// Make it looks like the ai is preparing his next move.
    		System.out.print("AI is thinking really hard . . .\n");
			try {
				Thread.sleep(1000);
			} catch(InterruptedException ex) {
				Thread.currentThread().interrupt();
			}

			// Verify if it can leave a multiple of 4 + 1 to win.
    		if ((this.matches - 2) % 4 == 0) {
    			this.matches = this.matches - 1;
    		} else if ((this.matches - 3) % 4 == 0) {
    			this.matches = this.matches - 2;
    		} else if ((this.matches - 4) % 4 == 0) {
    			this.matches = this.matches - 3;
    		// Else remove only one match and wait for a player mistake.
    		} else {
    			this.matches = this.matches - 1;
    		}
    		this.displayMatches();
    		if (this.matches == 1) {
    			System.out.print("You lost. Close one, try again.");
    		}
    	}
    }

    // Generate a random number between [min, max] and return it.
    public int rand(int min, int max) {
        int randNum = ThreadLocalRandom.current().nextInt(1, 3 + 1);
        return randNum;
    } 
   
}
