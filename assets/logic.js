$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBra97LErfBJSkZpzHvyPg_1Qy6S-ZpDD0",
    authDomain: "train-tracker-10036.firebaseapp.com",
    databaseURL: "https://train-tracker-10036.firebaseio.com",
    projectId: "train-tracker-10036",
    storageBucket: "",
    messagingSenderId: "371128132956"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    const submit = $('#submit');

    function clearInputs() {
        $(".form-control").val("");
    }

    //functionality on clicking the submit button
    submit.on('click', function () {
        event.preventDefault();

        let trainName = $("#name").val().trim();
        let trainDestination = $("#destination").val().trim();
        let startTime = $("#startTime").val().trim();
        let trainFrequency = $("#frequency").val().trim();

        database.ref().push({
            Name: trainName,
            Destination: trainDestination,
            StartTime: startTime,
            Frequency: trainFrequency,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });

        database.ref().on("child_added", function (childSnapshot) {
            console.log(childSnapshot.val().trainName);
            console.log(childSnapshot.val().startTime);
            
        });    

        var newRow = $("<tr>").addClass("train-row");
        var colName = $("<td>").text(trainName);
        var colDest = $("<td>").text(trainDestination);
        var colFrequency = $("<td>").text(trainFrequency);
        var colNextArrival = $("<td>");
        var colMinsAway = $("<td>").text();

        $("#train-table").append(newRow).append(colName, colDest, colFrequency, colNextArrival, colMinsAway);

        clearInputs();

    });


})