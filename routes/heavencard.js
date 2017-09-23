function init(app, User, HeavenCard, randomString){
    var multer = require('multer');
    var upload = multer({
        dest : './public/photos/',
        rename : function (fieldname, filename) {
            return "thumbnails_" + filename;
        }
    });
    app.post('/heavencard/edit/thumbnail', upload.array("thumbnail", 5),function (req, res) {
        HeavenCard.findOneAndUpdate({_id : req.body.id}, {thumbnail : "/photo/" + req.files[0].filename}, function (err, result) {
            if(err){
                console.log("Update Error");
                res.send(401, "Update Error");
            }
            res.send(200, result);
        });
    });

    app.post('/heavencard/edit/detail', function (req, res) {
        HeavenCard.findOneAndUpdate({_id : req.body.id}, {description : req.body.description, position : req.body.position, organization: req.body.organization, email : req.body.email, phone : req.body.phone},function (err, result) {
            if(err){
                console.log("Update Error");
                res.send(401, "Update Error");
            }
            res.send(200, result);
        })
    });
    app.post('heavencard/order', function (req, res) {
        //Payment Module Needs
    });
    app.post('/heavencard/order/cancel', function (req, res) {
        //Payment Module Needs
    });
    app.post('/heavencard/balance/charge', function (req, res) {
        //Payment Module Needs
    });
    app.post('/heavencard/balance/history', function (req, res) {
        //Payment Module Needs
    });
    app.post('/heavencard/:id', function (req, res) {
        HeavenCard.findOne({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    app.post('/heavencard/create', upload.array('thumbnail', 5), function (req, res) {
       var heavenCard = new HeavenCard({
            _id : randomString.generate(14),
           description : req.body.description,
           position : req.body.position,
           organization : req.body.organization,
           phone : req.body.phone,
           email : req.body.email,
           thumbnail : "/photos/" + req.files[0].filename,
           balance : 0,
           cardHistory : [],
           cardOrder : {}
       });
       heavenCard.save(function (err, result) {
           if(err){
               console.log("DB Error");
               res.send(401, "DB Error");
           }
           User.findOneAndUpdate({_id : req.body.id}, {heavenCard : heavenCard._id}, function (err, result) {
               if(err){
                   console.log("Update Error");
                   res.send(401, "Update Error");
               }
               res.send(200, result);
           });
       });
    });
}
module.exports = init;