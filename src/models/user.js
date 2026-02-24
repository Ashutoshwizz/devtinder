const mongoose=require('mongoose');

//creating schema

    const userschema = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
       email:{
            type:String
    },
    password:{
        type:String
    },age:{
        type:Number
    },gender:{
        type:String
    }

    });

//namemodel,nameschema
   const User= mongoose.model("User",userschema);

   module.exports = User;