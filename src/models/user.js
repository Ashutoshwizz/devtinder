const mongoose=require('mongoose');
const validator = require('validator');

//creating schema

    const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
       email:{
        type:String,
        required:true,
        unique: true ,
        lowercase:true,
        trim:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Invalid email"+value);
          }}

    },
    password:{
        type:String,
        required:true,
        validate(value){
          if(!validator.isStrongPassword(value)){
            throw new Error("Password is weak"+value);
          }}

    },
    age:{
        type:Number,
        min:18  

    },
    gender:{
        type:String,
        //agar validator nahi dalenge toupdate ke time ye validate check nahi hoga
        //runvalidators:true ise main app.js me krna hoga
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid");
            }
        }
        
    }

    },{
        timestamps:true
    });

//namemodel,nameschema
   const User= mongoose.model("User",userschema);

   module.exports = User;