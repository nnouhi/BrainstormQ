const TH_BASE_URL = "https://codecyprus.org/th/api/"; // the true API base url

const TH_TEST_URL = "https://codecyprus.org/th/test-api/"; // the test API base url

const TH_BASE_URL_QUESTION = "https://codecyprus.org/th/api/question?session="; // the true API base url for question

const TH_BASE_URL_ANSWER = "https://codecyprus.org/th/api/answer?session="; // the true API base url for answer

const TH_BASE_URL_SCORE="https://codecyprus.org/th/api/score?session="; // the true API base url for score

const TH_BASE_URL_SKIP="https://codecyprus.org/th/api/skip?session="; // the true API base url for score

const TH_BASE_URL_LOCATION="https://codecyprus.org/th/api/location?session=";

const TH_BASE_URL_LEADERBOARDS="https://codecyprus.org/th/api/leaderboard?session=";

const intANS = document.getElementById("intANS");
const intBTN = document.getElementById("intBtn");

const numericANS = document.getElementById("numericANS");
const numericBTN = document.getElementById("numericBtn");

const trueBTN = document.getElementById("trueBtn");
const falseBTN = document.getElementById("falseBtn");

const textANS = document.getElementById("textANS");
const textBTN = document.getElementById("textBtn");

const mcqBtnA = document.getElementById("mcqBtnA");
const mcqBtnB = document.getElementById("mcqBtnB");
const mcqBtnC = document.getElementById("mcqBtnC");
const mcqBtnD = document.getElementById("mcqBtnD");

const skip=document.getElementById("skip");

const QRContainer=document.getElementById("qrContainer");

const params = new URLSearchParams(location.search);

let playerName = params.get("player");
let uuid = params.get("treasure-hunt-id");
let cookieLifeSpan = params.get("time");
let nameOfGame =params.get("nameOfGame");

if(getCookie("saveGame") ==="true" && getCookie("playerNameCookie")===playerName){
    continueWhereLeftOff();
}
else {
    select();

}


async function select() {
    // For now just print the selected treasure hunt's UUID. Normally, you're expected to guide the user in entering
    // their name etc. and proceed to calling the '/start' command of the API to start a new session.

    let url1='https://codecyprus.org/th/api/start?player='+playerName; //concatenation of the string with teams name

    let url2='&app=brainstormQ&treasure-hunt-id='+uuid;//concatenation of the string and the unique uuid

    let url=url1+url2; //produces the final url

    console.log(url); //needed for now must delete later

    document.getElementById("displayQuestions").style.display="inline";
    document.getElementById("loadingQuestionsM").innerHTML="Loading..."


    fetch(url)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {


            let statusObject=jsonObject.status;
            let sessionObject=jsonObject.session;



             if (statusObject === "ERROR") //if status isnt ok display the error message needs work no finished
             {
                 let errorMessage = confirm(jsonObject.errorMessages[0])
                 if (errorMessage)
                     getChallenges();

             } else if (statusObject == "OK") {

                 /* if everything is okay show the question*/

                 saveCookie("sessionID", jsonObject.session, cookieLifeSpan);
                 saveCookie("playerNameCookie", playerName, cookieLifeSpan);
                 saveCookie("saveGame", "true", cookieLifeSpan);
                 saveCookie("nameOfGame", nameOfGame, cookieLifeSpan);
                 loadQuestions(getCookie("sessionID"));

             }

        });
}


