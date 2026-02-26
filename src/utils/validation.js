 const validator = require('validator');

const validatesignupdata =(req)=>{
//destructuring the object
    const {firstname,lastname,email,password}=req.body;
//we have kept in database schema also this is another way
    if(!firstname||!lastname){
        throw new Error("Name not provided")
    }
    else if(!validator.isEmail(email) ) {
        throw new Error("Provide valid email")

    }
    else if(!validator.isStrongPassword(password) ) {
        throw new Error("Provide strong password")

    }
}

const validateemail=(email)=>{
    if(!validator.isEmail(email) ) {
        throw new Error("Provide valid email")}
}

module.exports={validatesignupdata,validateemail}