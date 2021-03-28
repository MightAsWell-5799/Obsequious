const express = require('express')
const authRouter = require('./routes/authrouter')
const app = express()

var mongoose = require('mongoose')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
 
app.use("/auth", authRouter)




app.get('/', (req, res) => {
    res.render('main/home', {})
})
app.get('/commands', (req, res) => {
    res.render('main/commands', {})
})

app.listen(80, () => {
    console.log('listening on port 80')
})
