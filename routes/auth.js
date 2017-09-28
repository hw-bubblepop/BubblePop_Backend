function init(app, User, randomString){
    var passport = require('passport');
    var FacebookTokenStrategy = require('passport-facebook-token');
    // var KakaotalkTokenStrategy = require('passport-kakao-token');
    var multer = require('multer');
    var upload = multer({
        dest : './public/photos/',
        rename : function (fieldname, filename) {
            return 'thumbnails_' + filename;
        }
    });

    app.post('/auth/register',  (req, res)=>{
        var random = randomString.generate(13)
        var user = new User({
            '_id' : random,
            'thumbnail' : "/default.png",
            'email' : req.body.email,
            'password' : req.body.password,
            'nickname' : req.body.nickname,
            'age' : req.body.age,
            'location' : req.body.location,
            'heavencard' : "",
            'payment' : [],
            'reservation' : [],
            'study' : [],
            'party' : [],
            'friends' : [],
            'chatroom' : [],
            'star' : req.body.star,
            'accountType' : "Local"
        });
        console.log(user.email);
        User.find({email : req.body.email})
            .exec(function(err, result){
                if(err){
                    console.log('/auth/local/register DB Error');
                    res.send(403, "/auth/loca/register DB Error");
                }
                if(result.length != 0){
                    console.log("User Data Exists!");
                    res.send(401, "User Data Exists!");
                }
                else if(result.length == 0){
                    user.save(function(err){
                        if(err){
                            throw err;
                            console.log("/auth/local/register Failed");
                            res.send(403, "/auth/local/register DB Error");
                        }
                        else{
                            console.log("User Added : " + user);
                            res.send(200, user);
                        }
                    });
                    // res.send(200, user)
                }
            });
    });

    app.post('/auth/login', function (req, res) {
        console.log("User Login : " + req.body.email);
        User.findOne({email : req.body.email}, function (err, result) {
            console.log("DB Founded : "+ result);
            if(err){
                console.log("/auth/local/login failed");
                res.send(403, "/auth/local/login DB Error");
            }
            if(result) {
                if (req.body.email == undefined) {
                    console.log("Unvalid User Infomation");
                    res.send(401, "Unvalid User Infomation");
                }
                else if (req.body.email != undefined && result.password == req.body.password) {
                    console.log("User " + result.nickname + "Logged In");
                    res.send(200, result);
                }
                else if (result.password != req.body.password) {
                    console.log("Password Error!");
                    res.send(401, "Access Denied");
                }
            }
            else{
                console.log("Can't Find User Data");
                res.send(404, "Cant't Find User Data");
            }
        });
    });
    app.get('/auth/facebook/token', function (req ,res) {
        console.log("User Token : "+ req.body.access_token);
        if(req.user){
            User.findOne({_id : req.user.id}, function(err, result){
                if(err){
                    console.log("/auth/facebook/token User Finding Error : " + err);
                    res.send(404, "User Finding DB Error");
                }
                res.send(200, result)
            });
        }
        else if(!req.user){
            res.send(404, "Can't find User On Facebook. It May Be Unusable User Data.");
        }
    });
}
module.exports = init;