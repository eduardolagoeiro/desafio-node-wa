const debug = require('debug');

module.exports = {
  error: (err) => {
    console.error(err);
  },
  get(name) {
    return debug(name);
  },
};
