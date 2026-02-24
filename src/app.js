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


//adding details to database 
app.post("/signup",async(req,res)=>{
 //creating a new instance of the user modal
 const user=new User({
    firstname:"umesh",
    lastname:"Yadav",
    email:"umesh121@gmail.com",
    password:"ume"
 })
 try{
  await user.save();
    res.send("user added sucsessfully");
 }catch(err){
    res.status(401).send("error"+err.message);
 }
  

});









//concepts :
//order of routes matter
