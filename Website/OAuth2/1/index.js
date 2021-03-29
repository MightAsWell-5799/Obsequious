const express = require('express')
const authRouter = require('./routes/authrouter')
const app = express()
const webAuth = require('./private/webAuth.json')
var mongoose = require('mongoose')

mongoose.connect(
    webAuth.mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => {
        console.log('connected to mongodb')
    },
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.use('/auth', authRouter)

app.get('/', (req, res) => {
    console.log(req.query)
    res.render('main/home', {})
})

app.get('/commands/house', (req, res) => {
    res.render('main/modules/house', {})
})

app.get('/commands', (req, res) => {
    res.render('main/commands', {})
})

app.listen(80, () => {
    console.log('listening on port 80')
})
