function init(app, User, randomString, Chatroom) {
    var multer = require('multer');
    var upload = multer({
        dest : './public/photos/',
        rename : function (fieldname, filename) {
            return 'thumbnails_' + filename;
        }
    });
    app.post('/chat/private/list', function (req, res) {
        User.findOne({_id : req.body.id, chattype : "private"}, function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(403, "DB Err");
            }
            res.send(200, result.chatroom);
        });
    });

    app.post('/chat/public/list', function (req, res) {
        User.findOne({_id : req.body.id, chattype : "public"}, function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(403, "DB Err");
            }
            res.send(200, result.chatroom);
        });
    });

    // app.post('/chat/invite', function (req, res) {
    //
    // });
    // app.post('/chat/:id', upload.array('thumbnail', 4), function (req, res) {
    //     var chat = {
    //         _id : randomString.generate(15),
    //         id : req.param('id'),
    //         title : req.body.title,
    //         member : [req.body.owner_id],
    //         owner : req.body.owner_id,
    //         lastChat : "",
    //         lastChatTime : "",
    //         thumbnail : req.files[0].thumbnail,
    //         chattype : req.body.type
    //     };
    //     chat.save(function (err, result) {
    //         if(err){
    //             console.log("DB Err");
    //             res.send(403, "DB Err");
    //         }
    //         User.findOneAndUpdate({_id : req.body.owner_id}, {$push : {chatroom : req.param('id')}}, function (err, result) {
    //             if(err){
    //                 console.log("DB Err");
    //                 res.send(403, "DB Error");
    //             }
    //         });
    //         res.send(200, chat);
    //     });
    // });
    // app.post('/chat/:id/leave', function (req, res) {
    //     Chat.findOneAndRemove({id : req.param('id')}, {new : true}, function (err, result) {
    //         if(err){
    //             console.log("DB Err");
    //             res.send(403, "DB Err");
    //         }
    //         User.findOneAndUpdate({_id : req.body.user_id}, {$pull : {chatroom : req.param('id')}}, function (err, result) {
    //             if(err){
    //                 console.log("DB Err");
    //                 res.send(403, "DB Err");
    //             }
    //         });
    //         res.send(200, result);
    //     });
    // });
    //
    // app.post('/chat/user/add/:chat_id', function (req, res) {
    //     User.findOneAndUpdate({_id : req.param('id')}, {$push : {chatroom : req.param('chat_id')}}, {new : true},function (err, result) {
    //         if(err){
    //             console.log("DB Err");
    //             res.send(403, "DB Err");
    //         }
    //         res.send(200, result);
    //     })
    // });

    app.post('/chat/create', function (req, res) {
        var chat = new Chatroom({
            _id : randomString.generate(14),
            chattype : req.body.chattype,
            title : req.body.title,
            member : [],
            lastChat : "",
            lastChatTime : "",
            thumbnail : "",
            owner : ""
        });
        chat.save(function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(403, "DB Errr");
            }
            res.send(200, chat);
        });
    });

    app.post('/chat/adduser', function (req, res) {
        Chatroom.findOneAndUpdate({_id : req.body.chat_room_id}, {$push : {member : req.body.user_id}}, {new : true} ,function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(403, "DB Errr");
            }
            User.findOneAndUpdate({_id : req.body.user_id}, {$push : {chatroom : req.body.chat_room_id}}, function (err, result) {
                if(err){
                    console.log("DB Err");
                    res.send(403, "DB Errr");
                }
            });
            res.send(200, result);
        });
    });

    app.post('/chat/leave', function (req, res) {
        Chatroom.findOneAndUpdate({_id : req.body.chat_room_id}, {$pull : {member : req.body.user_id}}, {new : true} ,function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(403, "DB Errr");
            }
            User.findOneAndUpdate({_id : req.body.user_id}, {$pull : {chatroom : req.body.chat_room_id}}, function (err, result) {
                if(err){
                    console.log("DB Err");
                    res.send(403, "DB Errr");
                }
            });
            res.send(200, result);
        });
    })

    app.post('/chat/setowner', function (req, res) {
        Chatroom.findOneAndUpdate({_id : req.body.chat_room_id}, {owner : req.body.user_id}, function (err, result) {
            if(err){
                console.log("DB Err");
                res.send(403, "DB Errr");
            }
            res.send(200, result);
        });
    })

}
module.exports = init;