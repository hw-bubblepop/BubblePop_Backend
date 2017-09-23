function init(app, User, Reservation, randomString){
    app.post("/reservation/create", function (req, res) {
        var reservation = new Reservation({
            _id : randomString.generate(15),
            date : req.body.date,
            time : req.body.time,
            location : req.body.location
        });
        reservation.save(function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, reservation);
        });
    });
    app.post("/reservation/edit", function (req, res) {
        Reservation.findOneAndUpdate({_id : req.body.id},
            {date : req.body.date,
                time : req.body.time,
                location : req.body.location}, function (err, result) {
            if(err){
                console.log("Update Error");
                res.send(401, "Update Error");
            }
            res.send(200, result);
        });
    });
    app.post("/reservation/cancel", function (req, res) {
        Reservation.findOneAndRemove({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("Remove Error");
                res.send(401, "Remove Error");
            }
            res.send(200, result);
        });
    });
}
module.exports = init;