const User = require('../model/user');
module.exports = (app) => {
    app.get('/reset', (req, res) => {
        User.findOne({
            resetPasswordToken: req.query.resetPasswordToken
          }).then((user) => {
          if (user == null) {
            console.error('password reset link is invalid or has expired');
            res.status(403).send('password reset link is invalid or has expired');
          } else {
            res.status(200).send({
              username: user.email,
              message: 'password reset link a-ok',
            });
          }
        });
      });
}