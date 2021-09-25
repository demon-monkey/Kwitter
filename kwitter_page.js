var firebaseConfig = {
      apiKey: "AIzaSyAktErHevfkrAilKNtvkJFEJuyfWfYSw_g",
      authDomain: "kwitter-38c09.firebaseapp.com",
      databaseURL: "https://kwitter-38c09-default-rtdb.firebaseio.com",
      projectId: "kwitter-38c09",
      storageBucket: "kwitter-38c09.appspot.com",
      messagingSenderId: "38500238055",
      appId: "1:38500238055:web:5f921e86ac9d9f99755842",
      measurementId: "G-ERWKZSRL4F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username_key");
room_name = localStorage.getItem("roomname_key");

document.getElementById("room").innerHTML = "Room: " + room_name;

function send() {
      Message_sent = document.getElementById("Message").value;
      firebase.database().ref(room_name).push({
            username: user_name,
            msg: Message_sent,
            like: 0
      });
      document.getElementById("Message").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code

                        //End code
                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location = "index.html";
}