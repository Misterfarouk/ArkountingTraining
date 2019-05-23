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

    $(document).ready(function(){
        $(".clicked").click();
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

        
          
