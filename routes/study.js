function init(app, User, Study, randomString, Board, Memory) {
    var multer = require('multer');
    var upload = multer({
        dest : "./public/photos/",
        rename : function (fieldname, filename) {
            return "thumbnails_" + filename;
        }
    })
    app.post('/study/list', function (req, res) {
        Study.find({}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    app.post('/study/create', upload.array('thumbnail', 2),function (req, res) {
        var study = new Study({
            _id : randomString.generate(12),
            title : req.body.title,
            description : req.body.description,
            category : req.body.category,
            location : req.body.location,
            thumbnail : "/photos/" + req.files[0].filename,
            like : 0,
            comment : [],
            date : req.body.date,
            member : [],
            chat : "",
            board : [],
            memory : []
        });
        study.save(function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    app.post('/study/edit',upload.array('thumbnail', 2), function (req, res) {
        Study.findOneAndUpdate({_id : req.body.id},
            {
                title : req.body.title,
                description : req.body.description,
                category : req.body.category,
                location : req.body.location,
                thumbnail : "/photos/" + req.files[0].filename,
                date : req.body.date
            }, function (err, result) {
                if(err){
                    console.log("DB Error");
                    res.send(401, "DB Error");
                }
                res.send(200, result);
            })
    });
    app.post('/study/delete', function (req, res) {
        Study.findOneAndRemove({_id : req.body.id}, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        })
    });
    app.post('/study/board/write', function (req, res) {
        //asdf
    });
    app.post('/study/memory/write', function (req, res) {
        //asdf
    });
}
module.exports = init;