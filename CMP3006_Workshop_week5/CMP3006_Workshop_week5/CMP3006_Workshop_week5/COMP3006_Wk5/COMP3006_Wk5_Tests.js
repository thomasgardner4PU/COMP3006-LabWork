function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        var event = new MouseEvent("click", {view: window, cancelable: true, bubbles: true});
        element.dispatchEvent(event);
    }
}

function rgb2hex(color) {
    var digits = /(.*?)rgba\((\d+), (\d+), (\d+), (\d+)\)/.exec(color);
    if (digits == null) {
        digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    }
    var red = parseInt(digits[2],10);
    var green = parseInt(digits[3],10);
    var blue = parseInt(digits[4],10);
    var rgb = blue | (green << 8) | (red << 16);
    if(red == 0){
        return digits[1] + '#00' + rgb.toString(16);
    }else{
        return digits[1] + '#' + rgb.toString(16);
    }
}

// let  requiredStr = require('COMP3006_Wk5.html');
// let expectedStr1 = require('chai').expect;

// suite("Testing functions for week5 COMP3006", function () {
//     test("Test sayHello function", function () {
//         let requiredStr = $("Hello", "David");
//     })
// })

suite("Test Suite description", function () {
    test("Testing sayHello function", function () {
        let name = "David";
        let response = sayHello(name);

        chai.assert("Hello David", response, "Wrong message returned");
    })
})

suite("Test input and button click populates message", function () {
    // Set up the form data and press the button.

    let name = "David";
    $("#name").val(name);
    clickElement($("btn"));

    // Check that the message was populated correctly.

    let msg = $("msg").html();
    chai.assert.equal("Hello David", msg, "Incorrect message in the page");
})