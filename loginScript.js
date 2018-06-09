function login() {
    fetch("http://localhost:8080/users/login",
        {method: "POST",
        headers: {"Accept": "application/json","Content-Type": "application/json"},
        body: JSON.stringify({"user": {"login": document.getElementById("login").value,"password": document.getElementById("password").value}})})
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            sessionStorage.setItem("token", json.user.token);
            sessionStorage.setItem("username", json.user.username);
            sessionStorage.setItem("email", json.user.email);
            console.log("Token: " + sessionStorage.getItem("token"));
            console.log(sessionStorage.getItem("username"));
            console.log(sessionStorage.getItem("email"));
            window.location.replace("/ws.html");
        });
}