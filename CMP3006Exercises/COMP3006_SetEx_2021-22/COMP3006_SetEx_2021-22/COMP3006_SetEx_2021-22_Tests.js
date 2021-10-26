function clickElement(element) {
    try {
        element.trigger("click");
    } catch(err) {
        console.log("error: " + err);
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

    suiteSetup(function() {
        this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    });

    test("Check that the page title is 'Timetable Viewer'", function() {
        chai.assert.equal($("title").text(), "Timetable Viewer", "Page title is incorrect");
    }); 

    test("Check that the level one heading says 'Timetable Viewer'", function() {
        chai.assert.equal($("h1").last().text(), "Timetable Viewer", "Level one heading is incorrect");
    });

    test("Add a div with the ID 'timetable' to the page", function() {
        chai.assert.equal($("#timetable").prop("tagName"), "DIV", "'timetable' element has the wrong type");
    });

    test("Add a div for each day of the week to the timetable div", function() {
        for (let i=0; i<this.days.length; i++) {
            let day = this.days[i].substr(0, 3).toLowerCase();
            chai.assert.equal($("#timetable #" + day).prop("tagName"), "DIV", "'" + day + "' element is incorrect");
        }
    });

    test("Check that the days of the week are correctly labelled", function() {
        for (let i=0; i<this.days.length; i++) {
            chai.assert.equal($("#" + this.days[i].substr(0, 3).toLowerCase()).find("p:first").text(), this.days[i], "'" + this.days[i] + "' element has wrong label");
        }
    });

    test("Check that individual sessions are set up and labelled correctly", function() {
        let times = [9, 11, 14, 16]
        for (let i=0; i<this.days.length; i++) {
            let day = this.days[i].substr(0, 3).toLowerCase();

            for (let j=0; j<times.length; j++) {
                let time = times[j];
                let suffix = time < 12? "am" : "pm";
                let displayTime = time < 13? time : (time-12);
                chai.assert.equal($("#timetable #" + day + "_" + time).prop("tagName"), "DIV", "'" + day + "_" + time + "' element is incorrect");
                chai.assert.equal($("#" + day + "_" + time).find("p:first").text(), displayTime + suffix, "Wrong display time for '" + day + "_" + time + "'");
            }
        }
    });

    test("Check that there exists a level two heading with text 'Errors'", function() {
        chai.assert.equal($("h2").last().text(), "Errors", "Level two heading is incorrect");
    });

    test("Check that there is an unordered list with ID 'errors'", function() {
        chai.assert.equal($("#errors").prop("tagName"), "UL", "'errors' element has the wrong type");
    });

    test("Check that the 'display' button is correctly implemented", function() {
        chai.assert.equal($("#display").prop("tagName"), "BUTTON", "'display' element has the wrong type");
        chai.assert.equal($("#display").text(), "Display Sessions", "'display' element has the wrong text");
    });

    test("Check that the 'clear' button is correctly implemented", function() {
        chai.assert.equal($("#clear").prop("tagName"), "BUTTON", "'clear' element has the wrong type");
        chai.assert.equal($("#clear").text(), "Clear Sessions", "'clear' element has the wrong text");
    });

});


suite("CSS tests", function() {
    test("Check that the body background colour is correct", function() {
        chai.assert.equal(rgb2hex($("body").css("background-color")), "#99ffff", "'body' element has wrong background colour");
    });

    test("Check that the body font is correct", function() {
        chai.assert.equal($("body").css("font-family").toLowerCase(), "verdana", "'body' element has wrong font");
    });

    test("Check that the level one heading text is the correct size", function() {
        chai.assert.equal($("h1").last().css("font-size").toLowerCase(), "36px", "'h1' element has wrong font size");
    });

    test("Check that the day class has the correct border attributes", function() {
        chai.assert.equal($(".day").css("border-style"), "solid", "The day class has the wrong border style");
        chai.assert.equal($(".day").css("border-width"), "1px", "The day class has the wrong border style");
        chai.assert.equal(rgb2hex($(".day").css("border-color")), "#000", "The day class has the wrong border style");
    });

    test("Check that the day class is correctly floated to the left", function() {
        chai.assert.equal($(".day").css("float"), "left", "The day class is floated incorrectly");
    });

    test("Check that the width of the day class is correct", function() {
        let windowWidth = $(window).width();
        let dayWidth = $(".day").width();
        chai.assert.approximately(dayWidth/windowWidth, 0.19, 0.015, "Width of the day class is incorrect");
    });

    test("Check that the session class has the correct background colour", function() {
        chai.assert.equal(rgb2hex($(".session").css("background-color")), "#dfdfdf", "'session' class has wrong background colour");
    });

    test("Check that the session class has the correct width and height", function() {
        let dayWidth = $(".day").width();
        let sessionWidth = $(".session").width();
        chai.assert.approximately(sessionWidth/dayWidth, 0.8, 0.015, "'session' class has the wrong width");
        chai.assert.equal($(".session").css("height"), "120px");
    });

    test("Check that the session class has the correct margin and padding", function() {
        let dayWidth = $(".day").width();
        let margin = parseInt($(".session").css("margin").substr(0, $(".session").css("margin").length-2));
        let padding = parseInt($(".session").css("padding").substr(0, $(".session").css("padding").length-2));
        chai.assert.approximately(margin/dayWidth, 0.05, 0.015, "'session' class has the wrong margins");
        chai.assert.approximately(padding/dayWidth, 0.05, 0.015, "'session' class has the wrong padding");
    });

    test("Check that list elements in the error list have the correct font colour", function() {
        $("#errors").append("<li>Test</li>");
        chai.assert.equal(rgb2hex($("#errors li").css("color")), "#ff0000", "Error list elements are displayed in the wrong colour");
        $("#errors").empty();
    });
});

