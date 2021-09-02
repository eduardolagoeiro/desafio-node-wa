const db = require('./db');
const Logger = require('./helpers/Logger');

const log = Logger.get('boot');

module.exports = async function boot(app) {
  log('connecting to database...');
  await db.connect();
  log('connected to database!');

  const port = process.env.PORT;

  app.listen(port, () => {
    log(`Example app listening at http://localhost:${port}`);
  });
};
