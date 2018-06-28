// Initialize Firebase
var config = {
  apiKey: "AIzaSyAAhTjtnp-UvBAum4mEzgu7gI0Ayg8KMac",
  authDomain: "time-sheet-be050.firebaseapp.com",
  databaseURL: "https://time-sheet-be050.firebaseio.com",
  projectId: "time-sheet-be050",
  storageBucket: "time-sheet-be050.appspot.com",
  messagingSenderId: "459994441579"
};
firebase.initializeApp(config);
const database = firebase.database();

// let name = "";
// let role = "";
// let start = "";
// let rate = 0;

$("#add-employee-btn").on("click", function() {
  event.preventDefault();

  let name = $("#name-input")
    .val()
    .trim();
  let role = $("#role-input")
    .val()
    .trim();
  let start = moment(
    $("#start-input")
      .val()
      .trim(),
    "DD/MM/YY"
  ).format("X");
  let rate = $("#rate-input")
    .val()
    .trim();

  const newEmp = {
    name: name,
    role: role,
    start: start,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  database.ref().push(newEmp);
  $("#name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  let name = childSnapshot.val().name;
  let role = childSnapshot.val().role;
  let start = childSnapshot.val().start;
  let rate = childSnapshot.val().rate;

  let startPretty = moment.unix(start).format("MM/DD/YY");
  let empMonths = moment().diff(moment.unix(start, "X"), "months");
  let empBilled = empMonths * rate;

  $("#employee-table > tbody").append(
    "<tr><td>" +
      name +
      "</td><td>" +
      role +
      "</td><td>" +
      startPretty +
      "</td><td>" +
      empMonths +
      "</td><td>" +
      rate +
      "</td><td>" +
      empBilled +
      "</td></tr>"
  );
});
