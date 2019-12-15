const express = require('express'),
bodyparser = require('body-parser'),
app = express(),
port = process.env.PORT || 3000


app.use(express.static('public'))
app.use(bodyparser.text())
app.use(bodyparser.json())
app.use(express.json())
app.use(
    bodyparser.urlencoded({
        extended:true
    })
)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var routes = require('./routes')
routes(app)


app.listen(port,() => {
    console.log('Servers is running in port '+port)
})