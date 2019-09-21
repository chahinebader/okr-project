const User = require('../model/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
module.exports = (app) => {
app.post('/forgotPassword', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.error(req.body.email);
    User.findOne({email: req.body.email}).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        let date= new Date();
        User.findOneAndUpdate({email:req.body.email},{
          resetPasswordToken: token,
          resetPasswordExpires: date
        }).then(result =>{
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `okr.satoripop@gmail.com`,
              pass: `localhost@satoripop`,
            },
          });
  
          const mailOptions = {
            from: 'okr.satoripop@gmail.com',
            to: `${user.email}`,
            subject: 'Link To Reset Password',
            text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:3000/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
          };
        
          transporter.sendMail(mailOptions, (err, response) => {
          
           
            if (err) {
              console.error('there was an error: ', err);
            } else {
             
              res.status(200).json('recovery email sent');
            }
          });
        });
      }
    });
  });
}