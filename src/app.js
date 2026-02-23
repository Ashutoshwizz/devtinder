const express = require('express');

//instance of express js application
const app=express();

//request handler

app.use("/hello",(req,res)=>{
    res.send("hello hello hello");

}) 

app.use((req,res)=>{
    res.send("hello from the server");

})




//on this port number pur server is held
app.listen(3000,()=>{
    console.log("sucessfully listning ");
});
