$(document).ready(function(){// Variable to hold request

   
 //Make an Ajax request to a PHP script called car-models.php
            //This will return the data that we can add to our Select element.
            $.ajax({
                url: './backend/select_dropdown.php',
                type: 'get',
                success: function(data){
    
                    //Log the data to the console so that
                    //you can get a better view of what the script is returning.
                    console.log("victor:"+data);
    
                    $.each(data, function(key, modelName){
                        //Use the Option() constructor to create a new HTMLOptionElement.
                        var option = new Option(modelName, modelName);
                        //Convert the HTMLOptionElement into a JQuery object that can be used with the append method.
                        $(option).html(modelName);
                        //Append the option to our Select element.
                        $("#training").append(option);
                    });
    
                    //Change the text of the default "loading" option.
                    $('#training_option').text('Please select a training option');
    
                }
            });

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


    $(document).on('click', '.test1', function() {
        $(".amount").html( "Amount to be paid <b>N47,500<b>");
        });

        $(document).on('click', '.test', function() {
            $(".amount").html( "Amount to be paid <b>N30,000<b>");
        });

        $(document).on('click', '.test2', function() {
            $(".amount").html( "Amount to be paid <b>N15,000<b>");
        });

        $(document).ready(function(){
            $(".clicked").click();
        });
});

    // $(window).load(function() {
        // console.log("hello loading")
        $(window).on("load", function (e) {

        });

        var amountToPay;

        function myfunc(id){
              
            if(id == 47){
                amountToPay = 5000000- (5000000 * 0.05);
            }else if (id == 48){
                amountToPay = 3000000;
            }else if (id == 49){
                amountToPay = 1500000;
          }
        }

        function payWithPaystack(){
            var handler = PaystackPop.setup({
              key: 'pk_live_bf680426c45fe2eac3235e767411cc44cdcf79f7',
              email: 'customer@email.com',
              amount: amountToPay,
              currency: "NGN",
              ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
              firstname: 'Stephen',
              lastname: 'King',
              // label: "Optional string that replaces customer email"
              metadata: {
                 custom_fields: [
                    {
                        display_name: "Mobile Number",
                        variable_name: "mobile_number",
                        value: "+2348012345678"
                    }
                 ]
              },
              callback: function(response){
                  alert('success. transaction ref is ' + response.reference);
              },
              onClose: function(){
                  alert('window closed');
              }
            });
            handler.openIframe();
          }

          $(document).ready(function() {

            
    
        });
          
