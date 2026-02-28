const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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

    // its like helper method for this code  const token=await jwt.sign({_id:user._id},"Ashu123",{expiresIn:"1d"});

    userschema.methods.getjwt= async function(){
        //its referencing to the perticular user  and this keyword only works with normalfuncction not arrow functions
        const user=this;  
        const token=await jwt.sign({_id:user._id},"Ashu123",{expiresIn:"1d"});
   
    }

    //tovalidate password bcrypt
    userschema.methods.validatepassword=async function(passwordbyuser){
        const user=this;
        
         const isPasswordValid=await bcrypt.compare(passwordbyuser,user.password)

         return isPasswordValid;


    }



//namemodel,nameschema
   const User= mongoose.model("User",userschema);

   module.exports = User;