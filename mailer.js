const nodemailer = require('nodemailer')
require('dotenv').config()

const reportUpload = (body) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  })
  const mailOptions = {
    from: 'linearlogiciscool@gmail.com',
    to: 'afjellstad@gmail.com',
    subject: 'A new bug is uploaded!',
    html: '<p>Hi,</p>' +
          '<p>The following bug was uploaded to the database</p>'+
          '<p>Formula: ' + body.formula + '</p>' +
          '<p>Description:' + body.description + '</p>' +
          '<p>Name:' + body.name + '</p>'
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) throw Error(error)
    else console.log('Email Sent Successfully')
    console.log(info)
  })
}

module.exports = reportUpload
