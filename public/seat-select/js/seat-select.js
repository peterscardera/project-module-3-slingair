const dropDownSelected = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById("confirm-button")

let selection = '';


const renderSeats = (arrayOfObj) => {
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')

            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
            const realSeat = arrayOfObj.find(seat => seat.id === seatNumber);
            //console.log(realSeat)
            // seat.innerHTML = realSeat.isAvailable ? seatAvailable : seatOccupied;
            //if true, then get Seat Available else seat occupied.
            if (realSeat.isAvailable) {
                seat.innerHTML = seatAvailable
            } else {
                seat.innerHTML = seatOccupied
            }
            row.appendChild(seat);
        }
    }
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}

//---------------------------FETCH THE LIST OF FLIGHTS----------------------------- 

fetch("/flightList", {
    method: "GET",
    headers: {
        "accept": "application/json", // 
        "content-type": "application/json" //what this function is send to u
    }
}).then(item => {
    return item.json()
}).then(list => {
    //console.log(list.flights) //list of flight numbers sent back from server

    let section = document.getElementById("flight"); //the section in html
    section.addEventListener("change", nextFunction) //to pass on the event


    list.forEach(item => {
       let option =  document.createElement("option");
        option.id = `${item}` //each flight number
        option.innerHTML = `${item}`
        section.appendChild(option)
        
    })

})
//-------------------------
function nextFunction(event) {
    toggleFormContent(event)
}

//-----------------------------FETCH FOR ON SELECTION --------------------------
const toggleFormContent = (event) => {

    const flightInput = event.target.value
    
        fetch(`/seat-select/${flightInput}`, { //passing this from above
            method: "GET",
            headers: {
                "accept": "application/json", // 
                "content-type": "application/json" //what this function is send to u
            }
        }).then(serverRes => {
         return serverRes.json() // no on one line so its not an implied return
            
        })
        .then( arrayOfObj => {
            renderSeats(arrayOfObj)
         })
    
}
// ---------------------------------------------------ON CONFIRM ------------------------------------------------------------------------
const handleConfirmSeat = (event) => {
   event.preventDefault();

//let flightNo = document.getElementById("flight");
let givenName = document.getElementById("givenName");
let surname = document.getElementById("surname");
let email = document.getElementById("email");
let seatChosen = document.getElementById("seat-number").innerHTML;
//Below im removing the "( )" between the seat number
let slicedSeat = seatChosen.slice(1,3)
console.log(slicedSeat)
//let time = new Date();



const data = {

    givenName: givenName.value,
    surname: surname.value,
    email: email.value,
    seat: slicedSeat,
    flight : dropDownSelected.value,
    //time: time.getTime()

}




   fetch("/sendData", { //passing this from above
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "accept": "application/json", // 
        "content-type": "application/json" //what this function is send to u
    }
}).then(data => {
   return (data.json())
}).then (response => {
   //not doing anything with the response yet *****
   window.location.href = "/seat-select/confirmed.html"
  
})



}
// ------------------------------------------------------------------------------------------------

