function init(app, User, Payment, randomString) {
    app.post('/pay', function (req, res) {

    });
    app.post('/payment/add', function (req, res) {
        var payment = new Payment({
            _id : randomString.generate(14),
            owner : req.body.owner,
            exchange : req.body.exchange,
            number : req.body.number
        });
        payment.save(function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, payment);
        });
    });
    app.post('/payment/update', function (req, res) {
        Payment.findOneAndUpdate({_id : req.body.id}, {owner : req.body.owner, exchange: req.body.exchange, number:req.body.number}, function (err, result) {
            if(err){
                console.log("Update Error");
                res.send(401, "Update Error");
            }
            res.send(200, result);
        });
    });
    app.post('/payment/delete', function (req, res) {
        Payment.findOneAndRemove({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("Remove Error");
                res.send(401, "Remove Error");
            }
            res.send(200, result);
        });
    });
}
module.exports = init;