 const { User } = require('../models/user');
 const { Image } = require('../models/image');
 const { validate } = require('../models/user')
 const bcrypt = require('bcrypt');
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const auth = require('../middleware/auth');
 const twilio = require('twilio');
 const config = require('config')

 const accountSid = config.TWILIO_ACCOUNT_SID;
 const authToken = config.TWILIO_AUTH_TOKEN;
 const twilNumber = config.TWILIO_NUMBER;

//  const onClick = (user) => {
//      var twilio = require('twilio');
//      var client = new twilio(accountSid, authToken);
//      client.messages
//      .create({
//        to: "+"+user.number,
//        from: twilNumber,
//        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      })
//      .then(message => console.log(message.sid));
//    };


 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, './uploads/');
     },
     filename: function (req, file, cb) {
         cb(null, Date.now() + file.originalname);
     }
 });

 const fileFilter = (req, file, cb) => {
     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
         cb(null, true);
     } else {
         cb(null,false);
     }
 }

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//post a new user
router.post('/', async (req, res) => {
    try{
        const { error } = validate(req.body)
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send(`User already registered.`);

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            pupList: [""],
            pendingPups: [""],
            pup: {
                pupImg: "",
                name: "",
                likes: "",
                dislikes: "",
                aboutMe: "",
                allergyInfo: ""
            },
            address: req.body.address,
            boardingAtmosphere: "",
            boardingDescription: "",
            boardingPicture1: "",
            boardingPicture2: "",
            aboutMe: "",
            ownerImg: "",
            geoAddress: req.body.geoAddress,
        });

        await user.save();

        const token = user.generateAuthToken();

        
        return res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send({ token: token});
}catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

//post a Pup to a User
router.put('/:id/changeall/', auth, async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { 
                pup: {  name: req.body.pupname, 
                        aboutMe: req.body.pupaboutMe,
                        likes: req.body.puplikes,
                        dislikes: req.body.pupdislikes,
                        allergyInfo: req.body.pupallergyInfo,
                        pupImg: req.body.pupImg 
                    },      
                name: req.body.name,
                email: req.body.email,
                aboutMe: req.body.aboutMe,
                ownerImg: req.body.ownerImg,
                boardingAtmosphere: req.body.boardingAtmosphere,
                boardingDescription: req.body.boardingDescription,
                pupList: req.body.pupList,
                pendingPups: req.body.pendingPups,
                address: req.body.address,
                boardingPicture1: req.body.boardingPicture1,
                boardingPicture2: req.body.boardingPicture2,
                geoAddress: req.body.geoAddress,
            },
            { new: true }
        );

            console.log(user)

        if (!user)
        return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);

        await user.save();

        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});



//put change profile
router.put('/:id/changeall', auth, async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { 
                pup: {  name: req.body.pupName, 
                        aboutMe: req.body.pupAboutMe,
                        likes: req.body.pupLikes,
                        dislikes: req.body.pupDislikes,
                        allergyInfo: pupAllergyInfo,
                        pupImg: req.body.pupImg },      
                name: req.body.name,
                email: req.body.email,
                aboutMe: req.body.aboutMe,
                ownerImg: req.body.ownerImg,
                boardingAtmosphere: req.body.boardingAtmosphere,
                boardingDescription: req.body.boardingDescription,
                pupList: req.body.pupList,
                pendingPups: req.body.pendingPups,
                address: req.body.address,
                boardingPicture1: req.body.boardingPicture1,
                boardingPicture2: req.body.boardingPicture2,
                geoAddress: req.body.geoAddress,
            },
            { new: true }
        );

        console.log(user)

        if (!user)
        return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);

        await user.save();

        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// upload a owner profile image
router.put("/uploadmulter/:id", upload.single('ownerImg'), async (req, res) => {
    try{
     const user = await User.findByIdAndUpdate(req.params.id, {ownerImg: req.file.path});
     if (!user)
     return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);
 
     console.log(user);
 
     await user.save();
     return res.send(user);
 } catch (ex) {
     return res.status(500).send(`Internal Server Error: ${ex}`);
 }
 });

 // upload a pup image
router.put("/uploadmulter/:id/pup", upload.single("pupImg"), async (req, res) => {
    try{
     const user = await User.findByIdAndUpdate(req.params.id, {pup: {pupImg: req.file.path }
     }, { new: true });
     
     if (!user)
     return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);
 
     console.log(user);
 
     await user.save();
     return res.send(user);
 } catch (ex) {
     return res.status(500).send(`Internal Server Error: ${ex}`);
 }
 });

 // update owner profile
 router.put('/:id/updateAccount', auth, async (req, res) => {
     try{
         const user = await User.findByIdAndUpdate(
             req.params.id, {
                name: req.body.name, 
                email: req.body.email, 
                pupList: req.body.pupList,
                pendingPups: req.body.pendingPups,
                aboutMe: req.body.aboutMe,
            },
              { new: true }
         );

         console.log(user);
 
         if (!user)
         return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);
 
         await user.save();
 
         return res.send(user);
     } catch (ex) {
         return res.status(500).send(`Internal Server Error: ${ex}`);
     }
 });
 
 // update owner profile
 router.put('/:id/updateinfo', auth, async (req, res) => {
     try{
         const user = await User.findByIdAndUpdate(
             req.params.id, {
                name: req.body.name, 
                email: req.body.email, 
                pupList: req.body.pupList,
                pendingPups: req.body.pendingPups,
                aboutMe: req.body.aboutMe,
            },
              { new: true }
         );

         console.log(user);
 
         if (!user)
         return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);
 
         await user.save();
 
         return res.send(user);
     } catch (ex) {
         return res.status(500).send(`Internal Server Error: ${ex}`);
     }
 });

 // update pup profile
 router.put('/:id/aboutme/pup', auth, async (req, res) => {
     try{
         const user = await User.findByIdAndUpdate(
             req.params.id,
             { pup: {
                 name: req.body.name,
                 aboutMe: req.body.aboutMe,
                 likes: req.body.likes,
                 dislikes: req.body.dislikes,
                 allergyInfo: req.body.allergyInfo,
                 pupImg: req.body.pupImg
             }},
         );
 
         if (!user)
         return res.status(400).send(`The user with ID: ${req.params.id} does not exist`);
 
         await user.save();
 
         return res.send(user);
     } catch (ex) {
         return res.status(500).send(`Internal Server Error: ${ex}`);
     }
 });

//get addresses of all active users 
router.get('/populateAddress', auth, async (req, res) => {
    try {
        const user = await User.find()
            .select({ _id: 1, 
                name: 1, 
                address: 1, 
                geoAddress: 1, 
                boardingAtmosphere: 1, 
                boardingDescription: 1, 
                ownerImg: 1,
                pup: 1,
                number: 1,
            })
            console.log(user);
            return res.send(user);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 

//get a user and return only a couple variables
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            // .select({ _id: 1, name: 1, email: 1, ownerImg: 1, aboutMe: 1, pup: 1, puplist: 1, pendingpups: 1, address: 1})
            return res.send(user);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 



module.exports = router;

