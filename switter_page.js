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
  
user = localStorage.getItem("username")
room = localStorage.getItem("roomname")

function send() {
   var msg = document.getElementById("msg").value;
   firebase.database().ref(room).push({
         name: user,
         message: msg,
         like: 0,
         

   })

   document.getElementById("msg").value = "";
}

      function getData() {
            firebase.database().ref("/"+room).on('value', 
      function(snapshot) {
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function(childSnapshot) { 
            childKey  = childSnapshot.key; 
            childData = childSnapshot.val(); 
            if (childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
        var name = message_data["name"];
        var message = message_data["message"];
        var like = message_data["like"];
        var dislike = message_data["dislike"];
        var nwt = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>"
        var mwt = "<h4 class='message_h4'>" + message + "</h4>"
        var lwt = "<button class='btn btn-warning' id="+ firebase_message_id +" value=" + like + " onclick='updateLike(this.id)'>";
        var swt = "<span class='glyphicon glyphicon-thumbs-up'>Likes: "+ like +"</span></button><hr>";
        

        var row = nwt + mwt + lwt + swt;
        document.getElementById("output").innerHTML += row;

      } });  }); 
      }
      
      getData();

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room).child(message_id).update({
            like: updated_likes
      })

}



      

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("roomname");
      window.location.replace("index.html")
    }