/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const { errors } = require('celebrate');
const fs = require('fs');

const models = fs.readdirSync('./src/feature')
  .map(dir => ({ dir, files: fs.readdirSync(`./src/feature/${dir}`) }))
  .filter(({ files }) => files.find(file => file.includes('.routes.')))
  .map(el => el.dir);

for (let i = 0; i < models.length; i += 1) {
  const model = models[i];
  router.use(`/${model}`, require(`./src/feature/${model}/${model}.routes`));
}

router.use(errors());

module.exports = router;
