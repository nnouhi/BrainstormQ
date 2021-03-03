let hasPrize="&no";
let sorted="&no";

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

/* Function that tests the leaderboards*/
function getNumPlayers(){
    let numberOfPlayers=document.getElementById("numberOfPlayers").value;
    setTimeout(function(){ window.location.href="leaderboards.html?testLB"+sorted+hasPrize+"&size="+numberOfPlayers;},1000)
}

/* Function that shows and hides the testing table */
function showTable(){
    let table = document.getElementById("LBTableContainer");
    if(table.style.display!=="block"){
        table.style.display="block";
    }
    else{
        table.style.display="none";
    }
}