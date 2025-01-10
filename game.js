var gameStarted = false;
var level = 0;

var gamePattern = [];//array that will store the random colors
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];



// Check screen width and run code if screen is at least 500px
function checkScreenWidth(mediaQuery) {
    if (mediaQuery.matches) {
        // Run your code here for mobile or tablet devices
        console.log("Screen width is at least 1000px. Running code for mobile or tablet.");
        
        $(document).ready(function() {
            $("#startInput").focus(function() {
                if (!gameStarted) {
                    nextSequence();
                    gameStarted = true;
                }
            });
            // Trigger the focus on the hidden input field when the page is loaded
            $("#startInput").focus();
        });
    }
}

// Check screen width on page load
let mediaQuery = window.matchMedia("(max-width: 1000px)");
checkScreenWidth(mediaQuery);

// Check screen width on resize
window.addEventListener("resize", function() {
    checkScreenWidth(mediaQuery);
});


$("body").keypress(function(event) {
    if(!gameStarted){//If the game has not started 
        nextSequence();
        gameStarted = true;
    }
});

function playSound(song) {
    var audio = new Audio("./sounds/" + song + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);//0 to 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    if (level === 1) {
        $("#"+randomChosenColour).fadeOut(500).fadeIn(100);
    } else {
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    }
    
    //This sequence of fading out and fading in creates a visual effect where the selected button briefly disappears and reappears
    playSound(randomChosenColour);
}

$("body").click(function(event) {
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            //if the user has completed the entire sequence of colors up to the current level.
            setTimeout(function () {
                nextSequence();
            }, 1000);
      }
    } else {
      gameOver();
      startOver();
    }
}

function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart or Refrech The page");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
