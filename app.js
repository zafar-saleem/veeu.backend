const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const path = require('path');
const mongo = require('mongodb');
const mongoose = require('mongoose');

// const user = require('./modules/login/login');
const poster = require('./modules/poster/poster');

mongoose.connect('mongodb://localhost/veeu');
var db = mongoose.connection;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-control-allow-origin', '*');
    next();
});

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
          root    = namespace.shift(),
          formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// app.use('/', user);
app.use('/', poster);

app.listen(3000, () => {
    console.log('Server is running on PORT:3000');
});

