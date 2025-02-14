let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let level = 0;
let started = false;

$(document).on("keydown", function (e) {
  if (!started && e.key === " ") {
    $(".rules").slideUp();
    $(".container").removeClass("hide");
    $(`#level-title`).text(`Level ${level}`);
    started = true;
    nextSequence();
  }
});

$(".btn").on("click", function () {
  if (started) {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  $(`#level-title`).text(`Level ${++level}`);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrongSound = "wrong";
    playSound(wrongSound);

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $(`#level-title`).text(`Game Over, Press SPACE key to restart`);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

  $(".container").addClass("hide");

  $(".rules").slideDown();
}
