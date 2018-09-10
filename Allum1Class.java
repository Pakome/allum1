/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author maxime
 */
public class Allum1Class {

	// Declare variables
	public int matches = 11;
	public int turn = 0;
    public int aiTurn = 0;
    // If the player entered a wrong value equals 1 else equals 0
    public int input = 0;
    public String difficulty = "easy";

    public static void main(String[] args){

        Allum1Class allum1 = new Allum1Class();
        allum1.displayMatches();
        allum1.askTurn();

        
    }

    public void displayMatches(){
        for (int i = 0; i < this.matches; i++){
            System.out.print("| ");
        }
        System.out.print("\n");
    }

    public void askTurn(){
    	System.out.print("Your turn:\n $ ");
    	String input = System.console().readLine();
    	try {
    		int turn = Integer.parseInt(input);
    		if (turn == 0) {
    			System.out.print("There was an error: you have to atleast remove one match.\n");
    			this.input = 1;
    			return;
    		} else if (turn > 3) {
    			System.out.print("There was an error: you can only pick up between 1 and 3 matches.\n");
    			this.input = 1;
    			return;
    		} else if (turn < 1) {
    			System.out.print("There was an error: invalid input (positive number expected).\n");
    			this.input = 1;
    			return;
    		}
    		this.turn = turn;
    		this.input = 0;

    		System.out.print(this.matches);
    		this.matches = this.matches - this.turn;
 			System.out.print(this.matches);

 			if (this.matches == 1 && this.difficulty == "easy") {
 				System.out.print("Well done, you won, try intermediate difficulty.");
 			} else if (this.matches == 1 && this.difficulty == "intermediate") {
 				System.out.print("Well done, you won, try hard difficulty if you dare, it won't be that easy.");
 			} else if (this.matches == 1 && this.difficulty == "hard") {
 				System.out.print("Welcome home master.");
 			}
    	} catch (NumberFormatException e) {
    		System.out.print("There was an error: invalid input (positive number expected).\n");
    		this.input = 1;
    		return;
    	}
   
    }
   
}
