function init(app, Booth, User, randomString){
    app.post('/booth/find', function (req, res) {
        Booth.find({}, function (err, result) {
            if(err){
                console.log("DB Error!");
                res.send(401, "DB Done");
            }
            res.send(200, result);
        })
    });
}
module.exports = init;