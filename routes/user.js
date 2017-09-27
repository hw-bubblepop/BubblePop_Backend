function init(app, User, randomString){
    app.post('/user/update/nickname', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {nickname : req.body.nickname}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });

    app.post('/user/update/password', function (req, res) {
       User.findOneAndUpdate({_id : req.body.id}, {password : req.body.password}, function (err, result) {
           if(err){
               console.log("DB Error");
               res.send(401, "DB Error");
           }
           res.send(200, result);
       });
    });

    app.post('/user/update/location', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {location : req.body.location}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });

    app.post('/user/update/age', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {age : req.body.age}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });

    app.post('/user/update', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {nickname : req.body.nickname, password : req.body.password, location : req.body.location, age : req.body.age}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });

    });

    app.post('/user/update/card', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {thumbnail : req.body.thumbnail}, function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    })
}
module.exports = init;