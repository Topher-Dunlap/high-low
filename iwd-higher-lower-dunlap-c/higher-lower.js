//global variables
let userRangeInput, randomInt, valid_input;
let guessHolder = [];

//generate random num
function randomIntGenerator(input) {
    return Math.floor(Math.random() * input) + 1;
}

function validateUserRangeInput() {
    ///reset values and user messages if range is reset by user
    valid_input = false;
    guessHolder = [];
    document.getElementById("incorrectGuess").innerHTML = "";
    document.getElementById("userResultsMessage").innerHTML = "";

    ///check that range has been set
    while(!valid_input) {
        userRangeInput = window.prompt("Please enter a positive integer, 1 or above: "); //use prompt() to get user input
        if(userRangeInput != NaN && userRangeInput > 0) {
            valid_input = true;
            userRangeInput = Math.round(userRangeInput) //round user input if decimal
            document.getElementById("userRangeMessage").innerHTML = `Your range to guess in is now set between 1 and ${userRangeInput}.`;
            document.getElementById("incorrectGuess").innerHTML = "";
        }
    }
}

function validateGuess(guess) {
    ///determine if guess is out of range or not a number
    if (isNaN(guess)) {
        return document.getElementById("incorrectGuess").innerHTML = "That is not a number!";
    }
    if (guess < 1 || guess > userRangeInput) {
        return document.getElementById("incorrectGuess").innerHTML = "That number is not in range, try again.";
    }
    ///if guess correct display message
    if (randomInt === guess) {
        clearAndPush(guess);
        document.getElementById("userResultsMessage").innerHTML = `You got it! It took you ${guessHolder.length} tries and your guesses were numbers: ${guessHolder.toString()}.`;
    }
    ///determine if guess is duplicate or incorrect guess
    else if (!preventDuplicates(guess)) {
        clearAndPush(guess);
        document.getElementById("incorrectGuess").innerHTML = "This is not a correct guess. Please try again.";
    }
}

///clear user message and add user guess to guessed array
function clearAndPush(guessInput) {
    document.getElementById("incorrectGuess").innerHTML = "";
    guessHolder.push(guessInput);
}

///prevent Duplicate Guesses
function preventDuplicates(userNum) {
    if(guessHolder.find(num => num === userNum)){
        document.getElementById("incorrectGuess").innerHTML = "You've already guessed this number. Please try again.";
        return true;
    }
}

function numRangeOnClick() {
    validateUserRangeInput()
    randomIntGenerator()
    randomInt = randomIntGenerator(userRangeInput); //generate random int from 1 to N
}

function userGuessOnClick(e, userGuess) {
    ///prevent previous event driven messages from being cleared by default
    e = e || window.event;
    e.preventDefault();
    ///check to see if range is defined
    if (userRangeInput === undefined) {
        return document.getElementById("incorrectGuess").innerHTML = "Please enter a range above before submitting a guess.";
    }
    //validate the user guess
    validateGuess(parseInt(userGuess));
    ///clear input field after each onclick
    document.getElementById("numGuess").value = "";
}
