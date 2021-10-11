const firebaseConfig = {
    apiKey: "AIzaSyAxs9kCeuqelmrCKCFFpifES_YGOdB-NTs",
    authDomain: "kwitter-e266f.firebaseapp.com",
    databaseURL: "https://kwitter-e266f-default-rtdb.firebaseio.com",
    projectId: "kwitter-e266f",
    storageBucket: "kwitter-e266f.appspot.com",
    messagingSenderId: "1021188832443",
    appId: "1:1021188832443:web:3637867dfc87528d57fd9e",
    measurementId: "G-04P0NW4WK6"
};
firebase.initializeApp(firebaseConfig);



function logout() {
    localStorage.removeItem("Username");
    window.location = "index.html";
}

var username = localStorage.getItem("Username");

var roomname =  localStorage.getItem("room_name");

function send(){
    firebase.database().ref(roomname).push({
        name:username,
        message:document.getElementById("msg").value,
        like:0
    });
    document.getElementById("msg").value="";
}

function getData() { firebase.database().ref(roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    console.log(firebase_message_id);
 console.log(message_data);
 name = message_data['name'];
 message = message_data['message'];
    like = message_data['like'];
    name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

   row = name_with_tag + message_with_tag +like_button + span_with_tag;      
   document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id){
    firebase.database().ref(roomname).child(message_id).update({ like : Number(document.getElementById(message_id).value)+1 }); 
}