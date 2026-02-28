const express=require('express');
const profileRouter=express.Router();
const {userauth}=require('../middlewares/auth');
const {validateeditprofiledata}=require("../utils/validation");
module.exports=profileRouter;


profileRouter.get("/profile/view",userauth,async(req,res)=>{
   try{

   res.send(req.user);

   }catch(err){
    res.status(401).send("Error: "+err.message);
 }
})

profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
    if(!validateeditprofiledata(req))
        throw new Error("Invalid edit");

    //we have already read userauth req.user meh user ki details hai
    const loggedinuser=req.user;
  
    //and req.body meh updates hai
    Object.keys(req.body).forEach((key)=>{
        loggedinuser[key]=req.body[key];
    })

    await loggedinuser.save(); 

    res.send("edit successfull!!");
   
    }catch(err){
    res.status(401).send("Error: "+err.message);
 }

})