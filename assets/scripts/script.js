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
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

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

//will create function for the list of questions to run on start

function render(questionList) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionList].title;
        var userChoices = questions[questionList].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", compare);
    });
}

//will create a function to compare user answer with the correct answer

function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionList].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft == secondsLeft - penalty;
            createDiv.textContent = "Wrong!";
        }
    }

    questionList++;

    if (questionList >= questions.length) {
    allDone();
    createDiv.textContent = "End of quiz!" + " " + score + "/" + questions.length + "Correct!";
    } else {
    render(questionList);
    }
    questionsDiv.appendChild(createDiv);
}

//end of the quiz
function allDone() {
    questionsDiv.innerHTML = "";
    time.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    questionsDiv.appendChild(createH1);

    //this is where we stop timer and use the number as the score where timer stopped
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "This is your final score: " + timeRemaining;

        questionsDiv.appendChild(createP);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    //local storage for scores
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            alert("Nothing entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining,
            };
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("highScores.html");
        }
    });
}