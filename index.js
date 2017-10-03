const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Couldn\'t connect to db');
    } else {
        console.log('Connected to db:'+ config.db);
    }
});
// config file is generally used to config 3 diff environmrnts. default, development, and production
// you have diff dbs and config settings for each env
//middleware
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});//connect server to index page of angular

app.listen(8080, () => {
    console.log('listenting to port 8080');
});