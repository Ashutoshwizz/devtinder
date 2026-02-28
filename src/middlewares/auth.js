const jwt=require('jsonwebtoken');
const User=require('../models/user');

const userauth=async(req,res,next)   =>{

    try{
    //read the cookie from req cookie   
   const cookies=req.cookies;
  
   const {  token }=cookies;
   //validating token
   if(!token){
      throw new Error("invalid token");
   } 
   //validating token from secret

   const decodedobj=await jwt.verify(token,"Ashu123");

   const {_id}=decodedobj;  
   
   const user =await User.findById(_id);
   //if token valid but the user dosnt exsist
    if(!user){
      throw new Error("user dosnt exsist");
   }
   req.user=user;
   next();

}
   catch(err){
    res.status(401).send("oopsie: "+err.message);
   }
}

module.exports={userauth};