document.getElementById("welcome").innerHTML = "Welcome " + localStorage.getItem("Username");

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

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(Room_names);
                  row='<div class="room_name" id='+Room_names+' onclick="redirectToRoomName(this.id)">'+Room_names+'</div> <hr>';
                  document.getElementById("output").innerHTML+=row;
                  //Start code


                  //End code
            });
      });
}
getData();

function Add(){
      var room= document.getElementById("room_name").value;
      firebase.database().ref("/").child(room).update(
            {
                 purpose:room,
            }
      )
      localStorage.setItem("room_name",room);
      window.location="kwitter_room.html";
}

function redirectToRoomName(id){
      window.location="kwitter_page.html";
}

function LogOut(){
      localStorage.removeItem("Username");
      window.location="index.html";
}