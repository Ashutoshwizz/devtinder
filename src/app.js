const express = require('express');

//instance of express js application
const app=express();

//this is specific to get /user

app.use("/user",(req,res,next)=>{
    next();
    // res.send({
    //     fristname:"ashu",
    //     lastname:"Yadav"
    // })
},(req,res,next)=>{
    console.log("hello");
    next();
  //  res.send("im the 2nd one ");
},(req,res,next)=>{
    console.log("hello");
   res.send("helo im the 3rd one")
  //  res.send("im the 2nd one ");
})


//this will match all the http method api calls
app.use("/hello",(req,res)=>{
    res.send("hello from the server");
})


//on this port number pur server is held
app.listen(3000,()=>{
    console.log("sucessfully listning ");
});









//concepts :
//order of routes matter
