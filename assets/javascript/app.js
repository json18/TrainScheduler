var config = {
  apiKey: "AIzaSyCqiJsVN5TnsTDgpMGy2u0AjTolG0bjyt8",
  authDomain: "train-scheduler-7da3a.firebaseapp.com",
  databaseURL: "https://train-scheduler-7da3a.firebaseio.com",
  projectId: "train-scheduler-7da3a",
  storageBucket: "train-scheduler-7da3a.appspot.com",
  messagingSenderId: "468168857196"
};
firebase.initializeApp(config);

  var database = firebase.database();

$("#submitBtn").on("click", function(event) {
      var trainName = $("#inputTrainName").val().trim();
      var destination = $("#inputDestination").val().trim();
      var frequency = $("#inputFrequency").val().trim();
      console.log("trainName = ", trainName);
      console.log("destination = ", destination);
      console.log("frequency = ", frequency);

      var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.frequency);

      $("#inputTrainName").val("");
      $("#inputDestination").val("");
      $("#inputFrequency").val("");


    });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

      console.log(childSnapshot.val());
    
      // Store everything into a variable.
      var trainName = childSnapshot.val().name;
      var  destination= childSnapshot.val().destination;
      var tFrequency =  childSnapshot.val().frequency;

      var nextArrival; var minutesAway;
    
      
      

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(currentTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(firstTimeConverted, "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
  
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      
      $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
      tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});