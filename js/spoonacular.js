const API_KEY_Spoon = "f801def7ce0e409c8980d737f4141bb5"

const spoon_copy = "7684a1d934714b84be2124da8c0399d9" // second API key that I registered under another account tp avoid daily calls restrictions 



//Spoonacular API block of code to render recipes upon request on Search.html

// Let's fetch a recipe ID from Spoonacular API
function getId(id) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=7684a1d934714b84be2124da8c0399d9",
        success: function(res) {

            $(".source-link").html(res.sourceUrl)
            $(".source-link").attr("href", res.sourceUrl)

        }
    })
}

// Now let's use ComplexSearch endpoint to get a random recipe from Spoonacular's database and display it on our website.
// Our clients can browse for any recipe and follow the source link to get recipe information.
function getRecipe(query) {
    $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=7684a1d934714b84be2124da8c0399d9&sort=random&number=1&query=" + query,
        success: function(res) {
            $("#output").html("<h1>" + res.results[0].title + "</h1><br><img src='" + res.results[0].image + "' width='300' class='imlink' />")
            $(".please").text("Please follow the link to get more details:")
            $(".source-link").html("<a href='" + getId(res.results[0].id) + "'></a>")
            $(".s-footer").show()

        }
    })
}