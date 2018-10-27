
var queryURL = "https://opentdb.com/api.php?amount=10&category=27&type=multiple";
var trivia = [];
var choices = [];
var correctAnswer;
var sec = 30;
rand = Math.floor(Math.random() * 10);
var timer = setInterval(function(){
    $("#timer").text(sec--);
    if(sec == -1){
        //alert("Time is up!")
    }
}, 1000);



$.ajax({
    url: queryURL,
    method: "GET",
}).then(function(response){
    correctAnswer = response.results[rand].correct_answer;
    choices.push(response.results[rand].correct_answer);
    for(var i = 0; i < 3; i++){
        choices.push(response.results[rand].incorrect_answers[i]);
    }
    trivia.push(response.results[rand].question);
    $("#trivia").html(trivia[0]);  
    console.log(trivia, rand)
    
    for(var i = 0; i < choices.length; i++ ){
        var htmlButton = $("#answer" + i);
        htmlButton.html(choices[i]);
        htmlButton.attr("value", choices[i]);
    }
    
    
    //choices.push(response.results[rand].incorrect_answers);
    // for(i = 0; i < 10; i++){
    //         trivia.push(response.results[i].question);
    //         console.log(response.results[i].question);
    //     }
     console.log(response);
     console.log(choices);
    console.log(rand);
    console.log(response.results[rand].correct_answer);
    console.log(correctAnswer);
   //var questionDiv = $("<div class='questions'");
    
    //var htmlQuestion = $("<p>").text(trivia);
    
    //questionDiv.append(htmlQuestion);
})


$(this).on("click", function(){
    var currentAnswer = $(this).attr("value") 
    console.log(currentAnswer);
    if(currentAnswer === correctAnswer){
        console.log("Correct")
    }else{
        console.log("wrong!")
    }
})