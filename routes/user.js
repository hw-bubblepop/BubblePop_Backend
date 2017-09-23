function init(app, User, randomString){
    app.post('/user/edit/nickname', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, {nickname : req.body.nickname}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });
}
module.exports = init;