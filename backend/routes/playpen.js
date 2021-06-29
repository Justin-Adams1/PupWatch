// const { User } = require('../models/user');
// const { Image } = require('../models/image');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const { PupImage } = require('../models/pupImage')

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
     fileSize: 2048 * 2048 * 5
 },
 fileFilter: fileFilter
});



  // upload image to playpen
  router.post("/uploadmulter/playpen", upload.single("pup"), async (req, res) => {
    let path = req.file.path;
    try{
          console.log("path", path);
          let pup = new PupImage({pup: path}, { strict: false });
          await pup.save();
          console.log("final pup", pup)
          
          return(pup);
        } catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }

  }); 

module.exports = router;