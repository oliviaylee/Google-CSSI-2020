/* global p5, eng,fr,rus,esp */
let p = new p5(() => {});

// Variables
let width,
  height,
  diam,
  backgroundColor,
  img,
  level,
  lang,
  word,
  dict,
  dashWidth,
  wordWidth,
  correctGuesses,
  wrongGuesses,
  guessedLetters;

// Dictionaries are  in dictionaries.js

/** TO DO ITEMS, IN ORDER OF PRIORITY: 

@Olivia: Tidy up keyboard inputs - avoid Shift, Delete etc. and numbers
@Olivia: Some special characters are still missing e.g. í, ê etc. Create buttons for this? 
         Can cheat by removing those words from dict but would prefer not to.
@Alexander: Get BackgroundImage function working
@AnyoneCan we get a sound at least for english? 

**/

p.setup = function() {
  level = getQueryString("level1");
  lang = getQueryString("lang");
  chooseBackground();
  startOver();
};

p.draw = function() {
  drawDashes();
  centreMsg("Guess the word before the snowman melts away", 0.9);
  eraseSnowman();

  if (p.keyIsPressed && p.keyCode != "32") {
    p.fill(0, 0, 0);
    p.textSize(20);

    if (!guessedLetters.includes(p.key)) {
      //p.keyCode >= 65 && p.keyCode <= 90 &&
      // Ensures user only inputs letters that haven't been typed before
      let index = word.indexOf(p.key);
      if (index !== -1) {
        while (index !== -1) {
          // If you guess one letter, it fills in all instances of that letter
          correctGuesses++;
          let letterX =
            0.5 * (width - wordWidth) +
            index * dashWidth * 2 +
            0.5 * (dashWidth - p.textWidth(p.key));
          let letterY = 0.8 * height - 5;
          p.stroke("black");
          p.text(p.key, letterX, letterY);
          index = word.indexOf(p.key, index + 1);
        }
      } else {
        wrongGuesses++;
        p.text(p.key, 0.1 * width, 0.2 * height + wrongGuesses * 18);
      }
      guessedLetters.push(p.key);
    }
  }

  if (correctGuesses == word.length) {
    youWin();
  }
};

//HELPER FUNCTIONS
document.addEventListener("keydown", function(event) {
  return String.fromCharCode(event.which || event.keyCode);
});

function whichKey(evt) {
  return String.fromCharCode(evt.which || evt.keyCode);
}

//helper function: uses QueryString to find a variabe passed by the previous htmlfile
function getQueryString(field, url) {
  var href = url ? url : window.location.href;
  var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
  var string = reg.exec(href);
  return string ? string[1] : null;
}

/* Function: startOver
 *  This function helps create the new game. It is used in setup and restarGame
 */

function startOver() {
  width = 500;
  height = 400;
  diam = 75;
  p.createCanvas(width, height);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  p.background(backgroundColor);

  //tests
  console.log(level);
  console.log(lang);

  pickDictionary();
  if (lang == "eng") {
    word = dict[p.floor(p.random(dict.length))];
  } else {
    let foreignWords = Object.keys(dict);
    word = foreignWords[p.floor(p.random(foreignWords.length))];
  }
  dashWidth = 10;
  wordWidth = word.length * dashWidth + (word.length - 1) * dashWidth;
  correctGuesses = 0;
  wrongGuesses = 0;
  guessedLetters = [];
  drawSnowmanOnce();
  displaySettings();
}

/* Function: chooseBackground
 *  This function displays different background images depending on the language selected.
 */

function chooseBackground() {
  if (lang == "eng") {
    img = p.loadImage(
      "https://cdn.glitch.com/8cc9724b-7b2e-4e4c-a8e6-250907c5de4c%2FWhiteHouseRoseGarden.jpg?v=1595983265578"
    );
    console.log("hello");
  } else if (lang == "fr") {
    img = p.loadImage(
      "https://cdn.glitch.com/8cc9724b-7b2e-4e4c-a8e6-250907c5de4c%2FParisInWinter.jpg?v=1595983362129"
    );
  } else if (lang == "esp") {
    img = p.loadImage(
      "https://cdn.glitch.com/8cc9724b-7b2e-4e4c-a8e6-250907c5de4c%2FParkGuell.jpg?v=1595983393098"
    );
  } else if (lang == "rus") {
    img = p.loadImage(
      "https://cdn.glitch.com/8cc9724b-7b2e-4e4c-a8e6-250907c5de4c%2FRed-Square.jpg?v=1595983432994"
    );
  } else {
    console.log("error");
  }
  //p.image(img, 0, 0);
}

/* Function: pickDictionary
 *  This function assigns the dict variable to the correct array/JSON object based on
 *  the user's language and difficulty level selection on the home page.
 */
function pickDictionary() {
  if (lang == "eng") {
    if (level == "easy") {
      dict = eng[0];
    } else if (level == "medium") {
      dict = eng[1];
    } else if (level == "hard") {
      dict = eng[2];
    }
  } else if (lang == "fr") {
    if (level == "easy") {
      dict = fr[0];
    } else if (level == "medium") {
      dict = fr[1];
    } else if (level == "hard") {
      dict = fr[2];
    }
  } else if (lang == "esp") {
    if (level == "easy") {
      dict = esp[0];
    } else if (level == "medium") {
      dict = esp[1];
    } else if (level == "hard") {
      dict = esp[2];
    }
  } else if (lang == "rus") {
    if (level == "easy") {
      dict = rus[0];
    } else if (level == "medium") {
      dict = rus[1];
    } else if (level == "hard") {
      dict = rus[2];
    }
  }
}

/* Function: drawDashes
 *  This function draws the blanks for the unknown letters in the word.
 */

function drawDashes() {
  p.stroke(2);
  for (let i = 0; i < word.length; i++) {
    if (word[i] == " ") {
      continue;
    }
    let startX = 0.5 * (width - wordWidth) + i * 20;
    let endX = 0.5 * (width - wordWidth) + 10 + i * 20;
    p.fill(0, 0, 0);
    p.line(startX, 0.8 * height, endX, 0.8 * height);
  }
}

/* Function: displaySettings
 *  This function displays the chosen language/level
 */

function displaySettings() {
  p.textSize(15);
  p.noStroke();
  if (lang == "eng") {
    p.text("language: english", 0.75 * width, 0.075 * height);
  } else if (lang == "fr") {
    p.text("language: french", 0.75 * width, 0.075 * height);
  } else if (lang == "esp") {
    p.text("language: spanish", 0.75 * width, 0.075 * height);
  } else if (lang == "rus") {
    p.text("language: russian", 0.75 * width, 0.075 * height);
  } else {
    console.log("error");
  }
  p.text("level: " + level, 0.75 * width, 0.125 * height);

  p.textSize(20);
  p.strokeWeight(1);
}

/* Function: drawSnowmanOnce
 *  This function draws the snowman at the sart of the game.
 */
