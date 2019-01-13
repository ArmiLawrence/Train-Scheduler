//ISSUE LOG
////  All basic requirements of the train homework are fulfilled. Extra challenges like adding the buttons that perform updates are not working. ////
//2019-01-12 Able to add Delete buttons in the table, however unable to actually perform the deletion. Is the "on.click" broken?
//2019-01-13 Able to add Edit buttons in the table, however, similar to issue from yesterday, it does not really render any activity. It cannot even do an Alert.
//              I believe that althought I am able to make buttons, my buttons aren't able to make the proper calls to the database.

$(document).ready(function (){

    // 1. Initialize Firebase
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCDh51Aa9TWdPFB6-G4pNgWeYA0K4pvF8A",
        authDomain: "uden-bootcamp-train-schedule.firebaseapp.com",
        databaseURL: "https://uden-bootcamp-train-schedule.firebaseio.com",
        projectId: "uden-bootcamp-train-schedule",
        storageBucket: "uden-bootcamp-train-schedule.appspot.com",
        messagingSenderId: "908258763158"
    };   


    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    function clearForm (){
        document.getElementById("train-data").reset();
    };

    // 2. Button for adding Train Schedule
    /// Capture Button Click
    $("#add-train").on("click", function(event) {

        event.preventDefault();

        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrainTime = $("#firstTrainInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        var newTrain = {
            train: trainName,
            trainDestination: destination,
            trainTime: firstTrainTime,
            trainFrequency: frequency
            
        }

        // Uploads train data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.train);
        console.log(newTrain.trainDestination);
        console.log(newTrain.trainTime);
        console.log(newTrain.trainFrequency);

        clearForm();
    });


    //3. Show stuff
    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(childSnapshot, Key) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainDestination;
        var firstTrainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().trainFrequency;
        var id = Key;

        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);
        console.log(id);


        //Add Train time remaining calculations
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        // Current Time
        var currentTime = moment();
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        // Logs everything to console
        //console.log(firstTimeConverted);
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        console.log("DIFFERENCE IN TIME: " + diffTime);
        console.log(tRemainder);
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("MMM DD YYYY, hh:mm a"));


        // CREATE BUTTONS FOR DELETION
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Then dynamically generating buttons for each train in the database
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of update to our record
        a.addClass("deleteTrain");
        // Adding the bootstrap button
        a.addClass("btn btn-primary");
        // Add the key as a data-attribute
        a.attr("data-name", id)
        // Providing the initial button text
        a.text("Delete " + destination);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);

        // CREATE BUTTONS FOR EDIT
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view2").empty();

        // Then dynamically generating buttons for each train in the database
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var b = $("<button>");
        // Adding a class of update to our record
        b.addClass("updateTrain");
        // Adding the bootstrap button
        b.addClass("btn btn-primary");
        // Add the key as a data-attribute
        b.attr("data-name", id)
        // Providing the initial button text
        b.text("Edit " + destination);
        // Adding the button to the buttons-view div
        $("#buttons-view2").append(b);

        //are the buttons doing what they're supposed to do?
        console.log(a);
        console.log(b);


        // Append the newly created table data to the table row
        // Create a new table row element
        var tRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(destination),
                $("<td>").text(firstTrainTime),
                $("<td>").text(frequency),
                $("<td>").text(moment(nextTrain).format("MMM DD YYYY, hh:mm a")),
                $("<td>").text(tMinutesTillTrain),
                $("<td>").append(a),
                $("<td>").append(b)
        );

        // Append the table row to the table body
        $("#train-table > tbody").append(tRow);



        // This function handles events where one button is clicked
        // This is not working.
        $("#buttons-view").on("click", function(event) {

            event.preventDefault();

            alert("Delete!");

            var deleteStuff = database.ref(id)
            deleteStuff.remove();

        });


        // This function handles events where one button is clicked
        // This is not working.
        $("#buttons-view2").on("click", function(event) {

            event.preventDefault();

            alert("Editing " + trainName);

            // YOUR TASK!!!
            // Code in the logic for storing and retrieving the most recent user.
            
            // Retrieve new posts as they are added to our database
            database.ref("train").on("child_added", function(snapshot) {
                var newPost = snapshot.val();
                console.log("Train Name to Edit " + newPost.trainName);
            });
            

        });


    // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

    });

});

