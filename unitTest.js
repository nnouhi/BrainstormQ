/*unitTest.js script
* Description: Includes all functions used for the test.html page*/
let hasPrize="&no";
let sorted="&no";
let completed="&no";
let completedQ="&no";
let geolocation="&no";
let skipped="&no";


/* Function for the sorted check box */
function checkBoxSorted(){
    let sortedCheckBox=document.getElementById("sorted");
    let sortedP=document.getElementById("sortedP");
    if(sortedCheckBox.checked === true){
        sorted="&sorted";
        sortedP.style.display="block";
    }
    else{
        sorted="&no";
        sortedP.style.display="none";
    }
}

/* Function for the prize check box */
function checkBoxPrize(){
    let prizeCheckBox=document.getElementById("prize");
    let prizeP=document.getElementById("prizeP");
    if(prizeCheckBox.checked === true){
        hasPrize="&hasPrize";
        prizeP.style.display="block";
    }
    else{
        hasPrize="&no";
        prizeP.style.display="none";
    }
}

/* Function for the completed check box */
function checkBoxCompleted(){
    let completedCheckBox=document.getElementById("completedCheckBox");
    let completedP=document.getElementById("completedP");
    if(completedCheckBox.checked === true){
        completed="&completed";
        completedP.style.display="block";
    }
    else{
        completed="&no";
        completedP.style.display="none";
    }
}

/* Function for the completed Question check box */
function checkBoxCompletedQ(){

    let completedQCheckBox=document.getElementById("completedQCheckBox");
    let completedQP=document.getElementById("completedQP");
    if(completedQCheckBox.checked === true){
        completedQ="&completed";
        completedQP.style.display="block";
    }
    else{
        completedQ="&no";
        completedQP.style.display="none";
    }
}

/* Function for the geolocation check box */
function checkBoxGeolocation(){

    let geolocationCheckBox=document.getElementById("GeolocationCheckBox");
    let geolocationQP=document.getElementById("geolocationP");
    if(geolocationCheckBox.checked === true){
        geolocation ="&requires-location";
        geolocationQP.style.display="block";
    }
    else{
        geolocation="&no";
        geolocationQP.style.display="none";
    }
}

/* Function for the skip check box */
function checkBoxSkip(){

    let skipCheckBox=document.getElementById("SkipCheckBox");
    let skipP=document.getElementById("skipP");
    if(skipCheckBox.checked === true){
        skipped ="&can-be-skipped";
        skipP.style.display="block";
    }
    else{
        skipped="&no";
        skipP.style.display="none";
    }
}

/* Function that tests the leaderboards*/
function getNumPlayers(){
    let numberOfPlayers=document.getElementById("numberOfPlayers").value;
    setTimeout(function(){ window.location.href="leaderboards.html?testLB"+sorted+hasPrize+"&size="+numberOfPlayers;},1000)
}

/* Function that tests the player score*/
function getScore(){
    let score=document.getElementById("score").value;
    setTimeout(function(){ window.location.href="leaderboards.html?testSc"+completed+"&score="+score},1000)
}

/* Function that tests questions*/
function getQType(){
    let qTypeElement = document.getElementById( "qType" );
    //https://stackoverflow.com/questions/3301688/how-do-you-get-the-currently-selected-option-in-a-select-via-javascript
    let qType=qTypeElement.options[ qTypeElement.selectedIndex ].value;

    setTimeout(function(){ window.location.href="app.html?testQ"+completedQ+skipped+geolocation+"&question-type="+qType},1000);
}

/* Function that shows and hides the leaderboards testing table */
function showLBTable(){
    let table = document.getElementById("LBTableContainer");
    if(table.style.display!=="block"){
        table.style.display="block";
    }
    else{
        table.style.display="none";
    }
}

/* Function that shows and hides the score testing table */
function showScoreTable(){
    let table = document.getElementById("ScoreTableContainer");
    if(table.style.display!=="block"){
        table.style.display="block";
    }
    else{
        table.style.display="none";
    }
}

/* Function that shows and hides the questions testing table */
function showQuestionsTable(){
    let table = document.getElementById("QuestionsTableContainer");
    if(table.style.display!=="block"){
        table.style.display="block";
    }
    else{
        table.style.display="none";
    }
}