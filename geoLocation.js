/*Global variables*/
let lat;
let lng;
let countdown=60;

/*Functions used for periodically updating the location*/
/*Periodically update the lat and lng  every 5 seconds*/
function updateLocation_Period() {
    console.log("periodic location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLatLong);
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    setTimeout(updateLocation_Period,59000);

}
/*Updates global variables lat, long*/
function updateLatLong(position){
    console.log("lat, long updated");
    lat=position.coords.latitude;
    lng=position.coords.longitude;
}

/*Updates user location periodically every 30 secs*/
function updateUsersLocation(){
    console.log("Update users location");
    fetch(TH_BASE_URL_LOCATION + getCookie("sessionID") + "&latitude=" + lat + "&longitude=" + lng)
        .then(response => response.json())
        .then(jsonObject => {});
    setTimeout(updateUsersLocation,60000);
    setTimeout(timer(countdown),60000);
}
/*Functions used for periodically updating the location*/

/*Functions used for force updating the Location*/

/*Force update users location*/
function updateLocation_Force() {
    console.log("force location update");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateUsersLocation_Force);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
/*Force update users location with the current lng and lat*/
function updateUsersLocation_Force(position){
    console.log("force location update2");
    lat=position.coords.latitude;
    lng=position.coords.longitude;
    fetch(TH_BASE_URL_LOCATION + getCookie("sessionID") + "&latitude=" + lat + "&longitude=" + lng)
        .then(response => response.json())
        .then(jsonObject => {});
}
/*Functions used for force updating the Location*/

let timeElm = document.getElementById("periodicLoc");

let timer = function(countdown) {

    if(countdown === 0) {
        return;
    }
    timeElm.innerHTML = "Next location update in "+"<span style='color:darksalmon'>"+countdown+"</span>"+" seconds.";

    return setTimeout(() => {timer(--countdown)}, 1000)
}