$(document).ready(function(){// Variable to hold request

   
var request;

// Bind to the submit event of our form
$("#contactForm").submit(function(event){

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);
    $(".usernameError").empty();
    $(".emailError").empty();
    $(".training_optionError").empty();

    // Fire off the request to /form.php
    request = $.ajax({
        url: "./backend/datacollection_process.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        // console.log(response);
        var resp = "<div class='alert alert-success'>" + response + "</div>"  
        $(".notification").html(resp);

    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        

        var resp = JSON.parse(jqXHR.responseText);
        console.log(resp);
       if (resp.username) {
           $(".usernameError").html(resp.username);
       }
       if (resp.email) {
           $(".emailError").html(resp.email);
       }
       if (resp.training_option) {
           $(".training_optionError").html(resp.training_option);
       }
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

       
});

$(document).on('click', '.test', function() {
    $(".amount").html( "Amount to be paid <b>N30,000<b>");
    // console.log("Hello");
});

$(document).on('click', '.test1', function() {
  $(".amount").html( "Amount to be paid <b>N45,000<b>");
    // console.log("Hello");
});

$(document).on('click', '.test2', function() {
    $(".amount").html( "Amount to be paid <b>N15,000<b>");
    // console.log("Hello");
});

$(document).ready(function(){
    $(".clicked").click();
    console.log("hello loading");
});
});


$(window).load(function(e) {
    console.log("hello loading");
})