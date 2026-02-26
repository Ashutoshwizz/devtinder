const express = require('express');
const {connectdb}=require('./config/database');
const User = require('./models/user');
const {validatesignupdata,validateemail}=require("./utils/validation")
const bcrypt = require('bcrypt');
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
    try{
//first thing should be validating data
validatesignupdata(req);

//encrypt password
const {firstname,lastname,email,password}=req.body;

const passwordhash = await bcrypt.hash(password,10); 

 //creating a new instance of the user modal
 const user=new User({firstname,lastname,email,password: passwordhash});

  await user.save();
    res.send("user added sucsessfully");
 }catch(err){
    res.status(401).send("Error: "+err.message);
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

//delete perticular user
app.delete("/user",async(req,res)=>{
   const userid=req.body.userid;

   try{
      //User.findByIdAndDelete({_id:userid}); iska shortcut hai neeche wala
     
      const user=await User.findByIdAndDelete(userid);
      res.send("user delted successfully");


   }catch(err){
      res.status(401).send("something went wrong");

   }
})

//updates value
//this userid is from url 
app.patch("/user/:userid",async(req,res)=>{
   const userid=req.params?.userid;
   // const userid=req.body.userid;
    const data =req.body;

    const allowed_updates=["gender","age","lastname"];
    //it checks that every key fromm data is present in allowed updates
    const isupdatesallowed=Object.keys(data).every((k)=>{
     return  allowed_updates.includes(k);
    })
    if(!isupdatesallowed){
      return res.status(400).send("updates not possible");
    }

   try{
      
      const user=await User.findByIdAndUpdate({_id:userid},data,{
         runValidators:true
      });
      res.send("user updated successfully");


   }catch(err){
      res.status(401).send("Update failed "+err.message);

   }

});

app.post("/login",async(req,res)=>{
   try{
      //first thing extract emailid and password
      const {email,password}=req.body;

      //validating email
      validateemail(email);

      //to check is there any person with this email
      const user=await User.findOne({email:email});
      if(!user){
         throw new Error("invalid credentials")
      }

      //checking is password iscooerct by decrpt
      const isPasswordValid=await bcrypt.compare(password,user.password)

          if(!isPasswordValid){
         throw new Error("invalid credentials");
      }else{
         res.send("login successfull!!")
      }

   }catch(err){
    res.status(401).send("Error: "+err.message);
 }

})









