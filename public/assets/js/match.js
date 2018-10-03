
$(document).ready(function() {

    // var loginid = readCookie("userName")

    // function readCookie(loginid) {
    //     var nameEQ = loginid + "=";
    //     var ca = document.cookie.split(";");
    //     for (var i = 0; i < ca.length; i++) {
    //       var c = ca[i];
    //       while (c.charAt(0) === " ") c = c.substring(1, c.length);
    //       if (c.indexOf(nameEQ) === 0) {
    //         return c.substring(nameEQ.length, c.length);
    //       }
    //     }
    //     return null;
    //   }

    // $("#userName").val() = loginid

    $("#submitTutorBtn").on("click", function(event) {
        event.preventDefault();

        var responses = [
            $("#q1").val(),
            $("#q2").val(),
            $("#q3").val(),
            $("#q4").val(),
            $("#q5").val(),
            $("#q6").val(),
            $("#q7").val(),
            $("#q8").val(),
            $("#q9").val(),
            $("#q10").val()
        ]

        var userData = {
            user_name: $("#name").val(),
            login_id: $("#userName").val(),
            responses: responses.toString(),
            is_student: 0
        };

        $.post("/api/tutor", userData, function(data) {
        }).then(function() {
            console.log(userData);

            console.log("survey has been submitted")
    
            window.location.href = "/tutorSubmitted"
        });
    });

// ********* Submit Tutor **********

$("#submitBtn").on("click", function(event) {
    event.preventDefault();

    var responses = [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
    ]

    document.cookie = "userName=" + $("#userName").val() + ";";

    console.log(document.cookie);

    var userData = {
        user_name: $("#name").val(),
        login_id: $("#userName").val(),
        responses: responses.toString(),
        is_student: 1
    };

    $.post("/api/student", userData, function(data) {
    }).then(function() {
        console.log(userData);

        console.log("survey has been submitted")

        window.location.href = "/match"
    });
});

$("#getStarted").on("click", function(event) {
    event.preventDefault();
    window.location.href = "http://localhost:3000/survey";
});

// ********* Matching Logic
    function getTutors() {

    }

    function matchTutor(studentResponses) {

        $.get("/api/students/false", function(data) {

        }).then(function(dbTutors) {
            var tutors = [];

            tutors.forEach(element => {
                tutors = dbTutors.responses;
            });

            console.log(tutors);

            var match = 0;
            var currentDifference = 0;
            var previousDifference = 0;
        
            for(let i = 0; i < tutors.length; i++){
              for(let j=0; j < studentResponses.length; j++){
                currentDifference += (Math.abs(parseInt(tutors[i].responses[j]) - parseInt(studentResponses[j])));
              }
        
              if (currentDifference < previousDifference || previousDifference === 0) {
                previousDifference = currentDifference;
                currentDifference = 0;
                match = i;
              }
            }
                console.log(tutors[match])
        });

    }


});


