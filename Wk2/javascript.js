$(function() {
    $("#sayHello").click(function() { 

        // Extract the current value of the userName input.
        let userName = $("#name").val();

        // Create the message and put it into the result paragraph

        let message = "Hello " + userName + "!";
        $("sayHello_result").html(message);
    });
})