
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAyzrfDntqt02NXmyOv0b9tiB2AGYPQ9Ho",
    authDomain: "doctor-patient-pay.firebaseapp.com",
    databaseURL: "https://doctor-patient-pay-default-rtdb.firebaseio.com",
    projectId: "doctor-patient-pay",
    storageBucket: "doctor-patient-pay.appspot.com",
    messagingSenderId: "12792251836",
    appId: "1:12792251836:web:f8930a27653fb5ff9657b9",
    measurementId: "G-8MP57GYKMS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  var username = localStorage.getItem("username")
  document.getElementById("welcome").innerHTML = "Welcome " + username + "!";


  
function addRoom() {
   var roomname = document.getElementById("room_name").value;
   firebase.database().ref("/").child(roomname).update({
     purpose: "adding room name"
   })

   localStorage.setItem("roomname", roomname);
   window.location = "switter_page.html"
}

function getData() {
  firebase.database().ref("/").on('value', 
  function(snapshot) 
  {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(
    function(childSnapshot) {
    childKey  = childSnapshot.key;
    Room_names = childKey;
    console.log("Room names are:" + Room_names);
    var row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
    document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(name) {
   console.log(name)
   localStorage.setItem("roomname", name)
   window.location = "switter_page.html"
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("roomname");
  window.location = "index.html"
}
