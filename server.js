const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', function (req, res) {
    res.json({
        message: "Hello, this is a simple API"
    })
})

app.listen(3001);
console.log("Server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE)