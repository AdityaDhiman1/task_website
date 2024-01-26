let express = require('express');
let path = require('path');
require('dotenv').config();
let app = express();
let bodyParser = require('body-parser');
let routes = require('../routes/app.router');
let connectDB = require('../connection/app.connection');
const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI


app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(path.join(__dirname,"../public")));
app.use('/', routes);

const serverStart = async () => { 
    app.listen(PORT, () => {
        console.log(`Server is started at the port ${PORT}...`);
        
    })
    connectDB(MONGO_URI)
}

serverStart()