suite("JavaScript tests", function() {

    setup(function() {
        this.sessionData = [
            ["COMP3006 Lecture", new Date(2021, 8, 28, 9), "David Walker"],
            ["COMP3005 Lecture", new Date(2021, 8, 28, 11), "Shirley Atkinson"],
            ["COMP3006 Lab 1", new Date(2021, 8, 28, 14), "James Hayter"],
            ["COMP3005 Seminar", new Date(2021, 8, 28, 16), "Shirley Atkinson"],
            ["COMP3000 Lecture", new Date(2021, 8, 29, 9), "Amir Aly"],
            ["COMP3006 Lab 2", new Date(2021, 9, 1, 11), "James Hayter"],
            ["COMP3016 Lecture", new Date(2021, 8, 28, 9), "Swen Gaudl"],
            ["COMP3016 Lecture", new Date(2021, 9, 10, 9), "Swen Gaudl"]
        ];

        this.sessions = [
            new Session(this.sessionData[0][0], this.sessionData[0][1], this.sessionData[0][2]),
            new Session(this.sessionData[1][0], this.sessionData[1][1], this.sessionData[1][2]),
            new Session(this.sessionData[2][0], this.sessionData[2][1], this.sessionData[2][2]),
            new Session(this.sessionData[5][0], this.sessionData[5][1], this.sessionData[5][2]),
            new Session(this.sessionData[6][0], this.sessionData[6][1], this.sessionData[6][2]),
            new Session(this.sessionData[7][0], this.sessionData[7][1], this.sessionData[7][2])
        ]

        this.timetable = new Timetable()
        this.timetable.sessions.push(this.sessions[0]);
        this.timetable.sessions.push(this.sessions[2]);

        this.dayKeys = ["mon", "tue", "wed", "thu", "fri"];
        this.hourKeys = ["9", "11", "14", "16"];
    });

    teardown(function() {
        for (let i=0; i<this.dayKeys.length; i++) {
            for (let j=0; j<this.hourKeys.length; j++) {
                let key = "#" + this.dayKeys[i] + "_" + this.hourKeys[j];
                $(key).removeClass("active");
                $(key + "_title").remove();
                $(key + "_staff").remove();
            }
        }

        $("#errors").empty();
    });

    test("Check that the Session class works correctly", function() {
        // Initialise a new session object.
        let session = new Session(this.sessionData[0][0], this.sessionData[0][1], this.sessionData[0][2]);

        // Confirm that the object properties are stored correctly.
        chai.assert.equal(session.title, this.sessionData[0][0], "Session has wrong title");
        chai.assert.equal(session.sessionTime, this.sessionData[0][1], "Session has wrong sessionTime");
        chai.assert.equal(session.staff, this.sessionData[0][2], "Session has wrong staff");
    });

    test("Check that the Timetable class works correctly", function() {
        // Initialise a pair of session objects.
        let session1 = new Session(this.sessionData[0][0], this.sessionData[0][1], this.sessionData[0][2]);
        let session2 = new Session(this.sessionData[1][0], this.sessionData[1][1], this.sessionData[1][2]);

        // Use the session objects to initialise a timetable.
        let timetable = new Timetable();
        timetable.sessions.push(session1);
        timetable.sessions.push(session2);

        // Confirm that the timetable has been set up correctly.
        chai.assert.equal(timetable.sessions.length, 2, "Timetable has the wrong number of sessions");
        for (let i=0; i<2; i++) {
            chai.assert.equal(timetable.sessions[i].title, this.sessionData[i][0], "Session has wrong title");
            chai.assert.equal(timetable.sessions[i].sessionTime, this.sessionData[i][1], "Session has wrong sessionTime");
            chai.assert.equal(timetable.sessions[i].staff, this.sessionData[i][2], "Session has wrong staff");
        }
    });

    test("Check that the correct session ID is generated", function() {
        // Initialise a pair of session objects.
        let session1 = new Session(this.sessionData[0][0], this.sessionData[0][1], this.sessionData[0][2]);
        let session2 = new Session(this.sessionData[2][0], this.sessionData[2][1], this.sessionData[2][2]);

        // Confirm that the correct session ID was generated.
        chai.assert.equal("tue_9", session1.getSessionId(), "Session object generates incorrect ID");
        chai.assert.equal("tue_14", session2.getSessionId(), "Session object generates incorrect ID");
    });

    test("Check that displaying a single session works correctly", function() {
        // Initialise a session object.
        let session = new Session(this.sessionData[0][0], this.sessionData[0][1], this.sessionData[0][2]);
        let key = "#" + session.getSessionId();

        // Check that the session is not currently active.
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");

        // Render the session.
        session.renderSession();

        // Check that the session was rendered correctly.
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");
        chai.assert.equal($(key + "_title").text(), this.sessionData[0][0], "Rendered title is incorrect");
        chai.assert.equal($(key + "_staff").text(), this.sessionData[0][2], "Rendered staff is incorrect");
    });

    test("Check that clearing a single session works correctly", function() {
        // Get the session key and check that the session is not currently active.
        let key = "#" + this.sessions[0].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");

        // Render the session.
        this.sessions[0].renderSession();

        // Check that the session was rendered correctly.
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");

        // Remove the session.
        this.sessions[0].clearSession();

        // Check that the session has been removed.
        chai.assert.isFalse($(key).hasClass("active"), "This session should be inactive");
    });

    test("Check that displaying the full timetable works correctly", function() {
        // Check that the sessions are not currently active.
        let key = "#" + this.timetable.sessions[0].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");
        key = "#" + this.timetable.sessions[1].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");

        // Render the timetable.
        this.timetable.displayTimetable();

        // Check that the sessions are currently active.
        key = "#" + this.timetable.sessions[0].getSessionId();
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");
        key = "#" + this.timetable.sessions[1].getSessionId();
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");
    });

    test("Check that clearing the timetable works correctly", function() {
        // Check that the sessions are not currently active.
        let key = "#" + this.timetable.sessions[0].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");
        key = "#" + this.timetable.sessions[1].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");

        // Render the timetable.
        this.timetable.displayTimetable();

        // Check that the sessions are now currently active.
        key = key = "#" + this.timetable.sessions[0].getSessionId();
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");
        key = "#" + this.timetable.sessions[1].getSessionId();
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");

        // Clear the timetable.
        this.timetable.clearTimetable();

        // Check that the sessions have been made inactive.
        key = "#" + this.timetable.sessions[0].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should be inactive");
        key = "#" + this.timetable.sessions[1].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should be inactive");
    });

    test("Check that the buildTimetable function works correctly", function() {
        let timetable = buildTimetable(sampleTimetable);
        chai.assert.equal(timetable.sessions.length, 3, "Wrong number of sessions");
        chai.assert.equal(timetable.sessions[0].title, "COMP3006 Lecture");
        chai.assert.equal(timetable.sessions[1].title, "COMP3006 Lab 1");
        chai.assert.equal(timetable.sessions[2].title, "COMP3006 Lab 2");
    });

    test("Check that the Display Timetable and Clear Timetable buttons work correctly", function() {
        // Check that the sessions are not currently active.
        let key = "#" + this.sessions[0].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");
        key = "#" + this.sessions[2].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");
        key = "#" + this.sessions[3].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should not be active until it's rendered");

        // Click the display button.
        console.log($("#display"));
        clickElement($("#display"));

        // Check that the sessions are now currently active.
        key = key = "#" + this.sessions[0].getSessionId();
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");
        key = "#" + this.sessions[2].getSessionId();
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");
        key = "#" + this.sessions[3].getSessionId();
        console.log("key: " + key);
        chai.assert.isTrue($(key).hasClass("active"), "This session has been rendered and should active");

        // Click the clear button.
        clickElement($("#clear"));

        // Check that the sessions are not currently active.
        key = "#" + this.sessions[0].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should have been deactivated");
        key = "#" + this.sessions[2].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should have been deactivated");
        key = "#" + this.sessions[3].getSessionId();
        chai.assert.isFalse($(key).hasClass("active"), "This session should have been deactivated");
    });

    test("Check that errors are dealt with correctly", function() {
        // Check that there are no errors displayed.
        chai.assert.equal($("#errors li").length, 0, "Wrong number of errors displayed");

        // Set up a timetable with some errors.
        let timetable = new Timetable();
        timetable.sessions.push(this.sessions[0]);
        timetable.sessions.push(this.sessions[4]);
        timetable.sessions.push(this.sessions[5]);

        // Render the timetable.
        timetable.displayTimetable();

        // Check that the two errors are displayed.
        chai.assert.equal($("#errors li").length, 2, "Wrong number of errors displayed");

        let lis = [];
        $("#errors li").each(function() {
            lis.push($(this).text());
        });
        chai.assert.equal(lis[0], "COMP3016 Lecture clashes with COMP3006 Lecture", "Wrong error message for module clash");
        chai.assert.equal(lis[1], "COMP3016 Lecture is scheduled at an invalid time", "Wrong message for invalid session time");
    });
});