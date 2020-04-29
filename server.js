require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const checkScope = require('express-jwt-authz');

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

app.get('/private', checkJwt, function (req, res) {
    res.json({
        message: "Hello, from a private API!"
    })
});

app.get('/events', checkJwt, checkScope(["read:events"]), function (req, res) {
    res.json({
        events: [
            { id: 1, title: "Google IO" },
            { id: 2, title: "Microsoft Edge Launch" },
        ]
    })
});

app.get('/admin', checkJwt, checkRole('admin'), function (req, res) {
    res.json({
        message: "Hello this should only be viewed by Admins!"
    })
});

function checkRole(role) {
    return function (req, res, next) {
        const assignedRoles = req.user['http://localhost:3000/roles'];
        if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
            return next();
        } else {
            return res.status(401).send('Insufficient role');
        }
    }
}

app.listen(3001);
console.log("Server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE)
