const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const Pup = require('./pup');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    pupList: { type: [Object]},
    pendingPups: {type: [Object]},
    pup: { type: Pup },
    number: {type: String},
    address: {type: String},
    boardingAtmosphere: {type: String},
    boardingDescription: {type: String},
    boardingImage1: { data: Buffer, contentType: String },
    boardingImage2: { data: Buffer, contentType: String },
    aboutMe: { type: String, maxlength: 500 },
    ownerImg: { data: Buffer, contentType: String },
    geoAddress: { type: Array },
});

userSchema.methods.generateAuthToken = function (){
    return jwt.sign({ _id: this._id, name: this.name } , config.get('jwtSecret'));
};

const User = mongoose.model('User', userSchema);;


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
        address: Joi.string().min(5).max(1024).required(),
        geoAddress: Joi.array().required(),
        number: Joi.number().min(5).max(1024).required(),
    });
    return schema.validate(user);
}


exports.User = User;
exports.validate = validateUser;