function drawSnowmanOnce() {
  p.stroke(0,0,0);
  p.noFill();
  p.ellipse(0.5 * width, 0.35 * height, diam);
  // Hat
  p.fill(0, 0, 0);
  p.rect(0.5 * width - 20, 0.32 * height - 0.75 * diam, 40, 25);
  p.rect(0.5 * width - 30, 91, 60, 10);
  // Body + Buttons
  p.noFill();
  p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam, 1.5 * diam);
  p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam - 25, 10);
  p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam, 10);
  p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam + 25, 10);
  // Left Arm
  p.line(
    0.5 * width - 0.75 * diam + 3,
    0.35 * height + diam,
    0.5 * width - 1.25 * diam,
    0.35 * height + 0.5 * diam
  );
  // Left Fingers
  p.line(
    0.5 * width - 1.25 * diam,
    0.35 * height + 0.5 * diam,
    0.5 * width - 1.5 * diam,
    0.35 * height + 0.5 * diam - 15
  );
  p.line(
    0.5 * width - 1.25 * diam,
    0.35 * height + 0.5 * diam,
    0.5 * width - 1.3 * diam,
    0.35 * height + 0.5 * diam - 20
  );
  p.line(
    0.5 * width - 1.25 * diam,
    0.35 * height + 0.5 * diam,
    0.5 * width - 1.5 * diam,
    0.35 * height + 0.5 * diam - 3
  );
  // Right Arm
  p.line(
    0.5 * width + 0.75 * diam - 3,
    0.35 * height + diam,
    0.5 * width + 1.25 * diam,
    0.35 * height + 0.5 * diam
  );
  // Right Fingers
  p.line(
    0.5 * width + 1.25 * diam,
    0.35 * height + 0.5 * diam,
    0.5 * width + 1.5 * diam,
    0.35 * height + 0.5 * diam - 15
  );
  p.line(
    0.5 * width + 1.25 * diam,
    0.35 * height + 0.5 * diam,
    0.5 * width + 1.3 * diam,
    0.35 * height + 0.5 * diam - 20
  );
  p.line(
    0.5 * width + 1.25 * diam,
    0.35 * height + 0.5 * diam,
    0.5 * width + 1.5 * diam,
    0.35 * height + 0.5 * diam - 3
  );
  // Carrot Nose + Sad Face
  p.ellipse(0.5 * width - 12.5, 0.35 * height - 10, 5); // left eye
  p.ellipse(0.5 * width + 12.5, 0.35 * height - 10, 5); // right eye
  p.fill("orange");
  p.triangle(
    0.5 * width,
    0.35 * height,
    0.5 * width + 20,
    0.35 * height + 3,
    0.5 * width,
    0.35 * height + 6
  );
  p.noFill();
  p.arc(0.5 * width, 0.35 * height + 17.5, 20, 15, p.TWO_PI, p.PI);
  p.fill(0, 0, 0);
  p.textSize(20);
}

/* Function: eraseSnowman
 *  This function melts the snowman step-by-step as the number of wrong guesses increases.
 */
function eraseSnowman() {
  if (wrongGuesses >= 1) {
    // Carrot Nose + Sad Face
    p.stroke(backgroundColor);
    p.fill(backgroundColor);
    p.ellipse(0.5 * width - 12.5, 0.35 * height - 10, 5); // left eye
    p.ellipse(0.5 * width + 12.5, 0.35 * height - 10, 5); // right eye

    p.triangle(
      0.5 * width,
      0.35 * height,
      0.5 * width + 20,
      0.35 * height + 3,
      0.5 * width,
      0.35 * height + 6
    );

    p.arc(0.5 * width, 0.35 * height + 17.5, 20, 15, p.TWO_PI, p.PI);
  }
  if (wrongGuesses >= 2) {
    // Hat
    p.stroke(backgroundColor);
    p.fill(backgroundColor);
    p.rect(0.5 * width - 20, 0.32 * height - 0.75 * diam, 40, 25);
    p.rect(0.5 * width - 30, 91, 60, 10);
  }
  if (wrongGuesses >= 3) {
    // Head
    p.stroke(backgroundColor);
    p.fill(backgroundColor);
    p.ellipse(0.5 * width, 0.35 * height, diam);
  }
  if (wrongGuesses >= 4) {
    // Left Fingers
    p.stroke(backgroundColor);
    p.line(
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width - 1.5 * diam,
      0.35 * height + 0.5 * diam - 15
    );
    p.line(
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width - 1.3 * diam,
      0.35 * height + 0.5 * diam - 20
    );
    p.line(
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width - 1.5 * diam,
      0.35 * height + 0.5 * diam - 3
    );
  }
  if (wrongGuesses >= 5) {
    // Left Arm
    p.stroke(backgroundColor);
    p.line(
      0.5 * width - 0.75 * diam + 3,
      0.35 * height + diam,
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam
    );
  }
  if (wrongGuesses >= 6) {
    // Right Fingers
    p.stroke(backgroundColor);
    p.strokeWeight(5);
    p.line(
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width + 1.5 * diam,
      0.35 * height + 0.5 * diam - 15
    );
    p.line(
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width + 1.3 * diam,
      0.35 * height + 0.5 * diam - 20
    );
    p.line(
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width + 1.5 * diam,
      0.35 * height + 0.5 * diam - 3
    );
    p.strokeWeight(1);
  }

  if (wrongGuesses >= 7) {
    // Right Arm
    p.stroke(backgroundColor);
    p.line(
      0.5 * width + 0.75 * diam - 3,
      0.35 * height + diam,
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam
    );
  }
  if (wrongGuesses >= 8) {
    //  Buttons
    p.stroke(backgroundColor);
    p.fill(backgroundColor);

    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam - 25, 10);
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam, 10);
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam + 25, 10);
  }
  if (wrongGuesses >= 9) {
    // Body
    p.stroke(backgroundColor);
    p.strokeWeight(5);
    p.fill(backgroundColor);
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam, 1.5 * diam);

    p.strokeWeight(1);
    youLose();
  }
}

