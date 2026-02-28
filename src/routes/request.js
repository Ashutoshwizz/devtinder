const express = require('express');
const requestRouter=express.Router();
const {userauth}=require('../middlewares/auth');
module.exports=requestRouter;


requestRouter.post("/sendConnectionRequest", userauth,async (req,res)=>{
    const user=req.user;
    res.send(user.firstname+"sent the connection!!");

})


