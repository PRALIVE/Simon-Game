
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel){
  if( gamePattern[currentLevel] === userClickPattern[currentLevel]){
    console.log("success");
    if (userClickPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("fail");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over! Press Any Key To Restart.")
    startOver();
  }
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}
function nextSequence(){
  userClickPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour= buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}

function playSound(name){
  var audio=new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColor){
   $("#" + currentColor).addClass("pressed");

   setTimeout(function() {
      $("#" + currentColor).removeClass("pressed");
   },100);
}
