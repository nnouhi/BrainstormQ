
const TH_BASE_URL = "https://codecyprus.org/th/api/"; // the true API base url

const TH_TEST_URL = "https://codecyprus.org/th/test-api/"; // the test API base url

const TH_BASE_URL_QUESTION = "https://codecyprus.org/th/api/question?session="; // the true API base url for question

const TH_BASE_URL_ANSWER = "https://codecyprus.org/th/api/answer?session="; // the true API base url for answer

const TH_BASE_URL_SCORE="https://codecyprus.org/th/api/score?session="; // the true API base url for score

const TH_BASE_URL_SKIP="https://codecyprus.org/th/api/skip?session="; // the true API base url for score

function getChallenges()
{
    fetch(TH_BASE_URL+"list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            // identify the spinner, if available, using the id 'loader'...


            let challengesList=document.getElementById("challenges"); //Obtain an object reference to your unordered list element using its ID.

            let treasureHuntsArray=jsonObject.treasureHunts; //Obtain a reference to the treasureHunts array from the parsed object.



            let listHtml = "<ul>";

            for(let i=0; i<treasureHuntsArray.length; i++) //Create a loop that traverses the treasureHunts array
                //and  creates a new list element for each treasure hunt object:
            {
                listHtml += // each treasure hunt item is shown with an individual DIV element
                    "<li>" +
                    "<b>" + treasureHuntsArray[i].name + "</b><br/>" + // the treasure hunt name is shown in bold...
                    "<i>" + treasureHuntsArray[i].description + "</i><br/>" + // and the description in italics in the following line
                    "<a href=\"javascript:select(\'" + treasureHuntsArray[i].uuid + "\')\">Start</a>" + // and the description in italics in the following line
                    "</li>";
            }
            listHtml += "</ul>";

            document.getElementById("treasureHunts").innerHTML = listHtml;

        });

}


async function select(uuid) {
    // For now just print the selected treasure hunt's UUID. Normally, you're expected to guide the user in entering
    // their name etc. and proceed to calling the '/start' command of the API to start a new session.

    // todo add your own code ...

    hideappNavigation();

    let tName=prompt("Please enter your team's name", "Team name");

    let url1='https://codecyprus.org/th/api/start?player='+tName; //concatenation of the string with teams name

    let url2='&app=testAppAPP&treasure-hunt-id='+uuid;//concatenation of the string and the unique uuid

    let url=url1+url2; //produces the final url

    console.log(url);

    let spinner = document.getElementById("hideAll");


    spinner.hidden = true;

    fetch(url)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            let statusObject=jsonObject.status;
            let sessionObject=jsonObject.session;

           if(statusObject!="OK") //if status isnt ok display the error message needs work no finished
           {
               document.write(jsonObject.errorMessages);

           }

           else if(statusObject=="OK"){


               /* if everything is okay show the question*/
               let spinner = document.getElementById("loader");

               spinner.hidden = false;

               loadQuestions(sessionObject);

           }
        });
}


