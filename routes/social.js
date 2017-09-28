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

    /*
    app.post('/social/:id', function (req, res) {
        User.findOne({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    */

    app.post('/social/add', function (req, res) {
        User.findOne({_id : req.body.id}, (err, user)=>{
            if(err){
                console.log("DB Error")
                res.send(401, "DB Error")
            }
            if(user){
                var isInArray = user.friends.some(function (friend) {
                    return friend == req.body.target_id;
                });
                if(isInArray){
                    res.send(409, "target user is existed")
                }else if(user._id == req.body.target_id){
                    res.send(400, "impossible add me")
                }else{
                    User.findOneAndUpdate({_id : user._id}, {$push: { friends: req.body.target_id }}, {new: true}, (err, result)=>{
                        if(err){
                            console.log("DB Error")
                            res.send(401, "DB Error")
                        }
                        res.send(200, result)
                    })
                }
            }else{
                res.send(400, "user not found")
            }
        })
        /*
        User.findOneAndUpdate({_id : req.body.id}, {$push : { friends :  req.body.target_id }}, {new: true}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            console.log(result)
            res.send(200, result);
        })
        */
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