const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
function updateUser (req,res, user) {
    bcrypt
      .hash(req.body.password, 12)
      .then((hashedPassword) => {
       return User.findOneAndUpdate({email: user.email},{
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null
         });
      })
      .then((userUpdated) => {
       
        res.status(200).send({ message: 'password updated' });
      });
  }


module.exports = (app) => {
    app.put('/updatePasswordViaEmail', (req, res) => {
        User.findOne({
            email: req.body.username
          }).then((user) => {
          
          if (user !== null) {
            return updateUser (req,res, user)
          } else {
            console.error('no user exists in db to update');
            res.status(401).json('no user exists in db to update');
          }
        });
      });
      
}
