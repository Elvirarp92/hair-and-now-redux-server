const express = require('express')
const router = express.Router()

const User = require('../database/models').User
const Salon = require('../database/models').Salon

router.get('/', (req, res, next) => {
  Salon.findAll()
    .then((salons) => res.status(200).json(salons))
    .catch((err) => next(new Error(err)))
})

module.exports = router
