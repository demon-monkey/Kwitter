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
                        console.log(firebase_message_id);
                        console.log(message_data);
                        sender=message_data['username'];
                        msg=message_data['msg'];
                        like=message_data['like'];
                        nametag="<h4>"+sender+"<img class='user_tick' src='tick.png'></h4>"
                        message_tag="<h4 class='message_h4'>"+msg+"</h4>"
                        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
                        row=nametag+message_tag+like_button+span_with_tag

                        document.getElementById("output").innerHTML+=row
                  }
            });
      });
}
getData();

function updateLike(message_id){
      likes=document.getElementById(message_id).value;
      new_likes=Number(likes)+1;

firebase.database().ref(room_name).child(message_id).update({
      like:new_likes
});
}

function logout() {
      localStorage.removeItem("username_key");
      localStorage.removeItem("roomname_key");
      window.location = "index.html";
}