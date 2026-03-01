const express = require('express');
const requestRouter=express.Router();
const {userauth}=require('../middlewares/auth');
module.exports=requestRouter;
const User=require('../models/user')
const connectionrequestmodel=require('../models/connectionrequest');


requestRouter.post("/request/send/:status/:touserid", userauth,async (req,res)=>{
    try{
        //this is the loggedin user whos send =ing connection req
        const fromuserid=req.user._id;
        //to userid comes from params
        const touserid=req.params.touserid;
        const status=req.params.status;


        const touser=await User.findById(touserid);
        if(!touser){
             return res.status(400).json({message: "to user dosnt exsist"})
            }
        

        const allowedstatus=["interested","ignored"];
        if(!allowedstatus.includes(status)){
            //if you dont write written the code will move ahead
            return res.status(400).json({message: "invalid status type"})
        }

        //if there is an exsisting connectionrequest

        const exisitingconnectionrequest = await connectionrequestmodel.findOne({
            //this ishow you use or here
            $or:[{fromuserid,touserid},
                {fromuserid:touserid,touserid:fromuserid}]
        });
        if(exisitingconnectionrequest){
            return res.status(400).json({
                message:"connection request already exist!!"
            })
        }
          



        const connectionrequest=new connectionrequestmodel({
            fromuserid,
            touserid,status
        })

        const data = await connectionrequest.save();

        res.json({
            message:req.user.firstname+" is "+status+" in "+touser.firstname,
            data
        })

    }catch(err){
        res.status(400).send("ERROR: "+err.message);

    }

})


