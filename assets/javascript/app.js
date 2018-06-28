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

$("#add-client-btn").on("click", function() {
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

  const newClient = {
    name: name,
    role: role,
    start: start,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
  database.ref().push(newClient);
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
  let clientMonths = moment().diff(moment.unix(start, "X"), "months");
  let clientBilled = clientMonths * rate;

  $("#client-table > tbody").append(
    "<tr><td>" +
      name +
      "</td><td>" +
      role +
      "</td><td>" +
      startPretty +
      "</td><td>" +
      clientMonths +
      "</td><td>" +
      rate +
      "</td><td>" +
      clientBilled +
      "</td></tr>"
  );
});
