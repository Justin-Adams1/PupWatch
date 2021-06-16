const mongoose = require('mongoose');

const pupSchema = new mongoose.Schema({
    name: {type: String, require: true, minlength: 2, maxlength: 300},
    aboutMe: {type:  String, require: true, minlength:2, maxlength: 300},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    allergyInfo: {type: String, require: true, minlength: 2, maxlength: 300},
    pupImg: { data: Buffer, contentType: String },
    date: {type: Date, default: Date.now}
})

const Pup = mongoose.model('Pup', pupSchema);

exports.Pup = Pup;
exports.pupSchema = pupSchema;