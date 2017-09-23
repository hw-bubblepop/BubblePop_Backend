function init(app, User, randomString){
    var passport = require('passport');
    var FacebookTokenStrategy = require('passport-facebook-token');
    var multer = require('multer');
    var upload = multer({
        dest : './public/photos/',
        rename : function (fieldname, filename) {
            return 'thumbnails_' + filename;
        }
    })
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(obj, done){
        done(null, obj);
    });
    passport.use(new FacebookTokenStrategy({
        clientID : "247151832435976",
        clientSecret : "62585d23d288396ee3de224af2e0d34f"
    }, function(accessToken, refreshToken, profile, done){
        console.log(profile);
        User.findOne({
            _id : profile.id
        }, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                user = new User({
                    _id : profile.id,
                    thumbnail : profile.photos[0].value,
                    email : Stprofile.emails[0].value,
                    password : "",
                    nickname : profile.displayName,
                    location : 0,
                    heavencard : {},
                    payment : [],
                    reservation : [],
                    study : [],
                    party : [],
                    friends : [],
                    privateChat : [],
                    publicChat :[],
                    accountType : "Facebook"
                });
                user.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        done(null, profile);
                    }
                });
            }
            else if(user){
                done(null, profile);
            }
        });
    }));

    app.post('/auth/register', upload.array('thumbnail', 5), function(req, res){
        user = new User({
            _id : randomString.generate(13),
            thumbnail : "/photos" + req.files[0].filename,
            email : req.body.email,
            password : req.body.password,
            nickname : req.body.nickname,
            location : req.body.location,
            heavencard : {},
            payment : [],
            reservation : [],
            study : [],
            party : [],
            friends : [],
            privateChat : [],
            publicChat :[],
            accountType : "Local"
        });
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
                            console.log("/auth/local/register Failed");
                            res.send(403, "/auth/local/register DB Error");
                        }
                        else{
                            console.log("User Added : " + user);
                            res.send(200, user);
                        }
                    });
                }
            });
    });

    app.post('/auth/login', function (req, res) {
        console.log("User Login : " + req.body.token);
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
                else if(result.emailVeryfied == 0){
                    console.log("Unverified  User");
                    res.send(406, "Unverified User");
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