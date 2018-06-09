var stompClient = null;

function setConnected(connected) {
    document.getElementById("connect").disabled = connected;
    document.getElementById("disconnect").disabled = !connected;
    document.getElementById("conversationDiv").style.visibility = connected ? "visible" : "hidden";
    document.getElementById("response").innerHTML = "";
}

function connect() {
    var socket = new SockJS("http://localhost:8080/stomp?token=" + sessionStorage.getItem("token"));
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log("Connected: " + frame);
        stompClient.subscribe("/user/output", function(message){
            var text = JSON.parse(message.body);
            showGreeting(text.message.message, text.message.sentTime);
        });
    });
}

function disconnect() {
    stompClient.disconnect();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    var message = document.getElementById("message").value;
    var name = document.getElementById("name").value;
    stompClient.send("/app/input/" + name, {}, JSON.stringify({"message":{"message": message}}));
}

function showGreeting(message, time) {
    var response = document.getElementById("response");
    var p = document.createElement("p");
    p.style.wordWrap = "break-word";
    p.appendChild(document.createTextNode(message + " / " + time));
    response.appendChild(p);
}