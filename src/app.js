const express = require('express');

//instance of express js application
const app=express();

//this is specific to get /user

app.get("/user",(req,res)=>{
    res.send({
        fristname:"ashu",
        lastname:"Yadav"
    })
})

app.post("/user",(req,res)=>{
    console.log("saving data to the database");
    res.send({
        fristname:"umesh",
        lastname:"Yadav"
    });
}
)
 

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
