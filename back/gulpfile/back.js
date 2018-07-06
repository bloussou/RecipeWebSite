const mongoose=require("mongoose"),passport=require("passport"),LocalStrategy=require("passport-local"),User=mongoose.model("User");passport.use(new LocalStrategy({usernameField:"user[email]",passwordField:"user[password]"},(e,s,r)=>{User.findOne({email:e}).then(e=>e&&e.validatePassword(s)?r(null,e):r(null,!1,{errors:{"email or password":"is invalid"}})).catch(r)}));
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({
            email
        })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {
                    errors: {
                        'email or password': 'is invalid'
                    }
                });
            }
            return done(null, user);
        }).catch(done);
}))
var mongoose=require("mongoose"),ChatSchema=new mongoose.Schema({room:String,writter:{name:String},message:String,updated_at:{type:Date,default:Date.now}});module.exports=mongoose.model("Chat",ChatSchema);
var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  room: String,
  writter: {
    name: String
  },
  message: String,
  updated_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
let mongoose=require("mongoose"),RecipeSchema=new mongoose.Schema({name:String,duration:Number,difficulty:String,origin:String,type:String,ingredients:Array,steps:String});module.exports=mongoose.model("recipes",RecipeSchema);
let mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    difficulty: String,
    origin: String,
    type: String,
    ingredients: Array,
    steps: String
});

module.exports = mongoose.model('recipes', RecipeSchema);
var mongoose=require("mongoose"),crypto=require("crypto"),jwt=require("jsonwebtoken"),UserSchema=new mongoose.Schema({email:String,hash:String,salt:String});UserSchema.methods.setPassword=function(e){this.salt=crypto.randomBytes(16).toString("hex"),this.hash=crypto.pbkdf2Sync(e,this.salt,1e4,512,"sha512").toString("hex")},UserSchema.methods.validatePassword=function(e){const t=crypto.pbkdf2Sync(e,this.salt,1e3,512,"sha512").toString("hex");return this.hash===t},UserSchema.methods.generateJWT=function(){const e=new Date,t=new Date(e);return t.setDate(e.getDate()+60),jwt.sign({email:this.email,id:this._id,exp:parseInt(t.getTime()/1e3,10)},"secret")},UserSchema.methods.toAuthJSON=function(){return{_id:this.id,email:this.email,token:this.generateJWT()}},module.exports=mongoose.model("User",UserSchema);
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email: String,
    hash: String,
    salt: String,
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}
UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this.id,
        email: this.email,
        token: this.generateJWT(),
    };
};


module.exports = mongoose.model('User', UserSchema);
let express=require("express"),app=express(),server=require("http").createServer(app),io=require("socket.io").listen(server),recipes=require("./routes/recipes"),mongoose=require("mongoose"),search=require("./routes/search"),authRouter=require("./routes/authRouter"),ip=require("ip"),ChatSchema=require("./models/Chat"),user=require("./models/User");mongoose.Promise=global.Promise,mongoose.connect("mongodb://localhost/recipes").then(()=>console.log("connection succesful bravo !")).catch(e=>console.error(e)),app.use(function(e,o,s){o.setHeader("Access-Control-Allow-Origin","http://localhost:4200"),o.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE"),o.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type"),o.setHeader("Access-Control-Allow-Credentials",!0),s()}),app.use(express.json()),require("./config/passport"),app.use("/search",search),app.use("/recipes",recipes),app.use("/authRouter",authRouter),io.on("connection",e=>{console.log("user connected"),e.on("subscribe",function(o){console.log("join realised !"),e.join(o.room)}),e.on("message",function(e){console.log("message : "+e.message),io.in(e.room).emit("new message",{message:e.message})}),e.on("unsubscribe",function(o){e.leave(o.room)}),e.on("save_message",function(e){new Chat({room:e.room,writter:{_id:new ObjectId(e.writter._id),name:e.writter.name},message:e.message,creationDate:new Date,seen:!1}).save(function(o,s){o&&console.log(o),io.to(e.room).emit("new_message",s)})}),e.emit("news",{hello:"world"}),e.on("my other event",function(e){console.log(e)})}),app.get("/chatroom/:room",(e,o,s)=>{let r=e.params.room;chatRooms.find({name:r}).toArray((e,s)=>{if(e)return console.log(e),!1;o.json(s[0].messages)})}),server.listen(8080,()=>{console.log("started on port 8080")});
let express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    recipes = require('./routes/recipes'),
    mongoose = require('mongoose'),
    search = require('./routes/search'),
    authRouter = require('./routes/authRouter'),
    ip = require('ip'),
    ChatSchema = require('./models/Chat'),
    user = require('./models/User');


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

