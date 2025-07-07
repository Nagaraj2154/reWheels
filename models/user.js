const  mongoose = require('mongoose');
const  passportsLocalMongoose = require('passport-local-mongoose');
const passport = require("passport");
const { type } = require('../schema_joi');
const { string } = require('joi');

const userSchema = new mongoose.Schema({
    
    email :{
        type : String,
        required : true,
        unique : true
    },
    license :{
            type : String,

    },

    aadhar : {
        type : String,

    }
});

userSchema.plugin(passportsLocalMongoose);
module.exports = mongoose.model("User" , userSchema);