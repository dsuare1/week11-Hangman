var prompt = require("prompt");
var Word = require("./word.js");
var Game = require("./game.js");

var schema = {
    properties: {
        guessLetter: {
            pattern: /[a-z]/,
            message: "Your entry must be only letters; try again!",
            required: true
        }
    }
};

prompt.start();

game = {
    wordBank: Game.Game.wordBank,
    wordsWon: 0,
    guessesRemaining: 10,
    userGuessedLetters: [],
    currentWrd: null,
    startGame: function(wrd) {
        this.resetGuessesRemaining();
        this.currentWrd = new Word.Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
        this.currentWrd.getLets();
        console.log("Welcome to Hangman!\n")
        console.log(this.currentWrd.wordRender() + "\n");
        this.keepPromptingUser();
    },
    resetGuessesRemaining: function() {
        this.guessRemaining = 10;
    },
    keepPromptingUser: function() {
        var self = this;
        prompt.get(schema, function(err, result) {
        	console.log("\n---------------------------------------------------------");
            console.log("The letter or space you guessed is: " + result.guessLetter);
            console.log("---------------------------------------------------------\n");
            var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
            if (findHowManyOfUserGuess == 0) {
                if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
                    self.userGuessedLetters.push(result.guessLetter);
                    self.guessesRemaining--;
                    console.log("You guessed a wrong letter!");
                    console.log(":( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( :( \n");
                } else {
                    console.log("You've already guessed this letter!");
                }
            } else {
                if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
                    self.userGuessedLetters.push(result.guessLetter);
                    console.log("*********************************************************");
                    console.log("You guessed right!");
                    console.log("*********************************************************\n");
                } else {
                    console.log("You've already guessed this letter!");
                }
                if (self.currentWrd.didWeFindTheWord()) {
                    console.log("You Won!!!");
                    return; //end game
                }
            }
            console.log("Guesses remaining: " + self.guessesRemaining + "\n");
            console.log(self.currentWrd.wordRender());
            console.log("\nThese are the letters you guessed already: " + self.userGuessedLetters);
            if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)) {
                self.keepPromptingUser();
            } else if (self.guessesRemaining == 0) {
                console.log("Game over bro it was ", self.currentWrd.word);
                console.log("Get with the program man");
            } else {
                console.log(self.currentWrd.wordRender());
            }
        });
    }
};

game.startGame();
