$(document).ready(function(){
    
    // Variable to hold request
    var amountToPay;

    //clearing error messages 
    $("input#username").on('keyup', function(e) {
        $(".usernameError").empty();
    });
    $("input#email").on('keyup', function(e) {
        $(".emailError").empty();
    });

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

   

    // Contact Form
    $("#contactInformation").submit(function(e) {
       
        // Prevents form from reloading 
        e.preventDefault();

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

        // console.log(serializedData);

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);
        $(".nameError").empty();
        $(".contact_emailError").empty();
        $(".subjectError").empty();
        $(".messageError").empty();

        // Fire up the request to /form.php
        request = $.ajax({
            url: "./backend/datacollection2.php",
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
        if (resp.name) {
            $(".nameError").html(resp.name);
        }
        if (resp.contact_email) {
            $(".contact_emailError").html(resp.contact_email);
        }
        if (resp.subject) {
            $(".subjectError").html(resp.subject);
        }
        if (resp.message) {
            $(".messageError").html(resp.message);
            }
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

    })

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
          
            $("#messages").hide();
            var alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + data + '</div>';
            $("#messages").html(alertBox).fadeIn("slow");
            setTimeout(() => {
                $("#messages").fadeOut("slow");
            }, 40000);

    

           },
           error: function(err) {

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

    var customer_email = $("input#email").val();
    var customer_name = $("input#username").val();
    var amount = $("input#okc").val();
    console.log(amount);
    payWithPaystack(customer_email, customer_name, amount);      
});

    //function Amount to be paid
    $(document).on('click', '.test1', function() {
        $(".amount").html( "Amount to be paid <b>N47,500<b>");
    });

    $(document).on('click', '.test', function() {
        $(".amount").html( "Amount to be paid <b>N30,000<b>");
    });

    $(document).on('click', '.test2', function() {
        $(".amount").html( "Amount to be paid <b>N15,000<b>");
    });


        //paystack integration
function payWithPaystack(customer_email, customer_name, amt){
            
           
        var handler = PaystackPop.setup({
          key: 'pk_test_cdcc421dda96b12747c881e87864b28dc25bc05b',
          email: customer_email,
          amount: amt,
          currency: "NGN",
          ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          firstname: customer_name,
          lastname: '',
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
              perforDBUpdate(customer_email, customer_name, amt);
        
          },
          onClose: function(){
              alert('window closed');
          }
        });
        handler.openIframe();
      }
});

function  perforDBUpdate(customer_email, customer_name, amt){

          // setup some local variables
        var $form = $("#contactForm");

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

         console.log(serializedData);

        // Fire up the request to /form.php
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
        if (resp.name) {
            $(".nameError").html(resp.name);
        }
        if (resp.contactemail) {
            $(".contactemailError").html(resp.contactemail);
        }
        if (resp.subject) {
            $(".subject").html(resp.subject);
        }
        if (resp.message) {
            $(".message").html(resp.message);
            }
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

    

}


function myfunc(id){
          
    if(id == 47){
        amountToPay = 5000000- (5000000 * 0.05);
        //assing to input tag
        $('input[name="okc"]').val(amountToPay);

    }else if (id == 48){
        amountToPay = 3000000;
        $('input[name="okc"]').val(amountToPay);
    }else if (id == 49){
        amountToPay = 1500000;
         $('input[name="okc"]').val(amountToPay);
  }
}

        
          
