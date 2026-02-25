const express = require('express');
const {connectdb}=require('./config/database');
const User = require('./models/user');
//instance of express js application
const app=express();
//connecing database
connectdb()
.then(()=>{
console.log("Database connection established");
//on this port number pur server is held 
app.listen(3000,()=>{
    console.log("sucessfully listning ");
});
})
.catch((err) => {
    console.log("Database not connection established");
    console.log(err.message);
});

//now this middleware will be for all routes
app.use(express.json()); //converts json into javascript object

//adding details to database 
app.post("/signup",async(req,res)=>{
 //creating a new instance of the user modal
 const user=new User(req.body);
 try{
  await user.save();
    res.send("user added sucsessfully");
 }catch(err){
    res.status(401).send("error"+err.message);
 }
  

});

//feed api get all the users from the data base
app.get("/feed",async(req,res)=>{
   try{
    const users=await User.find({});
    res.send(users); 
   }catch(err){
      res.status(401).send("users not found");

   }
    

});










