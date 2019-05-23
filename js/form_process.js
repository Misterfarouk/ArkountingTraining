$(document).ready(function(){// Variable to hold request


    // Contact Form
    // $("#conatactInformation").submit(function(e) {
       
    //     // Prevents form from reloading 
    //     e.preventDefault();

    //     // Abort any pending request
    //     if (request) {
    //         request.abort();
    //     }
    //     // setup some local variables
    //     var $form = $(this);

    //     // Let's select and cache all the fields
    //     var $inputs = $form.find("input, select, button, textarea");

    //     // Serialize the data in the form
    //     var serializedData = $form.serialize();

    //     // console.log(serializedData);

    //     // Let's disable the inputs for the duration of the Ajax request.
    //     // Note: we disable elements AFTER the form data has been serialized.
    //     // Disabled form elements will not be serialized.
    //     $inputs.prop("disabled", true);
    //     $(".nameError").empty();
    //     $(".contact_emailError").empty();
    //     $(".subject").empty();
    //     $(".message").empty();

    //     // Fire up the request to /form.php
    //     request = $.ajax({
    //         url: "./backend/datacollection2.php",
    //         type: "post",
    //         data: serializedData
    //     });

    //     // Callback handler that will be called on success
    //     request.done(function (response, textStatus, jqXHR){
    //         // Log a message to the console
    //         // console.log(response);
    //         var resp = "<div class='alert alert-success'>" + response + "</div>"  
    //         $(".notification").html(resp);

    //     });

    //     // Callback handler that will be called on failure
    //     request.fail(function (jqXHR, textStatus, errorThrown){
    //         // Log the error to the console      

    //         var resp = JSON.parse(jqXHR.responseText);
    //         console.log(resp);
    //     if (resp.name) {
    //         $(".nameError").html(resp.name);
    //     }
    //     if (resp.contactemail) {
    //         $(".contactemailError").html(resp.contactemail);
    //     }
    //     if (resp.subject) {
    //         $(".subject").html(resp.subject);
    //     }
    //     if (resp.message) {
    //         $(".message").html(resp.message);
    //         }
    //     });

    //     // Callback handler that will be called regardless
    //     // if the request failed or succeeded
    //     request.always(function () {
    //         // Reenable the inputs
    //         $inputs.prop("disabled", false);
    //     });

    // })

    $("input#name"). on('keyup' , function(e) {
        $(".nameError").empty()
    });
    $("input#contact_email"). on('keyup' , function(e) {
        $(".contact_emailError").empty()
    });
    $("input#subject"). on('keyup' , function(e) {
        $(".subjectError").empty()
    });
    $("input#message"). on('keyup' , function(e) {
        $(".messageError").empty()
    });

    $(function () {
        $('#conatactInformation').on('submit', function (e) {
         if (!e.isDefaultPrevented()) {
          var url = "./backend/datacollection2.php";
      
          $.ajax({
           type: "POST",
           url: url,
           data: $(this).serialize(),
           success: function (data) {
            // var messageAlert = 'alert-' + 'success';
            // var messageText = "message sent";
            // console.log(data.type);
            // console.log(data);
            // var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            // if (messageAlert && messageText) {
            //  $('#conatactInformation').find('#messages').html(alertBox);
            //  $('#conatactInformation')[0].reset();
            // }
            $("#messages").hide();
            var alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + data + '</div>';
            $("#messages").html(alertBox).fadeIn("slow");
            setTimeout(() => {
                $("#messages").fadeOut("slow");
            }, 40000);

            // document.getElementById("messages").innerHTML = msg;

            // setTimeout(function(){
            // document.getElementById("messages").innerHTML = '';
            // }, 2000);

           },
           error: function(err) {
        //   console.log(err);

                if (err.status == 400) 
                {            
                    var error = JSON.parse(err.responseText);
                    if (error.hasOwnProperty('name') && error.name != null) {
                        $(".nameError").html(error.name);
                    }
                    if (error.hasOwnProperty('contact_email') && error.contact_email != null) {
                        $(".contact_emailError").html(error.contact_email);
                    }
                    if (error.hasOwnProperty('subject') && error.subject != null) {
                        $(".subjectError").html(error.subject);
                    }
                    if (error.hasOwnProperty('message') && error.message != null) {
                        $(".messageError").html(error.message);
                    }
                }

            }
          });
          return false;
      

         }
        })
      });
        // testing 123
   
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
  $(".amount").html( "Amount to be paid <b>N47,500<b>");
    // console.log("Hello");
});

$(document).on('click', '.test2', function() {
    $(".amount").html( "Amount to be paid <b>N15,000<b>");
    // console.log("Hello");
});

$(document).ready(function(){
    $(".clicked").click();
    //console.log("hello loading");
});
});


$(window).on("load" , function(e) {
   //console.log("hello loading");
})