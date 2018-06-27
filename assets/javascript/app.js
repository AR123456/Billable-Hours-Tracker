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

$("#add-employee-btn").on("click", function() {
  alert("been clicked ");
});
