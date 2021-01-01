


//window.onload = getMyLocation;

function getMyLocation() {
    var loc = [];
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            loc = displayLocation, 
            displayError);
    }
    else {
        alert("Oops, no geolocation support");
    }
    return loc;
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var loc = [];
    loc.push(latitude);
    loc.push(longitude);
    return loc;

}

function displayError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied",
        2: "Position is not available",
        3: "Request timeout"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}


