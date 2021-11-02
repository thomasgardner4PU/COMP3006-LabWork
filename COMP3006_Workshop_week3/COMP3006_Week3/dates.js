function GetTime() {
    let currentDate = new Date();

    // if current time is before 12 , then display message for good morning
    if (now.getHours() < 12 ) {
        return "Good Morning";

        // if after 12pm and before 6pm then display good afternoon message
    } else if (now.getHours() < 18) {
        return "Good afternoon";
    }

    // otherwise return good evening message
    return "Good evening";
}

$(function () {
    let message = GetTime();
    $("message").html(message);
})