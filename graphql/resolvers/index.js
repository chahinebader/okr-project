const userResolver = require('./user');
const teamResolver= require('./team');
const notifResolver= require('./notification');
const reclamationResolver=require('./reclamation');
const missionResolver = require('./mission')
const objectifResolver = require('./objectif')
const keyresultResolver = require('./keyResult')
const commentaireResolver = require('./commentaire')
const statisticResolver = require('./statistics')
const reunionResolver= require('./reunion');
const companyResolver= require('./company');
const rootResolver = {
  ...userResolver,
  ...teamResolver,
  ...notifResolver,
  ...reclamationResolver,
  ...missionResolver,
  ...objectifResolver,
  ...keyresultResolver,
  ...commentaireResolver,
  ...statisticResolver,
  ...reunionResolver,
  ...companyResolver,
};

module.exports = rootResolver;
