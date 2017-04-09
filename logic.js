
// firebase key
var config = {
    apiKey: "AIzaSyCgEkOUsT6Ck_aujFouozi9CrhQ6njuzuU",
    authDomain: "train-homework-be52a.firebaseapp.com",
    databaseURL: "https://train-homework-be52a.firebaseio.com",
    projectId: "train-homework-be52a",
    storageBucket: "train-homework-be52a.appspot.com",
    messagingSenderId: "281355683243"
  };

// initialize firebase
  firebase.initializeApp(config);

  var database = firebase.database();
// when button is clicked info is added to the table and page will not auto-reload
  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

// takes the info user submits
  	var trainName = $("#exampleInputTrain1").val().trim();
  	var destin = $("#exampleInputDestination1").val().trim();
  	var time = $("#exampleTrainTime").val().trim();
  	var tFrequency = $("#frequency").val().trim();

// saves their info
  	var newTrain = {
  		train: trainName,
  		destination: destin,
  		start: time,
  		frequency: tFrequency,
  	};

// sends info to firebase
  	database.ref().push(newTrain);

// log info to the console
  	console.log(newTrain.train);
  	console.log(newTrain.destination);
  	console.log(newTrain.start);
  	console.log(newTrain.frequency);

  	// lets us know train is added
  	alert("Train added");

// clear info from the input boxes
  	$("#exampleInputTrain1").val("");
  	$("#exampleInputDestination1").val("");
  	$("#exampleTrainTime").val("");
  	 $("#frequency").val("");

// does not go to a new page
  	 return false;



  });

// firebase event for adding train, time, destination, frequency to table in HTML

database.ref().on("child_added", function(childSnapshot, prevChildKey){

console.log(childSnapshot.val());

// stores info to the var
	var trainName = childSnapshot.val().train;
	var destin = childSnapshot.val().destination;
	var time = childSnapshot.val().start;
	var tFrequency = childSnapshot.val().frequency;

// train info
	console.log(trainName);
	console.log(destin);
	console.log(time);
	console.log(tFrequency);



     // Pushing back the start time 1 year to ensure it comes before current time
     var trnStartConverted = moment(time, "HH:mm").subtract(1, "years");
     console.log (trnStartConverted);

     // current time
     var currentTime = moment();

     console.log ("Current time: " + moment(currentTime).format("HH:mm"));

     // Difference between the times
     var diffTime = moment().diff(moment(trnStartConverted), "minutes");

     console.log ("Difference in time: " + moment(diffTime).add(1, "years"));


     // Remainder
     var tRemainder = diffTime % tFrequency;

     console.log ("Number of minutes remaining " + tRemainder);

     // minutes till next train
     var tMinutesTillTrain = tFrequency - tRemainder;
     console.log ("Minutes till next train: " + tMinutesTillTrain);

     // Next train arrival time
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log ("Arrival time: " + moment(nextTrain).format("HH:mm"));

     // Time of the next train
     var time = moment(nextTrain).format("HH:mm");
     

     //Add each train's data onto the table
    
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destin + "</td><td>" + tFrequency + "</td><td>" + time + "</td><td>" + tMinutesTillTrain + "</td></tr>");
 });


























