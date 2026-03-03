const express =require('express');
const authRouter=express.Router();
const User = require('../models/user');
const {validatesignupdata,validateemail}=require("../utils/validation");
const bcrypt = require('bcrypt');

module.exports=authRouter;


//adding details to database 
authRouter.post("/signup",async(req,res)=>{
    try{
//first thing should be validating data
validatesignupdata(req);

//decrypt password
const {firstname,lastname,email,password,age,gender}=req.body;

const passwordhash = await bcrypt.hash(password,10); 

 //creating a new instance of the user modal
 const user=new User({firstname,lastname,email,password: passwordhash,age,gender});
  
  const saveduser=await user.save();
  const token=await saveduser.getjwt();

    res.cookie("token",token,{
            expires:new Date(Date.now()+8*3600000)
         });
         
    res.json({message:"user added sucsessfully",
      saveduser
    });
    
     
         
 }catch(err){
    res.status(401).send("Error: "+err.message);
 }
  

});


authRouter.post("/login",async(req,res)=>{ 
   try{
      //first thing extract emailid and password
      const {email,password}=req.body;

      //validating email
      validateemail(email);

      //to check is there any person with this email
      const user = await User.findOne({email:email});
      if(!user){
         throw new Error("invalid credentials")
      }

      //checking is password iscooerct by decrpt
      // const isPasswordValid=await bcrypt.compare(password,user.password)
       const isPasswordValid= await user.validatepassword(password);


          if(!isPasswordValid){
         throw new Error("invalid credentials");
      }else{
         //when the email and password are validated now is time to generrate cookies
         //create a jwt token  
         //first thing id of data field,secret key only server knows
         const token=await user.getjwt();

         // jwt.sign({_id:user._id},"Ashu123",{expiresIn:"1d"});
       
         //add token to co okie and send response to user


         res.cookie("token",token);
      
         res.send("login successfull!!"+user);
      }

   }catch(err){
    res.status(401).send("Error: "+err.message);
 }

})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })

    res.send("You have been sucessfully loggedout");

}) 