const nodemailer = require('nodemailer');
module.exports = (app) => {
    app.post('/mailNotif', (req, res) => {
        if (req.body.email === '') {
            res.status(400).send('email required');
          }
        else{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: `okr.satoripop@gmail.com`,
                  pass: `localhost@satoripop`,
                },
              })
              const mailOptions = {
                from: 'okr.satoripop@gmail.com',
                to: `${req.body.email}`,
                subject: `${req.body.subject}`,
                text:`${req.body.text}`,
              };
              transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.error('there was an error: ', err);
                } else {
                   res.status(200).json('recovery email sent');
                }
              }); 

        }  
    });     
}    