require('./config/passport');
app.use('/search', search);
app.use('/recipes', recipes);
app.use('/authRouter', authRouter);



//LOL !!!sskhvkjhv

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
var gulp=require("gulp"),concat=require("gulp-concat"),rename=require("gulp-rename"),minify=require("gulp-minify"),uglify=require("gulp-uglify"),uglifyJS=require("gulp-uglify-es").default,jsFiles=["./config/*.js",,"./*.js","./routes/*.js"],jsDest="./gulpfile/";gulp.task("concatenate",function(){return gulp.src(["./config/*.js","./models/*.js","./*.js","./routes/*.js"]).pipe(minify()).pipe(concat("back.js")).pipe(gulp.dest("./gulpfile/"))}),gulp.task("uglifying",function(){return gulp.src("./gulpfile/back.js").pipe(uglifyJS()).pipe(gulp.dest("./gulpfile/"))});
var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var uglifyJS = require('gulp-uglify-es').default;

var jsFiles = ['./config/*.js', /**'./models/*.js'*/ , './*.js', './routes/*.js'];
var jsDest = './gulpfile/'

gulp.task('concatenate', function () {
    return gulp.src(['./config/*.js', './models/*.js', './*.js', './routes/*.js'])
        .pipe(minify())
        .pipe(concat('back.js'))
        .pipe(gulp.dest('./gulpfile/'));
});

gulp.task('uglifying', function () {
    return gulp.src('./gulpfile/back.js')
        .pipe(uglifyJS())
        .pipe(gulp.dest('./gulpfile/'))
})
const jwt=require("express-jwt"),getTokenFromHeaders=e=>{const{headers:{authorization:r}}=e;return r&&"Token"===r.split(" ")[0]?r.split(" ")[1]:null},auth={required:jwt({secret:"secret",userProperty:"payload",getToken:getTokenFromHeaders}),optional:jwt({secret:"secret",userProperty:"payload",getToken:getTokenFromHeaders,credentialsRequired:!1})};module.exports=auth;
const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const {
        headers: {
            authorization
        }
    } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};

module.exports = auth;
const mongoose=require("mongoose"),passport=require("passport"),authRouter=require("express").Router(),auth=require("./auth"),User=require("../models/User");authRouter.post("/api/User",auth.optional,(r,s,e)=>{const{body:{user:t}}=r;if(!t.email)return s.statut(422).json({errors:{email:"is required"}});if(!t.password)return s.status(422).json({errors:{password:"is required"}});const o=new User(t);return o.setPassword(t.password),o.save().then(()=>s.json({user:o.toAuthJSON()}))}),authRouter.post("/api/login",auth.optional,(r,s,e)=>{const{body:{user:t}}=r;return t.email&&t.password?t.password?passport.authenticate("local",{session:!1},(r,t,o)=>{if(r)return e(r);if(t){const r=t;return r.token=t.generateJWT(),s.json({user:r.toAuthJSON()})}return status(400).info})(r,s,e):s.status(422).json({errors:{password:"is required"}}):s.status(422).json({errors:{email:"is required"}})}),authRouter.get("/api/current",auth.required,(r,s,e)=>{const{payload:{id:t}}=r;return User.findById(t).then(r=>r?s.json({user:r.toAuthJSON()}):s.sendStatus(400))}),module.exports=authRouter;
const mongoose = require('mongoose');
const passport = require('passport');
const authRouter = require('express').Router();
const auth = require('./auth');
const User = require('../models/User');


// POST new user route (optional, evryone has access)
authRouter.post('/api/User', auth.optional, (req, res, next) => {
    const {
        body: {
            user
        }
    } = req;

    if (!user.email) {
        return res.statut(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(user);
    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({
            user: finalUser.toAuthJSON()
        }));


});

//POST login route (optional, evryone has access)
authRouter.post('/api/login', auth.optional, (req, res, next) => {
    const {
        body: {
            user
        }
    } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', {
        session: false
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({
                user: user.toAuthJSON()
            });
        }

        return status(400).info;
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)

authRouter.get('/api/current', auth.required, (req, res, next) => {
    const {
        payload: {
            id
        }
    } = req;
    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({
                user: user.toAuthJSON()
            });
        });
});




