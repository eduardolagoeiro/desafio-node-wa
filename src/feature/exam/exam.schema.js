const Schema = require('../../helpers/Schema');

const examSchema = Schema.create({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'active' },
  labs: [{ type: Schema.Types.ObjectId, required: false, ref: 'lab' }],
});

module.exports = examSchema;
