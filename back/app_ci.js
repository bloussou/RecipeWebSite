let express = require('express'),
app = express(),
recipes = require('./routes/recipes'),
mongoose = require('mongoose'),
search = require('./routes/search'),
ip = require('ip');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/recipes') //localhost/recipes
.then(() =>  {
    console.log('connection succesful bravo !');
    return true; }) //192.168.99.100:32768  
.catch((err) => console.error(err));



app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});
app.use(express.json());

app.use('/search', search);
app.use('/recipes', recipes);

app.listen(8080);



