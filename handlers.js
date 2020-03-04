
//importing the async functions for flight list and available seat data
const { flights,listOfFlights } = require("./test-data/flightSeating")
//---------------------------------------------------------------------
const { reservations} = require("./test-data/reservations")

let userReservations = {

}
//--------handler to get the object that contains the key which has an array of objects as its value----//

const flightLocator = async (req, res) => {
let receivedFlight = req.params.flight; //we only get here if it passed the SA requirement on FE

let eachFlight = await listOfFlights(receivedFlight)
//console.log(eachFlight)


let flightKey = Object.keys(eachFlight) //loop through all the keys but in this case we only have 1
//console.log(flightsInData) //our data we have S231


let flightObject = eachFlight[flightKey] //object key is {SA072: [ { id: '1A', isAvailable: false } /the flight numbet
//console.log(flightObject)

res.send(flightObject)

}



//-------Handler for info submitted----------//


const submittedHandler = (req, res) => {
    let receivedData = req.body
    //console.log(receivedData)
    let time = new Date().getTime() //to assign an id 
    res.cookie("id", time) //key is id and value is time
    userReservations[time] = receivedData //creating the key which is assigned to time. But empty object declared above
    //console.log(userReservations,"***")
    //console.log(time.givenName)
    /*
    {
  '1583252900154': {
    givenName: 'Peter',
    surname: 'Scardera',
    email: 'peterscardera@gmail.com',
    seatChosen: '(1F)',
    flightNo: 'SA231',
    time: 1583252900130
  }
}*/
    res.send(receivedData)
}

const cookieHandler = (req, res) => {
   let userId =  req.cookies.id // we go get the cookie id (req.cookies gives us all the cookies)
//userId is the time stamp ID
    res.send(userReservations[userId]) //time is a variable so we need to use bracket notation. 
}


// HANDLER TO PROVIDE LIST OF FLIGHTS

const flightListGetter = async (req, res) => { //turned into an asyn

let flightsObject = await flights()
let flightArray = flightsObject.flights
console.log(flightArray)
res.send(flightArray)


}




module.exports = {flightLocator, submittedHandler, cookieHandler,flightListGetter}