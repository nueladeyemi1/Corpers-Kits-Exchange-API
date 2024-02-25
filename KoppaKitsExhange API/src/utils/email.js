const nodemailer = require('nodemailer')
require('dotenv').config()

// const sendEmail = (options) => {

// }

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS,
  },
})

exports.sendEmail = async (email, resetUrl) => {
  await transporter.sendMail({
    from: 'KoppaKitsExchange Support <support@koppakitsexchange.com>', // sender address
    to: email, // list of receivers
    subject: 'Reset request link', // Subject line
    text: `We have received a password reset request. Please use the link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid for only 10 minutes`, // plain text body
    html: `<div><b>We have received a password rest request.</b> Please use the link to reset your password<div style='margin-bottom: '5rem'>${resetUrl}</div><b style='color:red'>This reset password link will be valid for only 10 minutes</b></div>`, // html body
  })
}
