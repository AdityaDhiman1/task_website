let express = require('express');
let userRout = express();
let bodyParser = require('body-parser');
let path = require('path');
let hbs = require('hbs');
let userController = require('../controller/app.controller');

userRout.set('view engine', 'hbs');
userRout.set('views', path.join(__dirname,'../templates/views'));
userRout.use(bodyParser.urlencoded({
    extended: true,
}))

userRout.get('/', userController.home);
userRout.get('/routine', userController.routine);
userRout.post('/routinePost', userController.routinePost);
userRout.post('/deletePost', userController.deletePost);
userRout.post('/statusPost', userController.updateStatus);

module.exports = userRout;