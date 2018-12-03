const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connection to database
mongoose.connect(config.database);

//Connection success
mongoose.connection.on('connected', ()=>{
  console.log('Connected to database '+config.database);
});

//Connection error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' +err);
});

//init express
const app = express();

// getting router from router folder
const users = require('./routes/users');



//port number
const port = 3000;

//init cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//init bodyparser middleware
app.use(bodyParser.json());

//setting router
app.use('/users', users);

//router
app.get('/', (req, res) =>{
  res.send('Everything is ok');
});




//sart server
app.listen(port, function(){
  console.log('Server started on port ' + port);
})
