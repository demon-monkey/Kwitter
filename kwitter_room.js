var firebaseConfig = {
      apiKey: "AIzaSyAGtV_UY4g00czeSadBM8kSzAchWfhMCo0",
      authDomain: "kwitter-f9a16.firebaseapp.com",
      databaseURL: "https://kwitter-f9a16-default-rtdb.firebaseio.com",
      projectId: "kwitter-f9a16",
      storageBucket: "kwitter-f9a16.appspot.com",
      messagingSenderId: "418168153729",
      appId: "1:418168153729:web:a1d81c88c509c1ddc00f80",
      measurementId: "G-CQW3B6GN7N"
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