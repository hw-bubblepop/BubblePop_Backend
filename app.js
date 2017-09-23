var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomstring');
var session = require('express-session');
var schema = mongoose.Schema();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var UserSchema = new schema({
    _id : String,
    thumbnail : String,
    email : String,
    password : String,
    nickname : String,
    location : Number,
    heavencard : {
        type : String,
        ref : 'heavencards'
    },
    payment : [{
        type : String,
        ref : "payments"
    }],
    reservation : [{
        type : String,
        ref : "reservations"
    }],
    study : [{
        type : String,
        ref : "studies"
    }],
    party : [{
        type : String,
        ref : "parties"
    }],
    friends : [{
        type : String,
        ref : "users"
    }],
    privateChat : [{
        type : String,
        ref : "chats"
    }],
    publicChat :[{
        type : String,
        ref : "chats"
    }]
});

var PaymentSchema = new schema({
    _id : String,
    owner : String,
    exchange : String,
    number : String
});

var HeavenCardSchema = new schema({
    _id : String,
    description : String,
    position : String,
    organization : String,
    phone : String,
    email : String,
    thumbnail : String,
    balance : Number,
    cardHistory : [{
        type : Object
    }],
    cardOrder : Object
});

var ReservationSchema = new schema({
    _id : String,
    date : String,
    time : String,
    location : String
});

var PartySchema = new schema({
    _id : String,
    title : String,
    description : String,
    thumbnail : String,
    like : Number,
    comment : [{
        type : String,
        ref : "comments"
    }],
    date : String
});

var StudySchema = new schema({
    _id : String,
    title : String,
    description : String,
    category : Number,
    location : String,
    thumbnail : String,
    like : Number,
    comment : [{
        type : String,
        ref : "comments"
    }],
    date : String,
    member : [{
        type : String,
        ref : "users"
    }],
    chat : {
        type : String,
        ref : "chats"
    },
    board : [{
        type : String,
        ref : "boards"
    }],
    memory : [{
        type : String,
        ref : "memories"
    }]
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
