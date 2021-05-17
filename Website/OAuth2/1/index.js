const express = require('express')
const authRouter = require('./routes/authrouter')
const commandsRouter = require('./routes/commandrouter')
const app = express()
const webAuth = require('./private/webAuth.json')
var mongoose = require('mongoose')

//connect to mongo db server using the URI in the private/webAuth.json file
//Can add a username and password to the URI in the future
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


//use EJS rendering
app.set('view engine', 'ejs')
//Don't use extended URL encoding
app.use(express.urlencoded({ extended: false }))
//give express access to the public folder for the css and js files needed to do page stuff
app.use(express.static(__dirname + '/public'))


//two custom routers for different folders
app.use('/auth', authRouter)
app.use('/commands', commandsRouter)


//renders home page
app.get('/', (req, res) => {
    //console.log(req.query)
    res.render('main/home', {})
})

//renders the about page
app.get("/about", (req, res) => {
    res.render('main/about')

})


//listen on a port, this will be replaced by the https server in the future to allow for encrypted connections to the server.
app.listen(80, () => {
    console.log('listening on port 80')
})
