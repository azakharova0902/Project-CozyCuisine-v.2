const API_KEY_Google = "AIzaSyDsb3SpuhnPv0-dU3ZHog_5OxwF2IQUWXg"

const API_KEY_Spoon = "f801def7ce0e409c8980d737f4141bb5"

const API_URL_Spoon = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_Spoon}&number=1&query=`

// const google_URL = `https://maps.googleapis.com/maps/api/directions/json?key=${API_KEY_Google}&origin=` + start + `&destination=` + end

const destination = "33 King Street West, Toronto, ON"

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

// Google Maps APIs (Geocoder and Directions) for Workshop.html

let userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)

let myOptions = {
    zoom: 15,
    center: userLocation,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

let mapObject = new google.maps.Map(document.getElementById("map"), myOptions)

new google.maps.Marker({
    map: mapObject,
    position: userLocation
})

function displayAddress(latLng) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({
            "location": latLng
        },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK)
                document.getElementById("address").innerHTML = results[0].formatted_address;
            else
                document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
        });
}