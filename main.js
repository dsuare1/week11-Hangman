var prompt = require('prompt');
var Word = require('./word.js');
var Game = require("./game.js");

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
        prompt.get(['guessLetter'], function(err, result) {
            // if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
            //     self.userGuessedLetters.push(result.guessLetter);
            // } else {
            // 	console.log("You already guessed that letter!");
            // }
            console.log("The letter or space you guessed is: " + result.guessLetter);
            var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
            if (findHowManyOfUserGuess == 0) {
            	if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
                	self.userGuessedLetters.push(result.guessLetter);
                	self.guessesRemaining--;
                	console.log("You guessed a wrong letter!");
                } else {
                	console.log("You've already guessed this letter!");
                }
            } else {
                if (self.userGuessedLetters.indexOf(result.guessLetter) < 0) {
                	self.userGuessedLetters.push(result.guessLetter);
                	console.log('You guessed right!');
                } else {
                	console.log("You've already guessed this letter!");	
                }
                if (self.currentWrd.didWeFindTheWord()) {
                    console.log('You Won!!!');
                    return; //end game
                }
            }
            console.log('Guesses remaining: ', self.guessesRemaining);
            console.log(self.currentWrd.wordRender());
            console.log('here are the letters you guessed already: ' + self.userGuessedLetters);
            if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)) {
                self.keepPromptingUser();
            } else if (self.guessesRemaining == 0) {
                console.log('Game over bro it was ', self.currentWrd.word);
                console.log('Get with the program man');
            } else {
                console.log(self.currentWrd.wordRender());
            }
        });
    }
};

game.startGame();