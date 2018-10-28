
var queryURL = "https://opentdb.com/api.php?amount=10&category=27&type=multiple";
var trivia = [];
var choices = [];
var correctAnswer;
var sec = 30;
var winCounter;
var loseCounter;
rand = Math.floor(Math.random() * 10);
var timer = setInterval(function(){
    $("#timer").text("Time Remaining: " + sec--);
    if(sec == -1){
        $("#button-container").html("TIMES up!");
        //alert("Time is up!")
    }
}, 1000);




gameOn(); // start game

function gameOn(){
$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response){
    correctAnswer = response.results[rand].correct_answer;
    choices.push(response.results[rand].correct_answer); // 1 correct answer
    for(var i = 0; i < 3 ; i++){
        choices.push(response.results[rand].incorrect_answers[i]); // 3 wrong answer in the JSON object
    }
    trivia.push(response.results[rand].question); // pushing question to array
    $("#trivia").html(trivia[0]);  
    
    shuffleAnswer = shuffle(choices); 
    for(var i = 0; i < shuffleAnswer.length; i++ ){
        var htmlButton = $("#btn" + i);
        htmlButton.html(shuffleAnswer[i]);
        htmlButton.attr("value", shuffleAnswer[i]);
    }
})
}




$("button").on("click", function(){
    var currentAnswer = $(this).attr("value");
    console.log(currentAnswer);
    if(currentAnswer === correctAnswer){
        winCounter++;
        $("#button-container").html("Correct!");
        setTimeout(gameOn, 2000);
        console.log("Correct");
    }else{
        loseCounter--;
        $("#button-container").html("WRONG!");
        setTimeout(gameOn, 2000);
        console.log("wrong!");
    }
})


// function called fisher-yates shuffle found online
function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


function winCondtion (){
    if(winCounter === 5){
        alert("Congrats you win");
    }else if(loseCounter === 3){
        alert("Game over");
    }
}