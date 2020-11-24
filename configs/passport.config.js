require('dotenv').load

const session = require('express-session')
const passport = require('passport')
const crypto = require('crypto')
const flash = require('connect-flash')
const LocalStrategy = require('passport-local').Strategy

const User = require('../database/models').User

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  )

  passport.serializeUser((user, next) => next(null, user.id))
  passport.deserializeUser((id, next) => {
    User.findAll({ where: { id: id } })
      .then((user) => next(null, user))
      .catch((err) => {})
  })

  app.use(flash())

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
      (req, email, password, next) => {
        User.findOne({ where: { email: email } })
          .then((user) => {
            if (!user) {
              return next(null, false, { message: 'Incorrect email' })
            }

            const cipheredPassword = crypto.createHmac('sha512', process.env.CRYPTOKEY_1)
            cipheredPassword.update(password)
            const digestedPassword = cipheredPassword.digest('base64')

            if (digestedPassword != user.password) {
              return next(null, false, { message: 'Incorrect password' })
            }

            return next(null, user)
          })
          .catch((err) => next(err))
      }
    )
  )

  app.use(passport.initialize())
  app.use(passport.session())
}
