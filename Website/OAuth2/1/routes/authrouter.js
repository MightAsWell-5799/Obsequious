const uuid = require('uuid')
const http = require('http')
const express = require('express')
const fs = require('fs')

const router = express.Router()

//?login page
router.get('/login', (req, res)=>{
    res.render('auth/login')
})

//logout
router.get('/logout', (req, res)=>{
    //passport
    res.send("logged out")
})


//! auth with discord
router.get('/discord', (req, res)=>{
    //passport
    res.send("discord login")
})

module.exports = router