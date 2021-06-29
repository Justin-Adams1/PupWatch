// const { User } = require('../models/user');
// const { Image } = require('../models/image');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
const MESSAGING_SERVICE_SID = process.env.MESSAGING_SERVICE_SID;



  //send twilio message from form
  router.post('/', (req, res) => {
    console.log("twilio",req.body);

    console.log("to", req.body.to);
    console.log("from", req.body.from);

    const client = require('twilio')(accountSid, authToken); 
     
    client.messages 
          .create({ 
             body: "Hello from PupWatch! \n\nA nearby user is requesting more boarding information. If your interested, you can reach them at: \n\n" 
                    + req.body.from
                    + "\n-------\n"
                    + req.body.body, 
             from: TWILIO_NUMBER,       
             to: req.body.to
           })
           .then(message => {
             console.log(message)
             res.send(message)
           });
});

module.exports = router;