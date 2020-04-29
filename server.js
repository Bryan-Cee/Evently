require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    algorithm: ["RS256"]
});

app.get('/public', function (req, res) {
    res.json({
        message: "Hello, this is a simple API"
    })
})

app.get('/private', checkJwt,function (req, res) {
    res.json({
        message: "Hello, from a private API!"
    })
})

app.listen(3001);
console.log("Server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE)