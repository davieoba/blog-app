const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
require('dotenv').config({
  path: './../.env'
})

// const dirpath = path.join(`${__dirname}/../views/emails`)
// console.log(dirpath)
// console.log(process.env.EMAIL_PASS)
let html = fs
  .readFileSync(path.join(`${__dirname}/../views/emails/welcome.html`), 'utf-8')
  .toString()

let reset = fs
  .readFileSync(
    path.join(`${__dirname}/../views/emails/passwordreset.html`),
    'utf-8'
  )
  .toString()

class Email {
  constructor(user, url) {
    this.url = url
    this.from = `Bodunrin David ${process.env.EMAIL_FROM}`
    this.firstName = user.firstName
    this.to = user.email
  }

  transport() {
    if (process.env.NODE_ENV === 'production') {
      return 1
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async sendWelcome() {
    let welcomeHtml = html
    welcomeHtml = welcomeHtml.replace('{header}', 'Account Verification')
    welcomeHtml = welcomeHtml.replace('{firstName}', this.firstName)
    welcomeHtml = welcomeHtml.replace('{link}', this.url)

    await this.send(welcomeHtml, 'Welcome 🎈🎊')
  }

  async sendPasswordReset() {
    let resetHtml = reset
    resetHtml = resetHtml.replace('{header}', 'Reset Password')
    resetHtml = resetHtml.replace('{firstName}', this.firstName)
    resetHtml = resetHtml.replace('{link}', this.url)

    await this.send(resetHtml, 'Reset password')
  }

  async send(template, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: '',
      html: template
    }
    return await this.transport().sendMail(mailOptions)
  }
}

//  I want this email to do the following

// 1, I want it to send a welcome email on signup and tell the user to activate thier account

// 2, I want it to send a password Reset token

// const sendEmail = (obj) => {
//   const transport = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   })

//   const mailOptions = {
//     from: 'bodunrindavidbond@gmail.com',
//     to: 'sageseun81@gmail.com',
//     subject: 'Welcome to the blog-app',
//     text: '',
//     html: 'this is the html'
//   }

//   return transport.sendMail(mailOptions)
// }

module.exports = Email
