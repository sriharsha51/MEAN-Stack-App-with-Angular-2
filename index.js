const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');


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

app.use(express.static(__dirname + '/client/dist/'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
    console.log('listenting to port 8080');
});