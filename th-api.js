/*th-api.js script
* Description: Inludes activating the modal, qrcode feature,copy to clipboard
* and convertion functions*/


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("infoBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let copyBtn=document.getElementById("copyClipboard");
copyBtn.addEventListener("click", copyToClipboard);

let opts = {
    // Whether to scan continuously for QR codes. If false, use scanner.scan() to
    // manually scan. If true, the scanner emits the "scan" event when a QR code is
    // scanned. Default true.
    continuous: true,
    // The HTML element to use for the camera's video preview. Must be a <video>
    // element. When the camera is active, this element will have the "active" CSS
    // class, otherwise, it will have the "inactive" class. By default, an invisible
    // element will be created to host the video.
    video: document.getElementById('preview'),
    // Whether to horizontally mirror the video preview. This is helpful when trying to
    // scan a QR code with a user-facing camera. Default true.
    mirror: true,
    // Whether to include the scanned image data as part of the scan result. See the
    // "scan" event for image format details. Default false.
    captureImage: false,
    // Only applies to continuous mode. Whether to actively scan when the tab is not
    // active.
    // When false, this reduces CPU usage when the tab is not active. Default true.
    backgroundScan: true,
    // Only applies to continuous mode. The period, in milliseconds, before the same QR
    // code will be recognized in succession. Default 5000 (5 seconds).
    refractoryPeriod: 5000,
    // Only applies to continuous mode. The period, in rendered frames, between scans. A
    // lower scan period increases CPU usage but makes scan response faster.
    // Default 1 (i.e. analyze every frame).
    scanPeriod: 1
};


let camerasArray;
let cameraIndex=0; //0 is from 1 is back
let scanner = new Instascan.Scanner(opts);

//show the camera
function activateCamera(){


//the scanned results
    scanner.addListener('scan', function (content) {
        console.log(content);
        document.getElementById("content").innerHTML = content;
    });


    Instascan.Camera.getCameras().then(function (cameras) {
        camerasArray=cameras;
        if (cameras.length > 0) {
            cameraIndex=0; //cameraIndex = from camera
            scanner.start(cameras[0]); //start with the first camera

            let videoContainer=document.getElementById("tgCamera");

            if(videoContainer.style.display==="none") videoContainer.style.display="block";

            else videoContainer.style.display="none";

        }
        else {
            /*console.error('No cameras found.');*/
            alert("No cameras found in your device");
        }
    }).catch(function (e) {
        alert("No cameras found in your device"); /*Delete later*/
    });

}

//switch from front-back camera
function switchCamera() {

    /*Check if there are available cameras to use to avoid errors */
    if (typeof camerasArray !== "undefined") {
        //Cycle through the available cameras:
        if (cameraIndex < camerasArray.length - 1) {
            cameraIndex++;
        } else {
            cameraIndex = 0;
        }
        //Find the next camera to use:
        let camera = camerasArray[cameraIndex];
        //Start the new selected camera:
        scanner.start(camera);
    }
    else{
        alert("No cameras found in your device");
    }
}

//copy to clickboard function
function copyToClipboard(){
    const str = document.getElementById('content').innerText;
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px'; //we set readonly, position absolute and left -9999px just to make our textarea invisible to the user
    document.body.appendChild(el);//We then append the element to the DOM so that right after we do that, we can call select() onto it.
    el.select();//we can use select() on textarea and input elements.
    document.execCommand('copy');
    document.body.removeChild(el); //we remove the textarea from the DOM with removeChild(el).
    alert(`Copied: `+str);
}

function convertMsToMinutes(maxDurationString){
    maxDurationNum = Number(maxDurationString); //actually didnt need to convert
    let m = Math.floor((maxDurationNum / 1000 / 60) << 0)
    return m + " minutes";
}

function convertMsToDate(startsOnString){
    let startsOnNum = Number(startsOnString); //actually didnt need to convert
    let options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
    };
    let date = new Date(startsOnNum);
    let result = date.toLocaleDateString('en', options); // month/day/year
    return result;
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





