const API_KEY_Google = "AIzaSyDsb3SpuhnPv0-dU3ZHog_5OxwF2IQUWXg"

const API_KEY_Spoon = "f801def7ce0e409c8980d737f4141bb5"

const API_URL_Spoon = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_Spoon}&number=1&query=`

// const google_URL = `https://maps.googleapis.com/maps/api/directions/json?key=${API_KEY_Google}&origin=` + start + `&destination=` + end

// const destination = "33 King Street West, Toronto, ON"

//Spoonacular API block of code to render recipes upon request on Search.html

function getSource(id) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=f801def7ce0e409c8980d737f4141bb5",
        success: function(res) {
            $("#source-link").html(res.sourceUrl)
            $("#source-link").attr("href", res.sourceUrl)
        }
    })
}

function getRecipe(query) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/search?apiKey=f801def7ce0e409c8980d737f4141bb5&number=3&query=" + query,
        success: function(res) {
            $("#output").html()
            for (let i = 0; i < 3; i++) {
                $("#output").prepend("<h1>" + res.results[i].title + "</h1><br><img src='" + res.baseUri +
                    res.results[i].image + "' width='200' class='imlink' /><br>Preparation time: " + res.results[i].readyInMinutes + " minutes")
                for (let j = 0; j < 3; j++) {
                    $('.imlink').prepend("<a href='" + getSource(res.results[j].id) + "'></a>")
                }
            }
            // getSource(res.results[i].id))

        }
    })
}


// -------------------------------------------GOOGLE API-------------------------------------------------------------//


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