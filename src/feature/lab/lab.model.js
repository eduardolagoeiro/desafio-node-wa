const mongoose = require('mongoose');

const labSchema = require('./lab.schema');

module.exports = mongoose.model('lab', labSchema);
