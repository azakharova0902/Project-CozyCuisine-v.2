// -------------------------------------------GOOGLE API-------------------------------------------------------------//

// This API allows us to implement a "Find Directions" feature on our Workshop page. This way, our users can 
// get auto-located and then enter any address to get directions (driving).

const API_KEY_Google = "AIzaSyDsb3SpuhnPv0-dU3ZHog_5OxwF2IQUWXg"

// Google Maps APIs (Geocoder and Directions) for Workshop.html

function calculateRoute(from, to) {
    let myOptions = {
        zoom: 10,
        center: new google.maps.LatLng(43.688239, -79.393882),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Let's now draw the map
    let mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

    let directionsService = new google.maps.DirectionsService();
    let directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };
    directionsService.route(
        directionsRequest,
        function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                new google.maps.DirectionsRenderer({
                    map: mapObject,
                    directions: response
                });
            } else
                $("#error").append("Sorry, we couldn't retrieve your route<br />")
        }
    )
}

$(document).ready(function() {
    // If the browser supports the Geolocation API
    if (typeof navigator.geolocation == "undefined") {
        $("#error").text("Sorry, but looks like your browser doesn't support the Geolocation")
        return
    }

    $("#from-link").click(function(event) {
        event.preventDefault()
        let addressId = this.id.substring(0, this.id.indexOf("-"))

        navigator.geolocation.getCurrentPosition(function(position) {
                let geocoder = new google.maps.Geocoder()
                geocoder.geocode({
                        "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    },
                    function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK)
                            $("#" + addressId).val(results[0].formatted_address)
                        else
                            $("#error").append("Sorry, we were unable to retrieve your address<br />")
                    })
            },
            function(positionError) {
                $("#error").append("Error: " + positionError.message + "<br />")
            }, {
                enableHighAccuracy: true,
                timeout: 10 * 1000
            })
    })

    $("#calculate-route").submit(function(event) {
        event.preventDefault()
        calculateRoute($("#from").val(), $("#to").val())
    })
})

let myOptions = {
    zoom: 10,
    center: new google.maps.LatLng(43.688239, -79.393882), // the map center is set for GTA
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

// Let's now make sure that our map loads when the page is loaded (even before we set any directions)
let mapObject = new google.maps.Map(document.getElementById("map"), myOptions)
window.onload = mapObject