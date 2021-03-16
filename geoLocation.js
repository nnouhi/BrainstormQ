/*geoLocation.js script
* Description: Includes functions for periodic
*  update and force location update*/

/*Global variables*/
let lat;
let lng;

/*Functions used for periodically updating the location*/
/*Periodically update the lat and lng  every 5 seconds*/
function updateLocation_Period() {
    console.log("periodic location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLatLong);
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    setTimeout(updateLocation_Period,5000); /*-> maybe will have to update every 25 seconds*/
}
/*Updates global variables lat, long*/
function updateLatLong(position){
    console.log("lat, long updated");
    lat=position.coords.latitude;
    lng=position.coords.longitude;
}

/*Updates user location periodically every 30 secs*/
function updateUsersLocation(){
    console.log("Update users location, 30 secs");
    fetch(TH_BASE_URL_LOCATION + getCookie("sessionID") + "&latitude=" + lat + "&longitude=" + lng)
        .then(response => response.json())
        .then(jsonObject => {});
    setTimeout(updateUsersLocation,30000);
}
/*Functions used for periodically updating the location*/

/*Functions used for force updating the Location*/

/*Force update users location*/
function updateLocation_Force() {
    console.log("force location update test 1");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateUsersLocation_Force);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}
/*Force update users location with the current lng and lat*/
function updateUsersLocation_Force(position){
    console.log("force location update test 2");
    lat=position.coords.latitude;
    lng=position.coords.longitude;
    fetch(TH_BASE_URL_LOCATION + getCookie("sessionID") + "&latitude=" + lat + "&longitude=" + lng)
        .then(response => response.json())
        .then(jsonObject => {});
}
/*Functions used for force updating the Location*/