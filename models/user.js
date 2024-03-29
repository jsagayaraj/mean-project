const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database')



//Creating User Schema
const UserSchema = mongoose.Schema({
  name:{
    type:String
  },
  email:{
    type:String,
    required:true
  },
  username:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//Exporting UserSchema to other pages
const User = module.exports = mongoose.model('User', UserSchema);

//create function to get user by id and export to other page
module.exports.getUserById = function (id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
//find one user
  const query = {username:username};
  User.findOne(query, callback);
}

//create addUser function to register user
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if(err)throw err;
      newUser.password = hash;
      newUser.save(callback)
    });
  });
}