function loadQuestions(sessionObject){ //starts the game


    intANS.style.visibility = "hidden";
    intBTN.style.visibility = "hidden";
    intANS.value = "";

    numericANS.visibility = "hidden";
    numericBTN.style.visibility = "hidden";
    numericANS.value = "";

    trueBTN.style.visibility = "hidden";
    falseBTN.style.visibility = "hidden";

    textBTN.style.visibility = "hidden";
    textANS.style.visibility = "hidden";

    mcqBtnA.style.visibility = "hidden";
    mcqBtnB.style.visibility = "hidden";
    mcqBtnC.style.visibility = "hidden";
    mcqBtnD.style.visibility = "hidden";

    document.getElementById("displayQuestions").style.display="inline";
    document.getElementById("loadingQuestionsM").innerHTML="Loading..."


    console.log(getCookie("sessionID"));

    fetch(TH_BASE_URL_QUESTION+getCookie("sessionID"))
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            if (jsonObject.status === "ERROR") {
                document.getElementById("specificMessage").innerHTML = jsonObject.errorMessages[0] + "<br>" + "<a href='app.html'> Click this Link to Start again</a>";
            }
            else {
                document.getElementById("loadingQuestionsM").innerHTML = "";

                let location = jsonObject.requiresLocation;

                let questions = jsonObject.questionText;

                let currentQIndex = jsonObject.currentQuestionIndex;

                let totalQuestions = jsonObject.numOfQuestions;

                let passSession = sessionObject;

                let completed = jsonObject.completed;

                let skipped=jsonObject.canBeSkipped;


                if (completed) {
                    intANS.style.visibility = "hidden";
                    intBTN.style.visibility = "hidden";


                    numericANS.visibility = "hidden";
                    numericBTN.style.visibility = "hidden";


                    trueBTN.style.visibility = "hidden";
                    falseBTN.style.visibility = "hidden";

                    textBTN.style.visibility = "hidden";
                    textANS.style.visibility = "hidden";


                    mcqBtnA.style.visibility = "hidden";
                    mcqBtnB.style.visibility = "hidden";
                    mcqBtnC.style.visibility = "hidden";
                    mcqBtnD.style.visibility = "hidden";

                    document.getElementById("specificMessage").style.display = "none";

                    document.getElementById("questionMessage").innerHTML = "QUIZ FINISHED";
                    setTimeout(function () {window.location.href = "leaderboards.html", 1000});

                } else {

                    document.getElementById("questionMessage").innerHTML = questions;

                    document.getElementById("homeBtn").style.display = "inline-block";

                    document.getElementById("restartBtn").style.display = "inline-block";

                    document.getElementById("specificMessage").style.display = "inline-block";

                    document.getElementById("questionIndexContainer").style.display = "block";

                    document.getElementById("questionIndexP").innerHTML = "Question "+ (jsonObject.currentQuestionIndex+1) + " / " + jsonObject.numOfQuestions;

                    document.getElementById("scoreContainer").style.display = "block";

                    QRContainer.style.display="inline-block";

                    let qType = jsonObject.questionType;

                    if (location) {
                        getLocation();
                    }

                    //If question can be skipped hide the skip button
                    if (skipped) {
                        document.getElementById("skip").style.visibility = "visible";
                    } else {
                        document.getElementById("skip").style.visibility = "hidden";
                    }

                    console.log(qType);
                    switch (qType) {
                        case "INTEGER":

                            intANS.style.visibility = "visible";
                            intBTN.style.visibility = "visible";

                            numericANS.visibility = "hidden";
                            numericBTN.style.visibility = "hidden";

                            trueBTN.style.visibility = "hidden";
                            falseBTN.style.visibility = "hidden";

                            textBTN.style.visibility = "hidden";
                            textANS.style.visibility = "hidden";


                            mcqBtnA.style.visibility = "hidden";
                            mcqBtnB.style.visibility = "hidden";
                            mcqBtnC.style.visibility = "hidden";
                            mcqBtnD.style.visibility = "hidden";

                            break;

                        case "BOOLEAN":
                            trueBTN.style.visibility = "visible";
                            falseBTN.style.visibility = "visible";

                            intANS.style.visibility = "hidden";
                            intBTN.style.visibility = "hidden";

                            numericANS.visibility = "hidden";
                            numericBTN.style.visibility = "hidden";

                            textBTN.style.visibility = "hidden";
                            textANS.style.visibility = "hidden";

                            mcqBtnA.style.visibility = "hidden";
                            mcqBtnB.style.visibility = "hidden";
                            mcqBtnC.style.visibility = "hidden";
                            mcqBtnD.style.visibility = "hidden";

                            break;

                        case "TEXT":
                            textANS.style.visibility = "visible";
                            textBTN.style.visibility = "visible";

                            intANS.style.visibility = "hidden";
                            intBTN.style.visibility = "hidden";

                            numericANS.visibility = "hidden";
                            numericBTN.style.visibility = "hidden";

                            trueBTN.style.visibility = "hidden";
                            falseBTN.style.visibility = "hidden";

                            mcqBtnA.style.visibility = "hidden";
                            mcqBtnB.style.visibility = "hidden";
                            mcqBtnC.style.visibility = "hidden";
                            mcqBtnD.style.visibility = "hidden";

                            break;

                        case "MCQ":
                            mcqBtnA.style.visibility = "visible";
                            mcqBtnB.style.visibility = "visible";
                            mcqBtnC.style.visibility = "visible";
                            mcqBtnD.style.visibility = "visible";

                            intANS.style.visibility = "hidden";
                            intBTN.style.visibility = "hidden";

                            numericANS.visibility = "hidden";
                            numericBTN.style.visibility = "hidden";

                            trueBTN.style.visibility = "hidden";
                            falseBTN.style.visibility = "hidden";

                            textBTN.style.visibility = "hidden";
                            textANS.style.visibility = "hidden";

                            break;

                        case "NUMERIC":
                            numericANS.style.visibility = "visible";
                            numericBTN.style.visibility = "visible";

                            intANS.style.visibility = "hidden";
                            intBTN.style.visibility = "hidden";

                            trueBTN.style.visibility = "hidden";
                            falseBTN.style.visibility = "hidden";

                            textBTN.style.visibility = "hidden";
                            textANS.style.visibility = "hidden";

                            mcqBtnA.style.visibility = "hidden";
                            mcqBtnB.style.visibility = "hidden";
                            mcqBtnC.style.visibility = "hidden";
                            mcqBtnD.style.visibility = "hidden";

                            break;

                        default:
                            intANS.style.visibility = "hidden";
                            intBTN.style.visibility = "hidden";
                            intANS.value = "";

                            numericANS.visibility = "hidden";
                            numericBTN.style.visibility = "hidden";
                            numericANS.value = "";

                            trueBTN.style.visibility = "hidden";
                            falseBTN.style.visibility = "hidden";

                            textBTN.style.visibility = "hidden";
                            textANS.style.visibility = "hidden";
                            textANS.value = "";

                            mcqBtnA.style.visibility = "hidden";
                            mcqBtnB.style.visibility = "hidden";
                            mcqBtnC.style.visibility = "hidden";
                            mcqBtnD.style.visibility = "hidden";

                    }

                }
            }
        });

}



