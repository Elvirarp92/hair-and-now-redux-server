const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.json({message: 'Connection to API successful!'}))


module.exports = router
