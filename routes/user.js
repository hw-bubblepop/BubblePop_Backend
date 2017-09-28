function init(app, User, randomString){
    var multer = require('multer')
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, './public/photos/')
        },
        filename: function (req, file, cb) {
            console.log(req)
          cb(null, randomString.generate(12) + '.png')
        }
    })

    var upload = multer({ storage : storage});

    app.post('/user/update/thumbnail', upload.single('thumbnail'), (req, res)=>{
        User.findOneAndUpdate({_id : req.body.id}, { $set: { thumbnail : "/photos/"+req.file.filename}}, { new : true }, (err, result)=>{
            if(err){
                console.log("DB user update err")
                res.send("DB Error")
            }
            res.send(200, result)
        })
    })

    app.post('/user/update/nickname', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, { $set: { nickname: req.body.nickname}}, { new: true }, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            console.log(result)
            res.send(200, result);
        });
    });

    app.post('/user/update/password', function (req, res) {
       User.findOneAndUpdate({_id : req.body.id}, { $set: { password : req.body.password }}, { new: true }, function (err, result) {
           if(err){
               console.log("DB Error");
               res.send(401, "DB Error");
           }
           res.send(200, result);
       });
    });

    app.post('/user/update/location', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, { $set: { location : req.body.location }}, { new: true }, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });

    app.post('/user/update/age', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, { $set: { age : req.body.age }}, { new: true }, function (err, result) {
            if(err){
                console.log("DB Error");
                res.send(401, "DB Error");
            }
            res.send(200, result);
        });
    });

    app.post('/user/update', function (req, res) {
        User.findOneAndUpdate({_id : req.body.id}, { $set: { nickname : req.body.nickname, password : req.body.password, location : req.body.location, age : req.body.age }}, { new: true }, function (err, result) {
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

    app.get('/users', (req, res)=>{
        User.find((err, result)=>{
            if(err){
                console.log("DB Err");
                res.send(401, "DB Error")
            }
            res.send(200, result)
        })
    })
    
    app.post('/user', (req, res)=>{
        if(req.body.id){
            User.findOne({_id : req.body.id}, (err, result)=>{
                if(err){
                    console.log("DB Error")
                    res.send(401, "DB Error")
                }
                if(result){
                    res.send(200, result)
                }else{
                    res.send(400, "user not found")
                }
            })
        }

        if(req.body.email){
            User.findOne({email: req.body.email}, (err, result)=>{
                if(err){
                    console.log("DB Error")
                    res.send(401, "DB Error")
                }
                if(result){
                    res.send(200, result)
                }else{
                    res.send(400, "user not found")
                }
            })
        }

        if(req.body.phone){
            User.findOne({phone: req.body.phone}, (err,result)=>{
                if(err){
                    console.log("DB error")
                    res.send(401, "DB error")
                }
                if(result){
                    res.send(200, result)
                }else{
                    res.send(400, "user not found")
                }
            })
        }
    })
}
module.exports = init;