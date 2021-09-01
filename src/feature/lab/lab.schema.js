const Schema = require('../../helpers/Schema');

const labSchema = Schema.create({
  name: { type: String, required: true },
  address: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = labSchema;
