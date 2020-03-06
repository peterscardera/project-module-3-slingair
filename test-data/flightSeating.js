
const request = require('request-promise');


//---------ASYNC function awaiting requesting from external Db the list of flights-----
const flights = async () =>  {
    
    try {
        let initialData = await request ( {
            uri: "https://journeyedu.herokuapp.com/slingair/flights",
            headers: {
                "Accept":"application/json"
            }
        })
        let parsedData = JSON.parse(initialData)
        return parsedData
        //console.log(parsedData)
    }catch(err) {
        return (err)
    }

}

//-----ASYNC Functioon that get the Object that has a key and a value which is an array of objects----------------------------------

const listOfFlights = async (selected) =>  {
    
    try {
        let initialData = await request ( {
            uri: `https://journeyedu.herokuapp.com/slingair/flights/${selected}`,
            headers: {
                "Accept":"application/json"
            }
        })
        let parsedData = JSON.parse(initialData)
        return parsedData
        //console.log(parsedData)
    }catch(err) {
        return (err)
    }
}

//--------ASYNC function that sends the data to the DB
const reservationer = async (receivedData) => {

    try {
        let initialData = await request ( {
            uri: "https://journeyedu.herokuapp.com/slingair/users",
            headers: {
                "content":"application/json"
            },
            json: true,
            method: "POST",
            body: receivedData
        })
        return initialData
    }catch(err) {
        return (err)
    }

}





module.exports = { flights,listOfFlights,reservationer };