function updateScore(sessionObject){

    fetch( TH_BASE_URL_SCORE+getCookie("sessionID"))
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            if(jsonObject.status === "OK") {
                if (jsonObject.completed === false && jsonObject.finished === false)
                    document.getElementById("scoreContainer").innerText = "Your current score is: " + jsonObject.score + " points.";
            }
            else{
                let errorMessage = confirm(jsonObject.errorMessages[0])
                if (errorMessage)
                    window.location.href = "SignIn.html";
            }


        });
}

function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function saveCookie(cookieName, cookieValue,cookieLifespan) {
    let date = new Date();
    date.setTime(date.getTime() + (cookieLifespan * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires;
}

function getLocation() {
    console.log("getLocation...");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            sendLocation(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}


function sendLocation(lat, lng) {
    fetch(TH_BASE_URL_LOCATION + getCookie("sessionID") + "&latitude="+lat+"&longitude="+lng)
        .then(response => response.json())
        .then(jsonObject => {
            let message=jsonObject.message;
            console.log(message);
        });
    console.log(lat,lng);
}
/*
function loadLeaderboard(){

    document.getElementById("questionMessage").innerText="";
    document.getElementById("skip").style.visibility="hidden";
    document.getElementById("scoreContainer").style.display="none";
    document.getElementById("questionIndexContainer").style.display="none";
    document.getElementById("loading").innerText="Loading...";
    QRContainer.style.display="none";


    fetch(TH_BASE_URL_LEADERBOARDS+getCookie("sessionID")+"&sorted&limit=10")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            document.getElementById("loading").innerText="";
            document.getElementById("leaderboardHeader").style.display="block";
            document.getElementById("tableContainer").style.display="block";
            document.getElementById("refreshBtnContainer").style.display="block";
            if(jsonObject.status==="OK") {
                let tableContents = "";
                getRank();//get ranking of player
                if(jsonObject.hasPrize===true){
                    document.getElementById("hasPrizeContainer").style.display="block";
                }

                const leaderboardArray = jsonObject.leaderboard;

                for (let i = 0; i < leaderboardArray.length; i++) {
                    const entry = leaderboardArray[i];
                    const playerName = entry.player;
                    const score = entry.score;
                    const completionTime = entry.completionTime;

                    tableContents += "<tr>\n" +
                        "    <td>" + playerName + "</td>" +
                        "    <td>" + score + "</td>" +
                        "    <td>" + convertMsToDate(completionTime) + "</td>" +
                        "</tr>";
                }
                document.getElementById("leaderboardTable").innerHTML += tableContents;
            }
            else if(jsonObject.status==="ERROR"){
                let errorMessage = confirm(jsonObject.errorMessages[0])
                if (errorMessage)
                    window.location.href = "app.html";
            }
        });


}



/*Refreshes the leaderboards
function refreshLeaderboard(){
    document.getElementById("leaderboardTable").innerHTML="";
    document.getElementById("leaderboardHeader").innerHTML="";
    loadLeaderboard();
}
*/


function checkInt(){

    let ans=document.getElementById("intANS").value;
    let field="intANS";
    //check if integer proceed else alert//
    if(ans%1===0) {
        checkAnswers(ans,field);
    }
    else{
        let wrongInput=confirm("You have inputed a NUMERIC value, Please provide an INTEGER.");

        if(wrongInput){
            let ans=document.getElementById("intANS").value="";
        }
        else{
            let ans=document.getElementById("intANS").value="";
        }

    }

}

function checkText(){
    let ans=document.getElementById("textANS").value;
    let field="textANS";
    checkAnswers(ans,field);
}

function checkNum(){
    let ans=document.getElementById("numericANS").value;
    let field="numericANS";
    checkAnswers(ans,field);
}

function checkAnswers(ans,field){

    /*Checks if the input is empty so it doesnt sumbit the answer and get an error*/
    if(document.getElementById(field).value!=="") {
        intANS.value = "";
        numericANS.value = "";
        textANS.value = "";
        fetch(TH_BASE_URL_ANSWER + getCookie("sessionID") + "&answer=" + ans)
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {
                if (jsonObject.status === "ERROR") {
                    document.getElementById("specificMessage").innerHTML = jsonObject.errorMessages[0] + "<br>" + "<a href='app.html'> Click this Link to Start again</a>";

                } else if (jsonObject.status === "OK" && jsonObject.correct === true) {
                    document.getElementById("specificMessage").style.display = "inline-block";
                    document.getElementById("specificMessage").innerText = jsonObject.message + ": You have gained " + jsonObject.scoreAdjustment + " points.";
                    updateScore(getCookie("sessionID"));
                    loadQuestions(getCookie("sessionID"))
                } else if (jsonObject.status === "OK" && jsonObject.correct === false) {
                    document.getElementById("specificMessage").style.display = "inline-block";
                    document.getElementById("specificMessage").innerText = jsonObject.message + ": You have lost " + jsonObject.scoreAdjustment + " points.";
                    updateScore(getCookie("sessionID"));
                }
            })
    }
    else{
        window.alert("Field is blank");
    }
}


function checkSkipped(){
    fetch(TH_BASE_URL_SKIP + getCookie("sessionID"))
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            if (jsonObject.status === "OK") {

                document.getElementById("specificMessage").style.display = "inline-block";
                document.getElementById("specificMessage").innerText = jsonObject.message + " You Lost: " + jsonObject.scoreAdjustment;
                updateScore(getCookie("sessionID"));
                loadQuestions(getCookie("sessionID"))
            }

        });
}

function continueWhereLeftOff(){

    let continuedSession = getCookie("sessionID");

    console.log(continuedSession); //works

    let continueURL = TH_BASE_URL_QUESTION + continuedSession; // form url

    setTimeout(loadQuestions(continueURL),1000);
}
/*
function getRank(){
     rankCounter=0;
     let header;
    fetch( TH_BASE_URL_LEADERBOARDS+ getCookie("sessionID") + "&sorted&limit=2000")
        .then(response => response.json())
        .then(jsonObject => {
            let name = getCookie("playerNameCookie");
            const leaderboardArray = jsonObject.leaderboard;
            for (let i = 0; i < leaderboardArray.length; i++) {
                const entry = leaderboardArray[i];
                const playerName = entry.player;
                const score = entry.score;
                const completionTime = entry.completionTime;
                if(playerName===getCookie("playerNameCookie")){
                    header="<h3>"+"Congratulations "+getCookie("playerNameCookie")+" you managed to finished the "+getCookie("nameOfGame")+ " and your rank is " + rankCounter+ "</h3>";
                    document.getElementById("leaderboardHeader").innerHTML+=header;
                }
                else{
                    rankCounter++;
                }

            }
        });
}
*/
