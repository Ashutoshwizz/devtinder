const express = require('express');
const {connectdb}=require('./config/database');
const cookieParser = require('cookie-parser');
//instance of express js application
const app=express();
//when ever the cookie come it gets parsed
app.use(cookieParser());
//now this middleware will be for all routes
app.use(express.json()); //converts json into javascript object


const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');

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


app.use("/",authRouter); 
app.use("/",profileRouter); 
app.use("/",requestRouter); 

 









