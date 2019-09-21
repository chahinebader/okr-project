const express =require('express');
const bodyParser = require('body-parser');
const graphqlHttp =require('express-graphql');
const db =require('./config/database')
const graphQlSchema = require('./graphql/schema/schema');
const graphQlResolvers = require('./graphql/resolvers/index');
const cors= require('cors');
const cron = require('node-cron');
const User = require('./model/user');
const BestDev = require('./model/bestDeveloper');
const Company = require('./model/company');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'))
require('./routes/forgetPassword')(app);
require('./routes/resetPassword')(app);
require('./routes/uplode')(app);
require('./routes/updatePassword')(app);
require('./routes/mailNotification')(app);
require('./routes/payement')(app);
// buying verified
cron.schedule('0 0 * * *', () => {
  try {
   Company.find().then(companys =>{
      let date = new Date();
      for(company of companys){
        let paymentAt = new Date(company.created_at);
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays>=3600){
          Company.findByIdAndUpdate(company._id,{expired: false});
        }
      }
      }); 
   } catch (err) {
     throw err;
   }
 
});
// select best employee of the month 
cron.schedule('0 0 1 * *', () => {
  try {
   User.find().then(users =>{
     let best = new User(users[0]);
      for(user of users){
        if(user.progressofmounth){
      if(user.progressofmounth >best.progressofmounth ){
        best = user;
      }
     }
    }
    let besDev = new BestDev({
      name : best.name,
      email: best.email,
      avatar: best.avatar,
      status: best.status,

    });
    console.log(besDev);
    besDev.save();
    
   });
    
   } catch (err) {
     throw err;
   }
 
});
// graphQl 
app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );

try{
 app.listen(4000);
 console.log("redirect to http://localhost:4000/")
}catch(err){
    console.log(err);
}
