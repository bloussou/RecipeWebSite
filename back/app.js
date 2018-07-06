let express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path'),
    recipes = require('./routes/recipes'),
    mongoose = require('mongoose'),
    search = require('./routes/search'),
    authRouter = require('./routes/authRouter'),
    ip = require('ip'),
    ChatSchema = require('./models/Chat'),
    user = require('./models/User'),
    session = require('express-session');

require('./config/passport');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/recipes') //localhost/recipes or //database/recipes
    .then(() => console.log('connection succesful bravo !')) //192.168.99.100:32768
    .catch((err) => console.error(err));



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); //192.168.99.100:4200
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'passport-tutorial',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));


app.use('/search', search);
app.use('/recipes', recipes);
app.use('/authRouter', authRouter);




/* 'connection' is a socket.io event that is triggered when a new connection is 
       made. Once a connection is made, callback is called. */
io.on('connection', (socket) => {
    console.log('user connected');
    //subscribe to a room where the user can chat
    socket.on('subscribe', function (data) {
        console.log('join realised !');
        socket.join(data.room);
    });

    socket.on('message', function (data) {
        console.log('message : ' + data.message);
        io.in(data.room).emit('new message', {
            message: data.message
        });
    });

    //unsbscribe method
    socket.on('unsubscribe', function (data) {
        socket.leave(data.room);
    });

    socket.on('save_message', function (data) {
        var new_chat = new Chat({
            room: data.room,
            writter: {
                _id: new ObjectId(data.writter._id),
                name: data.writter.name,
            },
            message: data.message,
            creationDate: new Date(),
            seen: false
        });
        new_chat.save(function (err, msg) {
            if (err)
                console.log(err);
            io.to(data.room).emit('new_message', msg);
        });
    });
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.get('/chatroom/:room', (req, res, next) => {
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


server.listen(8080, () => {
    console.log('started on port 8080');
});