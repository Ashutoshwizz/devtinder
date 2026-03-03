const express = require('express');
const { userauth } = require('../middlewares/auth');
const User = require('../models/user');
const connectionrequestmodle = require('../models/connectionrequest');
const userrouter=express.Router();


module.exports=userrouter;

//get all the pending connections request fro the logged in user 
userrouter.get("/user/requests/received",userauth,async(req,res)=>{
    try{
        const loggedinuser=req.user;
        const connectionrequest=await connectionrequestmodle.find({touserid:loggedinuser._id,
            status:"interested"
        }).populate("fromuserid",["firstname","lastname","age","gender"]);


        res.json({
            message:"Datafetched Succcessfull!!!",
            data:connectionrequest
        })

    }
    catch(err){
        res.status(400).send("Error"+err.message);
    }
})

userrouter.get("/user/connections",userauth,async(req,res)=>{
    try{
        const loggedinuser=req.user;
        const connectionrequest=await connectionrequestmodle.find({
            $or: [
  { touserid: loggedinuser._id, status: "accepted" },
  { fromuserid: loggedinuser._id, status: "accepted" }
]
    }).populate("fromuserid",["firstname","lastname","age","gender"]).populate("touserid",["firstname","lastname","age","gender"])
    //age and gender nahi aa in ild codes coz tab signupme nahi liya tha in newer ones it is present

    const data=connectionrequest.map((row)=>{
        if(row.fromuserid._id.toString() === loggedinuser._id.toString()){
            return row.touserid;
        } return row.fromuserid;
    })

    res.json({data});

    }catch(err){
    res.status(400).json({ message: err.message });
    }
})


userrouter.get("/feed",userauth,async(req,res)=>{
    //if you pass something like (:limit) its paarams and if youpass something like (limit?)its query
    try{
        const loggedinuser=req.user;

        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;

        //finding all connection request(send+received)
        const connectionequest=await connectionrequestmodle.find({
            $or:[
                {fromuserid:loggedinuser._id},{touserid:loggedinuser._id}
            ]
        }).select("fromuserid touserid");
        //select helps youto choose only the fields you want

        const hideuserfromfeed= new Set();
            connectionequest.forEach((req)=>{
                hideuserfromfeed.add(req.fromuserid);
                hideuserfromfeed.add(req.touserid);
            })
         //   console.log(hideuserfromfeed);
         const users=await User.find({
          $and: [{ _id:{$nin: Array.from(hideuserfromfeed)}},
                //converting a set into an array ,also (nin-notin),(notequal)
                {_id:{$ne: loggedinuser}}]
         }).select("firstname lastname").skip(skip).limit(limit);

        

        res.send(users);

    }catch(err){
        res.status(400).json({message:err.message});
    }

})