
const request = require('request-promise');

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

module.exports = { flights,listOfFlights };

