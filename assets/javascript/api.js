$( document ).ready(function() {

var animals = ["Dog","Cat", "Panda", "Kangaroo", "Honey Badger", "Turtle", "Llama"];

function displayGifButtons(){

    $("#gifButtonsView").empty();
    // erasing anything in this div
    for (var i = 0; i < animals.length; i++){
        // generating dynamic button
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-default")
        gifButton.attr("data-name", animals[i]);
        gifButton.text(animals[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new action button
function addNewButton(){
    $("#addGif").on("click", function(){
    var animal = $("#action-input").val().trim();

    displayGifButtons();
    });
}

// Function that displays all of the gifs
function displayGifs(){
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
       
        $("#gifsView").empty();
 
        var results = response.data;
       
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            //div for the gifs to go inside
            gifDiv.addClass("gifDiv");

            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.prepend(gifRating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url); 
            // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_still.url); 
            // still image
            gifImage.attr("data-animate",results[i].images.fixed_height.url); 
            // animated image
            gifImage.attr("data-state", "still"); 
            // set the image state
            gifImage.addClass("image");
            gifDiv.prepend(gifImage);
       
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// calling functions/ methods
displayGifButtons();
addNewButton();

// animate/ still
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});