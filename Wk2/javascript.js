$(function() {

    $("#sayHello").click(function() {

        // Extract the current value of the userName input.
        let userName = $("#name").val();
        console.log(userName);
        // Create the message and put it into the result paragraph
        let message = "Hello " + userName + "!";
        $("#sayHello_result").html(message);
    });

    console.log("works")
    $("#numberButton").click(function () {


        let contents = parseInt($("#theNumber").val());

        if (contents < 10) {
            $("#numberResult").html("Less than 10")
        } else {
            $("#numberResult").html("Greater than or equal to 10")
        }
    })


})