const mongoose = require('mongoose');
const { Schema } = mongoose;

const PupImageSchema = new mongoose.Schema({
    pup: {
        data: Buffer,
        contentType: String,
    },
})

const PupImage = mongoose.model('PupImage', PupImageSchema);

module.exports = { PupImage }
exports.PupImageSchema = PupImageSchema;
    