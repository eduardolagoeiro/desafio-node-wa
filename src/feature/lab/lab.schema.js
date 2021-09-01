const Schema = require('../../helpers/Schema');

const labSchema = Schema.create({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'active' },
});

module.exports = labSchema;
