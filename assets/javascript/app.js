// Array of item images
const items = ["infinityedge.png", "deathcap.png", "sunfire.png", "frozenheart.png", "frozenfist.png", "triforce.png", "frozenmallet.png"];
// Array of question numbers
const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];
// Array of first options
const optionA = ["Excalibur", "Rabadon's Deathcap", "Veil of Discord", "Frozen Staff", "Thousand Years of Pain", "Delta Sword", "Frozen Mallet"];
// Array of second options
const optionB = ["Yellow Sword Thingy", "Wooglet's Witchcap", "Invisibility Cloak", "Frozen Heart", "Iceborn Gauntlet", "Guardian Angel", "Mjolnir"];
// Array of third options
const optionC = ["Infinity Edge", "Sorting Hat", "Sunfire Cape", "Rylai's Crystal Scepter", "Wolverine Fist", "Ethereal Blade", "Guardian's Hammer"];
// Array of fourth options
const optionD = ["Zeal", "Hood of Defiance", "Phoenix Armor", "Glacial Shroud", "Frozen Fist", "Trinity Force", "Hammer of Justice"];
// Array of answers
const answers = ["C", "A", "C", "B", "B", "D", "A"];

let correct = 0;                  // Correct answer counter
let incorrect = 0;                // Incorrect answer counter
let unanswered = items.length;    // Unanswered counter
let userAnswer = [];              // Array for user's answers

// Hide done button
$("#done").hide();

// Event for clicking start
$("#start").on("click", function() {
  // Hide start button
  $("#start").hide();
  // Show done button
  $("#done").show();
  // Show initial timer
  $("#timer").html("<h2>Time Remaining: 30 seconds</h2>");
  // Initial timer
  let seconds = 30;
  // Interval tracker
  let intervalId;

  // Timer
  function run() {
    // Calls decrement function every second
    intervalId = setInterval(decrement, 1000);
  }

  // Decrease timer
  function decrement() {
    // Decrement seconds
    seconds--;
    // Display time remaining
    $("#timer").html("<h2>Time Remaining: " + seconds + " seconds</h2>");
    // Timer reaches 0
    if (seconds === 0) {
      // Get user's answers
      getAnswers();
      // Get user's score
      getScore();
      // Stop timer
      stop();
      // Show results
      result();
    }
  }

  // Stop timer
  function stop() {
    // Clears interval
    clearInterval(intervalId);
  }

  // Click event for done button
  $("#done").click(function() {
    // Get user's answers
    getAnswers();
    // Get user's scores
    getScore();
    // Stop timer
    stop();
    // Show results
    result();
  });

  // Start timer
  run();
  // Generate form
  printForm();
});

// Get score for user
function getScore() {
  // Loop through answers
  for (let i = 0; i < answers.length; i++) {
    // User answered question
    if (userAnswer[i] != null) {
      // User's answer is correct
      if (userAnswer[i] === answers[i]) {
        // Increment correct counter
        correct++;
        // Decrement unanswered counter
        unanswered--;
      }
      // User's answer is incorrect
      else {
        // Increment incorrect counter
        incorrect++;
        // Decrement unanswered counter
        unanswered--;
      }
    }
  }
}

// Obtain answers from form
function getAnswers() {
  // Loop through questions
  for (let i = 1; i <= items.length; i++) {
    // Push answer to array
    userAnswer.push($("input[name=q" + i + "]:checked", ".questions").val());
  }
}

// Display user's results
function result() {
  // Clear timer
  $("#timer").empty();
  // Clear questions
  $(".questions").empty();
  // Hide done button
  $("#done").hide();
  // Display message
  $("#main").append("<h2><b>All Done!</b></h2><br>");
  // Display number of correct answers
  $("#main").append("<p id='right'>Correct Answers: " + correct + "</p>");
  // Display number of incorrect answers
  $("#main").append("<p id='wrong'>Incorrect Answers: " + incorrect + "</p>");
  // Display number of unanswered questions
  $("#main").append("<p id='blank'>Unanswered: " + unanswered + "</p>");
}

// Create quiz
function printForm() {
  // Loop through items
  for (let i = 0; i < items.length; i++) {
    // Create image
    let image = $("<img>");
    // Give image src
    image.attr("src", "assets/images/" + items[i]);

    // Create label
    let choiceA = $("<label>");
    // Create first option
    let inputA = $("<input>");
    // Give type radio
    inputA.attr("type", "radio");
    // Give name attribute
    inputA.attr("name", questions[i]);
    // Give value of A
    inputA.attr("value", "A");

    // Create label
    let choiceB = $("<label>");
    // Create second option
    let inputB = $("<input>");
    // Give type radio
    inputB.attr("type", "radio");
    // Give name attribute
    inputB.attr("name", questions[i]);
    // Give value of B
    inputB.attr("value", "B");

    // Create label
    let choiceC = $("<label>");
    // Create third option
    let inputC = $("<input>");
    // Give type radio
    inputC.attr("type", "radio");
    // Give name attribute
    inputC.attr("name", questions[i]);
    // Give value of C
    inputC.attr("value", "C");

    // Create label
    let choiceD = $("<label>");
    // Create fourth option
    let inputD = $("<input>");
    // Give type radio
    inputD.attr("type", "radio");
    // Give name attribute
    inputD.attr("name", questions[i]);
    // Give value of D
    inputD.attr("value", "D");

    // Append first option to label A
    choiceA.append(inputA);
    // Append second option to label B
    choiceB.append(inputB);
    // Append third option to label C
    choiceC.append(inputC);
    // Append fourth option to label D
    choiceD.append(inputD);
    // Append option A to label A
    choiceA.append(optionA[i]);
    // Append option B to label B
    choiceB.append(optionB[i]);
    // Append option C to label C
    choiceC.append(optionC[i]);
    // Append option D to label D
    choiceD.append(optionD[i]);

    // Append image to questions div
    $(".questions").append(image);
    // Add break
    $(".questions").append("<br><br>");
    // Append first option
    $(".questions").append(choiceA);
    // Append second option
    $(".questions").append(choiceB);
    // Append third option
    $(".questions").append(choiceC);
    // Append fourth option
    $(".questions").append(choiceD);
    // Add break
    $(".questions").append("<br><br>"); 
  }
}