function loadQuestions(sessionObject){

    let questionIndex=1,finished=false, givePoints=false;



        fetch(TH_BASE_URL_QUESTION+sessionObject)
            .then(response => response.json()) //Parse JSON text to JavaScript object
            .then(jsonObject => {


                let note=document.getElementById('note');

                let skipped=jsonObject.canBeSkipped;

                let questions = jsonObject.questionText;

                let QuestionHtml = "<p>" + questions + "<p>"; //Loads the current question

                document.getElementById("loader").innerHTML = QuestionHtml;

                let qType = jsonObject.questionType;

                /* skips the current question if possible*/

                let skip=document.getElementById("skip");
                skip.addEventListener("click", function () {
                    fetch(TH_BASE_URL_SKIP + sessionObject)
                        .then(response => response.json()) //Parse JSON text to JavaScript object
                        .then(jsonObject => {
                            if(skipped===true){
                                console.log("skipped");
                                loadQuestions(sessionObject);

                            }

                        });
                });

                switch (qType) {
                    case "INTEGER":

                        let spinnerINT = document.getElementById("intANS");

                        spinnerINT.hidden = false;

                       let intBTN=document.getElementById("intBtn");

                       intBTN.style.visibility="visible";


                        /*When sbmt button is pressed calls the answer api and checks if answer correct*/

                        intBTN.addEventListener("click", function () {
                            fetch(TH_BASE_URL_ANSWER + sessionObject + "&answer=" + document.getElementById("intANS").value)
                                .then(response => response.json()) //Parse JSON text to JavaScript object
                                .then(jsonObject => {

                                    let answer = jsonObject.correct;
                                    let Message=jsonObject.message;

                                    console.log(answer);//dont forget to delete, used for testing the output only!

                                    if (answer === true) {

                                        note.style.visibility="visible";
                                        note.style.color="green";
                                        note.innerText=Message;

                                        let elem = document.getElementById('intANS');

                                        elem.parentNode.removeChild(elem); //removes input element

                                        intBTN.style.visibility="hidden";

                                        loadQuestions(sessionObject); //calls function again to load next question

                                    }
                                    //if input is false reset the value inside the element
                                    else{
                                        note.style.visibility="visible";
                                        note.style.color="red";
                                        note.innerText=Message;
                                        let elem = document.getElementById('intANS');
                                        elem.value="";

                                    }
                                });
                        });

                        break;

                    case "BOOLEAN":
                        let trueBTN=document.getElementById("trueBtn");
                        let falseBTN=document.getElementById("falseBtn");

                        trueBTN.style.visibility="visible";
                        falseBTN.style.visibility="visible";

                        trueBTN.addEventListener("click", function () {
                            fetch(TH_BASE_URL_ANSWER + sessionObject + "&answer=" + trueBTN.value)
                                .then(response => response.json()) //Parse JSON text to JavaScript object
                                .then(jsonObject => {
                                    let answer = jsonObject.correct;
                                    let Message=jsonObject.message;

                                    console.log(answer);//dont forget to delete, used for testing the output only!

                                    if (answer === true) {

                                        note.style.color="green";
                                        note.innerText=Message;

                                        trueBTN.style.visibility="hidden";
                                        falseBTN.style.visibility="hidden";

                                        loadQuestions(sessionObject); //calls function again to load next question
                                    }
                                    else{

                                        note.style.color="red";
                                        note.innerText=Message;

                                    }
                                });
                        });

                        falseBTN.addEventListener("click", function () {
                            fetch(TH_BASE_URL_ANSWER + sessionObject + "&answer=" + falseBTN.value)
                                .then(response => response.json()) //Parse JSON text to JavaScript object
                                .then(jsonObject => {
                                    let answer = jsonObject.correct;
                                    let Message=jsonObject.message;

                                    console.log(answer);//dont forget to delete, used for testing the output only!

                                    if (answer === true) {

                                        note.style.color="green";
                                        note.innerText=Message;

                                        trueBTN.style.visibility="hidden";
                                        falseBTN.style.visibility="hidden";

                                        loadQuestions(sessionObject); //calls function again to load next question
                                    }
                                    else{

                                        note.style.color="red";
                                        note.innerText=Message;

                                    }
                                });
                        });

                        break;
                }

            });

}


/*This function is used to hide the challenges navigation bar
*        and displays the main game navigation bar*/

function hideappNavigation(){

  /*Makes the brainstorm 'logo' hidden*/
    let BrainstormQ=document.getElementById("BrainstormHD");
    BrainstormQ.style.visibility="hidden";

  /*Makes score visible*/
    let score=document.getElementById("score");
    score.style.visibility='visible';

  /*Makes skip visible*/
    let skip=document.getElementById("skip");
    skip.style.visibility='visible';

  /*Makes refresh hidden*/
    let refresh=document.getElementById("refresh");
    refresh.style.visibility='hidden';



}











