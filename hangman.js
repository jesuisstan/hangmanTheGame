const input = require('prompt-sync')();
let myList = ["python", "java", "swift", "javascript", "kotlin"];
let wins = 0;
let losts = 0;

String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length)
    return this.valueOf();
  return this.substring(0, index) + replacement + this.substring(index + 1);
}

function checkInput(str) {
  if (str.length === 1 && str.match(/[a-z]/))
    return true;
  if (str.length !== 1) {
    console.log("Please, input a single letter.");
    return false;
  }
  console.log("Please, enter a lowercase letter from the English alphabet.");
  return false;
}

function showScoreboard (w, l) {
  console.log(`You won: ${w} times.`);
  console.log(`You lost: ${l} times.`);
}

console.log("H A N G M A N");
let flag = false;
while (!flag) {
  let command = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
  switch (command) {
    case ("exit"):
      flag = true;
      break;
    case ("results"):
      showScoreboard(wins, losts);
      break;
    default:
      break;
    case ("play"): {
      let puzzle = myList[Math.floor(Math.random() * myList.length)];
      let shown = "-".repeat(puzzle.length);
      let suggestionsArray = "";
      let attempt = 8;
      while (attempt) {
        console.log("\n" + shown);
        let answer = input("Input a letter: ");
        let check = checkInput(answer);
        switch (check) {
          case false:
            break;
          case true: {
            let ind = puzzle.indexOf(answer);
            if (!puzzle.includes(answer) && !suggestionsArray.includes(answer)) {
              console.log("That letter doesn't appear in the word.");
              suggestionsArray += answer;
              if (--attempt === 0) {
                losts++;
                console.log("\nYou lost!");
              }
            } else {
              if (suggestionsArray.includes(answer)) {
                console.log("You've already guessed this letter.");
              } else {
                suggestionsArray += answer;
                for (ind; ind < puzzle.length; ind++) {
                  if (puzzle[ind] === answer)
                    shown = shown.replaceAt(ind, answer);
                }
                if (shown === puzzle) {
                  console.log("You guessed the word " + shown + "!\nYou survived!");
                  wins++;
                  attempt = 0;
                 }
              }
            }
            break;
          }
        }
      }
      break;
    }
  }
}
