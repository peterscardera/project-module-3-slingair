'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flightLocator, submittedHandler, cookieHandler,flightListGetter } = require("./handlers")
const cookie = require('cookie-parser')


const PORT = process.env.PORT || 8000;

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .use(cookie()) //calling the cookie parser
    
    // endpoints

     .get("/seat-select/:flight", flightLocator) //once they click a selection
     .post("/sendData", submittedHandler)//which will also create cookie id and value
     .get("/getFlightInfo", cookieHandler) //cookies come form the headers
     .get("/flightList", flightListGetter) //answers the fetch to fireoff the handler that send back th elist of flights
     
    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));