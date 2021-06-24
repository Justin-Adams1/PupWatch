// const { User } = require('../models/user');
// const { Image } = require('../models/image');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const config = require('config')

const TWILIO_ACCOUNT_SID = config.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = config.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = config.TWILIO_NUMBER;

// exports.handler = function (context, event, callback) {
//     // The pre-initialized Twilio Client is available from the `context` object
//     const twilioClient = context.getTwilioClient();

//     // Query parameters or values sent in a POST body can be accessed from `event`
//     const from = event.From || TWILIO_NUMBER;
//     const to = event.To || userNumber.current;
//     const body = event.Body || userMessage.current;

//     // Use `messages.create` to generate a message. Be sure to chain with `then`
//     // and `catch` to properly handle the promise and call `callback` _after_ the
//     // message is sent successfully!
//     twilioClient.messages
//       .create({ body, to, from })
//       .then((message) => {
//         console.log('SMS successfully sent');
//         console.log(message.sid);
//         // Make sure to only call `callback` once everything is finished, and to pass
//         // null as the first parameter to signal successful execution.
//         return callback(null, `Success! Message SID: ${message.sid}`);
//       })
//       .catch((error) => {
//         console.error(error);
//         return callback(error);
//       });
//   };

  //post a new user
  router.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});


module.exports = router;