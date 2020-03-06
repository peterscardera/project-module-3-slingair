
let flightNum = document.getElementById("flight");
let name = document.getElementById("name");
let seat = document.getElementById("seat");
let email = document.getElementById("email");



//cookies fetch
fetch("/getFlightInfo", {
    method: "GET",
    credentials: "include", //tells the browser to include the cookies if the server url is anything at all
    headers: {
        "accept": "application/json", // 
        "content-type": "application/json" 
    }
}).then(res => {
    return (res.json())
}).then(item => {
    //console.log(item, "*****") //returns the  item = { }
   name.innerHTML = item.givenName
   flightNum.innerHTML = item.flight
   seat.innerHTML = item.seat
   email.innerHTML = item.email
})




