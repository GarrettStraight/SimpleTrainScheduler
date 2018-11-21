// Globals
var config = {
	apiKey: "AIzaSyBBoyZvc0BR5QIoIoBGD7wepn5wHsZHiNs",
	authDomain: "cool-f0a13.firebaseapp.com",
	databaseURL: "https://cool-f0a13.firebaseio.com",
	projectId: "cool-f0a13",
	storageBucket: "cool-f0a13.appspot.com",
	messagingSenderId: "633106733016"
};

firebase.initializeApp(config);
// Create a variable to reference the database.
var database = firebase.database();


var currentTime = moment().format("hh:mm");



console.log(currentTime)



var name = "";
var destination = "";
var newTrainTime = "";
var arrival = "";
var minutesAway = "";
var frequency = 0;
var next = 0;



$("#submit").on("click", function(event) {
	event.preventDefault();
      // Grabbed values from text boxes
      name = $("#nameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      newTrainTime = $("#startTimeInput").val().trim();
      frequency = $("#frequencyInput").val().trim();
      // frequency = moment(format("mm:ss"));
      var frequencyFormatted = moment(frequency).format("mm:ss");
      
      database.ref().push({
      	name: name,
      	destination: destination,
      	newTrainTime: newTrainTime,
      	minutesAway: minutesAway,
      	frequency: frequency

      });
      $("#nameInput").empty();
      $("#destinationInput").empty();
      $("#startTimeInput").empty();
      $("#frequencyInput").empty();
      return frequency;
  });


database.ref().on("child_added", function(snapshot) {
	var sv = snapshot.val();
      // var p = snapshot.val().name;
      // var svArr = Object.keys(sv);
      // var lastIndex = svArr.length - 1;
      // var lastKey = svArr[lastIndex];
      // var lastObj = sv[lastKey]
      
      
      theFutureTime = moment().hour('0').minute(sv.frequency).format("HH:mm");

      console.log("The Future Var: " + theFutureTime);  // prints 16:44
      
      
      var newName = $("<div class='col-lg-9'>" + sv.name +  "</div>");
      var newDest = $("<div class='col-lg-9'>" + sv.destination + "</div>");
      var newTime = $("<div class='col-lg-9'>" + sv.newTrainTime + "</div>");
      var newMinutes = $("<div class='col-lg-9'>" + sv.minutesAway + "</div>");
      var newFreq = $("<div class='col-lg-9'>" + sv.frequency + "</div>");



      // Change the HTML to reflect
      $("#trainName").append(newName);
      $("#trainDestination").append(newDest);
      $("#trainFrequency").append(newFreq);
      $("#trainMinutesAway").append(newMinutes);

      var next = currentTime + parseInt(theFutureTime);

      console.log(next);
      console.log("The Current Time is: " + currentTime);
     // next = moment().hour('0').minute(sv.frequency).format("HH:mm");
     console.log(moment(next).format("hh:mm"));
     

     var diffTime = moment(currentTime).diff(moment(theFutureTime), "minutes");
     console.log("DIFFERENCE IN TIME: " + moment(diffTime).format("hh:ss"));

     

 }, function(errorObject) {
 	console.log("Errors handled: " + errorObject.code);
 });
//