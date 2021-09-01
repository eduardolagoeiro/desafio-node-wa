const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

function create(schema, options = {}) {
  options.timestamps = true;

  const s = new Schema(schema, options);

  return s;
}

module.exports = {
  create,
  Types,
};
