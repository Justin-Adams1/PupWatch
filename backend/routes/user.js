 const { User } = require('../models/user');
 const { Image } = require('../models/image');
 const { validate } = require('../models/user')
 const bcrypt = require('bcrypt');
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const auth = require('../middleware/auth');

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
            address: req.body.address,
            password: await bcrypt.hash(req.body.password, salt)
        });

        await user.save();

        const token = user.generateAuthToken();
        
        return res
            .header('x-auth-token', token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send({ _id: user._id, name: user.name, email: user.email });
}catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

//post a Pup to a User
router.put('/:id', auth, async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { pup: {
                name: req.body.name,
                aboutMe: req.body.aboutMe,
                allergyInfo: req.body.allergyInfo
            }},
            { new: true }
        );

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
router.put("/uploadmulter/:id/pup", upload.single('picture'), async (req, res) => {
    try{
     const user = await User.findByIdAndUpdate(req.params.id, { pup: {picture: req.file.path}});
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
 router.put('/:id/aboutme', auth, async (req, res) => {
     try{
         const user = await User.findByIdAndUpdate(
             req.params.id,
             {
                 aboutMe: req.body.aboutMe,
                 address: req.body.address
             },
         );
 
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
                 aboutMe: req.body.aboutMe,
                 likes: req.body.likes,
                 dislikes: req.body.dislikes,
                 allergyInfo: req.body.allergyInfo
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
            .select({ _id: 1, name: 1, address: 1})
            return res.send(user);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 

//get a user and return only a couple variables
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select({ _id: 1, name: 1, email: 1, ownerImg: 1, aboutMe: 1, pup: 1, puplist: 1, pendingpups: 1, address: 1})
            return res.send(user);
        
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
}); 



module.exports = router;

