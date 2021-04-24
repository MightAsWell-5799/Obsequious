
const express = require('express')
const router = express.Router()

const passport = require('passport')
const passportSetup = require('./../configs/passportS')
const webAuth = require('../private/webAuth.json')


var scopes = ['identify', 'guilds']


//logout might not need
router.get('/logout', (req, res) => {
    //passport
    res.send('logged out')
})

//! auth with discord
router.get('/discord', passport.authenticate('discord', { scope: scopes }))

router.get(
    '/discord/redirect',
    passport.authenticate('discord'),
    (req, res) => {
        //token

        console.log(req.query.code)

        res.send('OJFBAIKJWBFKAJBF')
    },
)

module.exports = router
