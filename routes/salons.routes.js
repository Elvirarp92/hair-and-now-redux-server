const express = require('express')
const router = express.Router()

const { checkLoggedIn } = require('./../configs/authcheckers.config')

const User = require('../database/models').User
const Salon = require('../database/models').Salon

router.get('/', (req, res, next) => {
  Salon.findAll()
    .then((salons) => res.status(200).json(salons))
    .catch((err) => next(new Error(err)))
})

router.put('/', checkLoggedIn, (req, res, next) => {
  Salon.create({
    name: req.body.name,
    street: req.body.street,
    number: req.body.number,
    zipcode: req.body.zipcode,
    town: req.body.town,
    province: req.body.province,
    addressComplements: req.body.addressComplements,
    phoneNumber: req.body.phoneNumber,
  })
    .then((salon) => {
      salon.addUser(req.user[0].id)
      return salon
    })
    .then((salon) => res.status(200).json(salon))
    .catch((err) => next(new Error(err)))
})

module.exports = router