/* Function: youLose
 *  This function prints out the message when the user loses, the word and its English translation
 *  (if answer is not in English), and ends the game.
 */
function youLose() {
  p.noLoop();

  p.noStroke();
  p.fill(backgroundColor);
  p.rect(0, 300, width, height);
  p.rect(0.7 * width, 0, width, 200);

  p.fill(0, 0, 0);
  displaySettings();
  p.stroke(0, 0, 0);
  p.textSize(20);
  centreMsg("Sorry... try again!", 0.1);
  centreMsg("Press SPACE to restart", 0.17);
  centreMsg("The word was " + word, 0.9);
  if (lang !== "eng") {
    centreMsg("In English, this means " + dict[word], 0.97);
  }

  let img2 = p.loadImage(
    "https://cdn.glitch.com/8cc9724b-7b2e-4e4c-a8e6-250907c5de4c%2Fyou-lose-rubber-stamp-vector-11569653.jpg?v=1595983006881"
  );
  p.image(img2, 100, 100, 100, 100);
}

/* Function: youWin
 *  This function prints out the message when the user wins, the word's English translation
 *  (if word is not in English), and ends the game.
 */
function youWin() {
  p.noLoop();

  p.noStroke();
  p.fill(backgroundColor);
  p.rect(0, 300, width, height);
  centreMsg("Guess the word before the snowman melts away", 0.9);

  p.fill(0, 0, 0);
  displaySettings();
  p.textSize(20);

  centreMsg("You win!", 0.1);
  centreMsg("Press SPACE to restart", 0.17);
  centreMsg("The word was " + word, 0.9);
  if (lang !== "eng") {
    centreMsg("In English, this means " + dict[word], 0.97);
  }
}

/* Function: centreMsg
 *  This function accepts a msg string and a float value msgHeight between 0 and 1,
 *  and prints the string in the centre of the screen. The height is a proportion
 *  of the canvas height as given by the value of msgHeight.
 */
function centreMsg(msg, msgHeight) {
  let msgWidth = p.textWidth(msg);
  p.text(msg, (width - msgWidth) / 2, msgHeight * height);
}

/* Functions: p.keyTyped
 *  p.keyTyped is an event listener for when the SPACE key is pressed,
 *  startOver is called to restart the game.
 */
p.keyTyped = function() {
  if (p.keyCode == "32") {
    startOver();
    p.loop();
  }
};

// DISCARDED CODE
/*
p.keyTyped = function () {
  p.fill(0, 0, 0)
  p.textSize(20);
  if (!guessedLetters.includes(p.key)) { //(p.keyCode >= 65 && p.keyCode <= 90) && 
    let index = word.indexOf(p.key);
    if (index !== -1) {
      while (index !== -1) { // If you guess one letter, it fills in all instances of that letter
        correctGuesses++;
        let letterX = 0.5*(width-wordWidth) + (index*dashWidth*2) + 0.5*(dashWidth-p.textWidth(p.key));
        let letterY = 0.8*height - 5;
        p.stroke("black");
        p.text(p.key, letterX, letterY);
        index = word.indexOf(p.key, index+1);
      }
    } else {
      if (level == "easy") { // Get fewer tries if you're on the easy level
        wrongGuesses += 2;
      } else {
        wrongGuesses++;
      }
      p.text(p.key, 0.1*width, 0.2*height+wrongGuesses*15); 
    }
    guessedLetters.push(p.key);
  }
}*/

