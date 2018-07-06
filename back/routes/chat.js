let express = require('express'),
    router = express.Router(),
    chat = require('../models/Chat');
const auth = require('./auth');
/* GET a chatroom */
router.get('/api/chatrooms/:room', auth.require, function (req, res, next) {
    let room = req.params.room;
    chatRooms.find({
        name: room
    }).toArray((err, chatroom) => {
        if (err) {
            console.log(err);
            return false;
        }
        res.json(chatroom[0].messages);
    });
});


module.exports = router;