const stripeloder = require('stripe');

const stripe = new stripeloder('sk_test_H0hNvARdMCJPvJ4S5ZZc0Ir0003K2hfDgn');
const charge = (token)=>{
  return stripe.charges.create({
      amount: 12000,
      currency:'usd',
      source: token,
  });
};
module.exports = (app) => {
    app.post('/api/donate', (req, res,next) => {
        charge(req.body.token.token.id).then((data)=>{
            res.send("charged!");
            res.status(200);
            console.log("charged !!")
         }).catch((error) => {
            console.log(error);
            res.status(500);
            res.send("failed!");
           });
    });  
}    
