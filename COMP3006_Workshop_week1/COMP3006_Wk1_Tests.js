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


suite("HTML tests", function() {
    test("Add a div of class 'main' to the page", function() {
        chai.assert($("div").length > 1, "Wrong number of divs in the page");
        chai.assert.equal($(".main")[0].tagName, "DIV", "'main' class element has the wrong type");
    });

    test("Add a div of class 'light' to the 'main' div", function() {
        chai.assert.equal($("div.main div").length, 1, "Wrong number of divs inside 'main' div");
    });

    test("Add a button to the 'main' div with the ID 'burn'", function() {
        chai.assert.equal($("#burn").prop('tagName'), "BUTTON", "Element with ID 'burn' is not a button");
    });
    
    test("Display the text 'Burn!' on the button", function() {
        chai.assert.equal($("#burn").html(), "Burn!", "Button 'burn' has the wrong text");
    });
});


suite("CSS tests", function() {
    test("Set the style properties of the 'main' div", function() {
        chai.assert.equal($(".main").css("width"), "250px", "'main' div has the wrong width");
        chai.assert.equal(rgb2hex($(".main").css("background-color")), "#d0d0d0", "'main' div has wrong background colour");
    });

    test("Set the style properties of the 'light' div", function() {
        chai.assert.equal($(".light").css("width"), "50px", "'light' div has the wrong width");
        chai.assert.equal($(".light").css("height"), "50px", "'light' div has the wrong height");
        chai.assert.equal(rgb2hex($(".light").css("background-color")), "#00ffff", "'light' div has wrong background colour");
    });

    test("Set the style properties of the 'burn' button", function() {
        chai.assert.equal($("#burn").css("width"), "150px", "'burn' button has the wrong width");
        chai.assert.equal($("#burn").css("font-weight"), "700", "'burn' button has the wrong font weight");
    });
});

suite("JavaScript tests", function() {
    test("Clicking the button changes the 'light' div from cyan to yellow", function() {
        var originalCol = $(".light").css("background-color");
        $(".light").css("background-color", "#00ffff");
        clickElement($("#burn"));
        chai.assert.equal(rgb2hex($(".light").css("background-color")), "#ffff00", "'light' div has wrong background colour");
        $(".light").css("background-color", originalCol);
    })

    test("Clicking the button changes the 'light' div from yellow to magenta", function() {
        var originalCol = $(".light").css("background-color");
        $(".light").css("background-color", "#ffff00");
        clickElement($("#burn"));
        chai.assert.equal(rgb2hex($(".light").css("background-color")), "#ff00ff", "'light' div has wrong background colour");
        $(".light").css("background-color", originalCol);
    })

    test("Clicking the button changes the 'light' div from magenta to cyan", function() {
        var originalCol = $(".light").css("background-color");
        $(".light").css("background-color", "#ff00ff");
        clickElement($("#burn"));
        chai.assert.equal(rgb2hex($(".light").css("background-color")), "#00ffff", "'light' div has wrong background colour");
        $(".light").css("background-color", originalCol);
    })
});