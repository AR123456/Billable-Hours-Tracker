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
let name = "";
let role = "";
let start = "";
let rate = 0;

$("#add-employee-btn").on("click", function() {
  event.preventDefault();

  name = $("#name-input")
    .val()
    .trim();
  role = $("#role-input")
    .val()
    .trim();
  start = $("#start-input")
    .val()
    .trim();
  rate = $("#rate-input")
    .val()
    .trim();

  database.ref().push({
    name: name,
    role: role,
    start: start,
    rate: rate,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});
