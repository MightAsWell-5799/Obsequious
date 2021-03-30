
const express = require('express')
const router = express.Router()


router.get('/house', (req, res) => {
    res.render('main/modules/house', {})
})

router.get('/', (req, res) => {
    res.render('main/commands', {})
})


module.exports = router
