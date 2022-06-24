var questions = [
    {
        title: "What does HTML stand for?",
        choices: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
        answer: "Hyper Text Markup Language",
    },
    {
        title: "DOM stands for:",
        choices: ["Document object model", "Data object model", "Document oriented model", "Data oriented model"],
        answer: "Document oriented model",

    },
    {
        title: "What language defines the behavior of a web page?",
        choices: ["HTML", "CSS", "XML", "Java Script"],
        answer: "Java Script",
    },
    {
        title: "jQuery library is a _____ file",
        choices: [".html", ".XML", ".js", ".css"],
        answer: ".js",
    },
    {
        title: "The .each method is the more convenient form of _____ loop.",
        choices: ["do while", "for", "for each", "None of these"],
        answer: "for",
    }
]

var score = 0;
var questionList = 0;
var time = document.querySelector("#time");
var timer = document.querySelector("questions");
var wrapper = document.querySelector("wrapper");

//create timer
var secondsLeft = 80;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            time.textContent = "Time Left: " + secondsLeft;
                if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionList);
});