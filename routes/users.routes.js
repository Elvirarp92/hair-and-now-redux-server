const express = require('express')
const router = express.Router()
const passport = require('passport')
const crypto = require('crypto')
// const nodemailer = require('nodemailer')

const { v4: uuidv4 } = require('uuid')
const User = require('../database/models').User

// THERE IS SOMETHING WEIRD GOING ON WITH GOOGLE AUTH, RESEARCH
// let transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     type: 'OAuth2',
//     user: process.env.EMAIL,
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     refreshToken: process.env.REFRESH_TOKEN,
//     accessToken: process.env.ACCESS_TOKEN,
//   },
// })

/* User creation */
router.put('/', async (req, res, next) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const plaintextPassword = req.body.password

  if (!firstName || !lastName || !email || !plaintextPassword) {
    return res
      .status(400)
      .json({ message: 'Provide valid first and last name, password and email' })
  }

  if (plaintextPassword.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password is too short - it should be at least 8 characters' })
  }

  const user = await User.findOne({ where: { email: email } })

  if (user) {
    return res.status(400).json({ message: 'Email already existent' })
  }

  const hmac = crypto.createHmac('sha512', process.env.CRYPTOKEY_1)
  hmac.update(plaintextPassword)

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hmac.digest('base64'),
    confirmationCode: uuidv4(),
    isActive: false,
  })
    // .then((user) => {
    //   transporter.sendMail({
    //     from: process.env.EMAIL,
    //     to: user.email,
    //     subject: 'Validate your Hair & Now account ☑️',
    //     text: `To access Hair & Now with your user and password, please validate your
    //     registration here: http://localhost:3000/users/validate/${user.confirmationCode}`,
    //     html: `<p>To access Hair & Now with your user and password, please validate your
    //     registration <a href="http://localhost:3000/users/validate/${user.confirmationCode}">here.</a></p>`,
    //   })
    // })
    .then((user) => res.status(200).json({ message: 'User saved!' }))
    .catch((err) => res.status(400).json({ message: 'Saving user to database went wrong.' }))
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong on user authentication.' })
      return
    }
    if (!user) {
      res.status(401).json(failureDetails)
      return
    }

    req.login(user, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' })
      }
      res.status(200).json(user)
    })
  })(req, res, next)
})

router.post('/logout', (req, res, next) => {
  req.logout()
  return res.status(200).json({ message: 'Logout successful' })
})

router.get('/isloggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({ firstName: req.user.firstName, lastName: req.user.lastName, email: req.user.email })
  } else {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

module.exports = router
