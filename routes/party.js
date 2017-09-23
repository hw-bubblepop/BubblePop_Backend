function init(app, User, Party, randomString) {
    var multer = require('multer');
    var upload = multer({
        dest : './public/photos/',
        rename : function (fieldname, filename) {
            return 'thumbnails_' + filename;
        }
    });
    app.post('/party/list', function (req, res) {
        Party.find({}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });
    app.post('/party/create', function (req, res) {
        var party = new Party({
            _id : randomString.generate(14),
            title : req.body.title,
            description : req.body.description,
            thumbnail : "/photos/" + req.files[0].filename,
            like : 0,
            comment : []
        });
        party.save(function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });
    app.post('/party/edit', upload.array("thumbnail", 4) ,function (req, res) {
        Party.findOneAndUpdate({_id : req.body.id}, {title : req.body.title, description: req.body.description, thumbnail : "/photos/" + req.files[0].filename}, function (err, result) {
            if(err){
                console.log("Update Error");
                res.send(401, "Update Err");
            }
            res.send(200, result);
        })
    });
    app.post('/party/delete', function (req, res) {
        Party.findOneAndRemove({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("Remove Error");
                res.send(401, "Remove Error");
            }
            res.send(200, result);
        });
    });
}