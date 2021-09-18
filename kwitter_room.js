firebaseConfig = {
      apiKey: "AIzaSyDkOmEdnCFMMLfmRPu06XudaKKqFzbvLQA",
      authDomain: "kwitter-e7967.firebaseapp.com",
      databaseURL: "https://kwitter-e7967-default-rtdb.firebaseio.com",
      projectId: "kwitter-e7967",
      storageBucket: "kwitter-e7967.appspot.com",
      messagingSenderId: "619956693255",
      appId: "1:619956693255:web:0157056fb23bbbb8b9fda2",
      measurementId: "G-KJYTYBXRVC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase

username = localStorage.getItem("username_key");
document.getElementById("username").innerHTML = "welcome " + username + "!"

function addRoom() {
      var roomnm = document.getElementById("adrom").value;
      localStorage.setItem("roomname_key", roomnm);
      firebase.database().ref("/").child(roomnm).update({
            purpose: "adding_room"
      });
      window.location = "kwitter_page.html"

}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log(Room_names);
                  row = "<div id='" + Room_names + "' onclick='redirect(this.id)' class='room_name'>" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();

function redirect(currentRoom){
      console.log(currentRoom);
      localStorage.setItem("roomname_key",currentRoom);
      window.location="kwitter_page.html";
}
function logout(){
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location="index.html";
}