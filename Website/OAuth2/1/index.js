const express = require("express");
const app = express();

var mongoose = require('mongoose')


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))



app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(80);
