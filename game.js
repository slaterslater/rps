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
  }, 400);
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

function getResult(choice) {
  let c = Math.floor(Math.random() * 3);
  let c_pick = options[c].name;
  let bad = options[c].wins;
  let result = choice.localeCompare(bad) === 0 ? "lose" : (choice.localeCompare(c_pick) === 0 ? "Tie" : "Win");
  displayMsg(`you picked ${choice} and comp picks ${c_pick} so you ${result}`);
}