// Consider this since words in the easy level are often short and don't need many guesses, so users should get fewer tries
// For easy I still can't solve some of them: So I will just leave the original code
/*
        if (level == "easy") {
          wrongGuesses += 2;
        } else {
          wrongGuesses++;
        }
        */

/* Function: drawSnowman
 *  This function draws the snowman step-by-step as the number of wrong guesses increases.
function drawSnowman() {
  if (wrongGuesses >= 1) {
    // Head
    p.noFill();
    p.ellipse(0.5 * width, 0.35 * height, diam);
  }
  if (wrongGuesses >= 2) {
    // Hat
    p.fill(0, 0, 0);
    p.rect(0.5 * width - 20, 0.35 * height - 0.75 * diam, 40, 20);
    p.rect(0.5 * width - 30, 0.35 * height - 0.6 * diam, 60, 10);
  }
  if (wrongGuesses >= 3) {
    // Body + Buttons
    p.noFill();
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam, 1.5 * diam);
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam - 25, 10);
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam, 10);
    p.ellipse(0.5 * width, 0.35 * height + 1.25 * diam + 25, 10);
  }
  if (wrongGuesses >= 4) {
    // Left Arm
    p.line(
      0.5 * width - 0.75 * diam + 3,
      0.35 * height + diam,
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam
    );
  }
  if (wrongGuesses >= 5) {
    // Left Fingers
    p.line(
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width - 1.5 * diam,
      0.35 * height + 0.5 * diam - 15
    );
    p.line(
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width - 1.3 * diam,
      0.35 * height + 0.5 * diam - 20
    );
    p.line(
      0.5 * width - 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width - 1.5 * diam,
      0.35 * height + 0.5 * diam - 3
    );
  }
  if (wrongGuesses >= 6) {
    // Right Arm
    p.line(
      0.5 * width + 0.75 * diam - 3,
      0.35 * height + diam,
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam
    );
  }
  if (wrongGuesses >= 7) {
    // Right Fingers
    p.line(
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width + 1.5 * diam,
      0.35 * height + 0.5 * diam - 15
    );
    p.line(
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width + 1.3 * diam,
      0.35 * height + 0.5 * diam - 20
    );
    p.line(
      0.5 * width + 1.25 * diam,
      0.35 * height + 0.5 * diam,
      0.5 * width + 1.5 * diam,
      0.35 * height + 0.5 * diam - 3
    );
  }
  if (wrongGuesses >= 8) {
    // Carrot Nose + Sad Face
    p.ellipse(0.5 * width - 12.5, 0.35 * height - 10, 5); // left eye
    p.ellipse(0.5 * width + 12.5, 0.35 * height - 10, 5); // right eye
    p.fill("orange");
    p.triangle(
      0.5 * width,
      0.35 * height,
      0.5 * width + 20,
      0.35 * height + 3,
      0.5 * width,
      0.35 * height + 6
    );
    p.noFill();
    p.arc(0.5 * width, 0.35 * height + 22.5, 20, 15, p.PI, p.TWO_PI);
    p.fill(0, 0, 0);
    p.textSize(20);
    youLose();
  }
} */

/*
    } else if (guessedLetters.includes(p.key) {
      centreMsg("You guessed that already!", 0.1) //How to make the text go away after ~2 secs? If too difficult nvm, not necessary.
    } else if (p.keyCode < 65 || p.keyCode > 90) { // Quite unnecessary
      centreMsg("Not a letter!", 0.1) //How to make the text go away after ~2 secs? If too difficult nvm, not necessary.
    }
    */