module.exports = authRouter;
let express=require("express"),router=express.Router(),chat=require("../models/Chat");router.get("/api/chatrooms/:room",function(e,r,o){let s=e.params.room;chatRooms.find({name:s}).toArray((e,o)=>{if(e)return console.log(e),!1;r.json(o[0].messages)})}),module.exports=router;
let express = require('express'),
    router = express.Router(),
    chat = require('../models/Chat');

/* GET a chatroom */
router.get('/api/chatrooms/:room', function (req, res, next) {
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
let express=require("express"),router=express.Router(),Recipe=require("../models/Recipe.js");const auth=require("./auth");router.get("/api/allrecipes",function(e,i,o){Recipe.find({},null,{sort:{name:1}},function(e,n){if(console.log("All recipes found"),e)return o(e);i.json(n)})}),router.get("/api/recipe/:id",function(e,i,o){Recipe.findById(e.params.id,function(e,n){if(console.log("Fetched single recipe"),e)return o(e);i.json(n)})}),router.post("/api/postrecipe",function(e,i,o){Recipe.create(e.body,function(e,n){if(console.log("Posting new recipe"),e)return o(e);i.json(n)})}),router.put("/api/updaterecipe/:id",function(e,i,o){Recipe.findByIdAndUpdate(e.params.id,e.body,function(e,n){if(console.log("Updating a recipe"),e)return o(e);i.json(n)})}),router.delete("/api/delrecipe/:id",function(e,i,o){Recipe.findByIdAndRemove(e.params.id,e.body,function(e,n){if(console.log("Deleting a recipe"),e)return o(e);i.json(n)})}),module.exports=router;
let express = require('express'),
    router = express.Router(),
    Recipe = require('../models/Recipe.js');

const auth = require('./auth');




/* GET ALL RECIPES */
router.get('/api/allrecipes', function (req, res, next) {
    Recipe.find({}, null, {
            sort: {
                name: 1
            }
        },
        function (err, recipes) {
            console.log('All recipes found');
            if (err) return next(err);
            res.json(recipes);
        });
});

/* GET SINGLE RECIPE BY ID */
router.get('/api/recipe/:id', function (req, res, next) {
    Recipe.findById(req.params.id, function (err, recipe) {
        console.log('Fetched single recipe');
        if (err) return next(err);
        res.json(recipe);
    });
});

/* SAVE RECIPE */
router.post('/api/postrecipe', function (req, res, next) {
    Recipe.create(req.body, function (err, post) {
        console.log('Posting new recipe');
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE RECIPE */
router.put('/api/updaterecipe/:id', function (req, res, next) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, recipe) {
        console.log('Updating a recipe');
        if (err) return next(err);
        res.json(recipe);
    });
});

/* DELETE RECIPE */
router.delete('/api/delrecipe/:id', function (req, res, next) {
    Recipe.findByIdAndRemove(req.params.id, req.body, function (err, recipe) {
        console.log('Deleting a recipe');
        if (err) return next(err);
        res.json(recipe);
    });
});

module.exports = router;
let express=require("express"),searchRouter=express.Router(),Recipe=require("../models/Recipe.js");searchRouter.post("/api/searchrecipe",function(e,i,n){let r=e.body;Recipe.find({name:new RegExp(r.name,"i"),origin:new RegExp(r.origin,"i"),type:new RegExp(r.type,"i"),difficulty:{$in:r.difficulty},$and:[{duration:{$gte:r.durationRange[0]}},{duration:{$lte:r.durationRange[1]}}]},null,{sort:{name:1}},function(e,r){if(console.log("All recipes matchin query have been found"),e)return n(e);i.json(r)})}),module.exports=searchRouter;
let express = require('express'),
    searchRouter = express.Router(),
    Recipe = require('../models/Recipe.js');
  
/* SAVE RECIPE */
searchRouter.post('/api/searchrecipe', function(req, res, next) {
    let search = req.body;
    Recipe.find({
        "name": new RegExp(search.name, 'i'),
        "origin": new RegExp(search.origin, 'i'),
        "type": new RegExp(search.type, 'i'),
        "difficulty": { "$in": search.difficulty },
        "$and": [{"duration": {"$gte": search.durationRange[0]}}, {"duration": {"$lte": search.durationRange[1]}}]
    },
    null,
    {
        sort: {name: 1}
    },
    function (err, recipes) {
        console.log('All recipes matchin query have been found');
        if (err) return next(err);
        res.json(recipes);
    });
});

module.exports = searchRouter;