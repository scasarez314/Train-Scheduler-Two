//Firebase key?
var firebaseConfig = {
    apiKey: "AIzaSyA65TxtdGwpxlN9Swc3ExOuwZeHOPIKgnw",
    authDomain: "trian-scheduler.firebaseapp.com",
    databaseURL: "https://trian-scheduler.firebaseio.com",
    projectId: "trian-scheduler",
    storageBucket: "",
    messagingSenderId: "327724163579",
    appId: "1:327724163579:web:773ddaaa40c2577e"
};


//Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference firebase database
var database = firebase.database();

//Inital Variables 
var trainName = "";
var trainDestination = "";
var trainFTT = "";
var trainFrequency = "";

database.ref().on("value", function (snapshot) {
    // console.log(snapshot.val());

})

//onClick for the train Submit
$("#add-Train").on("click", function (event) {
    //Prevent the page from refreshing
    event.preventDefault();

    //Get inputs
    trainName = $("#train-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainFTT = $("#ftt-input").val().trim();
    trainFrequency = $("#frequency-input").val().trim();
    //Clear the Inputs 
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#ftt-input").val("");
    $("#frequency-input").val("");
    //Console.log the value to check if they are being captured
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainFTT);
    // console.log(trainFrequency);

    //Change what is saved in firebase
    database.ref().push({
        train: trainName,
        destination: trainDestination,
        firsttraintime: trainFTT,
        frequency: trainFrequency


    });
});

//Firebase event
database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    //Make everything a var
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainFTT = childSnapshot.val().firsttraintime;
    var trainFrequency = parseInt(childSnapshot.val().frequency);
    //Check to see if there is a call back
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(trainFTT);
    // console.log(trainFrequency);


    //Moment.js stuff

    //Var for the current time
    var now = moment().format('LT');
    console.log(now + " This is the current time.")

    //Format time start time
    var trainFTTValue = moment(trainFTT, "hh:mm").format("hh:mm a");
    console.log(trainFTTValue + " This should be the formatted time")

    //Next arrival 
    var minsAway = moment().diff(moment(trainFrequency, "X"), "minutes");
    console.log(minsAway);

    var timeInbetween = minsAway % trainFrequency;

    var minsDiff = trainFrequency - timeInbetween;
    console.log(minsDiff);


    //Format time back into HH:mm
    var timeTheTrainWillArrive = moment().add(minsDiff, "minutes").format("hh:mm a");
    console.log(timeTheTrainWillArrive);



    //Make a new row and Append it to the tBody
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFTTValue),
        $("<td>").text(trainFrequency),
        $("<td>").text(timeTheTrainWillArrive),
        $("<td>").text(minsDiff)


    );
    $("#train-table").append(newRow);

});
