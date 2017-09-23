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
    }],
    accountType : String
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

var CommentSchema = new schema({
    _id : String,
    writer : String,
    content : String
});

var ChatRoomSchema = new schema({
    _id : String,
    title : String,
    member : [{
        type : String,
        ref : "users"
    }],
    lastChat : String,
    lastChatTime : String,
    thumbnail : String
});

var BoardSchema = new schema({
    _id : String
});

var MemorySchema = new schema({
    _id : String
});

var BoothSchema = new schema({
    _id : String,
    location : String,
    title : String,
    address : String
});

mongoose.connect("mongodb://localhost:27017/bubblepop", function (err) {
    if(err){
        throw err;
    }
    console.log("DB Server Connect Success!");
});

var User = mongoose.model('users', UserSchema);
var Payment = mongoose.model('payments', PaymentSchema);
var HeavenCard = mongoose.model('heavencards', HeavenCardSchema);
var Reservation = mongoose.model('reservations', ReservationSchema);
var Party = mongoose.model('parties', PartySchema);
var Study = mongoose.model('studies', StudySchema);
var Comment = mongoose.model('comments', CommentSchema);
var ChatRoom = mongoose.model('chats', ChatRoomSchema);
var Board = mongoose.model('boards', BoardSchema);
var Memory = mongoose.model('memories', MemorySchema);
var Booth = mongoose.model('boothes', BoothSchema);

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
require('./routes/auth.js')(app, User, randomString);
require('./routes/user.js')(app, User, randomString);
require('./routes/heavencard.js')(app, User, HeavenCard, randomString);
require('./routes/payment.js')(app, User,Payment, randomString);
require('./routes/reservation.js')(app, User, Reservation, randomString);
require('./routes/party.js')(app, User, Party, randomString);
require('./routes/study.js')(app, User, Study ,randomString, Board, Memory);
require('./routes/social.js')(app, User, randomString);
require('./routes/chat.js')(app, User, randomString);

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
