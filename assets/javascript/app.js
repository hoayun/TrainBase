
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB-qDuBhn_ZRhdu5iFIYg-Ut8SyTeoVHvM",
    authDomain: "trainbase-324ee.firebaseapp.com",
    databaseURL: "https://trainbase-324ee.firebaseio.com",
    projectId: "trainbase-324ee",
    storageBucket: "trainbase-324ee.appspot.com",
    messagingSenderId: "652374456931"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var role = "";
  var start = "";
  var rate = "";
  // First Time (pushed back 1 year to make sure it comes before current time)

$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

    name = $("#employee-name-input").val().trim();
    role = $("#role-input").val().trim();
    start = $("#start-input").val().trim();
    rate = $("#rate-input").val().trim();
    // First Time (pushed back 1 year to make sure it comes before current time)
    
   


  
    database.ref().push({
      train: name,
      destination: role,
      first: start,
      frequency: rate,
    });
});

database.ref().on("child_added", function(snapshot) {


    var sv = snapshot.val();
  
    // Log the value of the various properties
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.first);
    console.log(sv.frequency);

    //var currentTime = moment();

    var freq = parseInt(sv.frequency)

    var firstTimeConverted = moment(sv.first, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
   // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var traintime = moment(firstTimeConverted).format("HH:mm");
    var tconverted = moment(traintime, "HH:mm").subtract(1,"years"); 
    var diffTime = moment().diff(moment(tconverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    
    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    let tRow = $("<tr>");
  
    let nameID = $("<td>").text(sv.train);
    let roleID = $("<td>").text(sv.destination);
    let startID = $("<td>").text(sv.frequency);
    let monthsID = $("<td>").text(moment(nextTrain).format("hh:mm a"));
    let rateID = $("<td>").text(tMinutesTillTrain + "minsaway");
    
  
    // Append the td elements to the new table row
    tRow.append(nameID, roleID, startID, monthsID, rateID);
    // Append the table row to the tbody element
    $(".table").append(tRow);
  
    // If any errors are experienced, log them to console.
    // Create Error Handling
    }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  
  });



