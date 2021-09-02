const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

function create(schema, options = {}) {
  options.timestamps = true;

  const s = new Schema(schema, options);

  s.virtual('id').get(function getId() {
    return this._id.toHexString();
  });

  s.set('toJSON', {
    virtuals: true,
    _id: false,
    versionKey: false,
    transform(doc, ret) { delete ret._id; },
  });

  return s;
}

module.exports = {
  create,
  Types,
};
