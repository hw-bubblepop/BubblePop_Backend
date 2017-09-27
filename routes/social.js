function init(app, User, randomString) {
    app.post('/social/list', function (req, res) {
        User.findOne({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result.friends);
        })
    });
    app.post('/social/:id', function (req, res) {
        User.findOne({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    app.post('/social/add', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {$push : {friends : req.body.target_id}}, {new : true}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    app.post('/social/find/facebook', function (req, res) {
        User.find({accountType : "Facebook"}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    })
}
module.exports = init;