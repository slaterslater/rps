function displayMsg(text) {
  $("#message").html(text);
}

function countDown(timeleft) {
  var shoot = setInterval(function () {
    if (timeleft) {
      displayMsg(timeleft--);
    } else {
      displayMsg("shoot");
      clearInterval(shoot);
      setTimeout(function () {
        endGame();
      }, 300);
    }
  }, 650);
}

function startGame() {
  $(".btn-secondary").toggleClass("disabled");
  $("#start").text("Ready");
  countDown(3);
}

function endGame() {
  $(".btn-secondary").toggleClass("disabled");
  let choice = $("label.active").text().trim();
  if (choice == null || choice.length == 0)
    displayMsg("too slow");
  else
    getResult(choice);
  $("label.active").removeClass("active");
  $("#start").text("again?");

}

let options = [
  { name: "Rock", wins: "Scissors" },
  { name: "Paper", wins: "Rock" },
  { name: "Scissors", wins: "Paper" }
];

var your_score = 0;
var comp_score = 0;
var ties = 0;
var run = [];

function getResult(choice) {
  let c = Math.floor(Math.random() * 3);
  let c_pick = options[c].name;
  let bad = options[c].wins;
  let result = choice.localeCompare(bad) === 0 ? "lose" : (choice.localeCompare(c_pick) === 0 ? "Tie" : "Win");
  if(choice.localeCompare(bad) === 0){
    $("#comp_score").text(++comp_score);
  } else if (choice.localeCompare(c_pick)==0){
    $("#ties").text(++ties);
  } else {
    $("#your_score").text(++your_score);
  }
  displayMsg(`You picked ${choice} and I picked ${c_pick} so you ${result}`);
  addToRun(result);
}

function addToRun(result){
  run.push(result);
  $("#run").text(run);

  if(run.length==5){
    var wins = 0;
    run.forEach(result => {
      if(result.localeCompare("Win")==0)
        wins++;     
    });
    if (wins == 5)
      displayMsg("FIVE IN WHOA!");
    else 
      run.shift();   
  }

}

$(document).ready(function(){
  $("#your_score, #comp_score, #ties").text(0);
});

// keep a tally of win runs
// wins in a row