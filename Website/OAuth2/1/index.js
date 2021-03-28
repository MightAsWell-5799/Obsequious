const express = require("express");
const app = express();

var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'))


app.get("/", (req, res) => {
	res.render("main/home", {});

});

app.listen(80);
